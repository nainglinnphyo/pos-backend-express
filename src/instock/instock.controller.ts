import { Request, Response } from 'express';
import { Responser } from '../utilities';
import {Instock} from './instock.service'

interface IProduct{
     instock: [];
     warehouse_id:string;
     supplier_id:string;
     
}

const createInstock = async (req: Request, res: Response) => {
     const inStock = new Instock();
     try {
          const { warehouse_id,supplier_id,instock}: IProduct = req.body;
          const data = await inStock.createInstock({
               warehouse_id,supplier_id,instock,
               callback: (err: any, data: any) => {
                    if (err) {
                         return Responser({
                              res: res,
                              status: 400,
                              body: null,
                              message: "Somethin went wrong with product create",
                              devMessage: err.message,
                         });
                    } else if (data) {
                         return Responser({
                              res: res,
                              status: 201,
                              body: data,
                              message: "Product Create Success!",
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


export const instockController = { createInstock };
