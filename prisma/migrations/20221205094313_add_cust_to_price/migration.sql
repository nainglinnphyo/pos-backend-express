/*
  Warnings:

  - A unique constraint covering the columns `[pirce_id]` on the table `customers` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "customers" ADD COLUMN     "pirce_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "customers_pirce_id_key" ON "customers"("pirce_id");

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_pirce_id_fkey" FOREIGN KEY ("pirce_id") REFERENCES "prices"("id") ON DELETE SET NULL ON UPDATE CASCADE;
