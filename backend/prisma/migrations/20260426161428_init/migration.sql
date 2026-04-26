-- CreateEnum
CREATE TYPE "Role" AS ENUM ('PEMILIK', 'PENGELOLA', 'PENGHUNI');

-- CreateEnum
CREATE TYPE "StatusKamar" AS ENUM ('KOSONG', 'TERISI', 'MAINTENANCE');

-- CreateEnum
CREATE TYPE "TipeKamar" AS ENUM ('REGULER', 'VIP', 'STUDIO');

-- CreateEnum
CREATE TYPE "StatusPemesanan" AS ENUM ('MENUNGGU', 'DITERIMA', 'DITOLAK', 'SELESAI');

-- CreateEnum
CREATE TYPE "StatusPembayaran" AS ENUM ('MENUNGGU', 'DIVERIFIKASI', 'DITERIMA', 'DITOLAK');

-- CreateEnum
CREATE TYPE "StatusKomplain" AS ENUM ('BARU', 'DIPROSES', 'SELESAI');

-- CreateEnum
CREATE TYPE "StatusDana" AS ENUM ('MENUNGGU', 'DITERIMA', 'DITOLAK');

-- CreateEnum
CREATE TYPE "StatusSewa" AS ENUM ('AKTIF', 'BERAKHIR');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "no_wa" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Properti" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "deskripsi" TEXT,
    "fasilitas" TEXT,
    "gambar" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "admin_id" TEXT NOT NULL,

    CONSTRAINT "Properti_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kamar" (
    "id" TEXT NOT NULL,
    "nomor" TEXT NOT NULL,
    "tipe" "TipeKamar" NOT NULL DEFAULT 'REGULER',
    "harga" INTEGER NOT NULL,
    "status" "StatusKamar" NOT NULL DEFAULT 'KOSONG',
    "deskripsi" TEXT,
    "gambar" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "properti_id" TEXT NOT NULL,

    CONSTRAINT "Kamar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pemesanan" (
    "id" TEXT NOT NULL,
    "tgl_masuk" TIMESTAMP(3) NOT NULL,
    "status" "StatusPemesanan" NOT NULL DEFAULT 'MENUNGGU',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "kamar_id" TEXT NOT NULL,
    "penghuni_id" TEXT NOT NULL,
    "properti_id" TEXT NOT NULL,

    CONSTRAINT "Pemesanan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pembayaran" (
    "id" TEXT NOT NULL,
    "jumlah" INTEGER NOT NULL,
    "bukti" TEXT,
    "status" "StatusPembayaran" NOT NULL DEFAULT 'MENUNGGU',
    "tgl_bayar" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "pemesanan_id" TEXT NOT NULL,

    CONSTRAINT "Pembayaran_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Penghuni" (
    "id" TEXT NOT NULL,
    "tgl_mulai" TIMESTAMP(3) NOT NULL,
    "tgl_berakhir" TIMESTAMP(3),
    "status_sewa" "StatusSewa" NOT NULL DEFAULT 'AKTIF',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,
    "kamar_id" TEXT,

    CONSTRAINT "Penghuni_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Operator" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,
    "properti_id" TEXT NOT NULL,

    CONSTRAINT "Operator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Komplain" (
    "id" TEXT NOT NULL,
    "judul" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "status" "StatusKomplain" NOT NULL DEFAULT 'BARU',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "penghuni_id" TEXT NOT NULL,
    "properti_id" TEXT NOT NULL,

    CONSTRAINT "Komplain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PengajuanDana" (
    "id" TEXT NOT NULL,
    "jumlah" INTEGER NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "status" "StatusDana" NOT NULL DEFAULT 'MENUNGGU',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "operator_id" TEXT NOT NULL,
    "properti_id" TEXT NOT NULL,

    CONSTRAINT "PengajuanDana_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Kamar_properti_id_nomor_key" ON "Kamar"("properti_id", "nomor");

-- CreateIndex
CREATE UNIQUE INDEX "Pembayaran_pemesanan_id_key" ON "Pembayaran"("pemesanan_id");

-- CreateIndex
CREATE UNIQUE INDEX "Penghuni_user_id_key" ON "Penghuni"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Penghuni_kamar_id_key" ON "Penghuni"("kamar_id");

-- CreateIndex
CREATE UNIQUE INDEX "Operator_user_id_key" ON "Operator"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Operator_user_id_properti_id_key" ON "Operator"("user_id", "properti_id");

-- AddForeignKey
ALTER TABLE "Properti" ADD CONSTRAINT "Properti_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kamar" ADD CONSTRAINT "Kamar_properti_id_fkey" FOREIGN KEY ("properti_id") REFERENCES "Properti"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pemesanan" ADD CONSTRAINT "Pemesanan_kamar_id_fkey" FOREIGN KEY ("kamar_id") REFERENCES "Kamar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pemesanan" ADD CONSTRAINT "Pemesanan_penghuni_id_fkey" FOREIGN KEY ("penghuni_id") REFERENCES "Penghuni"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pemesanan" ADD CONSTRAINT "Pemesanan_properti_id_fkey" FOREIGN KEY ("properti_id") REFERENCES "Properti"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pembayaran" ADD CONSTRAINT "Pembayaran_pemesanan_id_fkey" FOREIGN KEY ("pemesanan_id") REFERENCES "Pemesanan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Penghuni" ADD CONSTRAINT "Penghuni_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Penghuni" ADD CONSTRAINT "Penghuni_kamar_id_fkey" FOREIGN KEY ("kamar_id") REFERENCES "Kamar"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Operator" ADD CONSTRAINT "Operator_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Operator" ADD CONSTRAINT "Operator_properti_id_fkey" FOREIGN KEY ("properti_id") REFERENCES "Properti"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Komplain" ADD CONSTRAINT "Komplain_penghuni_id_fkey" FOREIGN KEY ("penghuni_id") REFERENCES "Penghuni"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Komplain" ADD CONSTRAINT "Komplain_properti_id_fkey" FOREIGN KEY ("properti_id") REFERENCES "Properti"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PengajuanDana" ADD CONSTRAINT "PengajuanDana_operator_id_fkey" FOREIGN KEY ("operator_id") REFERENCES "Operator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PengajuanDana" ADD CONSTRAINT "PengajuanDana_properti_id_fkey" FOREIGN KEY ("properti_id") REFERENCES "Properti"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
