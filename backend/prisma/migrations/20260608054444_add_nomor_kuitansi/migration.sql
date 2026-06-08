/*
  Warnings:

  - A unique constraint covering the columns `[nomor_kuitansi]` on the table `Pembayaran` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Pembayaran" ADD COLUMN     "nomor_kuitansi" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Pembayaran_nomor_kuitansi_key" ON "Pembayaran"("nomor_kuitansi");
