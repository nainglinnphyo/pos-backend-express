import { Router } from "express";
import categoryRouter from "../category/category.routes";
import productRouter from "../product/product.routes";
import userRoute from "../user/user.routes";

const routes = Router();

routes.use("/auth", userRoute);
routes.use("/category", categoryRouter);
routes.use("/product", productRouter);

export default routes;
