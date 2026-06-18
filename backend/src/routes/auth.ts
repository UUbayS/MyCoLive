import { Hono } from "hono";
import { prisma } from "../config/db";
import { hashPassword, verifyPassword } from "../utils/password";
import {
  generateAccessToken,
  generateRefreshToken,
  generateResetToken,
  verifyResetToken,
  verifyToken,
} from "../utils/jwt";
import { authMiddleware, AppEnv } from "../middleware/auth";
import { baileysProvider } from "../services/whatsapp/providers/baileys";
import { templateWa } from "../utils/template-wa";
import crypto from "crypto";

const OTP_TTL_MINUTES = 10;
const OTP_TTL_MS = OTP_TTL_MINUTES * 60 * 1000;
const RESET_TOKEN_TTL_SECONDS = OTP_TTL_MINUTES * 60;
const MAX_VERIFY_ATTEMPTS = 5;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 3;

const rateLimitMap = new Map<string, number[]>();

function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const window = rateLimitMap.get(identifier) || [];
  const recent = window.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= RATE_LIMIT_MAX) {
    rateLimitMap.set(identifier, recent);
    return false;
  }
  recent.push(now);
  rateLimitMap.set(identifier, recent);
  return true;
}

function hashOtp(otp: string): string {
  return crypto.createHash("sha256").update(otp).digest("hex");
}

function timingSafeEqualOtp(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

function generateOtp(): string {
  const buf = crypto.randomBytes(4);
  const n = buf.readUInt32BE(0) % 1_000_000;
  return n.toString().padStart(6, "0");
}

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

function isEmail(value: string): boolean {
  return value.includes("@");
}

app.post("/login", async (c) => {
  try {
    const body = await c.req.json();
    const { login, password } = body;

    if (!login || !password) {
      return c.json(
        { status: "error", message: "Login dan password wajib diisi" },
        400
      );
    }

    let user = null;
    const loginValue = login.toLowerCase().trim();

    if (isEmail(loginValue)) {
      user = await prisma.user.findUnique({
        where: { email: loginValue },
      });
    } else {
      const phone = convertPhone(login);
      if (phone) {
        user = await prisma.user.findUnique({
          where: { no_telepon: phone },
        });
      }
    }

    if (!user) {
      return c.json(
        { status: "error", message: "Email atau nomor telepon salah" },
        401
      );
    }

    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      return c.json(
        { status: "error", message: "Email atau nomor telepon salah" },
        401
      );
    }

    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    return c.json({
      status: "success",
      data: {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          nama: user.nama,
          role: user.role,
          no_telepon: user.no_telepon,
        },
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return c.json(
      { status: "error", message: "Gagal login" },
      500
    );
  }
});

app.post("/register", async (c) => {
  try {
    const body = await c.req.json();
    const { username, nama_lengkap, no_telepon, email, password } = body;

    if (!username || !nama_lengkap || !email || !password) {
      return c.json(
        { status: "error", message: "Semua field wajib diisi" },
        400
      );
    }

    if (password.length < 8) {
      return c.json(
        { status: "error", message: "Password minimal 8 karakter" },
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
    if (phone) {
      const existingPhone = await prisma.user.findUnique({
        where: { no_telepon: phone },
      });

      if (existingPhone) {
        return c.json(
          { status: "error", message: "Nomor telepon sudah terdaftar" },
          400
        );
      }
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        username: username.trim(),
        email: emailLower,
        password: hashedPassword,
        nama: nama_lengkap,
        role: "PENGHUNI",
        no_telepon: phone || null,
      },
    });

    await prisma.penghuni.create({
      data: {
        user_id: user.id,
        tgl_mulai: new Date(),
        status_sewa: "AKTIF",
      },
    });

    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    return c.json({
      status: "success",
      data: {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          nama: user.nama,
          role: user.role,
          no_telepon: user.no_telepon,
        },
        accessToken,
        refreshToken,
      },
    }, 201);
  } catch (error) {
    console.error("Register error:", error);
    return c.json(
      { status: "error", message: "Gagal register" },
      500
    );
  }
});

app.post("/refresh", async (c) => {
  try {
    const body = await c.req.json();
    const { refreshToken } = body;

    if (!refreshToken) {
      return c.json(
        { status: "error", message: "Refresh token wajib diisi" },
        400
      );
    }

    const payload = verifyToken(refreshToken);
    if (!payload) {
      return c.json(
        { status: "error", message: "Invalid refresh token" },
        401
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!user) {
      return c.json(
        { status: "error", message: "User not found" },
        404
      );
    }

    const newPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = generateAccessToken(newPayload);
    const newRefreshToken = generateRefreshToken(newPayload);

    return c.json({
      status: "success",
      data: {
        accessToken,
        refreshToken: newRefreshToken,
      },
    });
  } catch (error) {
    console.error("Refresh error:", error);
    return c.json(
      { status: "error", message: "Gagal refresh token" },
      500
    );
  }
});

app.post("/register-admin", async (c) => {
  try {
    const body = await c.req.json();
    const { username, nama, no_telepon, email, password, role } = body;

    if (!username || !nama || !email || !password || !role) {
      return c.json(
        { status: "error", message: "Semua field wajib diisi" },
        400
      );
    }

    if (password.length < 8) {
      return c.json(
        { status: "error", message: "Password minimal 8 karakter" },
        400
      );
    }

    if (!["PEMILIK", "PENGELOLA"].includes(role)) {
      return c.json(
        { status: "error", message: "Role tidak valid. Hanya PEMILIK atau PENGELOLA" },
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
    if (phone) {
      const existingPhone = await prisma.user.findUnique({
        where: { no_telepon: phone },
      });

      if (existingPhone) {
        return c.json(
          { status: "error", message: "Nomor telepon sudah terdaftar" },
          400
        );
      }
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        username: username.trim(),
        email: emailLower,
        password: hashedPassword,
        nama,
        role: role as any,
        no_telepon: phone || null,
      },
    });

    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    return c.json({
      status: "success",
      data: {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          nama: user.nama,
          role: user.role,
          no_telepon: user.no_telepon,
        },
        accessToken,
        refreshToken,
      },
    }, 201);
  } catch (error) {
    console.error("Register admin error:", error);
    return c.json(
      { status: "error", message: "Gagal register" },
      500
    );
  }
});

app.get("/me", authMiddleware, async (c) => {
  try {
    const user = c.get("user");
    
    const fullUser = await prisma.user.findUnique({
      where: { id: user.userId },
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

    if (!fullUser) {
      return c.json(
        { status: "error", message: "User tidak ditemukan" },
        404
      );
    }

    return c.json({
      status: "success",
      data: fullUser,
    });
  } catch (error) {
    console.error("Me error:", error);
    return c.json(
      { status: "error", message: "Gagal mengambil data user" },
      500
    );
  }
});

app.put("/change-password", authMiddleware, async (c) => {
  try {
    const user = c.get("user");
    const body = await c.req.json();
    const { currentPassword, newPassword } = body;

    if (!currentPassword || !newPassword) {
      return c.json(
        { status: "error", message: "Password lama dan password baru wajib diisi" },
        400
      );
    }

    if (newPassword.length < 8) {
      return c.json(
        { status: "error", message: "Password baru minimal 8 karakter" },
        400
      );
    }

    const fullUser = await prisma.user.findUnique({
      where: { id: user.userId },
    });

    if (!fullUser) {
      return c.json(
        { status: "error", message: "User tidak ditemukan" },
        404
      );
    }

    const isValid = await verifyPassword(currentPassword, fullUser.password);
    if (!isValid) {
      return c.json(
        { status: "error", message: "Password lama salah" },
        401
      );
    }

    const hashedPassword = await hashPassword(newPassword);

    await prisma.user.update({
      where: { id: user.userId },
      data: { password: hashedPassword },
    });

    return c.json({
      status: "success",
      message: "Password berhasil diubah",
    });
  } catch (error) {
    console.error("Change password error:", error);
    return c.json(
      { status: "error", message: "Gagal mengubah password" },
      500
    );
  }
});

app.put("/me", authMiddleware, async (c) => {
  try {
    const user = c.get("user");
    const body = await c.req.json();
    const { nama, email, no_telepon } = body;

    const updateData: Record<string, any> = {};

    if (nama !== undefined && nama.trim()) {
      updateData.nama = nama.trim();
    }

    if (email !== undefined && email.trim()) {
      const emailLower = email.toLowerCase().trim();
      const existing = await prisma.user.findFirst({
        where: { email: emailLower, id: { not: user.userId } },
      });
      if (existing) {
        return c.json(
          { status: "error", message: "Email sudah digunakan oleh user lain" },
          400
        );
      }
      updateData.email = emailLower;
    }

    if (no_telepon !== undefined) {
      const phone = convertPhone(no_telepon);
      if (phone) {
        const existing = await prisma.user.findFirst({
          where: { no_telepon: phone, id: { not: user.userId } },
        });
        if (existing) {
          return c.json(
            { status: "error", message: "Nomor telepon sudah digunakan oleh user lain" },
            400
          );
        }
      }
      updateData.no_telepon = phone || null;
    }

    if (Object.keys(updateData).length === 0) {
      return c.json(
        { status: "error", message: "Tidak ada data yang diupdate" },
        400
      );
    }

    const updated = await prisma.user.update({
      where: { id: user.userId },
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
      data: updated,
    });
  } catch (error) {
    console.error("Update me error:", error);
    return c.json(
      { status: "error", message: "Gagal mengupdate profil" },
      500
    );
  }
});

app.delete("/me", authMiddleware, async (c) => {
  try {
    const user = c.get("user");

    const existingUser = await prisma.user.findUnique({
      where: { id: user.userId },
      include: { penghuni: true },
    });

    if (!existingUser) {
      return c.json(
        { status: "error", message: "User tidak ditemukan" },
        404
      );
    }

    if (existingUser.role === "PEMILIK") {
      const activeProperti = await prisma.properti.findFirst({
        where: { admin_id: user.userId, deleted_at: null },
      });
      if (activeProperti) {
        return c.json(
          {
            status: "error",
            message: "Harap hapus semua properti Anda terlebih dahulu sebelum menghapus akun",
          },
          400
        );
      }
    }

    const txOperations: any[] = [];

    if (existingUser.role === "PENGHUNI" && existingUser.penghuni) {
      if (existingUser.penghuni.kamar_id) {
        txOperations.push(
          prisma.kamar.update({
            where: { id: existingUser.penghuni.kamar_id },
            data: { status: "KOSONG" },
          })
        );
      }
      txOperations.push(
        prisma.penghuni.update({
          where: { user_id: user.userId },
          data: {
            kamar_id: null,
            status_sewa: "BERAKHIR",
            tgl_berakhir: new Date(),
          },
        })
      );
    }

    if (existingUser.role === "PENGELOLA") {
      txOperations.push(
        prisma.operator.updateMany({
          where: { user_id: user.userId },
          data: { deleted_at: new Date() },
        })
      );
      txOperations.push(
        prisma.pengelolaBankAccount.deleteMany({
          where: { user_id: user.userId },
        })
      );
    }

    txOperations.push(
      prisma.user.update({
        where: { id: user.userId },
        data: { deleted_at: new Date() },
      })
    );

    await prisma.$transaction(txOperations);

    return c.json({
      status: "success",
      message: "Akun berhasil dihapus",
    });
  } catch (error) {
    console.error("Delete me error:", error);
    return c.json(
      { status: "error", message: "Gagal menghapus akun" },
      500
    );
  }
});

app.post("/forgot-password", async (c) => {
  try {
    const body = await c.req.json();
    const { login } = body;

    if (!login || typeof login !== "string" || !login.trim()) {
      return c.json(
        { status: "error", message: "Email atau nomor telepon wajib diisi" },
        400
      );
    }

    const loginValue = login.toLowerCase().trim();
    const isEmail = loginValue.includes("@");
    const phone = isEmail ? null : convertPhone(login);
    const identifier = isEmail ? loginValue : phone;

    if (!identifier) {
      return c.json(
        { status: "error", message: "Email atau nomor telepon tidak valid" },
        400
      );
    }

    if (!checkRateLimit(identifier)) {
      return c.json(
        {
          status: "error",
          message: `Terlalu banyak percobaan. Coba lagi dalam ${Math.ceil(RATE_LIMIT_WINDOW_MS / 60000)} menit.`,
        },
        429
      );
    }

    const user = isEmail
      ? await prisma.user.findUnique({ where: { email: loginValue } })
      : await prisma.user.findUnique({ where: { no_telepon: phone! } });

    if (!user || user.deleted_at) {
      return c.json({
        status: "success",
        message: "Jika akun terdaftar, kode OTP telah dikirim ke WhatsApp Anda.",
      });
    }

    if (!user.no_telepon) {
      return c.json(
        {
          status: "error",
          message: "Akun Anda belum memiliki nomor telepon. Hubungi administrator.",
        },
        400
      );
    }

    if (!baileysProvider.isConnected()) {
      return c.json(
        {
          status: "error",
          message: "Layanan WhatsApp sedang tidak tersedia. Coba lagi nanti.",
        },
        503
      );
    }

    await prisma.passwordReset.deleteMany({
      where: { user_id: user.id, used_at: null },
    });

    const otp = generateOtp();
    const otpHash = hashOtp(otp);
    const expiresAt = new Date(Date.now() + OTP_TTL_MS);

    await prisma.passwordReset.create({
      data: {
        user_id: user.id,
        identifier,
        otp_hash: otpHash,
        expires_at: expiresAt,
      },
    });

    const pesan = templateWa.forgotPasswordOtp(user.nama, otp, OTP_TTL_MINUTES);
    const result = await baileysProvider.sendMessage(user.no_telepon, pesan);

    if (!result.success) {
      await prisma.passwordReset.deleteMany({
        where: { user_id: user.id, used_at: null },
      });
      console.error("Failed to send OTP WA:", result.error);
      return c.json(
        {
          status: "error",
          message: "Gagal mengirim OTP via WhatsApp. Coba lagi nanti.",
        },
        502
      );
    }

    return c.json({
      status: "success",
      message: "Jika akun terdaftar, kode OTP telah dikirim ke WhatsApp Anda.",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return c.json(
      { status: "error", message: "Gagal memproses permintaan" },
      500
    );
  }
});

app.post("/verify-otp", async (c) => {
  try {
    const body = await c.req.json();
    const { login, otp } = body;

    if (!login || !otp) {
      return c.json(
        { status: "error", message: "Login dan OTP wajib diisi" },
        400
      );
    }

    if (typeof otp !== "string" || !/^\d{6}$/.test(otp)) {
      return c.json(
        { status: "error", message: "OTP harus 6 digit angka" },
        400
      );
    }

    const loginValue = login.toLowerCase().trim();
    const isEmail = loginValue.includes("@");
    const phone = isEmail ? null : convertPhone(login);
    const identifier = isEmail ? loginValue : phone;

    if (!identifier) {
      return c.json(
        { status: "error", message: "Email atau nomor telepon tidak valid" },
        400
      );
    }

    const user = isEmail
      ? await prisma.user.findUnique({ where: { email: loginValue } })
      : await prisma.user.findUnique({ where: { no_telepon: phone! } });

    if (!user || user.deleted_at) {
      return c.json(
        { status: "error", message: "Kode OTP tidak valid" },
        400
      );
    }

    const reset = await prisma.passwordReset.findFirst({
      where: {
        user_id: user.id,
        identifier,
        used_at: null,
      },
      orderBy: { created_at: "desc" },
    });

    if (!reset) {
      return c.json(
        { status: "error", message: "Kode OTP tidak valid" },
        400
      );
    }

    if (reset.expires_at < new Date()) {
      await prisma.passwordReset.delete({ where: { id: reset.id } });
      return c.json(
        { status: "error", message: "Kode OTP sudah kedaluwarsa. Minta kode baru." },
        400
      );
    }

    if (reset.attempts >= MAX_VERIFY_ATTEMPTS) {
      await prisma.passwordReset.delete({ where: { id: reset.id } });
      return c.json(
        {
          status: "error",
          message: "Terlalu banyak percobaan. Minta kode OTP baru.",
        },
        400
      );
    }

    const providedHash = hashOtp(otp);
    const isValid = timingSafeEqualOtp(providedHash, reset.otp_hash);

    if (!isValid) {
      await prisma.passwordReset.update({
        where: { id: reset.id },
        data: { attempts: { increment: 1 } },
      });
      return c.json(
        { status: "error", message: "Kode OTP tidak valid" },
        400
      );
    }

    const resetToken = generateResetToken({
      userId: user.id,
      scope: "password-reset",
      rid: reset.id,
    });

    return c.json({
      status: "success",
      data: {
        resetToken,
        expiresIn: RESET_TOKEN_TTL_SECONDS,
      },
    });
  } catch (error) {
    console.error("Verify OTP error:", error);
    return c.json(
      { status: "error", message: "Gagal memverifikasi OTP" },
      500
    );
  }
});

app.post("/reset-password", async (c) => {
  try {
    const body = await c.req.json();
    const { resetToken, newPassword } = body;

    if (!resetToken || !newPassword) {
      return c.json(
        { status: "error", message: "Reset token dan password baru wajib diisi" },
        400
      );
    }

    if (typeof newPassword !== "string" || newPassword.length < 8) {
      return c.json(
        { status: "error", message: "Password baru minimal 8 karakter" },
        400
      );
    }

    const payload = verifyResetToken(resetToken);
    if (!payload) {
      return c.json(
        { status: "error", message: "Token reset tidak valid atau sudah kedaluwarsa" },
        400
      );
    }

    const reset = await prisma.passwordReset.findUnique({
      where: { id: payload.rid },
    });

    if (!reset || reset.used_at || reset.user_id !== payload.userId) {
      return c.json(
        { status: "error", message: "Token reset tidak valid" },
        400
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!user || user.deleted_at) {
      return c.json(
        { status: "error", message: "User tidak ditemukan" },
        404
      );
    }

    const hashedPassword = await hashPassword(newPassword);

    await prisma.$transaction([
      prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword },
      }),
      prisma.passwordReset.update({
        where: { id: reset.id },
        data: { used_at: new Date() },
      }),
      prisma.passwordReset.deleteMany({
        where: { user_id: user.id, id: { not: reset.id }, used_at: null },
      }),
    ]);

    return c.json({
      status: "success",
      message: "Password berhasil direset. Silakan login dengan password baru.",
    });
  } catch (error) {
    console.error("Reset password error:", error);
    return c.json(
      { status: "error", message: "Gagal mereset password" },
      500
    );
  }
});

export default app;