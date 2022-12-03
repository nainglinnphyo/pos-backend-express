-- AlterTable
ALTER TABLE "instock_voucher" ADD COLUMN     "balance" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "sale_voucher" ADD COLUMN     "balance" DOUBLE PRECISION NOT NULL DEFAULT 0;
