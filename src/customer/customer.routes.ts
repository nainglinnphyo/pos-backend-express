import { Router } from 'express';
import { customerController } from './customer.controller';
const customerRoute = Router();

customerRoute.get("/fetch", customerController.fetchCustomer);
customerRoute.post("/create", customerController.createCustomer);
customerRoute.delete("/delete/:customer_id", customerController.deleteCustomer);
customerRoute.put("/edit/:customer_id", customerController.editCustomer);

export default customerRoute;