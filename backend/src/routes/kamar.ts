import { Hono } from "hono";
import { prisma } from "../config/db";
import { authMiddleware, requireRole, AppEnv } from "../middleware/auth";

const app = new Hono<AppEnv>();

// List kamar by properti (public)
app.get("/properti/:propertiId/kamar", async (c) => {
  try {
    const propertiId = c.req.param("propertiId");

    const properti = await prisma.properti.findUnique({
      where: { id: propertiId }
    });

    if (!properti) {
      return c.json(
        { status: "error", message: "Properti tidak ditemukan" },
        404
      );
    }

    const kamar = await prisma.kamar.findMany({
      where: { properti_id: propertiId },
      orderBy: { nomor: "asc" }
    });

    return c.json({
      status: "success",
      data: kamar,
    });
  } catch (error) {
    console.error("Get kamar error:", error);
    return c.json(
      { status: "error", message: "Gagal mengambil data kamar" },
      500
    );
  }
});

// Create kamar (requires auth)
app.post("/properti/:propertiId/kamar", authMiddleware, requireRole("PEMILIK"), async (c) => {
  try {
    const propertiId = c.req.param("propertiId")!;
    const user = c.get("user");
    const body = await c.req.json();
    const { nomor, tipe, luas, fasilitas, deskripsi, tarif, foto } = body;

    if (!nomor) {
      return c.json(
        { status: "error", message: "Nomor kamar wajib diisi" },
        400
      );
    }

    const properti = await prisma.properti.findUnique({
      where: { id: propertiId }
    });

    if (!properti) {
      return c.json(
        { status: "error", message: "Properti tidak ditemukan" },
        404
      );
    }

    if (properti.admin_id !== user.userId) {
      return c.json(
        { status: "error", message: "Tidak punya akses" },
        403
      );
    }

    const existingKamar = await prisma.kamar.findUnique({
      where: {
        properti_id_nomor: {
          properti_id: propertiId,
          nomor: nomor
        }
      }
    });

    if (existingKamar) {
      return c.json(
        { status: "error", message: "Nomor kamar sudah ada" },
        400
      );
    }

    const kamar = await prisma.kamar.create({
      data: {
        nomor,
        tipe: tipe || "REGULER",
        luas: luas || null,
        fasilitas: fasilitas || [],
        deskripsi: deskripsi || null,
        tarif: tarif || {},
        gambar: foto || [],
        status: "KOSONG",
        properti_id: propertiId,
      },
      include: {
        properti: {
          select: {
            id: true,
            nama: true
          }
        }
      }
    });

    return c.json({
      status: "success",
      data: kamar,
    }, 201);
  } catch (error) {
    console.error("Create kamar error:", error);
    return c.json(
      { status: "error", message: "Gagal membuat kamar" },
      500
    );
  }
});

// Get single kamar
app.get("/kamar/:id", async (c) => {
  try {
    const id = c.req.param("id");

    const kamar = await prisma.kamar.findUnique({
      where: { id },
      include: {
        properti: {
          select: {
            id: true,
            nama: true,
            alamat: true
          }
        },
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
        }
      }
    });

    if (!kamar) {
      return c.json(
        { status: "error", message: "Kamar tidak ditemukan" },
        404
      );
    }

    return c.json({
      status: "success",
      data: kamar,
    });
  } catch (error) {
    console.error("Get kamar error:", error);
    return c.json(
      { status: "error", message: "Gagal mengambil data kamar" },
      500
    );
  }
});

// Update kamar (requires auth)
app.put("/kamar/:id", authMiddleware, requireRole("PEMILIK"), async (c) => {
  try {
    const id = c.req.param("id");
    const user = c.get("user");
    const body = await c.req.json();
    const { nomor, tipe, luas, fasilitas, deskripsi, tarif, foto, status } = body;

    const existingKamar = await prisma.kamar.findUnique({
      where: { id },
      include: {
        properti: true
      }
    });

    if (!existingKamar) {
      return c.json(
        { status: "error", message: "Kamar tidak ditemukan" },
        404
      );
    }

    if (existingKamar.properti.admin_id !== user.userId) {
      return c.json(
        { status: "error", message: "Tidak punya akses" },
        403
      );
    }

    const updateData: any = {};
    if (nomor) updateData.nomor = nomor;
    if (tipe) updateData.tipe = tipe;
    if (luas !== undefined) updateData.luas = luas;
    if (fasilitas !== undefined) updateData.fasilitas = fasilitas;
    if (deskripsi !== undefined) updateData.deskripsi = deskripsi;
    if (tarif !== undefined) updateData.tarif = tarif;
    if (foto !== undefined) updateData.gambar = foto;
    if (status && ["KOSONG", "TERISI", "MAINTENANCE"].includes(status)) {
      updateData.status = status;
    }

    const kamar = await prisma.kamar.update({
      where: { id },
      data: updateData,
      include: {
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
      data: kamar,
    });
  } catch (error) {
    console.error("Update kamar error:", error);
    return c.json(
      { status: "error", message: "Gagal update kamar" },
      500
    );
  }
});

// Delete kamar (requires auth)
app.delete("/kamar/:id", authMiddleware, requireRole("PEMILIK"), async (c) => {
  try {
    const id = c.req.param("id");
    const user = c.get("user");

    const existingKamar = await prisma.kamar.findUnique({
      where: { id },
      include: {
        properti: true
      }
    });

    if (!existingKamar) {
      return c.json(
        { status: "error", message: "Kamar tidak ditemukan" },
        404
      );
    }

    if (existingKamar.properti.admin_id !== user.userId) {
      return c.json(
        { status: "error", message: "Tidak punya akses" },
        403
      );
    }

    await prisma.kamar.delete({
      where: { id }
    });

    return c.json({
      status: "success",
      message: "Kamar berhasil dihapus",
    });
  } catch (error) {
    console.error("Delete kamar error:", error);
    return c.json(
      { status: "error", message: "Gagal hapus kamar" },
      500
    );
  }
});

export default app;