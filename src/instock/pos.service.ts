import { PrismaClient } from '@prisma/client';
import { superLog } from '../utilities/superLog';
const { inStockVoucher,paymentMethod,warehouse, instock, inStockOnProduct, transaction, productPriceList } = new PrismaClient();

interface IInstockData {
     product_id: string;
     total_quantity: number;
     total_amount: number;
     foc: number;
     discount_on_item: number;

}
interface ICreateInstock {
     supplier_id: string;
     total: number;
     grand_total: number;
     discount: number;
     warehouse_id: string;
     instockData: IInstockData[];
     paid: number;
     balance: number;
     transaction_remark: string;
     payment_method_id: string;
     callback: any;
}
export class Pos {

     async createInstock({ supplier_id, total, grand_total, discount, warehouse_id, instockData, paid, balance, transaction_remark, payment_method_id, callback }: ICreateInstock) {
          await inStockVoucher.create({
               data: {
                    supplier_id: supplier_id,
                    warehouse_id: warehouse_id,
                    total: total,
                    grand_total: grand_total,
                    discount: discount,
                    voucher_status: balance === 0 ? 'done' : 'remainder'
               },
          })
               .then(async (inStockVoucherData) => {
                    for (let index = 0; index < instockData.length; index++) {
                         const element = instockData[index];
                         await instock.create({
                              data: {
                                   total_amount: element.total_amount,
                                   total_quantity: element.total_quantity,
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
                                                  increment: element.total_quantity
                                             }
                                        }
                                   })
                              } else {
                                   await inStockOnProduct.create({
                                        data: {
                                             product_id: element.product_id,
                                             quantity: element.total_quantity,
                                             warehouse_id: warehouse_id,
                                        }
                                   })
                              }
                         })
                              .catch((err) => {
                                   callback(err, null)
                              })
                    }
                    await transaction.create({
                         data: {
                              paid: paid,
                              balance: balance,
                              remark: transaction_remark,
                              total: total,
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

     async createSale({ customer_id, total, discount, saleData, paid, balance, transaction_remark, payment_method_id, callback }) {

     }

     async fetchTransaction({ callback }) {
          try {
               await transaction.findMany({ orderBy: { created_at: "desc" }, include: { InStockVoucher: { include: { Supplier: true } } ,Payment_method:true} })
                    .then((data) => callback(null, data))
                    .catch((err: any) => callback(err, null))
          } catch (error) {

          }
     }

     async fetchWareHouse({callback}){
          await warehouse.findMany({orderBy:{created_at:"desc"}})
          .then((data)=> callback(null,data))
          .catch((err)=> callback(err,null))
     }

     async fetchPaymentMethod({callback}){
          await paymentMethod.findMany({orderBy:{created_at:"desc"}})
          .then((data)=> callback(null,data))
          .catch((err)=> callback(err,null))
     }
}
