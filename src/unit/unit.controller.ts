import { Request, Response } from 'express';
import { Responser } from '../utilities';
import { Unit } from './unit.services';

interface IUnitCreate {
     unit_name: string;
}

const unit = new Unit();


const createUnit = async (req: Request, res: Response) => {
     try {
          const { unit_name }: IUnitCreate = req.body;
          const data = await unit.createUnit({
               unit_name,
               callback: (err: any, data: any) => {
                    if (err) {
                         return Responser({
                              res: res,
                              status: 400,
                              body: null,
                              message: err,
                              devMessage: err,
                         });
                    } else if (data) {
                         return Responser({
                              res: res,
                              status: 201,
                              body: data,
                              message: "Unit Create Success!",
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

const editUnit = async (req: Request, res: Response) => {
     try {
          const { unit_name } = req.body;
          const {unit_id} = req.params;
          const data = await unit.editUnit({
               unit_id,unit_name,
               callback: (err: any, data: any) => {
                    if (err) {
                         return Responser({
                              res: res,
                              status: 400,
                              body: null,
                              message: err,
                              devMessage: err,
                         });
                    } else if (data) {
                         return Responser({
                              res: res,
                              status: 201,
                              body: data,
                              message: "Unit Edit Success!",
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

const fetchUnit = async(req:Request, res: Response) =>{
     try {
          const data = await unit.fetchUnit({
                callback: (err: any, data: any) => {
                     if (err) {
                          return Responser({
                               res: res,
                               status: 400,
                               body: null,
                               message: err,
                               devMessage: err,
                          });
                     } else if (data) {
                          return Responser({
                               res: res,
                               status: 201,
                               body: data,
                               message: "Unit Fetch Success!",
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

export const unitController = { fetchUnit,createUnit,editUnit};
