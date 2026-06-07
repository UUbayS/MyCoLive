import { prisma } from "../config/db";

export async function createNotifikasi(
  userId: string,
  judul: string,
  pesan: string,
  tipe?: string,
  relatedId?: string
) {
  try {
    await prisma.notifikasi.create({
      data: {
        user_id: userId,
        judul,
        pesan,
        tipe: tipe || null,
        related_id: relatedId || null,
        is_read: false,
      },
    });
  } catch (error) {
    console.error("Create notifikasi error:", error);
  }
}
