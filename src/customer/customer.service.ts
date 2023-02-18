import { PrismaClient } from '@prisma/client';
import { ICustomerCreate, ICustomerEdit } from '../@types/customer';
const { customer } = new PrismaClient();

export class Customer {
     async fetchCustomer({ callback }) {
          await customer.findMany({
               include: {
                    SaleVoucher: true,
               }
          })
               .then((data) => {
                    callback(null, data)
               })
               .catch((err) => {
                    callback(err, null)
               })
     }

     async addBalance({ id, amount, callback }) {
          await customer.update({
               where: {
                    id: id
               },
               data: {
                    balance: {
                         increment: parseInt(amount)
                    }
               }

          })
               .then((data) => {
                    callback(null, data)
               })
               .catch((err) => {
                    callback(err, null)
               })
     }

     async createCustomer({ customer_name, short_name, phone, address, price_id, callback }: ICustomerCreate) {
          await customer.create({
               data: {
                    pirce_id: price_id,
                    customer_name: customer_name,
                    short_name: short_name,
                    phone: phone,
                    address: address
               }
          })
               .then((data) => {
                    callback(null, data)
               })
               .catch((err) => {
                    callback(err, null)
               })
     }

     async deleteCustomer({ customer_id, callback }) {
          await customer.delete({
               where: {
                    id: customer_id
               }
          })
               .then((data) => callback(null, data))
               .catch((err) => {
                    callback(err.meta.cause, null)
               })
     }

     async editCustomer({ customer_id, customer_name, short_name, phone, address, price_id, callback }: ICustomerEdit) {
          await customer.update({
               where: {
                    id: customer_id
               },
               data: {
                    pirce_id: price_id,
                    customer_name: customer_name,
                    short_name: short_name,
                    address: address,
                    phone: phone,
               }
          })
               .then((data) => callback(null, data))
               .catch((err) => callback(err, null))
     }

}
