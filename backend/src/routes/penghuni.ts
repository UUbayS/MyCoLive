import { Hono } from "hono";
import { prisma } from "../config/db";
import { authMiddleware, requireRole, AppEnv } from "../middleware/auth";
import { createNotifikasi } from "../utils/notifikasi";
import { sendWhatsAppBroadcast } from "../services/whatsapp";
import { templateWa } from "../utils/template-wa";

const app = new Hono<AppEnv>();

app.use("*", authMiddleware);

// Get current penghuni data (PENGHUNI)
app.get("/me", requireRole("PENGHUNI"), async (c) => {
  try {
    const user = c.get("user");

    const penghuni = await prisma.penghuni.findUnique({
      where: { user_id: user.userId },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            nama: true,
            email: true,
            no_telepon: true,
          },
        },
        kamar: {
          include: {
            properti: {
              select: {
                id: true,
                nama: true,
                alamat: true,
                provinsi: true,
                kota: true,
                kecamatan: true,
                kode_pos: true,
                detail_alamat: true,
              },
            },
          },
        },
      },
    });

    if (!penghuni) {
      return c.json(
        { status: "error", message: "Data penghuni tidak ditemukan" },
        404
      );
    }

    return c.json({
      status: "success",
      data: penghuni,
    });
  } catch (error) {
    console.error("Get penghuni me error:", error);
    return c.json(
      { status: "error", message: "Gagal mengambil data penghuni" },
      500
    );
  }
});

// Get all penghuni (PEMILIK/PENGELOLA)
app.get("/", async (c) => {
  try {
    const user = c.get("user");
    const { status, properti_id } = c.req.query();

    if (!["PEMILIK", "PENGELOLA"].includes(user.role)) {
      return c.json(
        { status: "error", message: "Akses tidak diizinkan" },
        403
      );
    }

    // Get properti IDs yang boleh diakses
    let propertiIds: string[] = [];
    
    if (user.role === "PEMILIK") {
      const properti = await prisma.properti.findMany({
        where: { admin_id: user.userId },
        select: { id: true }
      });
      propertiIds = properti.map(p => p.id);
    } else if (user.role === "PENGELOLA") {
      const operators = await prisma.operator.findMany({
        where: { user_id: user.userId },
        select: { properti_id: true }
      });
      propertiIds = operators.map(op => op.properti_id);
    }

    if (propertiIds.length === 0) {
      return c.json({
        status: "success",
        data: [],
      });
    }

    // Ambil SEMUA penghuni yang ada di properti ini (dengan atau tanpa kamar)
    const whereClause: any = {
      user: {
        deleted_at: null
      }
    };

    if (status && ["AKTIF", "BERAKHIR"].includes(status)) {
      whereClause.status_sewa = status;
    }

    const penghuni = await prisma.penghuni.findMany({
      where: whereClause,
      include: {
        user: {
          select: {
            id: true,
            username: true,
            nama: true,
            email: true,
            no_telepon: true,
            created_at: true
          }
        },
        kamar: {
          include: {
            properti: {
              select: {
                id: true,
                nama: true,
                alamat: true
              }
            }
          }
        }
      },
      orderBy: { created_at: "desc" }
    });

    // Filter berdasarkan properti_ids
    const result = penghuni
      .filter(p => {
        if (user.role === "PENGELOLA") {
          // Pengelola hanya lihat penghuni yang punya kamar di properti yang dikelola
          return p.kamar && propertiIds.includes(p.kamar.properti_id);
        }
        // PEMILIK: Jika ada kamar, cek apakah properti_id cocok
        if (p.kamar) {
          return propertiIds.includes(p.kamar.properti_id);
        }
        // Jika tidak ada kamar, tetap tampilkan (belum menyewa / baru register)
        return true;
      })
      .filter(p => {
        // Filter by properti_id jika ada
        if (properti_id && p.kamar) {
          return p.kamar.properti_id === properti_id;
        }
        if (properti_id && !p.kamar) {
          return false; // Tidak bisa filter untuk yang belum punya kamar
        }
        return true;
      })
      .map(p => ({
        id: p.id,
        tgl_mulai: p.tgl_mulai,
        tgl_berakhir: p.tgl_berakhir,
        status_sewa: p.status_sewa,
        status_display: !p.kamar 
          ? "Belum Menyewa" 
          : (p.status_sewa === "AKTIF" ? "Menyewa" : "Sewa Berakhir"),
        kamar: p.kamar ? {
          id: p.kamar.id,
          nomor: p.kamar.nomor,
          properti: p.kamar.properti.nama,
          alamat: p.kamar.properti.alamat
        } : null,
        user: p.user
      }));

    return c.json({
      status: "success",
      data: result,
    });
  } catch (error) {
    console.error("Get penghuni error:", error);
    return c.json(
      { status: "error", message: "Gagal mengambil data penghuni" },
      500
    );
  }
});

// Get single penghuni (PEMILIK/PENGELOLA)
app.get("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const user = c.get("user");

    if (!["PEMILIK", "PENGELOLA"].includes(user.role)) {
      return c.json(
        { status: "error", message: "Akses tidak diizinkan" },
        403
      );
    }

    const penghuni = await prisma.penghuni.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            nama: true,
            email: true,
            no_telepon: true,
            created_at: true
          }
        },
        kamar: {
          include: {
            properti: true
          }
        },
        pemesanan: {
          orderBy: { created_at: "desc" },
          take: 5,
          include: {
            kamar: true,
            properti: true,
            pembayaran: true
          }
        }
      }
    });

    if (!penghuni) {
      return c.json(
        { status: "error", message: "Penghuni tidak ditemukan" },
        404
      );
    }

    const propertiId = penghuni.kamar?.properti_id;
    
    let isAllowed = false;
    if (user.role === "PEMILIK") {
      isAllowed = propertiId ? !!(await prisma.properti.findFirst({
        where: { id: propertiId, admin_id: user.userId }
      })) : true;
    } else if (user.role === "PENGELOLA") {
      const operator = await prisma.operator.findFirst({
        where: { user_id: user.userId, properti_id: propertiId || "" }
      });
      isAllowed = !!operator;
    }

    if (!isAllowed && propertiId) {
      return c.json(
        { status: "error", message: "Akses ditolak" },
        403
      );
    }

    return c.json({
      status: "success",
      data: {
        ...penghuni,
        kamar: penghuni.kamar ? {
          id: penghuni.kamar.id,
          nomor: penghuni.kamar.nomor,
          properti: penghuni.kamar.properti.nama,
          alamat: penghuni.kamar.properti.alamat
        } : null
      },
    });
  } catch (error) {
    console.error("Get penghuni detail error:", error);
    return c.json(
      { status: "error", message: "Gagal mengambil data penghuni" },
      500
    );
  }
});

// Checkout penghuni (PEMILIK)
app.put("/:id/checkout", requireRole("PEMILIK"), async (c) => {
  try {
    const id = c.req.param("id");
    const user = c.get("user");
    const body = await c.req.json();
    const { alasan } = body;

    const penghuni = await prisma.penghuni.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            nama: true,
            email: true,
            no_telepon: true,
            created_at: true
          }
        },
        kamar: {
          include: {
            properti: true
          }
        }
      }
    });

    if (!penghuni) {
      return c.json(
        { status: "error", message: "Penghuni tidak ditemukan" },
        404
      );
    }

    if (penghuni.status_sewa !== "AKTIF" && penghuni.status_sewa !== "PENGAJUAN_CHECKOUT") {
      return c.json(
        { status: "error", message: "Penghuni sudah tidak aktif" },
        400
      );
    }

    if (!penghuni.kamar_id) {
      return c.json(
        { status: "error", message: "Penghuni tidak memiliki kamar" },
        400
      );
    }

    // Ownership check
    const propertiId = penghuni.kamar?.properti_id;
    if (propertiId) {
      const isOwner = !!(await prisma.properti.findFirst({
        where: { id: propertiId, admin_id: user.userId }
      }));
      if (!isOwner) {
        return c.json(
          { status: "error", message: "Akses ditolak" },
          403
        );
      }
    }

    // Transaction: checkout penghuni + kosongkan kamar + resolve pengajuan
    const updated = await prisma.$transaction(async (tx) => {
      await tx.kamar.update({
        where: { id: penghuni.kamar_id! },
        data: { status: "KOSONG" }
      });

      await tx.pengajuanCheckout.updateMany({
        where: { penghuni_id: id, status: "MENUNGGU" },
        data: { status: "DITERIMA", admin_id: user.userId, keterangan: alasan || null }
      });

      return tx.penghuni.update({
        where: { id },
        data: {
          status_sewa: "BERAKHIR",
          tgl_berakhir: new Date(),
          kamar_id: null
        },
        include: {
          user: {
            select: {
              id: true,
              username: true,
              nama: true,
              email: true,
              no_telepon: true,
              created_at: true
            }
          },
          kamar: {
            include: {
              properti: true
            }
          }
        }
      });
    });

    // Notifikasi ke PENGHUNI
    const penghuniUser = await prisma.penghuni.findUnique({
      where: { id },
      include: { user: { select: { id: true } } }
    });
    if (penghuniUser?.user) {
      const notifMsg = alasan
        ? `Anda telah checkout dari Kamar ${penghuni.kamar?.nomor || "-"}. Alasan: ${alasan}`
        : `Anda telah checkout dari Kamar ${penghuni.kamar?.nomor || "-"}`;
      await createNotifikasi(
        penghuniUser.user.id,
        "Checkout",
        notifMsg,
        "CHECKOUT",
        id
      );
    }

    return c.json({
      status: "success",
      data: {
        ...updated,
        kamar: updated.kamar ? {
          id: updated.kamar.id,
          nomor: updated.kamar.nomor,
          properti: updated.kamar.properti.nama,
          alamat: updated.kamar.properti.alamat
        } : null
      }
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return c.json(
      { status: "error", message: "Gagal melakukan checkout" },
      500
    );
  }
});

// Penghuni mengajukan checkout (PENGHUNI)
app.post("/checkout", requireRole("PENGHUNI"), async (c) => {
  try {
    const user = c.get("user");
    const body = await c.req.json();
    const { keterangan } = body;

    const penghuni = await prisma.penghuni.findUnique({
      where: { user_id: user.userId },
      include: {
        kamar: {
          include: {
            properti: {
              select: {
                id: true,
                nama: true,
                admin_id: true
              }
            }
          }
        }
      }
    });

    if (!penghuni) {
      return c.json(
        { status: "error", message: "Data penghuni tidak ditemukan" },
        404
      );
    }

    if (!penghuni.kamar) {
      return c.json(
        { status: "error", message: "Anda tidak memiliki kamar" },
        400
      );
    }

    if (penghuni.status_sewa !== "AKTIF") {
      return c.json(
        { status: "error", message: "Hanya penghuni aktif yang bisa mengajukan checkout" },
        400
      );
    }

    // Cek sudah ada pengajuan yang menunggu
    const existingPengajuan = await prisma.pengajuanCheckout.findFirst({
      where: {
        penghuni_id: penghuni.id,
        status: "MENUNGGU"
      }
    });

    if (existingPengajuan) {
      return c.json(
        { status: "error", message: "Anda sudah memiliki pengajuan checkout yang menunggu" },
        400
      );
    }

    // Buat pengajuan checkout
    const pengajuan = await prisma.pengajuanCheckout.create({
      data: {
        penghuni_id: penghuni.id,
        kamar_id: penghuni.kamar.id,
        properti_id: penghuni.kamar.properti.id,
        keterangan: keterangan || null
      }
    });

    // Update status penghuni
    await prisma.penghuni.update({
      where: { id: penghuni.id },
      data: { status_sewa: "PENGAJUAN_CHECKOUT" }
    });

    // Notifikasi ke admin pemilik
    await createNotifikasi(
      penghuni.kamar.properti.admin_id,
      "Pengajuan Checkout Baru",
      `${user.nama || user.email} mengajukan checkout dari Kamar ${penghuni.kamar.nomor}`,
      "PENGAJUAN_CHECKOUT",
      pengajuan.id
    );

    // WA ke pemilik + pengelola properti
    const propertiId = penghuni.kamar.properti.id;
    const adminId = penghuni.kamar.properti.admin_id;
    const pemilik = await prisma.user.findUnique({
      where: { id: adminId },
      select: { no_telepon: true },
    });
    const operators = await prisma.operator.findMany({
      where: { properti_id: propertiId },
      include: { user: { select: { no_telepon: true } } },
    });
    const waPhones: string[] = [];
    if (pemilik?.no_telepon) waPhones.push(pemilik.no_telepon);
    operators.forEach((op) => {
      if (op.user.no_telepon) waPhones.push(op.user.no_telepon!);
    });
    if (waPhones.length > 0) {
      sendWhatsAppBroadcast(
        waPhones,
        templateWa.checkoutBaru(
          user.nama || user.email,
          penghuni.kamar.nomor,
          penghuni.kamar.properti.nama
        )
      ).catch(console.error);
    }

    return c.json({
      status: "success",
      data: pengajuan,
      message: "Pengajuan checkout berhasil dikirim"
    });
  } catch (error) {
    console.error("Pengajuan checkout error:", error);
    return c.json(
      { status: "error", message: "Gagal mengajukan checkout: " + (error instanceof Error ? error.message : "Unknown error") },
      500
    );
  }
});

// Admin lihat daftar pengajuan checkout (PEMILIK/PENGELOLA)
app.get("/checkout/pengajuan", async (c) => {
  try {
    const user = c.get("user");

    if (!["PEMILIK", "PENGELOLA"].includes(user.role)) {
      return c.json(
        { status: "error", message: "Akses tidak diizinkan" },
        403
      );
    }

    let propertiIds: string[] = [];
    
    if (user.role === "PEMILIK") {
      const properti = await prisma.properti.findMany({
        where: { admin_id: user.userId },
        select: { id: true }
      });
      propertiIds = properti.map((p: any) => p.id);
    } else if (user.role === "PENGELOLA") {
      const operators = await prisma.operator.findMany({
        where: { user_id: user.userId },
        select: { properti_id: true }
      });
      propertiIds = operators.map((op: any) => op.properti_id);
    }

    if (propertiIds.length === 0) {
      return c.json({
        status: "success",
        data: [],
      });
    }

    const pengajuan = await prisma.pengajuanCheckout.findMany({
      where: {
        properti_id: { in: propertiIds },
        status: "MENUNGGU"
      },
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
        kamar: {
          select: {
            id: true,
            nomor: true
          }
        },
        properti: {
          select: {
            id: true,
            nama: true
          }
        }
      },
      orderBy: { created_at: "desc" }
    });

    return c.json({
      status: "success",
      data: pengajuan,
    });
  } catch (error) {
    console.error("Get pengajuan checkout error:", error);
    return c.json(
      { status: "error", message: "Gagal mengambil data pengajuan checkout" },
      500
    );
  }
});

// Admin proses pengajuan checkout (PEMILIK/PENGELOLA)
app.put("/checkout/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const user = c.get("user");
    const body = await c.req.json();
    const { status, keterangan } = body;

    if (!["PEMILIK", "PENGELOLA"].includes(user.role)) {
      return c.json(
        { status: "error", message: "Akses tidak diizinkan" },
        403
      );
    }

    if (!status || !["DITERIMA", "DITOLAK"].includes(status)) {
      return c.json(
        { status: "error", message: "Status harus DITERIMA atau DITOLAK" },
        400
      );
    }

    const pengajuan = await prisma.pengajuanCheckout.findUnique({
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
        kamar: true,
        properti: {
          select: {
            id: true,
            admin_id: true,
            nama: true
          }
        }
      }
    });

    if (!pengajuan) {
      return c.json(
        { status: "error", message: "Pengajuan checkout tidak ditemukan" },
        404
      );
    }

    if (pengajuan.status !== "MENUNGGU") {
      return c.json(
        { status: "error", message: "Pengajuan sudah diproses" },
        400
      );
    }

    // Ownership check
    let isAllowed = false;
    if (user.role === "PEMILIK") {
      isAllowed = pengajuan.properti.admin_id === user.userId;
    } else if (user.role === "PENGELOLA") {
      const operator = await prisma.operator.findFirst({
        where: { user_id: user.userId, properti_id: pengajuan.properti_id }
      });
      isAllowed = !!operator;
    }

    if (!isAllowed) {
      return c.json(
        { status: "error", message: "Akses ditolak" },
        403
      );
    }

    if (status === "DITERIMA") {
      // Transaction: checkout penghuni + kosongkan kamar
      await prisma.$transaction(async (tx) => {
        await tx.kamar.update({
          where: { id: pengajuan.kamar_id },
          data: { status: "KOSONG" }
        });

        await tx.penghuni.update({
          where: { id: pengajuan.penghuni_id },
          data: {
            status_sewa: "BERAKHIR",
            tgl_berakhir: new Date(),
            kamar_id: null
          }
        });

        await tx.pengajuanCheckout.update({
          where: { id },
          data: {
            status: "DITERIMA",
            admin_id: user.userId
          }
        });
      });

      // Notifikasi ke penghuni
      await createNotifikasi(
        pengajuan.penghuni.user.id,
        "Pengajuan Checkout Diterima",
        `Admin telah menerima pengajuan checkout Anda dari Kamar ${pengajuan.kamar.nomor}`,
        "CHECKOUT_DITERIMA",
        id
      );
      if (pengajuan.penghuni.user.no_telepon) {
        sendWhatsAppBroadcast(
          [pengajuan.penghuni.user.no_telepon],
          templateWa.checkoutDiterima(
            pengajuan.kamar.nomor,
            pengajuan.properti.nama
          )
        ).catch(console.error);
      }
    } else {
      // DITOLAK
      await prisma.$transaction(async (tx) => {
        await tx.penghuni.update({
          where: { id: pengajuan.penghuni_id },
          data: {
            status_sewa: "AKTIF"
          }
        });

        await tx.pengajuanCheckout.update({
          where: { id },
          data: {
            status: "DITOLAK",
            admin_id: user.userId,
            keterangan: keterangan || null
          }
        });
      });

      // Notifikasi ke penghuni
      await createNotifikasi(
        pengajuan.penghuni.user.id,
        "Pengajuan Checkout Ditolak",
        `Pengajuan checkout Anda ditolak. ${keterangan ? `Alasan: ${keterangan}` : ""}`,
        "CHECKOUT_DITOLAK",
        id
      );
      if (pengajuan.penghuni.user.no_telepon) {
        sendWhatsAppBroadcast(
          [pengajuan.penghuni.user.no_telepon],
          templateWa.checkoutDitolak(
            pengajuan.kamar.nomor,
            pengajuan.properti.nama,
            keterangan || undefined
          )
        ).catch(console.error);
      }
    }

    return c.json({
      status: "success",
      message: `Pengajuan checkout ${status === "DITERIMA" ? "diterima" : "ditolak"}`
    });
  } catch (error) {
    console.error("Proses checkout error:", error);
    return c.json(
      { status: "error", message: "Gagal memproses pengajuan checkout" },
      500
    );
  }
});

export default app;