import { PrismaClient } from '@prisma/client';
const { unit } = new PrismaClient();

export class Unit {
    //  async createCategory({ category_name, callback }) {
    //   // console.log(category_name,category_name);
    //       await category.create({data:{category_name:category_name}})
    //       .then((data)=>{
    //         callback(null,data)
    //       })
    //       .catch((e)=>{
    //         callback(e,null);
    //       })
    //  }

     async fetchUnit({callback }) {
      // console.log(category_name,category_name);
          await unit.findMany({orderBy:{unit_name:"asc"}})
          .then((data)=>{
            callback(null,data)
          })
          .catch((e)=>{
            callback(e,null);
          })
     }

}
