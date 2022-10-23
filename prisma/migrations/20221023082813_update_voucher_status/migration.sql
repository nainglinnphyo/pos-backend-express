/*
  Warnings:

  - You are about to drop the column `voucher_status_id` on the `instock_voucher` table. All the data in the column will be lost.
  - You are about to drop the `voucher_status` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `instock_voucher` DROP FOREIGN KEY `instock_voucher_voucher_status_id_fkey`;

-- AlterTable
ALTER TABLE `instock` ADD COLUMN `voucher_status` ENUM('done', 'remainder') NULL;

-- AlterTable
ALTER TABLE `instock_voucher` DROP COLUMN `voucher_status_id`;

-- DropTable
DROP TABLE `voucher_status`;
