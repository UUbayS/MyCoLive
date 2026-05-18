/*
  Warnings:

  - You are about to drop the column `harga` on the `Kamar` table. All the data in the column will be lost.
  - The `gambar` column on the `Kamar` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `judul` on the `Komplain` table. All the data in the column will be lost.
  - You are about to drop the column `jumlah` on the `Pembayaran` table. All the data in the column will be lost.
  - You are about to drop the column `deskripsi` on the `PengajuanDana` table. All the data in the column will be lost.
  - You are about to drop the column `fasilitas` on the `Properti` table. All the data in the column will be lost.
  - The `gambar` column on the `Properti` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `no_wa` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[no_telepon]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `jenis` to the `Komplain` table without a default value. This is not possible if the table is not empty.
  - Added the required column `masalah` to the `Komplain` table without a default value. This is not possible if the table is not empty.
  - Added the required column `metode_bayar` to the `Pembayaran` table without a default value. This is not possible if the table is not empty.
  - Added the required column `durasi_sewa` to the `Pemesanan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `metode_bayar` to the `Pemesanan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_bayar` to the `Pemesanan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `no_rekening` to the `PengajuanDana` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tujuan` to the `PengajuanDana` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "JenisProperti" AS ENUM ('LAKI_LAKI', 'PEREMPUAN', 'CAMPUR');

-- CreateEnum
CREATE TYPE "JenisKomplain" AS ENUM ('FASILITAS', 'LINGKUNGAN', 'PENGHUNI_LAIN', 'LAINNYA');

-- AlterTable
ALTER TABLE "Kamar" DROP COLUMN "harga",
ADD COLUMN     "fasilitas" TEXT[],
ADD COLUMN     "luas" TEXT,
ADD COLUMN     "tarif" JSONB,
DROP COLUMN "gambar",
ADD COLUMN     "gambar" TEXT[];

-- AlterTable
ALTER TABLE "Komplain" DROP COLUMN "judul",
ADD COLUMN     "foto" TEXT,
ADD COLUMN     "jenis" "JenisKomplain" NOT NULL,
ADD COLUMN     "masalah" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Pembayaran" DROP COLUMN "jumlah",
ADD COLUMN     "metode_bayar" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Pemesanan" ADD COLUMN     "durasi_sewa" INTEGER NOT NULL,
ADD COLUMN     "metode_bayar" TEXT NOT NULL,
ADD COLUMN     "total_bayar" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "PengajuanDana" DROP COLUMN "deskripsi",
ADD COLUMN     "foto" TEXT,
ADD COLUMN     "no_rekening" TEXT NOT NULL,
ADD COLUMN     "tujuan" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Properti" DROP COLUMN "fasilitas",
ADD COLUMN     "jenis" "JenisProperti",
ADD COLUMN     "kebijakan" TEXT,
DROP COLUMN "gambar",
ADD COLUMN     "gambar" TEXT[];

-- AlterTable
ALTER TABLE "User" DROP COLUMN "no_wa",
ADD COLUMN     "no_telepon" TEXT,
ADD COLUMN     "username" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "AdminSettings" (
    "id" TEXT NOT NULL,
    "nama_rekening" TEXT,
    "nomor_rekening" TEXT,
    "bank" TEXT,
    "qris_image" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "AdminSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminSettings_user_id_key" ON "AdminSettings"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_no_telepon_key" ON "User"("no_telepon");

-- AddForeignKey
ALTER TABLE "AdminSettings" ADD CONSTRAINT "AdminSettings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
