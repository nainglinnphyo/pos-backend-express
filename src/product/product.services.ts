import { PrismaClient } from '@prisma/client';
const { product ,productPriceList} = new PrismaClient();

interface IPriceListData{
  product_id: string;
  price_id: string;
  amount: number;
}
interface IProductPriceList {
  data:IPriceListData[],
  callback:any
}
export class Product {

     async createProdcut({ product_code,product_name,category_id,unit_id ,callback }) {
          const productExit = await product.findFirst({
            where:{
              product_code:product_code
            }
          })
          if(productExit){
            callback("Product Code Cann't be Duplicated",null)
          }else{
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
                }
                }
            })
          .then((data)=>{
            callback(null,data)
          })
          .catch((e)=>{
            callback(e,null);
          })
        }
     }

     async fetchProduct({callback}){
      await product.findMany({
        include:{
          Unit:true,
          Category:true,
          ProductPriceList:{
            include:{
              Price:true,
            },
          },
          inStockOnProduct:true,
        }
      })
      .then((data)=>{
        callback(null,data)
      })
      .catch((e)=>{
        callback(e,null)
      })
     }

     async createProductPriceList({data,callback}:IProductPriceList){
        try {
            await productPriceList.createMany({
              data:data,
            })
            .then((data)=>callback(null,data))
            .catch((e)=>callback(e,null))
        } catch (error) {
          
        }
     }
}
