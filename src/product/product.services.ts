import { PrismaClient } from '@prisma/client';
const { product } = new PrismaClient();

export class Product {
     async createProdcut({ product_code,product_name,category_id,unit_id,amount,price_id ,callback }) {
          await product.create({
            data:{
                product_code:product_code,
                product_name:product_name,
                Category:{
                    connect:{
                        id:category_id
                    }
                },
                Unit:{
                  connect:{
                        id:unit_id
                    }
                },
                // ProductPriceList:{
                //   create:{
                //     price_id:price_id,
                //     amount:amount
                //   }
                // }
                }
            })
          .then((data)=>{
            callback(null,data)
          })
          .catch((e)=>{
            callback(e,null);
          })
     }

     async fetchProduct({callback}){
      await product.findMany({
        include:{
          Unit:true,
          Category:true,
          ProductPriceList:{
            include:{
              Price:true,
            }
          }
        }
      })
      .then((data)=>{
        callback(null,data)
      })
      .catch((e)=>{
        callback(e,null)
      })
     }

}
