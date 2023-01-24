import { PrismaClient } from '@prisma/client';
const { supplier } = new PrismaClient();

interface ISupplierEdit {
     supplier_id: string;
     supplier_name: string;
     short_name: string;
     address: string;
     phone: string;
     callback:Function
}

export class Supplier {
     async fetchSupplier({ callback }) {
          await supplier.findMany()
               .then((data) => {
                    callback(null, data)
               })
               .catch((err) => {
                    callback(err, null)
               })
     }

     async createSupplier({ supplier_name, short_name, address, phone, callback }) {
          await supplier.create({
               data: {
                    supplier_name: supplier_name,
                    short_name: short_name,
                    address: address,
                    phone: phone,
               }
          })
               .then((data) => {
                    callback(null, data)
               })
               .catch((err) => {
                    callback(err, null)
               })
     }

     async editSupplier({ supplier_id, supplier_name, address, phone, short_name,callback }: ISupplierEdit) {
          try {
               await supplier.update({
                    where: {
                         id: supplier_id
                    },
                    data: {
                         supplier_name: supplier_name,
                         short_name: short_name,
                         address: address,
                         phone: phone
                    }
               })
               .then((data)=>callback(null,data))
               .catch((err) => callback(err,null))
          } catch (error) {

          }
     }

     async deleteSupplier({supplier_id,callback}){
          console.log(supplier_id);
          await supplier.delete({
               where:{
                    id: supplier_id
               }
          })
          .then((data)=>callback(null,data))
          .catch((err)=>{
               callback(err.meta.cause,null)
          })
     }


}
