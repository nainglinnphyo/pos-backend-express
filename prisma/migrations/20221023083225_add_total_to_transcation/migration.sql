/*
  Warnings:

  - You are about to drop the column `voucher_status` on the `instock` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `instock` DROP COLUMN `voucher_status`;

-- AlterTable
ALTER TABLE `instock_voucher` ADD COLUMN `voucher_status` ENUM('done', 'remainder') NULL;
