import { prisma } from "../config/db";
import { eventBus } from "../lib/event-bus";

export async function createNotifikasi(
  userId: string,
  judul: string,
  pesan: string,
  tipe?: string,
  relatedId?: string
) {
  try {
    const notifikasi = await prisma.notifikasi.create({
      data: {
        user_id: userId,
        judul,
        pesan,
        tipe: tipe || null,
        related_id: relatedId || null,
        is_read: false,
      },
    });
    eventBus.publish(userId, "notifikasi", notifikasi);
    return notifikasi;
  } catch (error) {
    console.error("Create notifikasi error:", error);
    return null;
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

    const notifikasiList = await prisma.notifikasi.createMany({
      data,
    });
    eventBus.publish(userIds, "notifikasi", { userIds, judul, pesan, tipe, relatedId });
    return notifikasiList;
  } catch (error) {
    console.error("Create notifikasi bulk error:", error);
    return null;
  }
}
