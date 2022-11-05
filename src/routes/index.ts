import { Router } from "express";
import categoryRouter from "../category/category.routes";
import customerRoute from "../customer/customer.routes";
import posRouter from "../instock/pos.routes";
import productRouter from "../product/product.routes";
import supplierRoute from "../supplier/supplier.routes";
import unitRouter from "../unit/unit.routes";
import userRoute from "../user/user.routes";

const routes = Router();

routes.use("/auth", userRoute);
routes.use("/category", categoryRouter);
routes.use("/product", productRouter);
routes.use("/unit", unitRouter);
routes.use("/pos", posRouter);
routes.use("/supplier", supplierRoute);
routes.use("/customer", customerRoute);

export default routes;
