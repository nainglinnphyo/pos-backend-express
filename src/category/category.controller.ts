import { Request, Response } from 'express';
import { Responser } from '../utilities';
import { Category } from './category.services';

interface ICategory {
     category_name: string;
}

const createCategory = async (req: Request, res: Response) => {
     const category = new Category();
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


export const categoryController = { createCategory };
