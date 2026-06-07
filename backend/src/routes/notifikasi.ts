import { Hono } from "hono";
import { prisma } from "../config/db";
import { authMiddleware, AppEnv } from "../middleware/auth";

const app = new Hono<AppEnv>();

app.use("*", authMiddleware);

// Get all notifikasi for current user
app.get("/", async (c) => {
  try {
    const user = c.get("user");

    const notifikasi = await prisma.notifikasi.findMany({
      where: { user_id: user.userId },
      orderBy: { created_at: "desc" },
    });

    return c.json({
      status: "success",
      data: notifikasi,
    });
  } catch (error) {
    console.error("Get notifikasi error:", error);
    return c.json(
      { status: "error", message: "Gagal mengambil notifikasi" },
      500
    );
  }
});

// Mark single notifikasi as read
app.put("/:id/read", async (c) => {
  try {
    const id = c.req.param("id");
    const user = c.get("user");

    const notifikasi = await prisma.notifikasi.findUnique({
      where: { id },
    });

    if (!notifikasi) {
      return c.json(
        { status: "error", message: "Notifikasi tidak ditemukan" },
        404
      );
    }

    if (notifikasi.user_id !== user.userId) {
      return c.json(
        { status: "error", message: "Akses ditolak" },
        403
      );
    }

    const updated = await prisma.notifikasi.update({
      where: { id },
      data: { is_read: true },
    });

    return c.json({
      status: "success",
      data: updated,
    });
  } catch (error) {
    console.error("Update notifikasi error:", error);
    return c.json(
      { status: "error", message: "Gagal mengupdate notifikasi" },
      500
    );
  }
});

// Mark all notifikasi as read for current user
app.put("/read-all", async (c) => {
  try {
    const user = c.get("user");

    const { count } = await prisma.notifikasi.updateMany({
      where: { user_id: user.userId, is_read: false },
      data: { is_read: true },
    });

    return c.json({
      status: "success",
      message: `${count} notifikasi ditandai sebagai dibaca`,
      data: { count },
    });
  } catch (error) {
    console.error("Mark all read error:", error);
    return c.json(
      { status: "error", message: "Gagal menandai notifikasi" },
      500
    );
  }
});

export default app;
