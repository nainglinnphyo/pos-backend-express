import { Router } from "express";
import categoryRouter from "../category/category.routes";
import customerRoute from "../customer/customer.routes";
import instockRouter from "../instock/instock.routes";
import productRouter from "../product/product.routes";
import supplierRoute from "../supplier/supplier.routes";
import userRoute from "../user/user.routes";

const routes = Router();

routes.use("/auth", userRoute);
routes.use("/category", categoryRouter);
routes.use("/product", productRouter);
routes.use("/instock", instockRouter);
routes.use("/supplier", supplierRoute);
routes.use("/customer", customerRoute);

export default routes;
