import { Hono } from "hono";
import { prisma } from "../config/db";
import { authMiddleware, requireRole, AppEnv } from "../middleware/auth";

const app = new Hono<AppEnv>();

// Get all fasilitas (filter by jenis: RUANGAN or UMUM)
app.get("/", async (c) => {
  try {
    const jenis = c.req.query("jenis") as "RUANGAN" | "UMUM" | undefined;

    const where: any = {};
    if (jenis && ["RUANGAN", "UMUM"].includes(jenis)) {
      where.jenis = jenis;
    }

    const fasilitas = await prisma.fasilitas.findMany({
      where,
      orderBy: { nama: "asc" },
    });

    return c.json({
      status: "success",
      data: fasilitas,
    });
  } catch (error) {
    console.error("Get fasilitas error:", error);
    return c.json(
      { status: "error", message: "Gagal mengambil data fasilitas" },
      500
    );
  }
});

// Create fasilitas (PEMILIK only)
app.post("/", authMiddleware, requireRole("PEMILIK"), async (c) => {
  try {
    const body = await c.req.json();
    const { nama, jenis } = body;

    if (!nama || !nama.trim()) {
      return c.json(
        { status: "error", message: "Nama fasilitas wajib diisi" },
        400
      );
    }

    if (!jenis || !["RUANGAN", "UMUM"].includes(jenis)) {
      return c.json(
        { status: "error", message: "Jenis fasilitas harus RUANGAN atau UMUM" },
        400
      );
    }

    const existing = await prisma.fasilitas.findFirst({
      where: {
        nama: { equals: nama.trim(), mode: "insensitive" },
        jenis,
      },
    });

    if (existing) {
      return c.json(
        { status: "error", message: "Fasilitas dengan nama dan jenis tersebut sudah ada" },
        400
      );
    }

    const fasilitas = await prisma.fasilitas.create({
      data: {
        nama: nama.trim(),
        jenis,
      },
    });

    return c.json({
      status: "success",
      data: fasilitas,
    }, 201);
  } catch (error) {
    console.error("Create fasilitas error:", error);
    return c.json(
      { status: "error", message: "Gagal menambah fasilitas" },
      500
    );
  }
});

app.put("/:id", authMiddleware, requireRole("PEMILIK"), async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const { nama } = body;

    if (!nama || !nama.trim()) {
      return c.json(
        { status: "error", message: "Nama fasilitas wajib diisi" },
        400
      );
    }

    const fasilitas = await prisma.fasilitas.findUnique({ where: { id } });

    if (!fasilitas) {
      return c.json(
        { status: "error", message: "Fasilitas tidak ditemukan" },
        404
      );
    }

    const existing = await prisma.fasilitas.findFirst({
      where: {
        nama: { equals: nama.trim(), mode: "insensitive" },
        jenis: fasilitas.jenis,
        id: { not: id },
      },
    });

    if (existing) {
      return c.json(
        { status: "error", message: "Fasilitas dengan nama dan jenis tersebut sudah ada" },
        400
      );
    }

    const updated = await prisma.fasilitas.update({
      where: { id },
      data: { nama: nama.trim() },
    });

    return c.json({
      status: "success",
      data: updated,
    });
  } catch (error) {
    console.error("Update fasilitas error:", error);
    return c.json(
      { status: "error", message: "Gagal mengupdate fasilitas" },
      500
    );
  }
});

// Delete fasilitas (PEMILIK only) - with dependency check
app.delete("/:id", authMiddleware, requireRole("PEMILIK"), async (c) => {
  try {
    const id = c.req.param("id");

    const fasilitas = await prisma.fasilitas.findUnique({
      where: { id },
      include: {
        kamar: { select: { nomor: true, properti: { select: { nama: true } } } },
        properti: { select: { nama: true } },
      },
    });

    if (!fasilitas) {
      return c.json(
        { status: "error", message: "Fasilitas tidak ditemukan" },
        404
      );
    }

    // Check if used in any kamar or properti
    if (fasilitas.kamar.length > 0 || fasilitas.properti.length > 0) {
      const usedInKamar = fasilitas.kamar.map((k) => `Kamar ${k.nomor} (${k.properti.nama})`).join(", ");
      const usedInProperti = fasilitas.properti.map((p) => p.nama).join(", ");
      let message = "Fasilitas sedang digunakan oleh: ";
      if (usedInKamar) message += usedInKamar;
      if (usedInProperti) message += (usedInKamar ? "; " : "") + usedInProperti;
      return c.json(
        { status: "error", message },
        400
      );
    }

    await prisma.fasilitas.delete({
      where: { id },
    });

    return c.json({
      status: "success",
      message: "Fasilitas berhasil dihapus",
    });
  } catch (error) {
    console.error("Delete fasilitas error:", error);
    return c.json(
      { status: "error", message: "Gagal hapus fasilitas" },
      500
    );
  }
});

export default app;
