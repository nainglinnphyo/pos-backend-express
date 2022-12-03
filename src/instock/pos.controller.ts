import { Request, Response } from 'express';
import { Responser } from '../utilities';
import {Pos} from './pos.service'

const pos = new Pos();
const createInstock = async (req: Request, res: Response) => {
        try {
          const {supplier_id,total,discount,balance,grand_total,instockData,transaction_remark,warehouse_id,paid,payment_method_id} = req.body
          const parseIntTotal = parseInt(total)
          const parseIntDiscount = parseInt(discount)
          const parseIntBalance = parseInt(balance)
          const parseIntGrandTotal = parseInt(grand_total)
          const parseIntPaid = parseInt(paid)
          const data = await pos.createInstock({supplier_id,parseIntGrandTotal,parseIntTotal,parseIntDiscount,instockData,warehouse_id,parseIntPaid,parseIntBalance,transaction_remark,payment_method_id,callback:(err:any,data:any)=>{
               if(err){
                    return Responser({res,status:400,message:err.message,devMessage:err,body:''})
               }else if(data){
                    return Responser({res,status:201,message:'Instock Success',devMessage:'',body:data})
               }
          }})
        } catch (error) {
          
        }
}

const createSale = async (req: Request, res: Response) => {
     try {
       const {customer_id,total,discount,balance,grand_total,saleData,transaction_remark,paid,payment_method_id} = req.body
       const parseIntTotal = parseInt(total)
       const parseIntDiscount = parseInt(discount)
       const parseIntBalance = parseInt(balance)
       const parseIntGrandTotal = parseInt(grand_total)
       const parseIntPaid = parseInt(paid)
       const data = await pos.createSale({customer_id,parseIntGrandTotal,parseIntTotal,parseIntDiscount,saleData,parseIntPaid,parseIntBalance,transaction_remark,payment_method_id,callback:(err:any,data:any)=>{
            if(err){
                 return Responser({res,status:400,message:err.message,devMessage:err,body:''})
            }else if(data){
                 return Responser({res,status:201,message:'Sale Success',devMessage:'',body:data})
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

const fetchWareHouse = async (req: Request, res: Response) =>{
     try {
          const data = await pos.fetchWareHouse({callback:(err:any,data:any)=>{
               if(err){
                    return Responser({res,status:400,message:err.message,devMessage:err,body:''})
               }else if(data){
                    return Responser({res,status:200,message:'Warehouse Fetch Success',devMessage:'',body:data})
               }
          }})
     } catch (error) {
          
     }
}

const fetchPaymentMethod = async (req: Request, res: Response) =>{
     try {
          const data = await pos.fetchPaymentMethod({callback:(err:any,data:any)=>{
               if(err){
                    return Responser({res,status:400,message:err.message,devMessage:err,body:''})
               }else if(data){
                    return Responser({res,status:200,message:'Payment Method Fetch Success',devMessage:'',body:data})
               }
          }})
     } catch (error) {
          
     }
}

const fetchInStockTransactionDetails = async (req: Request, res: Response) =>{
     try {
          const {transaction_id} = req.query
          const data = await pos.fetchInStockTransactionDetails({transaction_id,callback:(err:any,data:any)=>{
               if(err){
                    return Responser({res,status:400,message:err.message,devMessage:err,body:''})
               }else if(data){
                    return Responser({res,status:200,message:'Instock Details Fetch Success',devMessage:'',body:data})
               }
          }})
     } catch (error) {
          
     }
}

const fetchInstockInvoiceList = async (req:Request, res:Response) => {
     try {
          const data = await pos.fetchInstockInvoiceList({
               callback:(err:any,data:any)=>{
                    if(err){
                         return Responser({res,status:400,message:err.message,devMessage:err,body:''})
                    }else if(data){
                         return Responser({res,status:200,message:'Instock invoice fetch Success',devMessage:'',body:data})
                    }
               }
          })
     } catch (error) {
          
     }
}

const fetchSaleInvoiceList = async (req:Request, res:Response) => {
     try {
          const data = await pos.fetchSaleInvoiceList({
               callback:(err:any,data:any)=>{
                    if(err){
                         return Responser({res,status:400,message:err.message,devMessage:err,body:''})
                    }else if(data){
                         return Responser({res,status:200,message:'Sale invoice fetch Success',devMessage:'',body:data})
                    }
               }
          })
     } catch (error) {
          
     }
}

const dashboardData = async (req:Request, res:Response) => {
     try {
          const data = await pos.dashboardData({
               callback:(err:any,data:any)=>{
                    if(err){
                         return Responser({res,status:400,message:err.message,devMessage:err,body:''})
                    }else if(data){
                         return Responser({res,status:200,message:'fetch Success',devMessage:'',body:data})
                    }
               }
          })
     } catch (error) {
          
     }
}
export const posController = {dashboardData,fetchSaleInvoiceList,fetchInstockInvoiceList,fetchInStockTransactionDetails, createInstock,fetchTransaction,fetchPaymentMethod,fetchWareHouse ,createSale};
