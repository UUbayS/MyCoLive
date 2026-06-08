import { Hono } from "hono";
import { prisma } from "../config/db";
import { AppEnv } from "../middleware/auth";

const app = new Hono<AppEnv>();

app.get("/", async (c) => {
  try {
    const properti = await prisma.properti.findMany({
      include: {
        admin: {
          select: {
            id: true,
            nama: true,
          }
        },
        fasilitas_umum: true,
        kamar: {
          include: {
            fasilitas_ruangan: true,
          }
        },
        _count: {
          select: { kamar: true }
        }
      },
      orderBy: { created_at: "desc" }
    });

    const result = properti.map((p: any) => ({
      id: p.id,
      nama: p.nama,
      alamat: p.alamat,
      jenis: p.jenis,
      deskripsi: p.deskripsi,
      kebijakan: p.kebijakan,
      gambar: p.gambar,
      total_kamar: p._count.kamar,
      kamar_kosong: p.kamar.filter((k: any) => k.status === "KOSONG").length,
      admin: p.admin,
      fasilitas_umum: p.fasilitas_umum,
      kamar: p.kamar.filter((k: any) => k.status === "KOSONG").map((k: any) => ({
        id: k.id,
        nomor: k.nomor,
        tipe: k.tipe,
        tarif: k.tarif,
        deskripsi: k.deskripsi,
        gambar: k.gambar,
        fasilitas_ruangan: k.fasilitas_ruangan,
      }))
    }));

    return c.json({
      status: "success",
      data: result,
    });
  } catch (error) {
    console.error("Get katalog error:", error);
    return c.json(
      { status: "error", message: "Gagal mengambil data katalog" },
      500
    );
  }
});

app.get("/:id", async (c) => {
  try {
    const id = c.req.param("id");

    const properti = await prisma.properti.findUnique({
      where: { id },
      include: {
        admin: {
          select: {
            id: true,
            nama: true,
            no_telepon: true,
          }
        },
        fasilitas_umum: true,
        kamar: {
          include: {
            fasilitas_ruangan: true,
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

    const result = {
      ...properti,
      total_kamar: properti._count.kamar,
      kamar_kosong: properti.kamar.filter((k: any) => k.status === "KOSONG").length,
    };
    delete (result as any)._count;

    return c.json({
      status: "success",
      data: result,
    });
  } catch (error) {
    console.error("Get katalog detail error:", error);
    return c.json(
      { status: "error", message: "Gagal mengambil data properti" },
      500
    );
  }
});

export default app;