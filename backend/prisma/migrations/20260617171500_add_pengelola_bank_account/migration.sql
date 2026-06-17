-- CreateTable
CREATE TABLE "PengelolaBankAccount" (
    "id" TEXT NOT NULL,
    "nama_rekening" TEXT NOT NULL,
    "nomor_rekening" TEXT NOT NULL,
    "bank" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "PengelolaBankAccount_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PengelolaBankAccount" ADD CONSTRAINT "PengelolaBankAccount_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
