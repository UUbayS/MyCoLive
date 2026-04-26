import { Hono } from "hono";
import { prisma } from "../config/db";
import { hashPassword } from "../utils/password";
import { authMiddleware, requireRole } from "../middleware/auth";

const app = new Hono();

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
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        nama: true,
        role: true,
        no_telepon: true,
        created_at: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    return c.json({
      status: "success",
      data: users,
    });
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
    const { username, nama, email, no_telepon, password, role } = body;

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
    const { username, nama, no_telepon, role } = body;

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
    if (role && ["PEMILIK", "PENGELOLA", "PENGHUNI"].includes(role)) {
      updateData.role = role;
    }

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

    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return c.json(
        { status: "error", message: "User tidak ditemukan" },
        404
      );
    }

    await prisma.user.delete({
      where: { id },
    });

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