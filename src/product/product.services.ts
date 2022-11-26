import { PrismaClient } from '@prisma/client';
const { product ,productPriceList,price} = new PrismaClient();

interface IPriceListData{
  product_id: string;
  price_id: string;
  amount: number;
}
interface IProductPriceList {
  data:IPriceListData[],
  callback:any
}
interface IProductEdit {
  id:string;
  product_code:string;
  product_name: string;
  category_id:string;
  unit_id:string;
  callback:any;
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

     async productEdit({id,product_code,product_name,category_id,unit_id,callback}:IProductEdit){
      try {
          await product.update({
            where:{
              id:id
            },
            data:{
              product_code:product_code,
              product_name:product_name,
              category_id:category_id,
              unit_id:unit_id
            }
          })
          .then((data)=>callback(null,data))
          .catch((e)=>callback(e,null))
      } catch (error) {
        
      }
     }

     async fetchProductPriceList({product_id,callback}) {
        try {
            await productPriceList.findMany({
              where:{
                product_id:product_id
              },
              include:{
                Price:true,
              }
            })
            .then((data)=>callback(null,data))
            .catch((err)=> callback(err,null))
        } catch (error) {
          
        }
     }

     async fetchPriceList({product_id,callback}){
      await price.findMany({
        where:{
          NOT:{
            ProductPriceList:{
              some:{
                product_id:product_id
              }
            }
          }
        }
      })
      .then((data)=>callback(null,data))
      .catch((err)=> callback(err,null))
     }

}
