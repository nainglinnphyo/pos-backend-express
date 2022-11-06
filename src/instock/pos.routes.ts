import { Router } from 'express';
import {posController} from './pos.controller'
const posRouter = Router();

posRouter.post('/instock/create',posController.createInstock)
posRouter.get('/transaction/fetch',posController.fetchTransaction)
posRouter.get('/payment-method/fetch',posController.fetchPaymentMethod)
posRouter.get('/warehouse/fetch',posController.fetchWareHouse)

export default posRouter;