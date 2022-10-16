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

     async createSupplier({supplier_name,short_name,address,phone,callback}){
          await supplier.create({
               data:{
                    supplier_name:supplier_name,
                    short_name:short_name,
                    address:address,
                    phone:phone,
               }
          })
          .then((data)=>{
               callback(null, data)
          })
          .catch((err) => {
               callback(err,null)
          })
     }

}
