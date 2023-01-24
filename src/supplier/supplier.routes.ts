import { Router } from 'express';
import { supplierController } from './supplier.controller';
const supplierRoute = Router();

supplierRoute.get("/fetch", supplierController.fetchSupplier);
supplierRoute.post("/create", supplierController.createSupplier);
supplierRoute.put("/edit", supplierController.editSupplier);
supplierRoute.delete("/delete/:supplier_id", supplierController.deleteSupplier);

export default supplierRoute;