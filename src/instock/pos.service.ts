import { PrismaClient } from '@prisma/client';
import moment from 'moment';
import { superLog } from '../utilities/superLog';
const { inStockVoucher, paymentMethod, product, customer, saleTransaction, warehouse, instock, inStockOnProduct, transaction, productPriceList, saleVoucher, saleItem } = new PrismaClient();

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
     product_price_id: string;

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

function formatDate(date: any) {
     var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();

     if (month.length < 2)
          month = '0' + month;
     if (day.length < 2)
          day = '0' + day;
     date = month + '/' + day + '/' + year;
     return date

}
function Last10Days() {
     var result: any = [];
     for (var i = 0; i < 10; i++) {
          var d = new Date();
          d.setDate(d.getDate() - i);
          result.push(formatDate(d))
     }

     return (result.join(','));
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

     async createSale({ customer_id, parseIntTotal, parseIntGrandTotal, parseIntDiscount, saleData, parseIntPaid, parseIntBalance, transaction_remark, callback }: ICreateSale) {
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

                    await saleTransaction.create({
                         data: {
                              amount: parseIntPaid || 0,
                              sale_voucher_id: saleVoucherData?.id
                         }
                    });
                    for (let index = 0; index < saleData.length; index++) {
                         const element: ISaleData = saleData[index];
                         await saleItem.create({
                              data: {
                                   total_amount: parseInt(element.total_amount.toString()),
                                   total_quantity: parseInt(element.total_quantity.toString()),
                                   product_id: element.product_id,
                                   sale_voucher_id: saleVoucherData.id,
                                   product_price_id: element.product_price_id
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

                    const returnData = await saleVoucher.findUnique({ where: { id: saleVoucherData.id }, include: { SaleItem: true, Transaction: true } })
                    callback(null, returnData)
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
                         include: {
                              Product: true
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

     async dashboardData({ callback }) {
          let resData: any = {}
          const tenDays = Last10Days().split(",");
          let saleData: any = []
          let dbdSale: any = []
          let dbdInstock: any = []
          for (let index = 0; index < tenDays.length; index++) {
               const element = tenDays[index];
               const count = await saleVoucher.count({
                    where: {
                         created_at: {
                              gte: new Date(moment(element, "MM-DD-YYYY HH:mm:ss UTC").format("YYYY-MM-DD HH:mm:ss UTC")),
                              lte: new Date(moment(element, "MM-DD-YYYY HH:mm:ss UTC").add(moment.duration(24, "hours")).format("YYYY-MM-DD HH:mm:ss UTC"))
                         },
                    }
               })
               dbdSale.push(count)
               const instockCount = await inStockVoucher.count({
                    where: {
                         created_at: {
                              gte: new Date(moment(element, "MM-DD-YYYY HH:mm:ss UTC").format("YYYY-MM-DD HH:mm:ss UTC")),
                              lte: new Date(moment(element, "MM-DD-YYYY HH:mm:ss UTC").add(moment.duration(24, "hours")).format("YYYY-MM-DD HH:mm:ss UTC"))
                         },
                    }
               })
               dbdInstock.push(instockCount)
               saleData.push({ label: element, value: count })
          }
          resData.saleData = saleData.reverse()
          resData.saleAndInstockCount = {
               date: tenDays.reverse(),
               saleCount: dbdSale.reverse(),
               instockCount: dbdInstock.reverse()
          }

          //top sale product
          const topSale = await product.findMany({
               include: {
                    _count: {
                         select: { SaleItem: true }
                    }
               },
               // by:['id'],
               where: {
                    SaleItem: {
                         some: {}
                    }
               },
               orderBy: {
                    SaleItem: {
                         _count: "desc"
                    }
               },
               take: 5

          })

          const topCustomers = await saleVoucher.groupBy({
               by: ["customer_id"],
               orderBy: {
                    _sum: {
                         grand_total: "desc"
                    }
               },
               _sum: {
                    grand_total: true,
               },
               take: 5

          })
          let topCusData: any = [];
          for (let index = 0; index < topCustomers.length; index++) {
               const element = topCustomers[index];
               const cs = await customer.findUnique({
                    where: {
                         id: element.customer_id
                    },
                    select: {
                         customer_name: true,
                         short_name: true
                    }
               })
               const voucherCount = await saleVoucher.count({
                    where: {
                         customer_id: element.customer_id
                    }
               })
               topCusData.push({ customer: cs, totalPaid: element._sum, voucherCount: voucherCount })
          }
          resData.topCustomers = topCusData
          resData.topSale = topSale
          callback(null, resData)
     }

     async fetchSaleTransaction({ saleVoucherId }) {
          return saleTransaction.findMany({
               where: {
                    sale_voucher_id: saleVoucherId
               }
          })
     }

     async createSaleTransaction({ saleVoucherId, amount }) {
          const data = await saleTransaction.create({
               data: {
                    amount: parseInt(amount),
                    sale_voucher_id: saleVoucherId
               }
          })

          const updateSaleVocher = await saleVoucher.update({
               where: {
                    id: saleVoucherId
               },
               data: {
                    balance: {
                         decrement: parseInt(amount)
                    }
               }
          })
          if (updateSaleVocher.balance === 0) {
               const updateSaleVocher = await saleVoucher.update({
                    where: {
                         id: saleVoucherId
                    },
                    data: {
                         voucher_status: "done"
                    }
               })
          }
          return saleVoucher.findFirst({ where: { id: saleVoucherId } })
     }

     async fetchSaleInvoiceDetails({ invoiceId }) {
          return saleVoucher.findFirst({
               where: {
                    id: invoiceId
               },
               include: {
                    Customer: true,
                    SaleItem: {
                         include: {
                              Product: {
                                   include: {
                                        Unit: true
                                   }
                              },
                              ProductPriceList: {
                                   include: {
                                        Price: true
                                   }
                              },

                         }
                    },
                    SaleTransaction: true,
               }
          })
     }

}
