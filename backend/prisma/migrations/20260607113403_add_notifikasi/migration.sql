-- CreateTable
CREATE TABLE "Notifikasi" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "judul" TEXT NOT NULL,
    "pesan" TEXT NOT NULL,
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    "tipe" TEXT,
    "related_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notifikasi_pkey" PRIMARY KEY ("id")
);
