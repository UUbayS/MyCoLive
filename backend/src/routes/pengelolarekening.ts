import { Hono } from "hono";
import { prisma } from "../config/db";
import { authMiddleware, requireRole, AppEnv } from "../middleware/auth";

const app = new Hono<AppEnv>();

app.use("*", authMiddleware);
app.use("*", requireRole("PENGELOLA"));

// Get pengelola bank accounts
app.get("/", async (c) => {
  try {
    const user = c.get("user");

    const accounts = await prisma.pengelolaBankAccount.findMany({
      where: { user_id: user.userId },
      orderBy: { created_at: "asc" },
    });

    return c.json({
      status: "success",
      data: accounts,
    });
  } catch (error) {
    console.error("Get pengelola bank accounts error:", error);
    return c.json(
      { status: "error", message: "Gagal mengambil data rekening" },
      500
    );
  }
});

// Update pengelola bank accounts
app.put("/", async (c) => {
  try {
    const user = c.get("user");
    const body = await c.req.json();
    const { bank_accounts } = body;

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

    const result = await prisma.$transaction(async (tx) => {
      // Hapus yang lama
      await tx.pengelolaBankAccount.deleteMany({
        where: { user_id: user.userId },
      });

      // Insert yang baru
      if (validAccounts.length > 0) {
        await tx.pengelolaBankAccount.createMany({
          data: validAccounts.map((a) => ({
            ...a,
            user_id: user.userId,
          })),
        });
      }

      // Ambil data terbaru
      return tx.pengelolaBankAccount.findMany({
        where: { user_id: user.userId },
        orderBy: { created_at: "asc" },
      });
    });

    return c.json({
      status: "success",
      data: result,
    });
  } catch (error) {
    console.error("Update pengelola bank accounts error:", error);
    return c.json(
      { status: "error", message: "Gagal update data rekening" },
      500
    );
  }
});

export default app;
