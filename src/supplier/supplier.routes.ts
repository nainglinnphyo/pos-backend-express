import { Router } from 'express';
import { supplierController } from './supplier.controller';
const supplierRoute = Router();

supplierRoute.get("/fetch", supplierController.fetchSupplier);
supplierRoute.post("/create", supplierController.createSupplier);

export default supplierRoute;