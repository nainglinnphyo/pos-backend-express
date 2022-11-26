import { PrismaClient } from '@prisma/client';
const { unit } = new PrismaClient();

export class Unit {
     async createUnit({ unit_name, callback }) {
          await unit.create({data:{unit_name:unit_name}})
          .then((data)=>{
            callback(null,data)
          })
          .catch((e)=>{
            callback(e,null);
          })
     }

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
