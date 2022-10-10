import { Router } from 'express';
import {instockController} from './instock.controller'
const instockRouter = Router();

instockRouter.post("/create", instockController.createInstock);
instockRouter.get("/fetch-warehouse", instockController.fetchWarehouse);

export default instockRouter;