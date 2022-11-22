import { Request, Response } from 'express';
import { Responser } from '../utilities';
import { Category } from './category.services';

interface ICategory {
     category_name: string;
}

const category = new Category();


const createCategory = async (req: Request, res: Response) => {
     try {
          const { category_name }: ICategory = req.body;
          const data = await category.createCategory({
              category_name,
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
                              message: "Category Create Success!",
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

const editCategory = async (req: Request, res: Response) => {
     try {
          const { category_name,id } = req.body;
          const data = await category.editCategory({
              id,category_name,
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
                              message: "Category Edit Success!",
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

const fetchCategory = async(req:Request, res: Response) =>{
     try {
          const data = await category.fetchCategory({
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
                               message: "Category Fetch Success!",
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

const deleteCategory = async(req:Request, res: Response) =>{
     try {
          const {id} = req.body;
          const data = await category.deleteCategory({
                id,
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
                               status: 200,
                               body: data,
                               message: "Category Delete Success!",
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

export const categoryController = { editCategory,createCategory ,fetchCategory,deleteCategory};
