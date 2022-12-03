import { PrismaClient } from '@prisma/client';
import { superLog } from '../utilities/superLog';
const { inStockVoucher, paymentMethod, warehouse, instock, inStockOnProduct, transaction, productPriceList, saleVoucher, saleItem } = new PrismaClient();

interface IInstockData {
     product_id: string;
     total_quantity: number;
     total_amount: number;
     foc: number;
     discount_on_item: number;

}

interface ISaleData {
     product_id: string;
     total_quantity: number;
     total_amount: number;

}
interface ICreateInstock {
     supplier_id: string;
     parseIntTotal: number;
     parseIntGrandTotal: number;
     parseIntDiscount: number;
     warehouse_id: string;
     instockData: IInstockData[];
     parseIntPaid: number;
     parseIntBalance: number;
     transaction_remark: string;
     payment_method_id: string;
     callback: any;
}

interface ICreateSale {
     customer_id: string;
     parseIntTotal: number;
     parseIntGrandTotal: number;
     parseIntDiscount: number;
     saleData: ISaleData[];
     parseIntPaid: number;
     parseIntBalance: number;
     transaction_remark: string;
     payment_method_id: string;
     callback: any;
}
export class Pos {

     async createInstock({ supplier_id, parseIntTotal, parseIntGrandTotal, parseIntDiscount, warehouse_id, instockData, parseIntPaid, parseIntBalance, transaction_remark, payment_method_id, callback }: ICreateInstock) {
          await inStockVoucher.create({
               data: {
                    supplier_id: supplier_id,
                    warehouse_id: warehouse_id,
                    total: parseIntTotal,
                    grand_total: parseIntGrandTotal,
                    discount: parseIntDiscount,
                    voucher_status: parseIntBalance === 0 ? 'done' : 'remainder',
                    balance: parseIntBalance
               },
          })
               .then(async (inStockVoucherData) => {
                    for (let index = 0; index < instockData.length; index++) {
                         const element: IInstockData = instockData[index];
                         await instock.create({
                              data: {
                                   total_amount: parseInt(element.total_amount.toString()),
                                   total_quantity: parseInt(element.total_quantity.toString()),
                                   foc: element.foc,
                                   discount_on_item: element.discount_on_item,
                                   product_id: element.product_id,
                                   instock_voucher_id: inStockVoucherData.id,
                              }
                         }).then(async (data) => {
                              const instockOnProductData = await inStockOnProduct.findFirst({
                                   where: {
                                        product_id: element.product_id,
                                        warehouse_id: warehouse_id,
                                   }
                              })
                              if (instockOnProductData) {
                                   await inStockOnProduct.update({
                                        where: {
                                             id: instockOnProductData.id,
                                        },
                                        data: {
                                             quantity: {
                                                  increment: parseInt(element.total_quantity.toString())
                                             }
                                        }
                                   })
                              } else {
                                   await inStockOnProduct.create({
                                        data: {
                                             product_id: element.product_id,
                                             quantity: parseInt(element.total_quantity.toString()),
                                             warehouse_id: warehouse_id,
                                        }
                                   })
                              }
                         })
                              .catch((err) => {
                                   console.log(err)
                                   callback(err, null)
                              })
                    }
                    await transaction.create({
                         data: {
                              paid: parseIntPaid,
                              balance: parseIntBalance,
                              remark: transaction_remark,
                              total: parseIntTotal,
                              payment_method_id: payment_method_id,
                              instock_voucher_id: inStockVoucherData.id
                         }
                    })
                         .then(async () => {
                              const returnData = await inStockVoucher.findUnique({ where: { id: inStockVoucherData.id }, include: { Instock: true, Transaction: true } })
                              callback(null, returnData)
                         })
               })
               .catch((err) => callback(err, null))
     }

     async createSale({ customer_id, parseIntTotal, parseIntGrandTotal, parseIntDiscount, saleData, parseIntPaid, parseIntBalance, transaction_remark, payment_method_id, callback }: ICreateSale) {
          await saleVoucher.create({
               data: {
                    customer_id: customer_id,
                    total: parseIntTotal,
                    grand_total: parseIntGrandTotal,
                    discount: parseIntDiscount,
                    voucher_status: parseIntBalance === 0 ? 'done' : 'remainder',
                    balance: parseIntBalance
               },
          })
               .then(async (saleVoucherData) => {
                    for (let index = 0; index < saleData.length; index++) {
                         const element: ISaleData = saleData[index];
                         await saleItem.create({
                              data: {
                                   total_amount: parseInt(element.total_amount.toString()),
                                   total_quantity: parseInt(element.total_quantity.toString()),
                                   product_id: element.product_id,
                                   sale_voucher_id: saleVoucherData.id,
                              }
                         }).then(async (data) => {
                              await inStockOnProduct.findFirst({
                                   where: {
                                        product_id: element.product_id,
                                   }
                              })
                                   .then(async (stockData) => {
                                        await inStockOnProduct.update({
                                             where: {
                                                  id: stockData?.id,
                                             },
                                             data: {
                                                  quantity: {
                                                       decrement: parseInt(element.total_quantity.toString())
                                                  }
                                             }
                                        })
                                   })

                         })
                              .catch((err) => {
                                   console.log(err)
                                   callback(err, null)
                              })
                    }
                    await transaction.create({
                         data: {
                              paid: parseIntPaid,
                              balance: parseIntBalance,
                              remark: transaction_remark,
                              total: parseIntTotal,
                              payment_method_id: payment_method_id,
                              sale_voucher_id: saleVoucherData.id
                         }
                    })
                         .then(async () => {
                              const returnData = await saleVoucher.findUnique({ where: { id: saleVoucherData.id }, include: { SaleItem: true, Transaction: true } })
                              callback(null, returnData)
                         })
               })
               .catch((err) => callback(err, null))
     }

     async fetchTransaction({ callback }) {
          try {
               await transaction.findMany({ orderBy: { created_at: "desc" }, include: { InStockVoucher: { include: { Supplier: true } }, Payment_method: true } })
                    .then((data) => callback(null, data))
                    .catch((err: any) => callback(err, null))
          } catch (error) {

          }
     }

     async fetchWareHouse({ callback }) {
          await warehouse.findMany({ orderBy: { created_at: "desc" } })
               .then((data) => callback(null, data))
               .catch((err) => callback(err, null))
     }

     async fetchPaymentMethod({ callback }) {
          await paymentMethod.findMany({ orderBy: { created_at: "desc" } })
               .then((data) => callback(null, data))
               .catch((err) => callback(err, null))
     }

     async fetchInStockTransactionDetails({ transaction_id, callback }) {
          await transaction.findUnique({
               where: {
                    id: transaction_id
               },
               include: {
                    InStockVoucher: {
                         include: {
                              Instock: {
                                   include: { Product: true }
                              },
                              Supplier: true,
                              Warehouse: true
                         }
                    },
                    Payment_method: true,
               }
          })
               .then((data) => callback(null, data))
               .catch((err) => callback(err, null))
     }

     async fetchInstockInvoiceList({ callback }) {
          await inStockVoucher.findMany({
               include: {
                    Transaction: true,
                    Instock: {
                         include: {
                              Product: true
                         }
                    },
                    Supplier: true
               },
               orderBy: {
                    created_at: "desc"
               }
          })
               .then((data) => callback(null, data))
               .catch((err) => callback(err, null))
     }

     async fetchSaleInvoiceList({ callback }) {
          await saleVoucher.findMany({
               include: {
                    Transaction: true,
                    SaleItem: {
                         include:{
                              Product:true
                         }
                    },
                    Customer: true
               },
               orderBy: {
                    created_at: "desc"
               }
          })
               .then((data) => callback(null, data))
               .catch((err) => callback(err, null))
     }

}
