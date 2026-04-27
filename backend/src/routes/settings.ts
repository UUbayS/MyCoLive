import { Hono } from "hono";
import { prisma } from "../config/db";
import { authMiddleware, requireRole } from "../middleware/auth";

const app = new Hono();

app.use("*", authMiddleware);

// Get settings (by logged in user - should be PEMILIK)
app.get("/", async (c) => {
  try {
    const user = c.get("user");
    
    const settings = await prisma.adminSettings.findUnique({
      where: { user_id: user.userId }
    });

    return c.json({
      status: "success",
      data: settings || {},
    });
  } catch (error) {
    console.error("Get settings error:", error);
    return c.json(
      { status: "error", message: "Gagal mengambil settings" },
      500
    );
  }
});

// Update settings
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
    console.error("Update settings error:", error);
    return c.json(
      { status: "error", message: "Gagal update settings" },
      500
    );
  }
});

export default app;