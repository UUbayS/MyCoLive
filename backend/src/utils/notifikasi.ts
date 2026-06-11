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

export async function createNotifikasiBulk(
  userIds: string[],
  judul: string,
  pesan: string,
  tipe?: string,
  relatedId?: string
) {
  try {
    if (userIds.length === 0) return;

    const data = userIds.map((userId) => ({
      user_id: userId,
      judul,
      pesan,
      tipe: tipe || null,
      related_id: relatedId || null,
      is_read: false,
    }));

    await prisma.notifikasi.createMany({
      data,
    });
  } catch (error) {
    console.error("Create notifikasi bulk error:", error);
  }
}
