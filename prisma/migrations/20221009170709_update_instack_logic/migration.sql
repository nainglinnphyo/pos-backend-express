/*
  Warnings:

  - Added the required column `supplier_id` to the `instocks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `instocks` ADD COLUMN `supplier_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `instocks` ADD CONSTRAINT `instocks_supplier_id_fkey` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
