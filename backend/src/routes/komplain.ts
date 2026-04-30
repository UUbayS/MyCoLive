import { Hono } from "hono";
import { prisma } from "../config/db";
import { authMiddleware, requireRole } from "../middleware/auth";

const app = new Hono();

app.use("*", authMiddleware);

// Create komplain (PENGHUNI)
app.post("/", requireRole("PENGHUNI"), async (c) => {
  try {
    const user = c.get("user");
    const body = await c.req.json();
    const { masalah, jenis, deskripsi, foto, properti_id } = body;

    if (!masalah || !jenis || !deskripsi || !properti_id) {
      return c.json(
        { status: "error", message: "masalah, jenis, deskripsi, dan properti_id wajib diisi" },
        400
      );
    }

    const validJenis = ["FASILITAS", "LINGKUNGAN", "PENGHUNI_LAIN", "LAINNYA"];
    if (!validJenis.includes(jenis)) {
      return c.json(
        { status: "error", message: "Jenis tidak valid" },
        400
      );
    }

    const penghuni = await prisma.penghuni.findUnique({
      where: { user_id: user.userId }
    });

    if (!penghuni) {
      return c.json(
        { status: "error", message: "Data penghuni tidak ditemukan" },
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

    const komplain = await prisma.komplain.create({
      data: {
        masalah,
        jenis: jenis as any,
        deskripsi,
        foto,
        penghuni_id: penghuni.id,
        properti_id,
        status: "BARU"
      },
      include: {
        penghuni: {
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
      }
    });

    return c.json({
      status: "success",
      data: komplain
    }, 201);
  } catch (error) {
    console.error("Create komplain error:", error);
    return c.json(
      { status: "error", message: "Gagal membuat komplain" },
      500
    );
  }
});

// Get my komplain (PENGHUNI)
app.get("/my", async (c) => {
  try {
    const user = c.get("user");
    
    if (user.role !== "PENGHUNI") {
      return c.json(
        { status: "error", message: "Akses tidak diizinkan" },
        403
      );
    }

    const penghuni = await prisma.penghuni.findUnique({
      where: { user_id: user.userId }
    });

    if (!penghuni) {
      return c.json({
        status: "success",
        data: []
      });
    }

    const komplain = await prisma.komplain.findMany({
      where: { penghuni_id: penghuni.id },
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
      data: komplain
    });
  } catch (error) {
    console.error("Get my komplain error:", error);
    return c.json(
      { status: "error", message: "Gagal mengambil data" },
      500
    );
  }
});

// Get all komplain (PEMILIK/PENGELOLA)
app.get("/", async (c) => {
  try {
    const user = c.get("user");
    
    if (user.role === "PENGHUNI") {
      return c.json(
        { status: "error", message: "Akses tidak diizinkan" },
        403
      );
    }

    let whereClause: any = {};
    
    if (user.role === "PEMILIK") {
      whereClause = {
        properti: {
          admin_id: user.userId
        }
      };
    } else if (user.role === "PENGELOLA") {
      const operator = await prisma.operator.findFirst({
        where: { user_id: user.userId }
      });
      
      if (operator && operator.properti_ids.length > 0) {
        whereClause = {
          properti_id: {
            in: operator.properti_ids
          }
        };
      } else {
        return c.json({
          status: "success",
          data: []
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
      data: komplain
    });
  } catch (error) {
    console.error("Get all komplain error:", error);
    return c.json(
      { status: "error", message: "Gagal mengambil data" },
      500
    );
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
                no_telepon: true
              }
            }
          }
        },
        properti: true
      }
    });

    if (!komplain) {
      return c.json(
        { status: "error", message: "Komplain tidak ditemukan" },
        404
      );
    }

    // Access control
    const isPenghuni = komplain.penghuni.user_id === user.userId;
    const isOwner = komplain.properti.admin_id === user.userId;
    
    let isPengelola = false;
    if (user.role === "PENGELOLA") {
      const operator = await prisma.operator.findFirst({
        where: { user_id: user.userId, properti_ids: { has: komplain.properti_id } }
      });
      isPengelola = !!operator;
    }

    if (!isPenghuni && !isOwner && !isPengelola) {
      return c.json(
        { status: "error", message: "Akses ditolak" },
        403
      );
    }

    return c.json({
      status: "success",
      data: komplain
    });
  } catch (error) {
    console.error("Get komplain error:", error);
    return c.json(
      { status: "error", message: "Gagal mengambil data" },
      500
    );
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
      return c.json(
        { status: "error", message: "Akses tidak diizinkan" },
        403
      );
    }

    if (!["DIPROSES", "SELESAI"].includes(status)) {
      return c.json(
        { status: "error", message: "Status harus DIPROSES atau SELESAI" },
        400
      );
    }

    const komplain = await prisma.komplain.findUnique({
      where: { id },
      include: { properti: true }
    });

    if (!komplain) {
      return c.json(
        { status: "error", message: "Komplain tidak ditemukan" },
        404
      );
    }

    const isOwner = komplain.properti.admin_id === user.userId;
    
    let isPengelola = false;
    if (user.role === "PENGELOLA") {
      const operator = await prisma.operator.findFirst({
        where: { user_id: user.userId, properti_ids: { has: komplain.properti_id } }
      });
      isPengelola = !!operator;
    }

    if (!isOwner && !isPengelola) {
      return c.json(
        { status: "error", message: "Akses ditolak" },
        403
      );
    }

    const updated = await prisma.komplain.update({
      where: { id },
      data: { status: status as any }
    });

    return c.json({
      status: "success",
      data: updated
    });
  } catch (error) {
    console.error("Update komplain error:", error);
    return c.json(
      { status: "error", message: "Gagal update komplain" },
      500
    );
  }
});

export default app;