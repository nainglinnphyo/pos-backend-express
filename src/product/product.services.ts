import { PrismaClient } from '@prisma/client';
const { product ,productPriceList,price} = new PrismaClient();

interface IPriceListData{
  product_id: string;
  price_id: string;
  amount: number;
  callback:Function
}
// interface IProductPriceList {
//   data:IPriceListData[],
//   callback:any
// }
interface IProductEdit {
  id:string;
  product_code:string;
  product_name: string;
  category_id:string;
  unit_id:string;
  purchase_price:number;
  callback:any;
}
interface IProductPriceEdit {
  price_list_id: string;
  amount:number;
  product_id:string;
}
interface IProductPriceListEdit {
  data:IProductPriceEdit[],
  product_id:string;
  callback:Function
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

     async createProductPriceList({product_id,price_id,amount,callback}:IPriceListData){
        try {
            await productPriceList.create({
              data:{
                product_id:product_id,
                price_id:price_id,
                amount:parseInt(amount.toString())
              },
            })
            .then((data)=>callback(null,data))
            .catch((e)=>callback(e,null))
        } catch (error) {
          
        }
     }

     async productEdit({id,product_code,product_name,category_id,unit_id,purchase_price,callback}:IProductEdit){
      try {
          await product.update({
            where:{
              id:id
            },
            data:{
              product_code:product_code,
              product_name:product_name,
              category_id:category_id,
              unit_id:unit_id,
              purchase_price:parseInt(purchase_price.toString()),
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

     async editProductPrice({data,callback}:IProductPriceListEdit){
        try {
          let resData:any = []
            for (let index = 0; index < data.length; index++) {
              const element = data[index];
               await productPriceList.update({
                where:{
                  id:element.price_list_id
                },
                data:{
                  amount:parseInt(element.amount.toString())
               }
              })
              .then((data)=>resData.push(data))
              .catch((err)=> callback(err,null))
            }
            callback(null,resData)
        } catch (error) {
          
        }
     }

}
