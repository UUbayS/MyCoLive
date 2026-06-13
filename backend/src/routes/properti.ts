import { Hono } from "hono";
import { prisma } from "../config/db";
import { authMiddleware, requireRole, AppEnv } from "../middleware/auth";

const app = new Hono<AppEnv>();

app.get("/", authMiddleware, async (c) => {
  try {
    const user = c.get("user");
    
    console.log("User in properti:", user);
    
    let properti = [];
    
    if (user.role === "PEMILIK") {
      properti = await prisma.properti.findMany({
        where: { admin_id: user.userId },
        include: {
          kamar: {
            where: { deleted_at: null }
          },
          fasilitas_umum: true,
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
          kamar: {
            where: { deleted_at: null }
          },
          fasilitas_umum: true,
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

    const result = properti.map((p: any) => ({
      id: p.id,
      nama: p.nama,
      alamat: p.alamat,
      provinsi: p.provinsi,
      kota: p.kota,
      kecamatan: p.kecamatan,
      kode_pos: p.kode_pos,
      detail_alamat: p.detail_alamat,
      jenis: p.jenis,
      deskripsi: p.deskripsi,
      kebijakan: p.kebijakan,
      gambar: p.gambar,
      created_at: p.created_at,
      total_kamar: p.kamar.length,
      kamar_kosong: p.kamar.filter((k: any) => k.status === "KOSONG").length,
      fasilitas_umum: p.fasilitas_umum,
      kamar: p.kamar.map((k: any) => ({
        id: k.id,
        nomor: k.nomor,
        tipe: k.tipe,
        tarif: k.tarif,
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

app.post("/", authMiddleware, requireRole("PEMILIK"), async (c) => {
  try {
    const user = c.get("user");
    const body = await c.req.json();
    const { nama, provinsi, kota, kecamatan, kode_pos, detail_alamat, jenis, deskripsi, kebijakan, gambar, fasilitas_umum_ids } = body;

    if (!nama || !detail_alamat) {
      return c.json(
        { status: "error", message: "Nama dan detail alamat wajib diisi" },
        400
      );
    }

    if (!["LAKI_LAKI", "PEREMPUAN", "CAMPUR"].includes(jenis)) {
      return c.json(
        { status: "error", message: "Jenis tidak valid: LAKI_LAKI, PEREMPUAN, atau CAMPUR" },
        400
      );
    }

    const fullAlamat = [
      detail_alamat,
      kecamatan ? `Kec. ${kecamatan}` : null,
      kota,
      provinsi,
      kode_pos
    ].filter(Boolean).join(", ");

    const createData: any = {
      nama,
      alamat: fullAlamat,
      provinsi: provinsi || null,
      kota: kota || null,
      kecamatan: kecamatan || null,
      kode_pos: kode_pos || null,
      detail_alamat: detail_alamat || null,
      jenis: jenis as any,
      deskripsi: deskripsi || null,
      kebijakan: kebijakan || null,
      gambar: gambar || [],
      admin_id: user.userId,
    };

    if (fasilitas_umum_ids && Array.isArray(fasilitas_umum_ids) && fasilitas_umum_ids.length > 0) {
      createData.fasilitas_umum = {
        connect: fasilitas_umum_ids.map((id: string) => ({ id })),
      };
    }

    const properti = await prisma.properti.create({
      data: createData,
      include: {
        fasilitas_umum: true,
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

app.get("/:id", authMiddleware, async (c) => {
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
          where: { deleted_at: null },
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
      data: {
        ...properti,
        total_kamar: properti.kamar.length,
        kamar_kosong: properti.kamar.filter((k: any) => k.status === "KOSONG").length,
      },
    });
  } catch (error) {
    console.error("Get properti error:", error);
    return c.json(
      { status: "error", message: "Gagal mengambil data properti" },
      500
    );
  }
});

app.put("/:id", authMiddleware, requireRole("PEMILIK"), async (c) => {
  try {
    const id = c.req.param("id");
    const user = c.get("user");
    const body = await c.req.json();
    const { nama, provinsi, kota, kecamatan, kode_pos, detail_alamat, jenis, deskripsi, kebijakan, gambar, fasilitas_umum_ids } = body;

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
    if (provinsi !== undefined) updateData.provinsi = provinsi;
    if (kota !== undefined) updateData.kota = kota;
    if (kecamatan !== undefined) updateData.kecamatan = kecamatan;
    if (kode_pos !== undefined) updateData.kode_pos = kode_pos;
    if (detail_alamat !== undefined) {
      updateData.detail_alamat = detail_alamat;
      const fullAlamat = [
        detail_alamat,
        kecamatan ? `Kec. ${kecamatan}` : null,
        kota,
        provinsi,
        kode_pos
      ].filter(Boolean).join(", ");
      updateData.alamat = fullAlamat;
    }
    if (jenis && ["LAKI_LAKI", "PEREMPUAN", "CAMPUR"].includes(jenis)) {
      updateData.jenis = jenis;
    }
    if (deskripsi !== undefined) updateData.deskripsi = deskripsi;
    if (kebijakan !== undefined) updateData.kebijakan = kebijakan;
    if (gambar !== undefined) updateData.gambar = gambar;

    if (fasilitas_umum_ids !== undefined && Array.isArray(fasilitas_umum_ids)) {
      updateData.fasilitas_umum = {
        set: fasilitas_umum_ids.map((fid: string) => ({ id: fid })),
      };
    }

    const properti = await prisma.properti.update({
      where: { id },
      data: updateData,
      include: {
        fasilitas_umum: true,
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

app.delete("/:id", authMiddleware, requireRole("PEMILIK"), async (c) => {
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

    await prisma.$transaction([
      prisma.kamar.updateMany({
        where: { properti_id: id },
        data: { deleted_at: new Date(), gambar: [] }
      }),
      prisma.properti.update({
        where: { id },
        data: { deleted_at: new Date(), gambar: [] }
      })
    ]);

    return c.json({
      status: "success",
      message: "Properti dan kamar terkait berhasil dihapus",
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