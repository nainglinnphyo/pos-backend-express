/*
  Warnings:

  - You are about to drop the column `is_composite` on the `products` table. All the data in the column will be lost.
  - You are about to drop the `batches` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `instock_on_products` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `instocks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `instock_on_products` DROP FOREIGN KEY `instock_on_products_product_id_fkey`;

-- DropForeignKey
ALTER TABLE `instock_on_products` DROP FOREIGN KEY `instock_on_products_warehouse_id_fkey`;

-- DropForeignKey
ALTER TABLE `instocks` DROP FOREIGN KEY `instocks_batch_id_fkey`;

-- DropForeignKey
ALTER TABLE `instocks` DROP FOREIGN KEY `instocks_product_id_fkey`;

-- DropForeignKey
ALTER TABLE `instocks` DROP FOREIGN KEY `instocks_supplier_id_fkey`;

-- AlterTable
ALTER TABLE `products` DROP COLUMN `is_composite`;

-- DropTable
DROP TABLE `batches`;

-- DropTable
DROP TABLE `instock_on_products`;

-- DropTable
DROP TABLE `instocks`;

-- CreateTable
CREATE TABLE `prices` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_price_list` (
    `id` VARCHAR(191) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `product_id` VARCHAR(191) NOT NULL,
    `price_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `composite` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `per_unit` DOUBLE NOT NULL,
    `product_id` VARCHAR(191) NOT NULL,
    `unit_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `composite_price_list` (
    `id` VARCHAR(191) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `composite_id` VARCHAR(191) NOT NULL,
    `price_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `instock_voucher` (
    `id` VARCHAR(191) NOT NULL,
    `discount` DOUBLE NULL,
    `total` DOUBLE NOT NULL,
    `round_adjustment` DOUBLE NULL,
    `voucher_status_id` VARCHAR(191) NULL,
    `product_id` VARCHAR(191) NOT NULL,
    `supplier_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `instock` (
    `id` VARCHAR(191) NOT NULL,
    `total_quantity` INTEGER NOT NULL,
    `foc` INTEGER NULL DEFAULT 0,
    `discount_on_item` INTEGER NULL DEFAULT 0,
    `total_amount` DOUBLE NOT NULL,
    `product_id` VARCHAR(191) NOT NULL,
    `warehouse_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transaction` (
    `id` VARCHAR(191) NOT NULL,
    `paid` DOUBLE NOT NULL,
    `balance` DOUBLE NOT NULL,
    `remark` VARCHAR(191) NULL,
    `issued_by_id` VARCHAR(191) NULL,
    `instock_voucher_id` VARCHAR(191) NULL,
    `payment_method_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payment_methods` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `payment_methods_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `voucher_status` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `voucher_status_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `product_price_list` ADD CONSTRAINT `product_price_list_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_price_list` ADD CONSTRAINT `product_price_list_price_id_fkey` FOREIGN KEY (`price_id`) REFERENCES `prices`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `composite` ADD CONSTRAINT `composite_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `composite` ADD CONSTRAINT `composite_unit_id_fkey` FOREIGN KEY (`unit_id`) REFERENCES `units`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `composite_price_list` ADD CONSTRAINT `composite_price_list_composite_id_fkey` FOREIGN KEY (`composite_id`) REFERENCES `composite`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `composite_price_list` ADD CONSTRAINT `composite_price_list_price_id_fkey` FOREIGN KEY (`price_id`) REFERENCES `prices`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `instock_voucher` ADD CONSTRAINT `instock_voucher_voucher_status_id_fkey` FOREIGN KEY (`voucher_status_id`) REFERENCES `voucher_status`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `instock_voucher` ADD CONSTRAINT `instock_voucher_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `instock_voucher` ADD CONSTRAINT `instock_voucher_supplier_id_fkey` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `instock` ADD CONSTRAINT `instock_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `instock` ADD CONSTRAINT `instock_warehouse_id_fkey` FOREIGN KEY (`warehouse_id`) REFERENCES `warehouses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_issued_by_id_fkey` FOREIGN KEY (`issued_by_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_instock_voucher_id_fkey` FOREIGN KEY (`instock_voucher_id`) REFERENCES `instock_voucher`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_payment_method_id_fkey` FOREIGN KEY (`payment_method_id`) REFERENCES `payment_methods`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
