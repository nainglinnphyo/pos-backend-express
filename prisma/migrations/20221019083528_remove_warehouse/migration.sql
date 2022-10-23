/*
  Warnings:

  - You are about to drop the column `warehouse_id` on the `instock` table. All the data in the column will be lost.
  - You are about to drop the `warehouses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `instock` DROP FOREIGN KEY `instock_warehouse_id_fkey`;

-- AlterTable
ALTER TABLE `instock` DROP COLUMN `warehouse_id`;

-- DropTable
DROP TABLE `warehouses`;
