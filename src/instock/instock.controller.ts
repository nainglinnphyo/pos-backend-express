import { Request, Response } from 'express';
import { Responser } from '../utilities';
import {Instock} from './instock.service'

interface IProduct{
     instock: [];
     warehouse_id:string;
     supplier_id:string;
     
}

const fetchWarehouse =  async (req: Request, res: Response)=>{
     const instock = new Instock();
     try {
          const data = await instock.fetchWarehouse({callback:(err: any, data: any)=>{
               if (err) {
                    return Responser({
                         res: res,
                         status: 400,
                         body: null,
                         message: "Somethin went wrong with warehouse fetch",
                         devMessage: err.message,
                    });
               } else if (data) {
                    return Responser({
                         res: res,
                         status: 200,
                         body: data,
                         message: "Warehouse Fetch Success!",
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
          }})
     } catch (error) {
          
     }
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
                              message: "Somethin went wrong with instock create",
                              devMessage: err.message,
                         });
                    } else if (data) {
                         return Responser({
                              res: res,
                              status: 201,
                              body: data,
                              message: "Instock Create Success!",
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

const fetchStockRecord = async (req: Request, res: Response) => {
     const inStock = new Instock();
     try {
          const data = await inStock.fetchStockRecord({
               callback:(err: any, data: any)=>{
                    if (err) {
                         return Responser({
                              res: res,
                              status: 400,
                              body: null,
                              message: "Somethin went wrong with instock fetch",
                              devMessage: err.message,
                         });
                    } else if (data) {
                         return Responser({
                              res: res,
                              status: 201,
                              body: data,
                              message: "Instock fetch Success!",
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
          
     }
}

export const instockController = { createInstock,fetchWarehouse ,fetchStockRecord};
