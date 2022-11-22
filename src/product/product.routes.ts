import { Router } from 'express';
import { productController } from './product.controller';
const productRouter = Router();

productRouter.post("/create", productController.createProduct);
productRouter.get("/fetch", productController.fetchProduct);
productRouter.post("/create-price-list", productController.createProductPriceList);
productRouter.put("/edit", productController.editProduct);

export default productRouter;