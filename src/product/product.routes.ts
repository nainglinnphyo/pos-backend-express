import { Router } from 'express';
import { productController } from './product.controller';
const productRouter = Router();

productRouter.post("/create", productController.createProduct);
productRouter.get("/fetch", productController.fetchProduct);

export default productRouter;