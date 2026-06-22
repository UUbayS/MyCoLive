import { Hono } from "hono";
import { prisma } from "../config/db";
import { authMiddleware, requireRole, AppEnv } from "../middleware/auth";
import { createNotifikasi } from "../utils/notifikasi";
import { sendWhatsAppBroadcast } from "../services/whatsapp";
import { templateWa } from "../utils/template-wa";
import { eventBus } from "../lib/event-bus";

const app = new Hono<AppEnv>();

app.use("*", authMiddleware);

// Create pengajuan dana (PENGELOLA)
app.post("/", requireRole("PENGELOLA"), async (c) => {
  try {
    const user = c.get("user");
    const body = await c.req.json();
    const { jumlah, tujuan, no_rekening, foto, properti_id } = body;

    if (!jumlah || !tujuan || !no_rekening || !properti_id) {
      return c.json(
        {
          status: "error",
          message: "jumlah, tujuan, no_rekening, dan properti_id wajib diisi",
        },
        400,
      );
    }

    if (jumlah <= 0) {
      return c.json(
        { status: "error", message: "Jumlah harus lebih dari 0" },
        400,
      );
    }

    const operator = await prisma.operator.findFirst({
      where: { user_id: user.userId },
    });

    if (!operator) {
      return c.json(
        { status: "error", message: "Data operator tidak ditemukan" },
        404,
      );
    }

    const properti = await prisma.properti.findUnique({
      where: { id: properti_id },
    });

    if (!properti) {
      return c.json(
        { status: "error", message: "Properti tidak ditemukan" },
        404,
      );
    }

    const isManaged = operator.properti_id === properti_id;
    if (!isManaged) {
      return c.json(
        { status: "error", message: "Anda tidak mengelola properti ini" },
        403,
      );
    }

    const pengajuan = await prisma.pengajuanDana.create({
      data: {
        tujuan,
        jumlah,
        no_rekening,
        foto,
        operator_id: operator.id,
        properti_id,
        status: "MENUNGGU",
      },
      include: {
        operator: {
          include: {
            user: {
              select: {
                nama: true,
                email: true,
              },
            },
          },
        },
        properti: {
          select: {
            id: true,
            nama: true,
            alamat: true,
          },
        },
      },
    });

    // Notifikasi ke PEMILIK
    await createNotifikasi(
      properti.admin_id,
      "Pengajuan Dana Baru",
      `${pengajuan.operator.user.nama} mengajukan dana sebesar Rp ${jumlah.toLocaleString("id-ID")} untuk ${tujuan} di ${properti.nama}`,
      "DANA",
      pengajuan.id,
    );
    eventBus.publish(properti.admin_id, "dana:baru", {
      id: pengajuan.id,
      status: pengajuan.status,
    });
    const pemilik = await prisma.user.findUnique({
      where: { id: properti.admin_id },
      select: { no_telepon: true },
    });
    if (pemilik?.no_telepon) {
      sendWhatsAppBroadcast(
        [pemilik.no_telepon],
        templateWa.danaBaru(
          pengajuan.operator.user.nama,
          tujuan,
          jumlah,
          properti.nama,
        ),
      ).catch(console.error);
    }

    return c.json(
      {
        status: "success",
        data: pengajuan,
      },
      201,
    );
  } catch (error) {
    console.error("Create pengajuan dana error:", error);
    return c.json({ status: "error", message: "Gagal membuat pengajuan" }, 500);
  }
});

// Get my pengajuan (PENGELOLA)
app.get("/my", requireRole("PENGELOLA"), async (c) => {
  try {
    const user = c.get("user");

    const operator = await prisma.operator.findFirst({
      where: { user_id: user.userId },
    });

    if (!operator) {
      return c.json({
        status: "success",
        data: [],
      });
    }

    const pengajuan = await prisma.pengajuanDana.findMany({
      where: { operator_id: operator.id },
      include: {
        properti: {
          select: {
            id: true,
            nama: true,
            alamat: true,
          },
        },
      },
      orderBy: { created_at: "desc" },
    });

    return c.json({
      status: "success",
      data: pengajuan,
    });
  } catch (error) {
    console.error("Get my pengajuan error:", error);
    return c.json({ status: "error", message: "Gagal mengambil data" }, 500);
  }
});

// Get all pengajuan (PEMILIK)
app.get("/", requireRole("PEMILIK"), async (c) => {
  try {
    const user = c.get("user");

    const pengajuan = await prisma.pengajuanDana.findMany({
      where: {
        properti: {
          admin_id: user.userId,
        },
      },
      include: {
        operator: {
          include: {
            user: {
              select: {
                nama: true,
                email: true,
                no_telepon: true,
              },
            },
          },
        },
        properti: {
          select: {
            id: true,
            nama: true,
            alamat: true,
          },
        },
      },
      orderBy: { created_at: "desc" },
    });

    return c.json({
      status: "success",
      data: pengajuan,
    });
  } catch (error) {
    console.error("Get all pengajuan error:", error);
    return c.json({ status: "error", message: "Gagal mengambil data" }, 500);
  }
});

// Get single pengajuan (PEMILIK/PENGELOLA)
app.get("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const user = c.get("user");

    const pengajuan = await prisma.pengajuanDana.findUnique({
      where: { id },
      include: {
        operator: {
          include: {
            user: {
              select: {
                id: true,
                nama: true,
                email: true,
                no_telepon: true,
              },
            },
          },
        },
        properti: true,
      },
    });

    if (!pengajuan) {
      return c.json(
        { status: "error", message: "Pengajuan tidak ditemukan" },
        404,
      );
    }

    const isOwner = pengajuan.properti.admin_id === user.userId;

    let isPengelola = false;
    if (user.role === "PENGELOLA") {
      const operator = await prisma.operator.findFirst({
        where: { user_id: user.userId, properti_id: pengajuan.properti_id },
      });
      isPengelola = !!operator;
    }

    if (!isOwner && !isPengelola) {
      return c.json({ status: "error", message: "Akses ditolak" }, 403);
    }

    return c.json({
      status: "success",
      data: pengajuan,
    });
  } catch (error) {
    console.error("Get pengajuan error:", error);
    return c.json({ status: "error", message: "Gagal mengambil data" }, 500);
  }
});

// Update status pengajuan (PEMILIK)
app.put("/:id", requireRole("PEMILIK"), async (c) => {
  try {
    const id = c.req.param("id");
    const user = c.get("user");
    const body = await c.req.json();
    const { status, bukti_transfer } = body;

    if (!["DITERIMA", "DITOLAK"].includes(status)) {
      return c.json(
        { status: "error", message: "Status harus DITERIMA atau DITOLAK" },
        400,
      );
    }

    if (status === "DITERIMA" && (!bukti_transfer || !bukti_transfer.trim())) {
      return c.json(
        { status: "error", message: "Bukti transfer wajib diunggah untuk menyetujui pengajuan" },
        400,
      );
    }

    const pengajuan = await prisma.pengajuanDana.findUnique({
      where: { id },
      include: { properti: true },
    });

    if (!pengajuan) {
      return c.json(
        { status: "error", message: "Pengajuan tidak ditemukan" },
        404,
      );
    }

    if (pengajuan.properti.admin_id !== user.userId) {
      return c.json({ status: "error", message: "Akses ditolak" }, 403);
    }

    if (pengajuan.status !== "MENUNGGU") {
      return c.json(
        { status: "error", message: "Pengajuan sudah diproses" },
        400,
      );
    }

    const updated = await prisma.pengajuanDana.update({
      where: { id },
      data: {
        status: status as any,
        ...(status === "DITERIMA" ? { bukti_transfer } : {}),
      },
    });

    // Notifikasi ke PENGELOLA
    const pengajuanData = await prisma.pengajuanDana.findUnique({
      where: { id },
      include: {
        operator: {
          include: { user: { select: { id: true, no_telepon: true } } },
        },
      },
    });
    if (pengajuanData?.operator?.user) {
      const label = status === "DITERIMA" ? "diterima" : "ditolak";
      await createNotifikasi(
        pengajuanData.operator.user.id,
        `Pengajuan Dana ${status === "DITERIMA" ? "Diterima" : "Ditolak"}`,
        `Pengajuan dana Anda untuk ${pengajuan.tujuan} telah ${label}`,
        "DANA",
        id,
      );
      eventBus.publish(pengajuanData.operator.user.id, "dana:status", {
        id,
        status,
      });
      if (pengajuanData.operator.user.no_telepon) {
        const msg =
          status === "DITERIMA"
            ? templateWa.danaDiterima(pengajuan.tujuan, pengajuan.jumlah)
            : templateWa.danaDitolak(pengajuan.tujuan, pengajuan.jumlah);
        sendWhatsAppBroadcast(
          [pengajuanData.operator.user.no_telepon],
          msg,
        ).catch(console.error);
      }
    }

    return c.json({
      status: "success",
      data: updated,
    });
  } catch (error) {
    console.error("Update pengajuan error:", error);
    return c.json({ status: "error", message: "Gagal update pengajuan" }, 500);
  }
});

export default app;
