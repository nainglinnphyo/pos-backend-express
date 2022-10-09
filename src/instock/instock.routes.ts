import { Router } from 'express';
import {instockController} from './instock.controller'
const instockRouter = Router();

instockRouter.post("/create", instockController.createInstock);

export default instockRouter;