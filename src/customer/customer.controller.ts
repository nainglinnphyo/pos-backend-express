import { Request, Response } from 'express';
import { Responser } from '../utilities';
import { Customer } from './customer.service'



const fetchCustomer = async (req: Request, res: Response) => {
     const customer = new Customer();
     try {
          const data = await customer.fetchCustomer({
               callback: (err: any, data: any) => {
                    if (err) {
                         return Responser({
                              res: res,
                              status: 400,
                              body: null,
                              message: "Somethin went wrong with customer fetch",
                              devMessage: err.message,
                         });
                    } else if (data) {
                         return Responser({
                              res: res,
                              status: 200,
                              body: data,
                              message: "customer fetch success!",
                              devMessage: "",
                         });
                    } else {
                         return Responser({
                              res: res,
                              status: 500,
                              body: null,
                              message: err,
                              devMessage: err.message,
                         });
                    }
               }
          })
     } catch (error) {
          return Responser({
               res: res,
               status: 500,
               body: null,
               message: error,
               devMessage: error.message,
          });
     }

}

const addBalance = async (req: Request, res: Response) => {
     const customer = new Customer();
     const { id, amount } = req.body
     try {
          const data = await customer.addBalance({
               id, amount,
               callback: (err: any, data: any) => {
                    if (err) {
                         return Responser({
                              res: res,
                              status: 400,
                              body: null,
                              message: "Somethin went wrong with customer fetch",
                              devMessage: err.message,
                         });
                    } else if (data) {
                         return Responser({
                              res: res,
                              status: 200,
                              body: data,
                              message: "Balance add success!",
                              devMessage: "",
                         });
                    } else {
                         return Responser({
                              res: res,
                              status: 500,
                              body: null,
                              message: err,
                              devMessage: err.message,
                         });
                    }
               }
          })
     } catch (error) {
          return Responser({
               res: res,
               status: 500,
               body: null,
               message: error,
               devMessage: error.message,
          });
     }

}

const createCustomer = async (req: Request, res: Response) => {
     const customer = new Customer();
     try {
          const { customer_name, short_name, phone, address, price_id } = req.body
          const data = await customer.createCustomer({
               customer_name, short_name, phone, address, price_id,
               callback: (err: any, data: any) => {
                    if (err) {
                         return Responser({
                              res: res,
                              status: 400,
                              body: null,
                              message: "Somethin went wrong with customer create",
                              devMessage: err.message,
                         });
                    } else if (data) {
                         return Responser({
                              res: res,
                              status: 200,
                              body: data,
                              message: "customer create success!",
                              devMessage: "",
                         });
                    } else {
                         return Responser({
                              res: res,
                              status: 500,
                              body: null,
                              message: err,
                              devMessage: err.message,
                         });
                    }
               }
          })
     } catch (error) {
          return Responser({
               res: res,
               status: 500,
               body: null,
               message: error,
               devMessage: error.message,
          });
     }
}

const deleteCustomer = async (req: Request, res: Response) => {
     const customer = new Customer();
     try {
          const { customer_id } = req.params
          const data = await customer.deleteCustomer({
               customer_id,
               callback: (err: any, data: any) => {
                    if (err) {
                         return Responser({
                              res: res,
                              status: 400,
                              body: null,
                              message: "Somethin went wrong with customer delete",
                              devMessage: err,
                         });
                    } else if (data) {
                         return Responser({
                              res: res,
                              status: 200,
                              body: data,
                              message: "customer delete success!",
                              devMessage: "",
                         });
                    } else {
                         return Responser({
                              res: res,
                              status: 500,
                              body: null,
                              message: err,
                              devMessage: err.message,
                         });
                    }
               }
          })
     } catch (error) {
          return Responser({
               res: res,
               status: 500,
               body: null,
               message: error,
               devMessage: error.message,
          });
     }
}

const editCustomer = async (req: Request, res: Response) => {
     const customer = new Customer();
     try {
          const { customer_id } = req.params
          const { customer_name, short_name, phone, address, price_id } = req.body
          const data = await customer.editCustomer({
               customer_id, customer_name, short_name, phone, address, price_id,
               callback: (err: any, data: any) => {
                    if (err) {
                         return Responser({
                              res: res,
                              status: 400,
                              body: null,
                              message: "Somethin went wrong with customer edit",
                              devMessage: err,
                         });
                    } else if (data) {
                         return Responser({
                              res: res,
                              status: 200,
                              body: data,
                              message: "customer edit success!",
                              devMessage: "",
                         });
                    } else {
                         return Responser({
                              res: res,
                              status: 500,
                              body: null,
                              message: err,
                              devMessage: err.message,
                         });
                    }
               }
          })
     } catch (error) {
          return Responser({
               res: res,
               status: 500,
               body: null,
               message: error,
               devMessage: error.message,
          });
     }
}


export const customerController = { fetchCustomer, createCustomer, deleteCustomer, editCustomer ,addBalance};
