import { Hono } from "hono";
import { prisma } from "../config/db";
import { authMiddleware, requireRole, AppEnv } from "../middleware/auth";

const app = new Hono<AppEnv>();

app.use("*", authMiddleware);

// Get current penghuni data (PENGHUNI)
app.get("/me", requireRole("PENGHUNI"), async (c) => {
  try {
    const user = c.get("user");

    const penghuni = await prisma.penghuni.findUnique({
      where: { user_id: user.userId },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            nama: true,
            email: true,
            no_telepon: true,
          },
        },
        kamar: {
          include: {
            properti: {
              select: {
                id: true,
                nama: true,
                alamat: true,
                provinsi: true,
                kota: true,
                kecamatan: true,
                kode_pos: true,
                detail_alamat: true,
              },
            },
          },
        },
      },
    });

    if (!penghuni) {
      return c.json(
        { status: "error", message: "Data penghuni tidak ditemukan" },
        404
      );
    }

    return c.json({
      status: "success",
      data: penghuni,
    });
  } catch (error) {
    console.error("Get penghuni me error:", error);
    return c.json(
      { status: "error", message: "Gagal mengambil data penghuni" },
      500
    );
  }
});

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

    // Get properti IDs yang boleh diakses
    let propertiIds: string[] = [];
    
    if (user.role === "PEMILIK") {
      const properti = await prisma.properti.findMany({
        where: { admin_id: user.userId },
        select: { id: true }
      });
      propertiIds = properti.map(p => p.id);
    } else if (user.role === "PENGELOLA") {
      const operators = await prisma.operator.findMany({
        where: { user_id: user.userId },
        select: { properti_id: true }
      });
      propertiIds = operators.map(op => op.properti_id);
    }

    if (propertiIds.length === 0) {
      return c.json({
        status: "success",
        data: [],
      });
    }

    // Ambil SEMUA penghuni yang ada di properti ini (dengan atau tanpa kamar)
    const whereClause: any = {};

    if (status && ["AKTIF", "BERAKHIR"].includes(status)) {
      whereClause.status_sewa = status;
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

    // Filter berdasarkan properti_ids (baik ada kamar maupun tidak)
    const result = penghuni
      .filter(p => {
        // Jika ada kamar, cek apakah properti_id cocok
        if (p.kamar) {
          return propertiIds.includes(p.kamar.properti_id);
        }
        // Jika tidak ada kamar, tetap tampilkan (belum menyewa / baru register)
        return true;
      })
      .filter(p => {
        // Filter by properti_id jika ada
        if (properti_id && p.kamar) {
          return p.kamar.properti_id === properti_id;
        }
        if (properti_id && !p.kamar) {
          return false; // Tidak bisa filter untuk yang belum punya kamar
        }
        return true;
      })
      .map(p => ({
        id: p.id,
        tgl_mulai: p.tgl_mulai,
        tgl_berakhir: p.tgl_berakhir,
        status_sewa: p.status_sewa,
        status_display: !p.kamar 
          ? "Belum Menyewa" 
          : (p.status_sewa === "AKTIF" ? "Menyewa" : "Sewa Berakhir"),
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

    const propertiId = penghuni.kamar?.properti_id;
    
    let isAllowed = false;
    if (user.role === "PEMILIK") {
      isAllowed = propertiId ? !!(await prisma.properti.findFirst({
        where: { id: propertiId, admin_id: user.userId }
      })) : true;
    } else if (user.role === "PENGELOLA") {
      const operator = await prisma.operator.findFirst({
        where: { user_id: user.userId, properti_ids: { has: propertiId || "" } }
      });
      isAllowed = !!operator;
    }

    if (!isAllowed && propertiId) {
      return c.json(
        { status: "error", message: "Akses ditolak" },
        403
      );
    }

    return c.json({
      status: "success",
      data: {
        ...penghuni,
        kamar: penghuni.kamar ? {
          id: penghuni.kamar.id,
          nomor: penghuni.kamar.nomor,
          properti: penghuni.kamar.properti.nama,
          alamat: penghuni.kamar.properti.alamat
        } : null
      },
    });
  } catch (error) {
    console.error("Get penghuni detail error:", error);
    return c.json(
      { status: "error", message: "Gagal mengambil data penghuni" },
      500
    );
  }
});

// Checkout penghuni (PEMILIK)
app.put("/:id/checkout", requireRole("PEMILIK"), async (c) => {
  try {
    const id = c.req.param("id");
    const user = c.get("user");

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
        }
      }
    });

    if (!penghuni) {
      return c.json(
        { status: "error", message: "Penghuni tidak ditemukan" },
        404
      );
    }

    if (penghuni.status_sewa !== "AKTIF") {
      return c.json(
        { status: "error", message: "Penghuni sudah tidak aktif" },
        400
      );
    }

    if (!penghuni.kamar_id) {
      return c.json(
        { status: "error", message: "Penghuni tidak memiliki kamar" },
        400
      );
    }

    // Ownership check
    const propertiId = penghuni.kamar?.properti_id;
    if (propertiId) {
      const isOwner = !!(await prisma.properti.findFirst({
        where: { id: propertiId, admin_id: user.userId }
      }));
      if (!isOwner) {
        return c.json(
          { status: "error", message: "Akses ditolak" },
          403
        );
      }
    }

    // Transaction: checkout penghuni + kosongkan kamar
    const updated = await prisma.$transaction(async (tx) => {
      await tx.kamar.update({
        where: { id: penghuni.kamar_id! },
        data: { status: "KOSONG" }
      });

      return tx.penghuni.update({
        where: { id },
        data: {
          status_sewa: "BERAKHIR",
          tgl_berakhir: new Date(),
          kamar_id: null
        },
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
          }
        }
      });
    });

    return c.json({
      status: "success",
      data: {
        ...updated,
        kamar: updated.kamar ? {
          id: updated.kamar.id,
          nomor: updated.kamar.nomor,
          properti: updated.kamar.properti.nama,
          alamat: updated.kamar.properti.alamat
        } : null
      }
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return c.json(
      { status: "error", message: "Gagal melakukan checkout" },
      500
    );
  }
});

export default app;