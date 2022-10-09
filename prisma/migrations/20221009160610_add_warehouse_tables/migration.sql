/*
  Warnings:

  - You are about to drop the column `instock_id` on the `warehouses` table. All the data in the column will be lost.
  - Added the required column `warehouse_id` to the `instocks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `warehouses` DROP FOREIGN KEY `warehouses_instock_id_fkey`;

-- AlterTable
ALTER TABLE `instocks` ADD COLUMN `warehouse_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `warehouses` DROP COLUMN `instock_id`;

-- AddForeignKey
ALTER TABLE `instocks` ADD CONSTRAINT `instocks_warehouse_id_fkey` FOREIGN KEY (`warehouse_id`) REFERENCES `warehouses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
