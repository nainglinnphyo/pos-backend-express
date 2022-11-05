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
          await category.findMany({orderBy:{category_name:"asc"}})
          .then((data)=>{
            callback(null,data)
          })
          .catch((e)=>{
            callback(e,null);
          })
     }

}
