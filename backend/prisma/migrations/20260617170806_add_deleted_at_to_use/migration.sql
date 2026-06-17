/*
  Warnings:

  - You are about to drop the column `bank` on the `AdminSettings` table. All the data in the column will be lost.
  - You are about to drop the column `nama_rekening` on the `AdminSettings` table. All the data in the column will be lost.
  - You are about to drop the column `nomor_rekening` on the `AdminSettings` table. All the data in the column will be lost.
  - You are about to drop the column `fasilitas` on the `Kamar` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[properti_id,nomor]` on the table `Kamar` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id,properti_id]` on the table `Operator` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[no_telepon]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "JenisFasilitas" AS ENUM ('RUANGAN', 'UMUM');

-- AlterEnum
ALTER TYPE "StatusPembayaran" ADD VALUE 'DIBATALKAN';

-- AlterEnum
ALTER TYPE "StatusPemesanan" ADD VALUE 'DIBATALKAN';

-- DropIndex
DROP INDEX "Kamar_properti_id_nomor_key";

-- DropIndex
DROP INDEX "Operator_user_id_properti_id_key";

-- DropIndex
DROP INDEX "User_email_key";

-- DropIndex
DROP INDEX "User_no_telepon_key";

-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "AdminSettings" DROP COLUMN "bank",
DROP COLUMN "nama_rekening",
DROP COLUMN "nomor_rekening";

-- AlterTable
ALTER TABLE "Kamar" DROP COLUMN "fasilitas",
ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Operator" ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Pembayaran" ADD COLUMN     "bank_account_id" TEXT;

-- AlterTable
ALTER TABLE "Properti" ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "BankAccount" (
    "id" TEXT NOT NULL,
    "nama_rekening" TEXT NOT NULL,
    "nomor_rekening" TEXT NOT NULL,
    "bank" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "admin_settings_id" TEXT NOT NULL,

    CONSTRAINT "BankAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fasilitas" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "jenis" "JenisFasilitas" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Fasilitas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pengumuman" (
    "id" SERIAL NOT NULL,
    "judul" TEXT NOT NULL,
    "isi" TEXT NOT NULL,
    "properti_id" TEXT,
    "pemilik_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pengumuman_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FasilitasToKamar" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_FasilitasToKamar_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_FasilitasToProperti" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_FasilitasToProperti_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_FasilitasToKamar_B_index" ON "_FasilitasToKamar"("B");

-- CreateIndex
CREATE INDEX "_FasilitasToProperti_B_index" ON "_FasilitasToProperti"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Kamar_properti_id_nomor_key" ON "Kamar"("properti_id", "nomor") WHERE ("deleted_at" IS NULL);

-- CreateIndex
CREATE UNIQUE INDEX "Operator_user_id_properti_id_key" ON "Operator"("user_id", "properti_id") WHERE ("deleted_at" IS NULL);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username") WHERE ("deleted_at" IS NULL);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email") WHERE ("deleted_at" IS NULL);

-- CreateIndex
CREATE UNIQUE INDEX "User_no_telepon_key" ON "User"("no_telepon") WHERE ("deleted_at" IS NULL);

-- AddForeignKey
ALTER TABLE "BankAccount" ADD CONSTRAINT "BankAccount_admin_settings_id_fkey" FOREIGN KEY ("admin_settings_id") REFERENCES "AdminSettings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pembayaran" ADD CONSTRAINT "Pembayaran_bank_account_id_fkey" FOREIGN KEY ("bank_account_id") REFERENCES "BankAccount"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pengumuman" ADD CONSTRAINT "Pengumuman_properti_id_fkey" FOREIGN KEY ("properti_id") REFERENCES "Properti"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pengumuman" ADD CONSTRAINT "Pengumuman_pemilik_id_fkey" FOREIGN KEY ("pemilik_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FasilitasToKamar" ADD CONSTRAINT "_FasilitasToKamar_A_fkey" FOREIGN KEY ("A") REFERENCES "Fasilitas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FasilitasToKamar" ADD CONSTRAINT "_FasilitasToKamar_B_fkey" FOREIGN KEY ("B") REFERENCES "Kamar"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FasilitasToProperti" ADD CONSTRAINT "_FasilitasToProperti_A_fkey" FOREIGN KEY ("A") REFERENCES "Fasilitas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FasilitasToProperti" ADD CONSTRAINT "_FasilitasToProperti_B_fkey" FOREIGN KEY ("B") REFERENCES "Properti"("id") ON DELETE CASCADE ON UPDATE CASCADE;
