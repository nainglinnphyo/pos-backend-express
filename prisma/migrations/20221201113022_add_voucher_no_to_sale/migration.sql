/*
  Warnings:

  - A unique constraint covering the columns `[voucher_no]` on the table `sale_voucher` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "sale_voucher" ADD COLUMN     "voucher_no" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "sale_voucher_voucher_no_key" ON "sale_voucher"("voucher_no");
