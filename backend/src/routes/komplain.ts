import { Hono } from "hono";
import { prisma } from "../config/db";
import { authMiddleware, requireRole, AppEnv } from "../middleware/auth";
import { createNotifikasi } from "../utils/notifikasi";
import { sendWhatsAppBroadcast } from "../services/whatsapp";
import { templateWa } from "../utils/template-wa";
import { eventBus } from "../lib/event-bus";

const app = new Hono<AppEnv>();

app.use("*", authMiddleware);

// Create komplain (PENGHUNI)
app.post("/", requireRole("PENGHUNI"), async (c) => {
  try {
    const user = c.get("user");
    const body = await c.req.json();
    const { masalah, jenis, deskripsi, foto, properti_id } = body;

    if (!masalah || !jenis || !deskripsi || !properti_id) {
      return c.json(
        {
          status: "error",
          message: "masalah, jenis, deskripsi, dan properti_id wajib diisi",
        },
        400,
      );
    }

    const validJenis = ["FASILITAS", "LINGKUNGAN", "PENGHUNI_LAIN", "LAINNYA"];
    if (!validJenis.includes(jenis)) {
      return c.json({ status: "error", message: "Jenis tidak valid" }, 400);
    }

    const penghuni = await prisma.penghuni.findUnique({
      where: { user_id: user.userId },
    });

    if (!penghuni) {
      return c.json(
        { status: "error", message: "Data penghuni tidak ditemukan" },
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

    const komplain = await prisma.komplain.create({
      data: {
        masalah,
        jenis: jenis as any,
        deskripsi,
        foto,
        penghuni_id: penghuni.id,
        properti_id,
        status: "BARU",
      },
      include: {
        penghuni: {
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
    });

    // Notifikasi ke PEMILIK
    const propertiData = await prisma.properti.findUnique({
      where: { id: properti_id },
      select: { admin_id: true, nama: true },
    });
    if (propertiData) {
      await createNotifikasi(
        propertiData.admin_id,
        "Komplain Baru",
        `${komplain.penghuni.user.nama} mengajukan komplain "${masalah}" di ${propertiData.nama}`,
        "KOMPLAIN",
        komplain.id,
      );

      // Notifikasi ke PENGELOLA properti terkait
      const operators = await prisma.operator.findMany({
        where: { properti_id },
        include: { user: { select: { id: true, no_telepon: true } } },
      });
      const operatorUserIds: string[] = [];
      for (const op of operators) {
        await createNotifikasi(
          op.user.id,
          "Komplain Baru",
          `${komplain.penghuni.user.nama} mengajukan komplain "${masalah}" di ${propertiData.nama}`,
          "KOMPLAIN",
          komplain.id,
        );
        operatorUserIds.push(op.user.id);
      }

      const recipients = [propertiData.admin_id, ...operatorUserIds];
      eventBus.publish(recipients, "komplain:baru", {
        id: komplain.id,
        status: komplain.status,
      });

      const pemilik = await prisma.user.findUnique({
        where: { id: propertiData.admin_id },
        select: { no_telepon: true },
      });
      const waPhones: string[] = [];
      if (pemilik?.no_telepon) waPhones.push(pemilik.no_telepon);
      operators.forEach((op) => {
        if (op.user.no_telepon) waPhones.push(op.user.no_telepon!);
      });
      if (waPhones.length > 0) {
        sendWhatsAppBroadcast(
          waPhones,
          templateWa.komplainBaru(
            komplain.penghuni.user.nama,
            jenis,
            masalah,
            propertiData.nama,
          ),
        ).catch(console.error);
      }
    }

    return c.json(
      {
        status: "success",
        data: komplain,
      },
      201,
    );
  } catch (error) {
    console.error("Create komplain error:", error);
    return c.json({ status: "error", message: "Gagal membuat komplain" }, 500);
  }
});

// Get my komplain (PENGHUNI)
app.get("/my", async (c) => {
  try {
    const user = c.get("user");

    if (user.role !== "PENGHUNI") {
      return c.json({ status: "error", message: "Akses tidak diizinkan" }, 403);
    }

    const penghuni = await prisma.penghuni.findUnique({
      where: { user_id: user.userId },
    });

    if (!penghuni) {
      return c.json({
        status: "success",
        data: [],
      });
    }

    const komplain = await prisma.komplain.findMany({
      where: { penghuni_id: penghuni.id },
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
      data: komplain,
    });
  } catch (error) {
    console.error("Get my komplain error:", error);
    return c.json({ status: "error", message: "Gagal mengambil data" }, 500);
  }
});

// Get all komplain (PEMILIK/PENGELOLA)
app.get("/", async (c) => {
  try {
    const user = c.get("user");

    if (user.role === "PENGHUNI") {
      return c.json({ status: "error", message: "Akses tidak diizinkan" }, 403);
    }

    let whereClause: any = {};

    if (user.role === "PEMILIK") {
      whereClause = {
        properti: {
          admin_id: user.userId,
        },
      };
    } else if (user.role === "PENGELOLA") {
      const operator = await prisma.operator.findFirst({
        where: { user_id: user.userId },
      });

      if (operator && operator.properti_id) {
        whereClause = {
          properti_id: operator.properti_id,
        };
      } else {
        return c.json({
          status: "success",
          data: [],
        });
      }
    }

    const komplain = await prisma.komplain.findMany({
      where: whereClause,
      include: {
        penghuni: {
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
      data: komplain,
    });
  } catch (error) {
    console.error("Get all komplain error:", error);
    return c.json({ status: "error", message: "Gagal mengambil data" }, 500);
  }
});

// Get single komplain
app.get("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const user = c.get("user");

    const komplain = await prisma.komplain.findUnique({
      where: { id },
      include: {
        penghuni: {
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

    if (!komplain) {
      return c.json(
        { status: "error", message: "Komplain tidak ditemukan" },
        404,
      );
    }

    // Access control
    const isPenghuni = komplain.penghuni.user_id === user.userId;
    const isOwner = komplain.properti.admin_id === user.userId;

    let isPengelola = false;
    if (user.role === "PENGELOLA") {
      const operator = await prisma.operator.findFirst({
        where: { user_id: user.userId, properti_id: komplain.properti_id },
      });
      isPengelola = !!operator;
    }

    if (!isPenghuni && !isOwner && !isPengelola) {
      return c.json({ status: "error", message: "Akses ditolak" }, 403);
    }

    return c.json({
      status: "success",
      data: komplain,
    });
  } catch (error) {
    console.error("Get komplain error:", error);
    return c.json({ status: "error", message: "Gagal mengambil data" }, 500);
  }
});

// Update status komplain (PEMILIK/PENGELOLA)
app.put("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const user = c.get("user");
    const body = await c.req.json();
    const { status } = body;

    if (user.role === "PENGHUNI") {
      const { masalah, jenis, deskripsi, foto } = body;

      if (!masalah || !jenis || !deskripsi) {
        return c.json(
          { status: "error", message: "masalah, jenis, dan deskripsi wajib diisi" },
          400,
        );
      }

      const validJenis = ["FASILITAS", "LINGKUNGAN", "PENGHUNI_LAIN", "LAINNYA"];
      if (!validJenis.includes(jenis)) {
        return c.json({ status: "error", message: "Jenis tidak valid" }, 400);
      }

      const existing = await prisma.komplain.findUnique({
        where: { id },
        include: { penghuni: true },
      });

      if (!existing) {
        return c.json({ status: "error", message: "Komplain tidak ditemukan" }, 404);
      }

      if (existing.penghuni.user_id !== user.userId) {
        return c.json({ status: "error", message: "Akses ditolak" }, 403);
      }

      if (existing.status === "SELESAI") {
        return c.json(
          { status: "error", message: "Komplain yang sudah selesai tidak dapat diubah" },
          400,
        );
      }

      const updated = await prisma.komplain.update({
        where: { id },
        data: {
          masalah,
          jenis: jenis as any,
          deskripsi,
          ...(foto !== undefined ? { foto } : {}),
        },
      });

      return c.json({ status: "success", data: updated });
    }

    if (!["DIPROSES", "SELESAI"].includes(status)) {
      return c.json(
        { status: "error", message: "Status harus DIPROSES atau SELESAI" },
        400,
      );
    }

    const komplain = await prisma.komplain.findUnique({
      where: { id },
      include: { properti: true },
    });

    if (!komplain) {
      return c.json(
        { status: "error", message: "Komplain tidak ditemukan" },
        404,
      );
    }

    const isOwner = komplain.properti.admin_id === user.userId;

    let isPengelola = false;
    if (user.role === "PENGELOLA") {
      const operator = await prisma.operator.findFirst({
        where: { user_id: user.userId, properti_id: komplain.properti_id },
      });
      isPengelola = !!operator;
    }

    if (!isOwner && !isPengelola) {
      return c.json({ status: "error", message: "Akses ditolak" }, 403);
    }

    const updated = await prisma.komplain.update({
      where: { id },
      data: { status: status as any },
    });

    // Notifikasi ke PENGHUNI
    const komplainData = await prisma.komplain.findUnique({
      where: { id },
      include: {
        penghuni: {
          include: {
            user: { select: { id: true, nama: true, no_telepon: true } },
          },
        },
      },
    });
    if (komplainData?.penghuni?.user) {
      const label = status === "DIPROSES" ? "sedang diproses" : "telah selesai";
      await createNotifikasi(
        komplainData.penghuni.user.id,
        `Komplain ${status === "DIPROSES" ? "Diproses" : "Selesai"}`,
        `Komplain Anda "${komplainData.masalah}" ${label}`,
        "KOMPLAIN",
        id,
      );
      eventBus.publish(komplainData.penghuni.user.id, "komplain:status", {
        id,
        status,
      });
      if (komplainData.penghuni.user.no_telepon) {
        const msg =
          status === "DIPROSES"
            ? templateWa.komplainDiproses(komplainData.masalah)
            : templateWa.komplainSelesai(komplainData.masalah);
        sendWhatsAppBroadcast(
          [komplainData.penghuni.user.no_telepon],
          msg,
        ).catch(console.error);
      }
    }

    return c.json({
      status: "success",
      data: updated,
    });
  } catch (error) {
    console.error("Update komplain error:", error);
    return c.json({ status: "error", message: "Gagal update komplain" }, 500);
  }
});

export default app;
