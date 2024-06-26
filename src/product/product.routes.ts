import { Router } from 'express';
import { productController } from './product.controller';
const productRouter = Router();

productRouter.post("/create", productController.createProduct);
productRouter.get("/fetch", productController.fetchProduct);
productRouter.post("/create-price-list", productController.createProductPriceList);
productRouter.put("/edit-price-list", productController.editProductPriceList);
productRouter.put("/edit", productController.editProduct);
productRouter.get("/fetch-product-price-list", productController.fetchProductPriceList);
productRouter.get("/fetch-price-list", productController.fetchPirceList);
productRouter.delete("/delete/:product_id", productController.deleteProduct)

export default productRouter;