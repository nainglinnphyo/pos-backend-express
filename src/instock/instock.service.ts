import { PrismaClient } from '@prisma/client';
const { inStock,batch,instockOnProduct,warehouse } = new PrismaClient();

export class Instock {
     async fetchWarehouse({callback}){
           await warehouse.findMany()
           .then((data)=>{
               callback(null, data)
           })
           .catch((error)=>{
               callback(error,null);
           })
     }
     async createInstock({warehouse_id,supplier_id,instock,callback }) {
          if(instock.length > 0){
               const batchData = await batch.create({
                    data:{
                         batch_name:new Date().getTime().toString(),
                    }
               })
               let instockData:any = []
               for (let index = 0; index < instock.length; index++) {
                    const element = instock[index];

                    await inStock.create({
                         data:{
                              supplier_id:supplier_id,
                              product_id:element.product_id,
                              quantity:element.quantity,
                              batch_id:batchData.id
                         }
                    })
                    const instockOnProductData = await instockOnProduct.findFirst({
                         where:{
                              product_id:element.product_id,
                              warehouse_id:warehouse_id,
                         }
                    })

                    if(instockOnProductData){
                         const data = await instockOnProduct.update({
                              where:{
                                   id:instockOnProductData.id,
                              },
                              data:{
                                   total_quantity:{
                                        increment:element.quantity
                                   }
                              }
                         })
                         instockData.push(data)
                    }else{
                         const data = await instockOnProduct.create({
                              data:{
                                   product_id:element.product_id,
                                   total_quantity:element.quantity,
                                   warehouse_id:warehouse_id,
                              }
                         })
                         instockData.push(data)
                    }
               }
               callback(null, instockData)
          }else{
               callback("Error", null)
          }
     }

}
