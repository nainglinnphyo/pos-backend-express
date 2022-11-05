import { Request, Response } from 'express';
import { Responser } from '../utilities';
import {Pos} from './pos.service'

const pos = new Pos();
const createInstock = async (req: Request, res: Response) => {
        try {
          const {supplier_id,total,discount,balance,grand_total,instockData,transaction_remark,warehouse_id,paid,payment_method_id} = req.body
          const data = await pos.createInstock({supplier_id,grand_total,total,discount,instockData,warehouse_id,paid,balance,transaction_remark,payment_method_id,callback:(err:any,data:any)=>{
               if(err){
                    return Responser({res,status:400,message:err.message,devMessage:err,body:''})
               }else if(data){
                    return Responser({res,status:201,message:'',devMessage:'',body:data})
               }
          }})
        } catch (error) {
          
        }
}

const fetchTransaction = async (req: Request, res: Response) =>{
     try {
          const data = await pos.fetchTransaction({callback:(err:any,data:any)=>{
               if(err){
                    return Responser({res,status:400,message:err.message,devMessage:err,body:''})
               }else if(data){
                    return Responser({res,status:200,message:'Transcation Fetch Success',devMessage:'',body:data})
               }
          }})
     } catch (error) {
          
     }
}
export const posController = { createInstock,fetchTransaction };
