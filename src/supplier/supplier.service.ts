import { PrismaClient } from '@prisma/client';
const { supplier } = new PrismaClient();

export class Supplier {
     async fetchSupplier({callback }) {
          await supplier.findMany()
          .then((data)=>{
               callback(null, data)
          })
          .catch((err) => {
               callback(err,null)
          })
     }

}