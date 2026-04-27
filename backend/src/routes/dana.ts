import { Hono } from "hono";
import { prisma } from "../config/db";
import { authMiddleware, requireRole } from "../middleware/auth";

const app = new Hono();

app.use("*", authMiddleware);

// Create pengajuan dana (PENGELOLA)
app.post("/", requireRole("PENGELOLA"), async (c) => {
  try {
    const user = c.get("user");
    const body = await c.req.json();
    const { jumlah, tujuan, no_rekening, foto, properti_id } = body;

    if (!jumlah || !tujuan || !no_rekening || !properti_id) {
      return c.json(
        { status: "error", message: "jumlah, tujuan, no_rekening, dan properti_id wajib diisi" },
        400
      );
    }

    if (jumlah <= 0) {
      return c.json(
        { status: "error", message: "Jumlah harus lebih dari 0" },
        400
      );
    }

    const operator = await prisma.operator.findFirst({
      where: { user_id: user.userId }
    });

    if (!operator) {
      return c.json(
        { status: "error", message: "Data operator tidak ditemukan" },
        404
      );
    }

    const properti = await prisma.properti.findUnique({
      where: { id: properti_id }
    });

    if (!properti) {
      return c.json(
        { status: "error", message: "Properti tidak ditemukan" },
        404
      );
    }

    const isManaged = operator.properti_ids.includes(properti_id);
    if (!isManaged) {
      return c.json(
        { status: "error", message: "Anda tidak mengelola properti ini" },
        403
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
        status: "MENUNGGU"
      },
      include: {
        operator: {
          include: {
            user: {
              select: {
                nama: true,
                email: true
              }
            }
          }
        },
        properti: {
          select: {
            id: true,
            nama: true,
            alamat: true
          }
        }
      }
    });

    return c.json({
      status: "success",
      data: pengajuan
    }, 201);
  } catch (error) {
    console.error("Create pengajuan dana error:", error);
    return c.json(
      { status: "error", message: "Gagal membuat pengajuan" },
      500
    );
  }
});

// Get my pengajuan (PENGELOLA)
app.get("/my", requireRole("PENGELOLA"), async (c) => {
  try {
    const user = c.get("user");

    const operator = await prisma.operator.findFirst({
      where: { user_id: user.userId }
    });

    if (!operator) {
      return c.json({
        status: "success",
        data: []
      });
    }

    const pengajuan = await prisma.pengajuanDana.findMany({
      where: { operator_id: operator.id },
      include: {
        properti: {
          select: {
            id: true,
            nama: true,
            alamat: true
          }
        }
      },
      orderBy: { created_at: "desc" }
    });

    return c.json({
      status: "success",
      data: pengajuan
    });
  } catch (error) {
    console.error("Get my pengajuan error:", error);
    return c.json(
      { status: "error", message: "Gagal mengambil data" },
      500
    );
  }
});

// Get all pengajuan (PEMILIK)
app.get("/", requireRole("PEMILIK"), async (c) => {
  try {
    const user = c.get("user");

    const pengajuan = await prisma.pengajuanDana.findMany({
      where: {
        properti: {
          admin_id: user.userId
        }
      },
      include: {
        operator: {
          include: {
            user: {
              select: {
                nama: true,
                email: true,
                no_telepon: true
              }
            }
          }
        },
        properti: {
          select: {
            id: true,
            nama: true,
            alamat: true
          }
        }
      },
      orderBy: { created_at: "desc" }
    });

    return c.json({
      status: "success",
      data: pengajuan
    });
  } catch (error) {
    console.error("Get all pengajuan error:", error);
    return c.json(
      { status: "error", message: "Gagal mengambil data" },
      500
    );
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
                no_telepon: true
              }
            }
          }
        },
        properti: true
      }
    });

    if (!pengajuan) {
      return c.json(
        { status: "error", message: "Pengajuan tidak ditemukan" },
        404
      );
    }

    const isOwner = pengajuan.properti.admin_id === user.userId;
    
    let isPengelola = false;
    if (user.role === "PENGELOLA") {
      const operator = await prisma.operator.findFirst({
        where: { user_id: user.userId, properti_ids: { has: pengajuan.properti_id } }
      });
      isPengelola = !!operator;
    }

    if (!isOwner && !isPengelola) {
      return c.json(
        { status: "error", message: "Akses ditolak" },
        403
      );
    }

    return c.json({
      status: "success",
      data: pengajuan
    });
  } catch (error) {
    console.error("Get pengajuan error:", error);
    return c.json(
      { status: "error", message: "Gagal mengambil data" },
      500
    );
  }
});

// Update status pengajuan (PEMILIK)
app.put("/:id", requireRole("PEMILIK"), async (c) => {
  try {
    const id = c.req.param("id");
    const user = c.get("user");
    const body = await c.req.json();
    const { status } = body;

    if (!["DITERIMA", "DITOLAK"].includes(status)) {
      return c.json(
        { status: "error", message: "Status harus DITERIMA atau DITOLAK" },
        400
      );
    }

    const pengajuan = await prisma.pengajuanDana.findUnique({
      where: { id },
      include: { properti: true }
    });

    if (!pengajuan) {
      return c.json(
        { status: "error", message: "Pengajuan tidak ditemukan" },
        404
      );
    }

    if (pengajuan.properti.admin_id !== user.userId) {
      return c.json(
        { status: "error", message: "Akses ditolak" },
        403
      );
    }

    if (pengajuan.status !== "MENUNGGU") {
      return c.json(
        { status: "error", message: "Pengajuan sudah diproses" },
        400
      );
    }

    const updated = await prisma.pengajuanDana.update({
      where: { id },
      data: { status: status as any }
    });

    return c.json({
      status: "success",
      data: updated
    });
  } catch (error) {
    console.error("Update pengajuan error:", error);
    return c.json(
      { status: "error", message: "Gagal update pengajuan" },
      500
    );
  }
});

export default app;