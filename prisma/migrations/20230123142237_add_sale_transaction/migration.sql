-- CreateTable
CREATE TABLE "sale_transactions" (
    "id" TEXT NOT NULL,
    "sale_voucher_id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sale_transactions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "sale_transactions" ADD CONSTRAINT "sale_transactions_sale_voucher_id_fkey" FOREIGN KEY ("sale_voucher_id") REFERENCES "sale_voucher"("id") ON DELETE CASCADE ON UPDATE CASCADE;
