import { Hono } from "hono";
import { prisma } from "../config/db";
import { authMiddleware, requireRole } from "../middleware/auth";

const app = new Hono();

app.use("*", authMiddleware);

app.get("/", async (c) => {
  try {
    const user = c.get("user");
    
    console.log("User in properti:", user);
    
    let properti = [];
    
    if (user.role === "PEMILIK") {
      properti = await prisma.properti.findMany({
        where: { admin_id: user.userId },
        include: {
          kamar: true,
          _count: {
            select: { kamar: true }
          }
        },
        orderBy: { created_at: "desc" }
      });
    } else if (user.role === "PENGELOLA") {
      const operators = await prisma.operator.findMany({
        where: { user_id: user.userId },
        select: { properti_id: true }
      });
      
      const propertiIds = operators.map(op => op.properti_id);
      
      properti = await prisma.properti.findMany({
        where: { id: { in: propertiIds } },
        include: {
          kamar: true,
          _count: {
            select: { kamar: true }
          }
        },
        orderBy: { created_at: "desc" }
      });
    } else {
      return c.json(
        { status: "error", message: "Akses tidak diizinkan" },
        403
      );
    }

    const result = properti.map(p => ({
      id: p.id,
      nama: p.nama,
      alamat: p.alamat,
      jenis: p.jenis,
      deskripsi: p.deskripsi,
      kebijakan: p.kebijakan,
      gambar: p.gambar,
      created_at: p.created_at,
      total_kamar: p._count.kamar,
      kamar_kosong: p.kamar.filter(k => k.status === "KOSONG").length,
      kamar: p.kamar.map(k => ({
        id: k.id,
        nomor: k.nomor,
        tipe: k.tipe,
        harga: k.harga,
        status: k.status
      }))
    }));

    return c.json({
      status: "success",
      data: result,
    });
  } catch (error) {
    console.error("Get properti error:", error);
    return c.json(
      { status: "error", message: "Gagal mengambil data properti" },
      500
    );
  }
});

app.post("/", requireRole("PEMILIK"), async (c) => {
  try {
    const user = c.get("user");
    const body = await c.req.json();
    const { nama, alamat, jenis, deskripsi, kebijakan, gambar } = body;

    if (!nama || !alamat) {
      return c.json(
        { status: "error", message: "Nama dan alamat wajib diisi" },
        400
      );
    }

    if (!["LAKI_LAKI", "PEREMPUAN", "CAMPUR"].includes(jenis)) {
      return c.json(
        { status: "error", message: "Jenis tidak valid: LAKI_LAKI, PEREMPUAN, atau CAMPUR" },
        400
      );
    }

    const properti = await prisma.properti.create({
      data: {
        nama,
        alamat,
        jenis: jenis as any,
        deskripsi: deskripsi || null,
        kebijakan: kebijakan || null,
        gambar: gambar || [],
        admin_id: user.userId,
      },
      include: {
        admin: {
          select: {
            id: true,
            nama: true,
            email: true,
          }
        }
      }
    });

    return c.json({
      status: "success",
      data: properti,
    }, 201);
  } catch (error) {
    console.error("Create properti error:", error);
    return c.json(
      { status: "error", message: "Gagal membuat properti" },
      500
    );
  }
});

app.get("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const user = c.get("user");

    const properti = await prisma.properti.findUnique({
      where: { id },
      include: {
        admin: {
          select: {
            id: true,
            nama: true,
            email: true,
          }
        },
        kamar: {
          select: {
            id: true,
            nomor: true,
            tipe: true,
            harga: true,
            status: true,
            deskripsi: true,
          }
        },
        _count: {
          select: { kamar: true }
        }
      }
    });

    if (!properti) {
      return c.json(
        { status: "error", message: "Properti tidak ditemukan" },
        404
      );
    }

    return c.json({
      status: "success",
      data: properti,
    });
  } catch (error) {
    console.error("Get properti error:", error);
    return c.json(
      { status: "error", message: "Gagal mengambil data properti" },
      500
    );
  }
});

app.put("/:id", requireRole("PEMILIK"), async (c) => {
  try {
    const id = c.req.param("id");
    const user = c.get("user");
    const body = await c.req.json();
    const { nama, alamat, jenis, deskripsi, kebijakan, gambar } = body;

    const existing = await prisma.properti.findUnique({
      where: { id }
    });

    if (!existing) {
      return c.json(
        { status: "error", message: "Properti tidak ditemukan" },
        404
      );
    }

    if (existing.admin_id !== user.userId) {
      return c.json(
        { status: "error", message: "Tidak punya akses" },
        403
      );
    }

    const updateData: any = {};
    if (nama) updateData.nama = nama;
    if (alamat) updateData.alamat = alamat;
    if (jenis && ["LAKI_LAKI", "PEREMPUAN", "CAMPUR"].includes(jenis)) {
      updateData.jenis = jenis;
    }
    if (deskripsi !== undefined) updateData.deskripsi = deskripsi;
    if (kebijakan !== undefined) updateData.kebijakan = kebijakan;
    if (gambar !== undefined) updateData.gambar = gambar;

    const properti = await prisma.properti.update({
      where: { id },
      data: updateData,
      include: {
        admin: {
          select: {
            id: true,
            nama: true,
            email: true,
          }
        }
      }
    });

    return c.json({
      status: "success",
      data: properti,
    });
  } catch (error) {
    console.error("Update properti error:", error);
    return c.json(
      { status: "error", message: "Gagal update properti" },
      500
    );
  }
});

app.delete("/:id", requireRole("PEMILIK"), async (c) => {
  try {
    const id = c.req.param("id");
    const user = c.get("user");

    const existing = await prisma.properti.findUnique({
      where: { id }
    });

    if (!existing) {
      return c.json(
        { status: "error", message: "Properti tidak ditemukan" },
        404
      );
    }

    if (existing.admin_id !== user.userId) {
      return c.json(
        { status: "error", message: "Tidak punya akses" },
        403
      );
    }

    const kamarCount = await prisma.kamar.count({
      where: { properti_id: id }
    });

    if (kamarCount > 0) {
      return c.json(
        { status: "error", message: "Tidak bisa hapus properti yang masih punya kamar" },
        400
      );
    }

    const penghuniAktif = await prisma.penghuni.count({
      where: {
        kamar: { properti_id: id },
        status_sewa: "AKTIF"
      }
    });

    if (penghuniAktif > 0) {
      return c.json(
        { status: "error", message: "Tidak bisa hapus properti yang masih punya penghuni aktif" },
        400
      );
    }

    const pemesananAktif = await prisma.pemesanan.count({
      where: {
        properti_id: id,
        status: { in: ["MENUNGGU", "DITERIMA"] }
      }
    });

    if (pemesananAktif > 0) {
      return c.json(
        { status: "error", message: "Tidak bisa hapus properti yang masih punya pemesanan aktif" },
        400
      );
    }

    await prisma.properti.delete({
      where: { id }
    });

    return c.json({
      status: "success",
      message: "Properti berhasil dihapus",
    });
  } catch (error) {
    console.error("Delete properti error:", error);
    return c.json(
      { status: "error", message: "Gagal hapus properti" },
      500
    );
  }
});

export default app;