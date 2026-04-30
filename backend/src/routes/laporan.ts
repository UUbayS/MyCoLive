import { Hono } from "hono";
import { prisma } from "../config/db";
import { authMiddleware, requireRole } from "../middleware/auth";

const app = new Hono();

app.use("*", authMiddleware);

// GET /api/laporan/keuangan?bulan=2024-06&properti_id=xxx
app.get("/keuangan", requireRole("PEMILIK"), async (c) => {
  try {
    const user = c.get("user");
    const bulan = c.req.query("bulan");
    const properti_id = c.req.query("properti_id");

    if (!bulan) {
      return c.json(
        { status: "error", message: "Parameter bulan wajib diisi (format: YYYY-MM)" },
        400
      );
    }

    // Validate bulan format (YYYY-MM)
    const bulanRegex = /^\d{4}-(0[1-9]|1[0-2])$/;
    if (!bulanRegex.test(bulan)) {
      return c.json(
        { status: "error", message: "Format bulan tidak valid (gunakan: YYYY-MM)" },
        400
      );
    }

    const [year, month] = bulan.split("-").map(Number);

    // Get start and end of month
    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 0, 23, 59, 59);

    // Build properti filter
    let propertiFilter: any = {
      admin_id: user.userId
    };
    if (properti_id) {
      propertiFilter.id = properti_id;
    }

    // Get all properti owned by user
    const propertiList = await prisma.properti.findMany({
      where: propertiFilter,
      select: {
        id: true,
        nama: true
      }
    });

    if (propertiList.length === 0) {
      return c.json({
        status: "success",
        data: {
          bulan,
          total_pemasukan: 0,
          total_pengeluaran: 0,
          pendapatan: 0,
          detail_per_properti: []
        }
      });
    }

    const propertiIds = propertiList.map(p => p.id);

    // Get pemasukan (pembayaran DITERIMA)
    const pembayaran = await prisma.pembayaran.findMany({
      where: {
        status: "DITERIMA",
        tgl_bayar: {
          gte: startOfMonth,
          lte: endOfMonth
        },
        pemesanan: {
          properti_id: {
            in: propertiIds
          }
        }
      },
      include: {
        pemesanan: {
          select: {
            properti_id: true
          }
        }
      }
    });

    // Get pengeluaran (pengajuan dana DITERIMA)
    const pengajuan = await prisma.pengajuanDana.findMany({
      where: {
        status: "DITERIMA",
        created_at: {
          gte: startOfMonth,
          lte: endOfMonth
        },
        properti_id: {
          in: propertiIds
        }
      }
    });

    // Calculate per properti
    const detailMap = new Map();
    
    // Initialize all properti
    propertiList.forEach(p => {
      detailMap.set(p.id, {
        properti_id: p.id,
        properti_nama: p.nama,
        pemasukan: 0,
        pengeluaran: 0,
        pendapatan: 0
      });
    });

    // Sum pemasukan per properti
    pembayaran.forEach(p => {
      const propId = p.pemesanan.properti_id;
      const current = detailMap.get(propId);
      if (current) {
        current.pemasukan += p.pemesanan.total_bayar;
      }
    });

    // Sum pengeluaran per properti
    pengajuan.forEach(p => {
      const current = detailMap.get(p.properti_id);
      if (current) {
        current.pengeluaran += p.jumlah;
      }
    });

    // Calculate pendapatan
    const detailPerProperti = Array.from(detailMap.values()).map(d => ({
      ...d,
      pendapatan: d.pemasukan - d.pengeluaran
    }));

    // Total summary
    const total_pemasukan = detailPerProperti.reduce((sum, d) => sum + d.pemasukan, 0);
    const total_pengeluaran = detailPerProperti.reduce((sum, d) => sum + d.pengeluaran, 0);
    const pendapatan = total_pemasukan - total_pengeluaran;

    return c.json({
      status: "success",
      data: {
        bulan,
        total_pemasukan,
        total_pengeluaran,
        pendapatan,
        detail_per_properti: detailPerProperti
      }
    });
  } catch (error) {
    console.error("Get laporan keuangan error:", error);
    return c.json(
      { status: "error", message: "Gagal mengambil laporan" },
      500
    );
  }
});

export default app;