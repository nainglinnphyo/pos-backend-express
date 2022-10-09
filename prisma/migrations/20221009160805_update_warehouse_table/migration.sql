/*
  Warnings:

  - You are about to drop the column `quantity` on the `warehouses` table. All the data in the column will be lost.
  - Added the required column `warehouse_name` to the `warehouses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `warehouses` DROP COLUMN `quantity`,
    ADD COLUMN `warehouse_name` VARCHAR(191) NOT NULL;
