-- AlterTable
ALTER TABLE "sale_items" ADD COLUMN     "product_price_id" TEXT;

-- AddForeignKey
ALTER TABLE "sale_items" ADD CONSTRAINT "sale_items_product_price_id_fkey" FOREIGN KEY ("product_price_id") REFERENCES "product_price_list"("id") ON DELETE CASCADE ON UPDATE CASCADE;
