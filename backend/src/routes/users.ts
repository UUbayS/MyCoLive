import { Hono } from "hono";
import { prisma } from "../config/db";
import { hashPassword } from "../utils/password";
import { authMiddleware, requireRole, AppEnv } from "../middleware/auth";
import { createNotifikasi } from "../utils/notifikasi";
import { sendWhatsAppBroadcast } from "../services/whatsapp";
import { templateWa } from "../utils/template-wa";

const app = new Hono<AppEnv>();

function convertPhone(phone: string): string | null {
  if (!phone) return null;
  phone = phone.replace(/\s/g, "");
  if (phone.startsWith("0")) {
    return "62" + phone.slice(1);
  }
  if (phone.startsWith("+")) {
    return phone.slice(1);
  }
  return phone;
}

app.use("*", authMiddleware);
app.use("*", requireRole("PEMILIK"));

app.get("/", async (c) => {
  try {
    const user = c.get("user");
    
    let users;
    
    if (user.role === "PEMILIK") {
      users = await prisma.user.findMany({
        select: {
          id: true,
          username: true,
          email: true,
          nama: true,
          role: true,
          no_telepon: true,
          created_at: true,
          operator: {
            include: {
              properti: {
                select: {
                  id: true,
                  nama: true
                }
              }
            }
          }
        },
        orderBy: {
          created_at: "desc",
        },
      });

      const result = users.map((u: any) => ({
        ...u,
        properti: u.operator?.map((op: any) => op.properti) || []
      }));
      
      return c.json({
        status: "success",
        data: result,
      });
    }

    return c.json({
      status: "error",
      message: "Akses ditolak"
    }, 403);
  } catch (error) {
    console.error("Get users error:", error);
    return c.json(
      { status: "error", message: "Gagal mengambil data user" },
      500
    );
  }
});

app.post("/", async (c) => {
  try {
    const body = await c.req.json();
    const { username, nama, email, no_telepon, password, role, properti_ids } = body;

    if (!username || !nama || !email || !password || !role) {
      return c.json(
        { status: "error", message: "Username, nama, email, password, dan role wajib diisi" },
        400
      );
    }

    if (password.length < 8) {
      return c.json(
        { status: "error", message: "Password minimal 8 karakter" },
        400
      );
    }

    if (!["PEMILIK", "PENGELOLA", "PENGHUNI"].includes(role)) {
      return c.json(
        { status: "error", message: "Role tidak valid" },
        400
      );
    }

    // Jika PENGELOLA, wajib punya properti_ids
    if (role === "PENGELOLA" && (!properti_ids || !Array.isArray(properti_ids) || properti_ids.length === 0)) {
      return c.json(
        { status: "error", message: "Properti_ids wajib diisi untuk operator" },
        400
      );
    }

    const emailLower = email.toLowerCase().trim();
    const existingEmail = await prisma.user.findUnique({
      where: { email: emailLower },
    });

    if (existingEmail) {
      return c.json(
        { status: "error", message: "Email sudah terdaftar" },
        400
      );
    }

    const existingUsername = await prisma.user.findUnique({
      where: { username: username.trim() },
    });

    if (existingUsername) {
      return c.json(
        { status: "error", message: "Username sudah digunakan" },
        400
      );
    }

    const phone = convertPhone(no_telepon);
    const hashedPassword = await hashPassword(password);

    // Create user dengan transaction untuk handle PENGELOLA
    if (role === "PENGELOLA") {
      // Verify properti_ids milik PEMILIK yang sedang login
      const user = c.get("user");
      
      const validProperti = await prisma.properti.findMany({
        where: {
          id: { in: properti_ids },
          admin_id: user.userId
        }
      });

      if (validProperti.length !== properti_ids.length) {
        return c.json(
          { status: "error", message: "Beberapa properti tidak ditemukan atau bukan milik Anda" },
          400
        );
      }

      const newUser = await prisma.user.create({
        data: {
          username: username.trim(),
          email: emailLower,
          password: hashedPassword,
          nama,
          role: role as any,
          no_telepon: phone || null,
        }
      });

      // Create operator records
      for (const properti_id of properti_ids) {
        await prisma.operator.create({
          data: {
            user_id: newUser.id,
            properti_id: properti_id
          }
        });
      }

      // Notifikasi ke PENGELOLA baru
      await createNotifikasi(
        newUser.id,
        "Akun Operator Baru",
        `Selamat datang! Anda telah ditambahkan sebagai operator. Silakan login dengan username dan password yang diberikan.`,
        "OPERATOR",
        newUser.id
      );

      if (newUser.no_telepon) {
        const propertiNames = validProperti.map((p) => p.nama).join(", ");
        sendWhatsAppBroadcast(
          [newUser.no_telepon],
          templateWa.operatorBaru(newUser.nama, propertiNames)
        ).catch(console.error);
      }

      return c.json({
        status: "success",
        data: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
          nama: newUser.nama,
          role: newUser.role,
          no_telepon: newUser.no_telepon,
          properti_ids: properti_ids
        },
      }, 201);
    }

    // Create user biasa (PEMILIK atau PENGHUNI)
    const user = await prisma.user.create({
      data: {
        username: username.trim(),
        email: emailLower,
        password: hashedPassword,
        nama,
        role: role as any,
        no_telepon: phone || null,
      },
      select: {
        id: true,
        username: true,
        email: true,
        nama: true,
        role: true,
        no_telepon: true,
        created_at: true,
      },
    });

    return c.json({
      status: "success",
      data: user,
    }, 201);
  } catch (error) {
    console.error("Create user error:", error);
    return c.json(
      { status: "error", message: "Gagal membuat user" },
      500
    );
  }
});

app.get("/:id", async (c) => {
  try {
    const id = c.req.param("id");

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
        nama: true,
        role: true,
        no_telepon: true,
        created_at: true,
      },
    });

    if (!user) {
      return c.json(
        { status: "error", message: "User tidak ditemukan" },
        404
      );
    }

    return c.json({
      status: "success",
      data: user,
    });
  } catch (error) {
    console.error("Get user error:", error);
    return c.json(
      { status: "error", message: "Gagal mengambil data user" },
      500
    );
  }
});

app.put("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const { username, nama, no_telepon } = body;

    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return c.json(
        { status: "error", message: "User tidak ditemukan" },
        404
      );
    }

    const updateData: any = {};
    if (username) updateData.username = username.trim();
    if (nama) updateData.nama = nama;
    if (no_telepon) updateData.no_telepon = convertPhone(no_telepon);

    const user = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        username: true,
        email: true,
        nama: true,
        role: true,
        no_telepon: true,
        created_at: true,
      },
    });

    return c.json({
      status: "success",
      data: user,
    });
  } catch (error) {
    console.error("Update user error:", error);
    return c.json(
      { status: "error", message: "Gagal update user" },
      500
    );
  }
});

app.delete("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const user = c.get("user");

    if (id === user.userId) {
      return c.json(
        { status: "error", message: "Tidak bisa menghapus diri sendiri" },
        400
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return c.json(
        { status: "error", message: "User tidak ditemukan" },
        404
      );
    }

    await prisma.$transaction([
      prisma.operator.updateMany({
        where: { user_id: id },
        data: { deleted_at: new Date() }
      }),
      prisma.user.update({
        where: { id },
        data: { deleted_at: new Date() }
      })
    ]);

    return c.json({
      status: "success",
      message: "User berhasil dihapus",
    });
  } catch (error) {
    console.error("Delete user error:", error);
    return c.json(
      { status: "error", message: "Gagal hapus user" },
      500
    );
  }
});

export default app;