import { PrismaClient } from '@prisma/client';
const { customer } = new PrismaClient();

export class Customer {
     async fetchCustomer({callback }) {
          await customer.findMany()
          .then((data)=>{
               callback(null, data)
          })
          .catch((err) => {
               callback(err,null)
          })
     }

     async createCustomer({customer_name,short_name,phone,address,callback}){
          await customer.create({
               data:{
                    customer_name:customer_name,
                    short_name:short_name,
                    phone:phone,
                    address: address
               }
          })
          .then((data)=>{
               callback(null, data)
          })
          .catch((err) => {
               callback(err,null)
          })
     }

     async deleteCustomer({customer_id,callback}){
          await customer.delete({
               where:{
                    id: customer_id
               }
          })
          .then((data)=>callback(null,data))
          .catch((err)=>{
               callback(err.meta.cause,null)
          })
     }

}
