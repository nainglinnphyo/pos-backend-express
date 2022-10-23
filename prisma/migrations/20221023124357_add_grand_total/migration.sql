-- AlterTable
ALTER TABLE `instock_voucher` ADD COLUMN `grand_total` DOUBLE NULL;

-- AlterTable
ALTER TABLE `transaction` ADD COLUMN `sale_voucher_id` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `sale_voucher` (
    `id` VARCHAR(191) NOT NULL,
    `discount` DOUBLE NULL,
    `grand_total` DOUBLE NULL,
    `total` DOUBLE NULL,
    `round_adjustment` DOUBLE NULL,
    `customer_id` VARCHAR(191) NOT NULL,
    `voucher_status` ENUM('done', 'remainder') NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SaleItem` (
    `id` VARCHAR(191) NOT NULL,
    `total_quantity` INTEGER NOT NULL,
    `total_amount` DOUBLE NOT NULL,
    `sale_voucher_id` VARCHAR(191) NOT NULL,
    `product_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `sale_voucher` ADD CONSTRAINT `sale_voucher_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SaleItem` ADD CONSTRAINT `SaleItem_sale_voucher_id_fkey` FOREIGN KEY (`sale_voucher_id`) REFERENCES `sale_voucher`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SaleItem` ADD CONSTRAINT `SaleItem_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_sale_voucher_id_fkey` FOREIGN KEY (`sale_voucher_id`) REFERENCES `sale_voucher`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
