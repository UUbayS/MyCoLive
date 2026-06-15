import { Hono } from "hono";
import { prisma } from "../config/db";
import { authMiddleware, requireRole, AppEnv } from "../middleware/auth";

const app = new Hono<AppEnv>();

app.use("*", authMiddleware);

// Get tempat pembayaran (PEMILIK only)
app.get("/", requireRole("PEMILIK"), async (c) => {
  try {
    const user = c.get("user");

    const settings = await prisma.adminSettings.findUnique({
      where: { user_id: user.userId },
      include: { bank_accounts: true },
    });

    if (!settings) {
      return c.json({
        status: "success",
        data: null,
        message: "Tempat pembayaran belum di-configure",
      });
    }

    return c.json({
      status: "success",
      data: settings,
    });
  } catch (error) {
    console.error("Get tempat pembayaran error:", error);
    return c.json(
      { status: "error", message: "Gagal mengambil data" },
      500
    );
  }
});

// Get tempat pembayaran by properti ID (any authenticated user)
app.get("/:propertiId", async (c) => {
  try {
    const propertiId = c.req.param("propertiId");

    const properti = await prisma.properti.findUnique({
      where: { id: propertiId },
      include: {
        admin: {
          include: {
            settings: {
              include: { bank_accounts: true },
            },
          },
        },
      },
    });

    if (!properti) {
      return c.json(
        { status: "error", message: "Properti tidak ditemukan" },
        404
      );
    }

    if (!properti.admin) {
      return c.json(
        { status: "error", message: "Pemilik properti tidak ditemukan" },
        404
      );
    }

    if (!properti.admin.settings) {
      return c.json({
        status: "success",
        data: null,
        message: "Informasi pembayaran belum diatur",
      });
    }

    const settings = properti.admin.settings;
    return c.json({
      status: "success",
      data: {
        qris_image: settings.qris_image,
        bank_accounts: settings.bank_accounts,
      },
    });
  } catch (error) {
    console.error("Get pembayaran info error:", error);
    return c.json(
      { status: "error", message: "Gagal mengambil data" },
      500
    );
  }
});

// Update tempat pembayaran
app.put("/", requireRole("PEMILIK"), async (c) => {
  try {
    const user = c.get("user");
    const body = await c.req.json();
    const { qris_image, bank_accounts } = body;

    const accounts = Array.isArray(bank_accounts) ? bank_accounts : [];
    const validAccounts = accounts
      .filter(
        (a: any) =>
          typeof a.nama_rekening === "string" &&
          a.nama_rekening.trim() &&
          typeof a.nomor_rekening === "string" &&
          a.nomor_rekening.trim() &&
          typeof a.bank === "string" &&
          a.bank.trim()
      )
      .map((a: any) => ({
        nama_rekening: a.nama_rekening.trim(),
        nomor_rekening: a.nomor_rekening.trim(),
        bank: a.bank.trim(),
      }));

    const settings = await prisma.$transaction(async (tx) => {
      const settings = await tx.adminSettings.upsert({
        where: { user_id: user.userId },
        update: { qris_image: qris_image || null },
        create: { user_id: user.userId, qris_image: qris_image || null },
      });

      await tx.bankAccount.deleteMany({
        where: { admin_settings_id: settings.id },
      });

      if (validAccounts.length > 0) {
        await tx.bankAccount.createMany({
          data: validAccounts.map((a) => ({
            ...a,
            admin_settings_id: settings.id,
          })),
        });
      }

      return tx.adminSettings.findUnique({
        where: { id: settings.id },
        include: { bank_accounts: true },
      });
    });

    return c.json({
      status: "success",
      data: settings,
    });
  } catch (error) {
    console.error("Update tempat pembayaran error:", error);
    return c.json(
      { status: "error", message: "Gagal update data" },
      500
    );
  }
});

export default app;
