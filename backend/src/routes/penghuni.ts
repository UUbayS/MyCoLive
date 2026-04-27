import { Hono } from "hono";
import { prisma } from "../config/db";
import { authMiddleware, requireRole } from "../middleware/auth";

const app = new Hono();

app.use("*", authMiddleware);

// Get all penghuni (PEMILIK/PENGELOLA)
app.get("/", async (c) => {
  try {
    const user = c.get("user");
    const { status, properti_id } = c.req.query();

    if (!["PEMILIK", "PENGELOLA"].includes(user.role)) {
      return c.json(
        { status: "error", message: "Akses tidak diizinkan" },
        403
      );
    }

    let propertiFilter = {};
    
    if (user.role === "PEMILIK") {
      propertiFilter = { admin_id: user.userId };
    } else if (user.role === "PENGELOLA") {
      const operators = await prisma.operator.findMany({
        where: { user_id: user.userId },
        select: { properti_id: true }
      });
      const propertiIds = operators.map(op => op.properti_id);
      propertiFilter = { id: { in: propertiIds } };
    }

    const allProperti = await prisma.properti.findMany({
      where: propertiFilter,
      select: { id: true }
    });
    const propertiIds = allProperti.map(p => p.id);

    const whereClause: any = {
      kamar: {
        properti_id: { in: propertiIds }
      }
    };

    if (status && ["AKTIF", "BERAKHIR"].includes(status)) {
      whereClause.status_sewa = status;
    }

    if (properti_id) {
      whereClause.kamar = {
        properti_id: properti_id
      };
    }

    const penghuni = await prisma.penghuni.findMany({
      where: whereClause,
      include: {
        user: {
          select: {
            id: true,
            username: true,
            nama: true,
            email: true,
            no_telepon: true,
            created_at: true
          }
        },
        kamar: {
          include: {
            properti: {
              select: {
                id: true,
                nama: true,
                alamat: true
              }
            }
          }
        }
      },
      orderBy: { created_at: "desc" }
    });

    const result = penghuni.map(p => ({
      id: p.id,
      tgl_mulai: p.tgl_mulai,
      tgl_berakhir: p.tgl_berakhir,
      status_sewa: p.status_sewa,
      status_display: p.kamar ? (p.status_sewa === "AKTIF" ? "Menyewa" : "Sewa Berakhir") : "Belum Menyewa",
      kamar: p.kamar ? {
        id: p.kamar.id,
        nomor: p.kamar.nomor,
        properti: p.kamar.properti.nama,
        alamat: p.kamar.properti.alamat
      } : null,
      user: p.user
    }));

    return c.json({
      status: "success",
      data: result,
    });
  } catch (error) {
    console.error("Get penghuni error:", error);
    return c.json(
      { status: "error", message: "Gagal mengambil data penghuni" },
      500
    );
  }
});

// Get single penghuni (PEMILIK/PENGELOLA)
app.get("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const user = c.get("user");

    if (!["PEMILIK", "PENGELOLA"].includes(user.role)) {
      return c.json(
        { status: "error", message: "Akses tidak diizinkan" },
        403
      );
    }

    const penghuni = await prisma.penghuni.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            nama: true,
            email: true,
            no_telepon: true,
            created_at: true
          }
        },
        kamar: {
          include: {
            properti: true
          }
        },
        pemesanan: {
          orderBy: { created_at: "desc" },
          take: 5,
          include: {
            kamar: true,
            properti: true,
            pembayaran: true
          }
        }
      }
    });

    if (!penghuni) {
      return c.json(
        { status: "error", message: "Penghuni tidak ditemukan" },
        404
      );
    }

    return c.json({
      status: "success",
      data: penghuni,
    });
  } catch (error) {
    console.error("Get penghuni detail error:", error);
    return c.json(
      { status: "error", message: "Gagal mengambil data penghuni" },
      500
    );
  }
});

export default app;