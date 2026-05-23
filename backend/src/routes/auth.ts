import { Hono } from "hono";
import { prisma } from "../config/db";
import { hashPassword, verifyPassword } from "../utils/password";
import { generateAccessToken, generateRefreshToken, verifyToken } from "../utils/jwt";
import { authMiddleware } from "../middleware/auth";

const app = new Hono();

function convertPhone(phone: string): string {
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

export default app;