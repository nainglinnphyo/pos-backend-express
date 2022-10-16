import { Router } from 'express';
import { customerController } from './customer.controller';
const customerRoute = Router();

customerRoute.get("/fetch", customerController.fetchCustomer);
customerRoute.post("/create", customerController.createCustomer);

export default customerRoute;