import { Hono } from "hono";
import { prisma } from "../config/db";
import { authMiddleware, AppEnv } from "../middleware/auth";

const app = new Hono<AppEnv>();
app.use("*", authMiddleware);

async function getPropertiIds(userId: string, role: string): Promise<string[]> {
  if (role === "PEMILIK") {
    const properti = await prisma.properti.findMany({
      where: { admin_id: userId },
      select: { id: true }
    });
    return properti.map(p => p.id);
  }
  const operators = await prisma.operator.findMany({
    where: { user_id: userId },
    select: { properti_id: true }
  });
  return operators.map(op => op.properti_id);
}

app.get("/", async (c) => {
  try {
    const user = c.get("user");
    const badges: Record<string, number> = {
      validasiBayar: 0,
      komplain: 0,
      pengajuanCheckout: 0,
      requestDana: 0,
    };

    if (user.role === "PEMILIK" || user.role === "PENGELOLA") {
      const propertiIds = await getPropertiIds(user.userId, user.role);
      if (propertiIds.length > 0) {
        badges.pengajuanCheckout = await prisma.pengajuanCheckout.count({
          where: { properti_id: { in: propertiIds }, status: "MENUNGGU" }
        });
        badges.requestDana = await prisma.pengajuanDana.count({
          where: { properti_id: { in: propertiIds }, status: "MENUNGGU" }
        });
        badges.komplain = await prisma.komplain.count({
          where: { properti_id: { in: propertiIds }, status: { in: ["BARU", "DIPROSES"] } }
        });
      }
      if (user.role === "PEMILIK" && propertiIds.length > 0) {
        badges.validasiBayar = await prisma.pemesanan.count({
          where: {
            properti_id: { in: propertiIds },
            pembayaran: { status: "DIVERIFIKASI" },
          }
        });
      }
    } else if (user.role === "PENGHUNI") {
      const penghuni = await prisma.penghuni.findUnique({
        where: { user_id: user.userId },
        select: { id: true, kamar: { select: { properti_id: true } } }
      });
      if (penghuni?.kamar) {
        badges.komplain = await prisma.komplain.count({
          where: { penghuni_id: penghuni.id, status: { in: ["BARU", "DIPROSES"] } }
        });
      }
    }

    return c.json({ status: "success", data: badges });
  } catch (error) {
    console.error("Get badges error:", error);
    return c.json({ status: "error", message: "Gagal mengambil badge" }, 500);
  }
});

export default app;
