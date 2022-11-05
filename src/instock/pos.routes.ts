import { Router } from 'express';
import {posController} from './pos.controller'
const posRouter = Router();

posRouter.post('/instock/create',posController.createInstock)
posRouter.get('/transaction/fetch',posController.fetchTransaction)

export default posRouter;