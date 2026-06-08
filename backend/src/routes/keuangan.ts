import { Hono } from "hono";
import { prisma } from "../config/db";
import { authMiddleware, requireRole, AppEnv } from "../middleware/auth";

const app = new Hono<AppEnv>();
app.use("*", authMiddleware);

// GET /api/keuangan/transaksi?properti_id=&tipe=&search=
app.get("/transaksi", requireRole("PEMILIK"), async (c) => {
  try {
    const user = c.get("user");
    const properti_id = c.req.query("properti_id");
    const tipe = c.req.query("tipe") || "SEMUA";
    const search = c.req.query("search");

    const propertiFilter: any = { admin_id: user.userId };
    if (properti_id) propertiFilter.id = properti_id;

    const propertiList = await prisma.properti.findMany({
      where: propertiFilter,
      select: { id: true },
    });
    const propertiIds = propertiList.map((p) => p.id);

    if (propertiIds.length === 0) {
      return c.json({
        status: "success",
        data: {
          summary: { total_pendapatan: 0, total_pengeluaran: 0, total_bersih: 0 },
          transaksi: [],
        },
      });
    }

    const [pembayaranList, pemesananList, pengajuanList] = await Promise.all([
      prisma.pembayaran.findMany({
        where: {
          status: "DITERIMA",
          pemesanan: { properti_id: { in: propertiIds } },
        },
        include: {
          pemesanan: {
            include: {
              penghuni: { include: { user: { select: { nama: true } } } },
              kamar: { select: { nomor: true } },
              properti: { select: { nama: true } },
            },
          },
        },
        orderBy: { tgl_bayar: "desc" },
      }),
      prisma.pemesanan.findMany({
        where: {
          status: "MENUNGGU",
          properti_id: { in: propertiIds },
          pembayaran: { status: "MENUNGGU" },
        },
        include: {
          penghuni: { include: { user: { select: { nama: true } } } },
          kamar: { select: { nomor: true } },
          properti: { select: { nama: true } },
          pembayaran: true,
        },
        orderBy: { created_at: "desc" },
      }),
      prisma.pengajuanDana.findMany({
        where: {
          status: "DITERIMA",
          properti_id: { in: propertiIds },
        },
        include: {
          operator: { include: { user: { select: { nama: true } } } },
          properti: { select: { nama: true } },
        },
        orderBy: { created_at: "desc" },
      }),
    ]);

    const mapPemasukan = pembayaranList.map((p) => ({
      id: p.id,
      tipe: "PEMASUKAN" as const,
      nama: p.pemesanan.penghuni?.user?.nama || "-",
      tanggal: p.tgl_bayar ? p.tgl_bayar.toISOString() : p.created_at.toISOString(),
      status_badge: "Lunas",
      jumlah: p.pemesanan.total_bayar,
      properti_nama: p.pemesanan.properti?.nama || "-",
      kamar_nomor: p.pemesanan.kamar?.nomor || "-",
      kuitansi_id: p.id,
      detail_info: p.nomor_kuitansi || "-",
    }));

    const mapPiutang = pemesananList.map((p) => ({
      id: p.id,
      tipe: "PIUTANG" as const,
      nama: p.penghuni?.user?.nama || "-",
      tanggal: p.created_at.toISOString(),
      status_badge: "Belum Bayar",
      jumlah: p.total_bayar,
      properti_nama: p.properti?.nama || "-",
      kamar_nomor: p.kamar?.nomor || "-",
      kuitansi_id: null,
      detail_info: `Jatuh Tempo: ${new Date(p.tgl_masuk).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })}`,
    }));

    const mapPengeluaran = pengajuanList.map((p) => ({
      id: p.id,
      tipe: "PENGELUARAN" as const,
      nama: p.operator?.user?.nama || "-",
      tanggal: p.created_at.toISOString(),
      status_badge: "Operasional",
      jumlah: p.jumlah,
      properti_nama: p.properti?.nama || "-",
      kamar_nomor: null,
      kuitansi_id: null,
      detail_info: p.tujuan || "-",
    }));

    let allTransaksi = [...mapPemasukan, ...mapPiutang, ...mapPengeluaran];
    allTransaksi.sort((a, b) => new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime());

    const totalPendapatan = allTransaksi
      .filter((t) => t.tipe === "PEMASUKAN")
      .reduce((sum, t) => sum + t.jumlah, 0);
    const totalPengeluaran = allTransaksi
      .filter((t) => t.tipe === "PENGELUARAN")
      .reduce((sum, t) => sum + t.jumlah, 0);
    const totalBersih = totalPendapatan - totalPengeluaran;

    if (tipe === "PEMASUKAN") {
      allTransaksi = allTransaksi.filter((t) => t.tipe === "PEMASUKAN" || t.tipe === "PIUTANG");
    } else if (tipe === "PENGELUARAN") {
      allTransaksi = allTransaksi.filter((t) => t.tipe === "PENGELUARAN");
    }

    if (search) {
      const q = search.toLowerCase();
      allTransaksi = allTransaksi.filter((t) => t.nama.toLowerCase().includes(q));
    }

    return c.json({
      status: "success",
      data: {
        summary: {
          total_pendapatan: totalPendapatan,
          total_pengeluaran: totalPengeluaran,
          total_bersih: totalBersih,
        },
        transaksi: allTransaksi,
      },
    });
  } catch (error) {
    console.error("Get keuangan transaksi error:", error);
    return c.json(
      { status: "error", message: "Gagal mengambil data keuangan" },
      500
    );
  }
});

// GET /api/keuangan/kuitansi/:id
app.get("/kuitansi/:id", requireRole("PEMILIK"), async (c) => {
  try {
    const id = c.req.param("id");
    const user = c.get("user");

    const pembayaran = await prisma.pembayaran.findUnique({
      where: { id },
      include: {
        pemesanan: {
          include: {
            penghuni: { include: { user: { select: { nama: true } } } },
            kamar: { select: { nomor: true } },
            properti: { select: { nama: true } },
          },
        },
      },
    });

    if (!pembayaran) {
      return c.json(
        { status: "error", message: "Kuitansi tidak ditemukan" },
        404
      );
    }

    const properti = await prisma.properti.findFirst({
      where: {
        id: pembayaran.pemesanan.properti_id,
        admin_id: user.userId,
      },
    });

    if (!properti) {
      return c.json(
        { status: "error", message: "Akses ditolak" },
        403
      );
    }

    return c.json({
      status: "success",
      data: {
        id: pembayaran.id,
        nomor_kuitansi: pembayaran.nomor_kuitansi,
        nama: pembayaran.pemesanan.penghuni?.user?.nama || "-",
        properti_nama: pembayaran.pemesanan.properti?.nama || "-",
        kamar_nomor: pembayaran.pemesanan.kamar?.nomor || "-",
        durasi: pembayaran.pemesanan.durasi_sewa,
        metode_bayar: pembayaran.metode_bayar,
        jumlah: pembayaran.pemesanan.total_bayar,
        tgl_bayar: pembayaran.tgl_bayar?.toISOString() || pembayaran.created_at.toISOString(),
        status: pembayaran.status,
        bukti: pembayaran.bukti,
      },
    });
  } catch (error) {
    console.error("Get kuitansi error:", error);
    return c.json(
      { status: "error", message: "Gagal mengambil kuitansi" },
      500
    );
  }
});

export default app;
