import { Router } from 'express';
import {posController} from './pos.controller'
const posRouter = Router();

posRouter.post('/instock/create',posController.createInstock)
posRouter.post('/sale/create',posController.createSale)
posRouter.get('/transaction/fetch',posController.fetchTransaction)
posRouter.get('/payment-method/fetch',posController.fetchPaymentMethod)
posRouter.get('/warehouse/fetch',posController.fetchWareHouse)
posRouter.get('/instock-details',posController.fetchInStockTransactionDetails)
posRouter.get('/fetch-instock-invoice',posController.fetchInstockInvoiceList)
posRouter.get('/fetch-sale-invoice',posController.fetchSaleInvoiceList)

export default posRouter;