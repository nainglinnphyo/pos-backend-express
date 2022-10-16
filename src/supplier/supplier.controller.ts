import { Request, Response } from 'express';
import { Responser } from '../utilities';
import {Supplier} from './supplier.service'



const fetchSupplier = async (req: Request, res: Response) => {
     const supplier = new Supplier();
     try {
          const data = await supplier.fetchSupplier({
               callback: (err: any, data: any) => {
                    if (err) {
                         return Responser({
                              res: res,
                              status: 400,
                              body: null,
                              message: "Somethin went wrong with supplier fetch",
                              devMessage: err.message,
                         });
                    } else if (data) {
                         return Responser({
                              res: res,
                              status: 200,
                              body: data,
                              message: "supplier fetch success!",
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
const createSupplier= async (req:Request, res:Response) => {
     const supplier = new Supplier();
     try {
          const {supplier_name,short_name,address,phone} = req.body
          const data = await supplier.createSupplier({
                         supplier_name: supplier_name,
                         short_name: short_name,
                         address: address,
                         phone: phone,
                         callback:(err: any, data: any)=>{
                              if (err) {
                                   return Responser({
                                        res: res,
                                        status: 400,
                                        body: null,
                                        message: "Somethin went wrong with supplier create",
                                        devMessage: err.message,
                                   });
                              } else if (data) {
                                   return Responser({
                                        res: res,
                                        status: 201,
                                        body: data,
                                        message: "supplier create success!",
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
export const supplierController = { fetchSupplier ,createSupplier};
