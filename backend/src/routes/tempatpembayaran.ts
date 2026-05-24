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
      where: { user_id: user.userId }
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

// Update tempat pembayaran
app.put("/", requireRole("PEMILIK"), async (c) => {
  try {
    const user = c.get("user");
    const body = await c.req.json();
    const { nama_rekening, nomor_rekening, bank, qris_image } = body;

    const settings = await prisma.adminSettings.upsert({
      where: { user_id: user.userId },
      update: {
        nama_rekening: nama_rekening || undefined,
        nomor_rekening: nomor_rekening || undefined,
        bank: bank || undefined,
        qris_image: qris_image || undefined,
      },
      create: {
        user_id: user.userId,
        nama_rekening: nama_rekening || null,
        nomor_rekening: nomor_rekening || null,
        bank: bank || null,
        qris_image: qris_image || null,
      },
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