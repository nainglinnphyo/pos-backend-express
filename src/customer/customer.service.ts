import { PrismaClient } from '@prisma/client';
import { ICustomerCreate, ICustomerEdit } from '../@types/customer';
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

     async createCustomer({customer_name,short_name,phone,address,callback}:ICustomerCreate){
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

     async editCustomer({customer_id,customer_name,short_name,phone,address,callback}:ICustomerEdit){
          await customer.update({
               where:{
                    id:customer_id
               },
               data:{
                    customer_name: customer_name,
                    short_name: short_name,
                    address:address,
                    phone:phone,
               }
          })
          .then((data)=>callback(null,data))
          .catch((err)=>callback(err,null))
     }

}
