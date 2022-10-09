import { Router } from 'express';
import { supplierController } from './supplier.controller';
const supplierRoute = Router();

supplierRoute.get("/fetch", supplierController.fetchSupplier);

export default supplierRoute;