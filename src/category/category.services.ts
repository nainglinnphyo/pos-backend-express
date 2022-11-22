import { PrismaClient } from '@prisma/client';
const { category } = new PrismaClient();

export class Category {
     async createCategory({ category_name, callback }) {
      // console.log(category_name,category_name);
          await category.create({data:{category_name:category_name}})
          .then((data)=>{
            callback(null,data)
          })
          .catch((e)=>{
            callback(e,null);
          })
     }

     async fetchCategory({callback }) {
      // console.log(category_name,category_name);
          await category.findMany({orderBy:{created_at:"desc"}})
          .then((data)=>{
            callback(null,data)
          })
          .catch((e)=>{
            callback(e,null);
          })
     }

     async deleteCategory({id,callback}) {
          await category.findFirst({
            where:{
              id:id,
              Product:{
                none:{}
              }
            }
          })
          .then(async(data)=>{
            await category.delete({where:{id:data?.id}})
            .then((res)=> callback(null,res))
            .catch((err)=>callback(err,null))
          })
          .catch((err)=>callback(err,null))
     }

     async editCategory({id,category_name,callback}) {
      await category.update({
        where:{
          id:id,
        },
        data:{
          category_name:category_name
        }
      })
      .then(async(data)=>{
       callback(null,data)
      })
      .catch((err)=>callback(err,null))
 }

}
