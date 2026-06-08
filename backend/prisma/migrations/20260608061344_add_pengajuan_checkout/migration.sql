-- CreateEnum
CREATE TYPE "StatusPengajuanCheckout" AS ENUM ('MENUNGGU', 'DITERIMA', 'DITOLAK');

-- AlterEnum
ALTER TYPE "StatusSewa" ADD VALUE 'PENGAJUAN_CHECKOUT';

-- CreateTable
CREATE TABLE "PengajuanCheckout" (
    "id" TEXT NOT NULL,
    "keterangan" TEXT,
    "status" "StatusPengajuanCheckout" NOT NULL DEFAULT 'MENUNGGU',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "penghuni_id" TEXT NOT NULL,
    "kamar_id" TEXT NOT NULL,
    "properti_id" TEXT NOT NULL,
    "admin_id" TEXT,

    CONSTRAINT "PengajuanCheckout_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PengajuanCheckout" ADD CONSTRAINT "PengajuanCheckout_penghuni_id_fkey" FOREIGN KEY ("penghuni_id") REFERENCES "Penghuni"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PengajuanCheckout" ADD CONSTRAINT "PengajuanCheckout_kamar_id_fkey" FOREIGN KEY ("kamar_id") REFERENCES "Kamar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PengajuanCheckout" ADD CONSTRAINT "PengajuanCheckout_properti_id_fkey" FOREIGN KEY ("properti_id") REFERENCES "Properti"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PengajuanCheckout" ADD CONSTRAINT "PengajuanCheckout_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
