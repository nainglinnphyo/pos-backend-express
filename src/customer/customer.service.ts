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

}
