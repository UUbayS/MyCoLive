import { Hono } from "hono";
import { prisma } from "../config/db";
import { authMiddleware, requireRole, AppEnv } from "../middleware/auth";
import { createNotifikasi } from "../utils/notifikasi";
import { sendWhatsAppBroadcast } from "../services/whatsapp";
import { templateWa } from "../utils/template-wa";

const app = new Hono<AppEnv>();

app.use("*", authMiddleware);

// Get settings helper
async function getSettings(adminId: string) {
  return prisma.adminSettings.findUnique({
    where: { user_id: adminId },
  });
}

// Create pemesanan (PENGHUNI)
app.post("/", requireRole("PENGHUNI"), async (c) => {
  try {
    const user = c.get("user");
    const body = await c.req.json();
    const { kamar_id, durasi_sewa, tgl_masuk, metode_bayar } = body;

    if (!kamar_id || !durasi_sewa || !tgl_masuk || !metode_bayar) {
      return c.json(
        { status: "error", message: "Semua field wajib diisi" },
        400,
      );
    }

    if (!["TRANSFER", "QRIS"].includes(metode_bayar)) {
      return c.json(
        { status: "error", message: "Metode pembayaran tidak valid" },
        400,
      );
    }

    const kamar = await prisma.kamar.findUnique({
      where: { id: kamar_id },
      include: {
        properti: true,
      },
    });

    if (!kamar) {
      return c.json({ status: "error", message: "Kamar tidak ditemukan" }, 404);
    }

    if (kamar.status !== "KOSONG") {
      return c.json({ status: "error", message: "Kamar tidak tersedia" }, 400);
    }

    const tarif = (kamar.tarif as Record<string, number>) || {};
    const totalBayar = tarif[`${durasi_sewa}_bulan`] || 0;

    if (totalBayar === 0) {
      return c.json(
        { status: "error", message: "Durasi tidak tersedia untuk kamar ini" },
        400,
      );
    }

    const penghuni = await prisma.penghuni.findUnique({
      where: { user_id: user.userId },
    });

    if (!penghuni) {
      return c.json(
        { status: "error", message: "Data penghuni tidak ditemukan" },
        404,
      );
    }

    const settings = await getSettings(kamar.properti.admin_id);
    const metodeInfo =
      metode_bayar === "TRANSFER"
        ? {
            rekening: settings?.nomor_rekening,
            atas_nama: settings?.nama_rekening,
            bank: settings?.bank,
          }
        : { qris_image: settings?.qris_image };

    const pemesanan = await prisma.pemesanan.create({
      data: {
        kamar_id,
        penghuni_id: penghuni.id,
        properti_id: kamar.properti_id,
        durasi_sewa,
        tgl_masuk: new Date(tgl_masuk),
        metode_bayar,
        total_bayar: totalBayar,
        status: "MENUNGGU",
      },
      include: {
        kamar: {
          select: {
            id: true,
            nomor: true,
            tarif: true,
          },
        },
        properti: {
          select: {
            id: true,
            nama: true,
            alamat: true,
          },
        },
      },
    });

    const pembayaran = await prisma.pembayaran.create({
      data: {
        pemesanan_id: pemesanan.id,
        metode_bayar,
        status: "MENUNGGU",
      },
    });

    // Notifikasi ke PEMILIK
    const penghuniUser = await prisma.penghuni.findUnique({
      where: { user_id: user.userId },
      include: { user: { select: { nama: true } } },
    });
    if (penghuniUser?.user?.nama) {
      await createNotifikasi(
        kamar.properti.admin_id,
        "Pemesanan Baru",
        `${penghuniUser.user.nama} memesan Kamar ${kamar.nomor} di ${kamar.properti.nama}`,
        "PEMESANAN",
        pemesanan.id,
      );
      const pemilik = await prisma.user.findUnique({
        where: { id: kamar.properti.admin_id },
        select: { no_telepon: true },
      });
      if (pemilik?.no_telepon) {
        sendWhatsAppBroadcast(
          [pemilik.no_telepon],
          templateWa.pemesananBaru(
            penghuniUser.user.nama,
            kamar.nomor,
            kamar.properti.nama,
          ),
        ).catch(console.error);
      }
    }

    return c.json(
      {
        status: "success",
        data: {
          ...pemesanan,
          pembayaran: {
            metode_bayar: pembayaran.metode_bayar,
            status: pembayaran.status,
            rekening: metodeInfo.rekening,
            atas_nama: metodeInfo.atas_nama,
            bank: metodeInfo.bank,
            qris_image: metodeInfo.qris_image,
          },
        },
      },
      201,
    );
  } catch (error) {
    console.error("Create pemesanan error:", error);
    return c.json({ status: "error", message: "Gagal membuat pesanan" }, 500);
  }
});

// Perpanjang sewa (PENGHUNI) - reuse kamar yang sedang ditempati
app.post("/perpanjang", requireRole("PENGHUNI"), async (c) => {
  try {
    const user = c.get("user");
    const body = await c.req.json();
    const { durasi_sewa, tgl_masuk, metode_bayar } = body;

    if (!durasi_sewa || !tgl_masuk || !metode_bayar) {
      return c.json(
        {
          status: "error",
          message: "durasi_sewa, tgl_masuk, dan metode_bayar wajib diisi",
        },
        400,
      );
    }

    if (!["TRANSFER", "QRIS"].includes(metode_bayar)) {
      return c.json(
        { status: "error", message: "Metode pembayaran tidak valid" },
        400,
      );
    }

    const penghuni = await prisma.penghuni.findUnique({
      where: { user_id: user.userId },
      include: { kamar: { include: { properti: true } } },
    });

    if (!penghuni) {
      return c.json(
        { status: "error", message: "Data penghuni tidak ditemukan" },
        404,
      );
    }

    if (penghuni.status_sewa !== "AKTIF") {
      return c.json({ status: "error", message: "Penghuni tidak aktif" }, 400);
    }

    if (!penghuni.kamar_id || !penghuni.kamar) {
      return c.json(
        { status: "error", message: "Penghuni tidak memiliki kamar" },
        400,
      );
    }

    // Cek apakah ada pemesanan atau pembayaran pending
    const pendingPemesanan = await prisma.pemesanan.findFirst({
      where: {
        penghuni_id: penghuni.id,
        OR: [
          { status: "MENUNGGU" },
          { pembayaran: { status: "DIVERIFIKASI" } },
        ],
      },
    });

    if (pendingPemesanan) {
      return c.json(
        {
          status: "error",
          message: "Masih ada pemesanan yang menunggu diverifikasi",
        },
        400,
      );
    }

    const kamar = penghuni.kamar;
    const tarif = (kamar.tarif as Record<string, number>) || {};
    const totalBayar = tarif[`${durasi_sewa}_bulan`] || 0;

    if (totalBayar === 0) {
      return c.json(
        { status: "error", message: "Durasi tidak tersedia untuk kamar ini" },
        400,
      );
    }

    const settings = await getSettings(kamar.properti.admin_id);
    const metodeInfo =
      metode_bayar === "TRANSFER"
        ? {
            rekening: settings?.nomor_rekening,
            atas_nama: settings?.nama_rekening,
            bank: settings?.bank,
          }
        : { qris_image: settings?.qris_image };

    const pemesanan = await prisma.pemesanan.create({
      data: {
        kamar_id: kamar.id,
        penghuni_id: penghuni.id,
        properti_id: kamar.properti_id,
        durasi_sewa,
        tgl_masuk: new Date(tgl_masuk),
        metode_bayar,
        total_bayar: totalBayar,
        status: "MENUNGGU",
      },
      include: {
        kamar: {
          select: {
            id: true,
            nomor: true,
            tarif: true,
          },
        },
        properti: {
          select: {
            id: true,
            nama: true,
            alamat: true,
          },
        },
      },
    });

    const pembayaran = await prisma.pembayaran.create({
      data: {
        pemesanan_id: pemesanan.id,
        metode_bayar,
        status: "MENUNGGU",
      },
    });

    // Notifikasi ke PEMILIK
    const penghuniUser = await prisma.penghuni.findUnique({
      where: { user_id: user.userId },
      include: { user: { select: { nama: true } } },
    });
    if (penghuniUser?.user?.nama) {
      await createNotifikasi(
        kamar.properti.admin_id,
        "Perpanjang Sewa",
        `${penghuniUser.user.nama} memperpanjang sewa Kamar ${kamar.nomor} di ${kamar.properti.nama}`,
        "PEMESANAN",
        pemesanan.id,
      );
      const pemilik = await prisma.user.findUnique({
        where: { id: kamar.properti.admin_id },
        select: { no_telepon: true },
      });
      if (pemilik?.no_telepon) {
        sendWhatsAppBroadcast(
          [pemilik.no_telepon],
          templateWa.perpanjangSewa(
            penghuniUser.user.nama,
            kamar.nomor,
            kamar.properti.nama,
          ),
        ).catch(console.error);
      }
    }

    return c.json(
      {
        status: "success",
        data: {
          ...pemesanan,
          pembayaran: {
            metode_bayar: pembayaran.metode_bayar,
            status: pembayaran.status,
            rekening: metodeInfo.rekening,
            atas_nama: metodeInfo.atas_nama,
            bank: metodeInfo.bank,
            qris_image: metodeInfo.qris_image,
          },
        },
      },
      201,
    );
  } catch (error) {
    console.error("Perpanjang pemesanan error:", error);
    return c.json(
      { status: "error", message: "Gagal membuat pemesanan perpanjang" },
      500,
    );
  }
});

// Get my pemesanan (PENGHUNI)
app.get("/my", async (c) => {
  try {
    const user = c.get("user");

    if (user.role !== "PENGHUNI") {
      return c.json({ status: "error", message: "Akses tidak diizinkan" }, 403);
    }

    const penghuni = await prisma.penghuni.findUnique({
      where: { user_id: user.userId },
    });

    if (!penghuni) {
      return c.json({
        status: "success",
        data: [],
      });
    }

    const pemesanan = await prisma.pemesanan.findMany({
      where: { penghuni_id: penghuni.id },
      include: {
        kamar: {
          select: {
            id: true,
            nomor: true,
            tarif: true,
          },
        },
        properti: {
          include: {
            admin: {
              include: {
                settings: {
                  select: {
                    nama_rekening: true,
                    nomor_rekening: true,
                    bank: true,
                    qris_image: true,
                  },
                },
              },
            },
          },
        },
        pembayaran: true,
      },
      orderBy: { created_at: "desc" },
    });

    return c.json({
      status: "success",
      data: pemesanan,
    });
  } catch (error) {
    console.error("Get my pemesanan error:", error);
    return c.json({ status: "error", message: "Gagal mengambil data" }, 500);
  }
});

// Get single pemesanan (by ID)
app.get("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const user = c.get("user");

    const pemesanan = await prisma.pemesanan.findUnique({
      where: { id },
      include: {
        kamar: true,
        properti: {
          include: {
            admin: {
              include: {
                settings: {
                  select: {
                    nama_rekening: true,
                    nomor_rekening: true,
                    bank: true,
                    qris_image: true,
                  },
                },
              },
            },
          },
        },
        penghuni: {
          include: {
            user: {
              select: {
                id: true,
                nama: true,
                email: true,
                no_telepon: true,
              },
            },
          },
        },
        pembayaran: true,
      },
    });

    if (!pemesanan) {
      return c.json(
        { status: "error", message: "Pesanan tidak ditemukan" },
        404,
      );
    }

    const isOwner = pemesanan.properti.admin_id === user.userId;
    const isPenghuni = pemesanan.penghuni.user_id === user.userId;

    let isPengelola = false;
    if (user.role === "PENGELOLA") {
      const operator = await prisma.operator.findFirst({
        where: { user_id: user.userId, properti_id: pemesanan.properti_id },
      });
      isPengelola = !!operator;
    }

    if (!isOwner && !isPenghuni && !isPengelola) {
      return c.json({ status: "error", message: "Akses ditolak" }, 403);
    }

    return c.json({
      status: "success",
      data: pemesanan,
    });
  } catch (error) {
    console.error("Get pemesanan error:", error);
    return c.json({ status: "error", message: "Gagal mengambil data" }, 500);
  }
});

// Upload bukti pembayaran (PENGHUNI)
app.post("/:id/bayar", async (c) => {
  try {
    const id = c.req.param("id");
    const user = c.get("user");
    const body = await c.req.json();
    const { bukti } = body;

    if (!bukti) {
      return c.json(
        { status: "error", message: "Bukti pembayaran wajib diisi" },
        400,
      );
    }

    const pemesanan = await prisma.pemesanan.findUnique({
      where: { id },
      include: { pembayaran: true, penghuni: true },
    });

    if (!pemesanan) {
      return c.json(
        { status: "error", message: "Pesanan tidak ditemukan" },
        404,
      );
    }

    if (pemesanan.penghuni.user_id !== user.userId) {
      return c.json({ status: "error", message: "Tidak punya akses" }, 403);
    }

    if (pemesanan.status !== "MENUNGGU") {
      return c.json(
        { status: "error", message: "Pesanan sudah diproses" },
        400,
      );
    }

    const pembayaran = await prisma.pembayaran.update({
      where: { pemesanan_id: id },
      data: {
        bukti,
        status: "DIVERIFIKASI",
        tgl_bayar: new Date(),
      },
    });

    // Notifikasi ke PEMILIK
    const pemesananData = await prisma.pemesanan.findUnique({
      where: { id },
      include: {
        properti: { select: { admin_id: true, nama: true } },
        kamar: { select: { nomor: true } },
        penghuni: { include: { user: { select: { nama: true } } } },
      },
    });
    if (pemesananData) {
      const namaPenghuni = pemesananData.penghuni?.user?.nama || "Penghuni";
      const namaKamar = pemesananData.kamar?.nomor || "-";
      const namaProperti = pemesananData.properti.nama;
      await createNotifikasi(
        pemesananData.properti.admin_id,
        "Bukti Pembayaran",
        `${namaPenghuni} mengupload bukti pembayaran untuk Kamar ${namaKamar} di ${namaProperti}`,
        "PEMBAYARAN",
        id,
      );
      const pemilik = await prisma.user.findUnique({
        where: { id: pemesananData.properti.admin_id },
        select: { no_telepon: true },
      });
      if (pemilik?.no_telepon) {
        sendWhatsAppBroadcast(
          [pemilik.no_telepon],
          templateWa.buktiBayarDikirim(namaPenghuni, namaKamar, namaProperti),
        ).catch(console.error);
      }
    }

    return c.json({
      status: "success",
      data: pembayaran,
    });
  } catch (error) {
    console.error("Upload bukti error:", error);
    return c.json({ status: "error", message: "Gagal upload bukti" }, 500);
  }
});

// Get all pemesanan (PEMILIK)
app.get("/", requireRole("PEMILIK"), async (c) => {
  try {
    const user = c.get("user");

    const pemesanan = await prisma.pemesanan.findMany({
      where: {
        properti: {
          admin_id: user.userId,
        },
      },
      include: {
        kamar: {
          select: {
            id: true,
            nomor: true,
          },
        },
        properti: {
          select: {
            id: true,
            nama: true,
          },
        },
        penghuni: {
          include: {
            user: {
              select: {
                nama: true,
                email: true,
                no_telepon: true,
              },
            },
          },
        },
        pembayaran: true,
      },
      orderBy: { created_at: "desc" },
    });

    return c.json({
      status: "success",
      data: pemesanan,
    });
  } catch (error) {
    console.error("Get all pemesanan error:", error);
    return c.json({ status: "error", message: "Gagal mengambil data" }, 500);
  }
});

// Verifikasi pemesanan (PEMILIK)
app.put("/:id/verifikasi", requireRole("PEMILIK"), async (c) => {
  try {
    const id = c.req.param("id");
    const user = c.get("user");
    const body = await c.req.json();
    const { status } = body;

    if (!["DITERIMA", "DITOLAK"].includes(status)) {
      return c.json(
        { status: "error", message: "Status harus DITERIMA atau DITOLAK" },
        400,
      );
    }

    const pemesanan = await prisma.pemesanan.findUnique({
      where: { id },
      include: {
        properti: true,
        kamar: true,
        pembayaran: true,
      },
    });

    if (!pemesanan) {
      return c.json(
        { status: "error", message: "Pesanan tidak ditemukan" },
        404,
      );
    }

    if (pemesanan.properti.admin_id !== user.userId) {
      return c.json({ status: "error", message: "Tidak punya akses" }, 403);
    }

    const updatedPemesanan = await prisma.pemesanan.update({
      where: { id },
      data: { status: status as any },
    });

    let nomorKuitansi = "";
    if (status === "DITERIMA") {
      // Generate nomor kuitansi
      const now = new Date();
      const yy = String(now.getFullYear()).slice(-2);
      const mm = String(now.getMonth() + 1).padStart(2, "0");
      const prefix = `KT-${yy}${mm}`;
      const count = await prisma.pembayaran.count({
        where: { nomor_kuitansi: { startsWith: prefix } },
      });
      const sequence = String(count + 1).padStart(4, "0");
      nomorKuitansi = `${prefix}-${sequence}`;

      await prisma.pembayaran.update({
        where: { pemesanan_id: id },
        data: { status: "DITERIMA", nomor_kuitansi: nomorKuitansi },
      });

      await prisma.kamar.update({
        where: { id: pemesanan.kamar_id },
        data: { status: "TERISI" },
      });

      await prisma.penghuni.update({
        where: { id: pemesanan.penghuni_id },
        data: {
          kamar_id: pemesanan.kamar_id,
          status_sewa: "AKTIF",
          tgl_mulai: pemesanan.tgl_masuk,
          tgl_berakhir: new Date(
            pemesanan.tgl_masuk.getTime() +
              pemesanan.durasi_sewa * 30 * 24 * 60 * 60 * 1000,
          ),
        },
      });
    } else if (status === "DITOLAK") {
      if (pemesanan.pembayaran) {
        await prisma.pembayaran.update({
          where: { pemesanan_id: id },
          data: { status: "DITOLAK" },
        });
      }
    }

    // Notifikasi ke PENGHUNI
    const penghuniData = await prisma.penghuni.findUnique({
      where: { id: pemesanan.penghuni_id },
      include: { user: { select: { id: true, nama: true, no_telepon: true } } },
    });
    if (penghuniData?.user) {
      const label = status === "DITERIMA" ? "diterima" : "ditolak";
      await createNotifikasi(
        penghuniData.user.id,
        `Pesanan ${status === "DITERIMA" ? "Diterima" : "Ditolak"}`,
        `Pesanan Anda untuk Kamar ${pemesanan.kamar?.nomor || "-"} di ${pemesanan.properti.nama} telah ${label}`,
        "PEMESANAN",
        id,
      );
      if (penghuniData.user.no_telepon) {
        if (status === "DITERIMA") {
          const appUrl = process.env.APP_URL || "http://localhost:3000";
          const link = `${appUrl}/penghuni/transaksi/${id}`;
          sendWhatsAppBroadcast(
            [penghuniData.user.no_telepon],
            templateWa.pemesananDiterima(
              penghuniData.user.nama,
              pemesanan.kamar?.nomor || "-",
              pemesanan.properti.nama,
              nomorKuitansi,
              pemesanan.total_bayar,
              link,
            ),
          ).catch(console.error);
        } else {
          sendWhatsAppBroadcast(
            [penghuniData.user.no_telepon],
            templateWa.pemesananDitolak(
              penghuniData.user.nama,
              pemesanan.kamar?.nomor || "-",
              pemesanan.properti.nama,
            ),
          ).catch(console.error);
        }
      }
    }

    return c.json({
      status: "success",
      data: updatedPemesanan,
    });
  } catch (error) {
    console.error("Verifikasi error:", error);
    return c.json({ status: "error", message: "Gagal verifikasi" }, 500);
  }
});

export default app;
