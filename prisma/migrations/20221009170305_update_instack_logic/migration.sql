/*
  Warnings:

  - You are about to drop the column `warehouse_id` on the `instocks` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `instocks` DROP FOREIGN KEY `instocks_warehouse_id_fkey`;

-- AlterTable
ALTER TABLE `instocks` DROP COLUMN `warehouse_id`;

-- CreateTable
CREATE TABLE `instock_on_products` (
    `id` VARCHAR(191) NOT NULL,
    `product_id` VARCHAR(191) NOT NULL,
    `total_quantity` INTEGER NOT NULL,
    `warehouse_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `instock_on_products` ADD CONSTRAINT `instock_on_products_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `instock_on_products` ADD CONSTRAINT `instock_on_products_warehouse_id_fkey` FOREIGN KEY (`warehouse_id`) REFERENCES `warehouses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
