/*
  Warnings:

  - You are about to drop the column `product_id` on the `instock_voucher` table. All the data in the column will be lost.
  - Added the required column `instock_voucher_id` to the `instock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `warehouse_id` to the `instock_voucher` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `instock_voucher` DROP FOREIGN KEY `instock_voucher_product_id_fkey`;

-- AlterTable
ALTER TABLE `instock` ADD COLUMN `instock_voucher_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `instock_voucher` DROP COLUMN `product_id`,
    ADD COLUMN `warehouse_id` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `warehouses` (
    `id` VARCHAR(191) NOT NULL,
    `warehouse_name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `instock_voucher` ADD CONSTRAINT `instock_voucher_warehouse_id_fkey` FOREIGN KEY (`warehouse_id`) REFERENCES `warehouses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `instock` ADD CONSTRAINT `instock_instock_voucher_id_fkey` FOREIGN KEY (`instock_voucher_id`) REFERENCES `instock_voucher`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
