import { Hono } from "hono";
import { prisma } from "../config/db";
import { authMiddleware, requireRole, AppEnv } from "../middleware/auth";
import { createNotifikasi, createNotifikasiBulk } from "../utils/notifikasi";
import { sendWhatsAppBroadcast } from "../services/whatsapp";

const app = new Hono<AppEnv>();

app.use("*", authMiddleware);

// POST /api/pengumuman
// Kirim pengumuman massal (WA + In-App)
app.post("/", async (c) => {
  try {
    const user = c.get("user");
    const body = await c.req.json();
    const {
      target,
      properti_id,
      user_ids,
      judul,
      pesan,
      kirim_whatsapp = true,
    } = body;

    if (!target || !judul || !pesan) {
      return c.json(
        { status: "error", message: "target, judul, dan pesan wajib diisi" },
        400
      );
    }

    const validTargets = [
      "ALL",
      "PENGHUNI",
      "PENGELOLA",
      "PENGHUNI_PROPERTI",
      "CUSTOM",
    ];
    if (!validTargets.includes(target)) {
      return c.json(
        { status: "error", message: "target tidak valid" },
        400
      );
    }

    // Access control
    if (user.role === "PENGHUNI") {
      return c.json(
        { status: "error", message: "Akses ditolak" },
        403
      );
    }

    if (user.role === "PENGELOLA") {
      // Pengelola hanya boleh kirim ke PENGHUNI_PROPERTI yang dikelolanya
      if (target !== "PENGHUNI_PROPERTI") {
        return c.json(
          { status: "error", message: "Pengelola hanya boleh kirim ke penghuni properti yang dikelola" },
          403
        );
      }
    }

    let targetUsers: { id: string; no_telepon: string | null }[] = [];

    if (target === "CUSTOM") {
      if (!user_ids || !Array.isArray(user_ids) || user_ids.length === 0) {
        return c.json(
          { status: "error", message: "user_ids wajib diisi untuk target CUSTOM" },
          400
        );
      }
      targetUsers = await prisma.user.findMany({
        where: { id: { in: user_ids } },
        select: { id: true, no_telepon: true },
      });
    } else if (target === "ALL") {
      if (user.role !== "PEMILIK") {
        return c.json(
          { status: "error", message: "Akses ditolak" },
          403
        );
      }
      targetUsers = await prisma.user.findMany({
        select: { id: true, no_telepon: true },
      });
    } else if (target === "PENGHUNI") {
      if (user.role !== "PEMILIK") {
        return c.json(
          { status: "error", message: "Akses ditolak" },
          403
        );
      }
      targetUsers = await prisma.user.findMany({
        where: { role: "PENGHUNI" },
        select: { id: true, no_telepon: true },
      });
    } else if (target === "PENGELOLA") {
      if (user.role !== "PEMILIK") {
        return c.json(
          { status: "error", message: "Akses ditolak" },
          403
        );
      }
      targetUsers = await prisma.user.findMany({
        where: { role: "PENGELOLA" },
        select: { id: true, no_telepon: true },
      });
    } else if (target === "PENGHUNI_PROPERTI") {
      if (!properti_id) {
        return c.json(
          { status: "error", message: "properti_id wajib diisi untuk target PENGHUNI_PROPERTI" },
          400
        );
      }

      // Ownership check
      if (user.role === "PENGELOLA") {
        const isManaged = await prisma.operator.findFirst({
          where: { user_id: user.userId, properti_id },
        });
        if (!isManaged) {
          return c.json(
            { status: "error", message: "Anda tidak mengelola properti ini" },
            403
          );
        }
      } else if (user.role === "PEMILIK") {
        const isOwner = await prisma.properti.findFirst({
          where: { id: properti_id, admin_id: user.userId },
        });
        if (!isOwner) {
          return c.json(
            { status: "error", message: "Properti bukan milik Anda" },
            403
          );
        }
      }

      // Get penghuni yang aktif di properti ini
      const penghuniUsers = await prisma.penghuni.findMany({
        where: {
          kamar: { properti_id },
          status_sewa: "AKTIF",
        },
        include: {
          user: { select: { id: true, no_telepon: true } },
        },
      });

      targetUsers = penghuniUsers.map((p) => ({
        id: p.user.id,
        no_telepon: p.user.no_telepon,
      }));
    }

    // Send In-App notifications
    const uniqueUserIds = targetUsers.map((u) => u.id);
    await createNotifikasiBulk(uniqueUserIds, judul, pesan, "PENGUMUMAN", null);

    // Send WhatsApp
    let waBerhasil = 0;
    let waGagal = 0;
    if (kirim_whatsapp) {
      const waPhones = targetUsers
        .map((u) => u.no_telepon)
        .filter(Boolean) as string[];
      if (waPhones.length > 0) {
        const tanggal = new Date().toLocaleDateString("id-ID", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        });
        const formattedPesan = `📢 *${judul}*\n\n${pesan}\n\n———————————————\n🏠 _MyCoLive_\n📅 ${tanggal}`;

        const result = await sendWhatsAppBroadcast(waPhones, formattedPesan);
        waBerhasil = result.berhasil;
        waGagal = result.gagal;
      }
    }

    return c.json({
      status: "success",
      data: {
        total_penerima: targetUsers.length,
        wa_berhasil: waBerhasil,
        wa_gagal: waGagal,
        inapp_berhasil: targetUsers.length,
      },
    });
  } catch (error) {
    console.error("Pengumuman error:", error);
    return c.json(
      { status: "error", message: "Gagal mengirim pengumuman" },
      500
    );
  }
});

export default app;
