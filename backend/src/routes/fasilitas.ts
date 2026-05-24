import { Hono } from "hono";
import { prisma } from "../config/db";
import { authMiddleware, requireRole, AppEnv } from "../middleware/auth";

const app = new Hono<AppEnv>();

app.use("*", authMiddleware);

app.get("/", async (c) => {
  try {
    const user = c.get("user");

    let fasilitas = [
      "Wifi",
      "Listrik",
      "Kamar Mandi Dalam",
      "Kamar Mandi Luar",
      "Kasur + Bantal",
      "Lemari",
      "Meja Belajar",
      "Kursi",
      "AC",
      "Kipas Angin",
      "Dapur Bersama",
      "Parkir",
      "CCTV",
      "Laundry",
    ];

    if (user.role === "PEMILIK") {
      const properti = await prisma.properti.findMany({
        where: { admin_id: user.userId },
        select: { kamar: { select: { fasilitas: true } } },
      });

      const allFasilitas = new Set<string>();
      properti.forEach((p) => {
        p.kamar.forEach((k) => {
          k.fasilitas.forEach((f) => allFasilitas.add(f));
        });
      });

      fasilitas = Array.from(allFasilitas);
    }

    return c.json({
      status: "success",
      data: fasilitas.map((f, idx) => ({ id: String(idx), nama: f })),
    });
  } catch (error) {
    console.error("Get fasilitas error:", error);
    return c.json(
      { status: "error", message: "Gagal mengambil data fasilitas" },
      500
    );
  }
});

app.post("/", requireRole("PEMILIK"), async (c) => {
  try {
    const body = await c.req.json();
    const { nama } = body;

    if (!nama || !nama.trim()) {
      return c.json(
        { status: "error", message: "Nama fasilitas wajib diisi" },
        400
      );
    }

    return c.json({
      status: "success",
      data: { id: Date.now().toString(), nama: nama.trim() },
    }, 201);
  } catch (error) {
    console.error("Create fasilitas error:", error);
    return c.json(
      { status: "error", message: "Gagal menambah fasilitas" },
      500
    );
  }
});

app.delete("/:id", requireRole("PEMILIK"), async (c) => {
  try {
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
