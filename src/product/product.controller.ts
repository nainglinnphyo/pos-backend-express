import { Request, Response } from 'express';
import { Responser } from '../utilities';
import { Product } from './product.services';

interface IProduct {
     product_name: string;
     product_code: string;
     category_id: number;
     unit_id: string;

}

const createProduct = async (req: Request, res: Response) => {
     const product = new Product();
     try {
          const { product_code, product_name, category_id, unit_id }: IProduct = req.body;
          const data = await product.createProdcut({
               product_code, product_name, category_id, unit_id,
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

const fetchProduct = async (req: Request, res: Response) => {
     try {
          const product = new Product();
          const data = await product.fetchProduct({
               callback: (err: any, data: any) => {
                    if (err) {
                         return Responser({
                              res: res,
                              status: 400,
                              body: null,
                              message: "Somethin went wrong with product fetch",
                              devMessage: err.message,
                         });
                    } else if (data) {
                         return Responser({
                              res: res,
                              status: 200,
                              body: data,
                              message: "Product Fetch Success!",
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

const createProductPriceList = async (req: Request, res: Response) => {
     try {
          const product = new Product();
          const { product_id,price_id,amount } = req.body
          const resData = await product.createProductPriceList({
               product_id,price_id,amount, callback: (err: any, data: any) => {
                    if (err) {
                         return Responser({
                              res: res,
                              status: 400,
                              body: null,
                              message: "Somethin went wrong with product price list create",
                              devMessage: err.message,
                         });
                    } else if (data) {
                         return Responser({
                              res: res,
                              status: 201,
                              body: data,
                              message: "Product Price List Create Success!",
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

const editProductPriceList = async (req: Request, res: Response) => {
     try {
          const product = new Product();
          const { product_id,data } = req.body
          const resData = await product.editProductPrice({
               product_id,data, callback: (err: any, data: any) => {
                    if (err) {
                         return Responser({
                              res: res,
                              status: 400,
                              body: null,
                              message: "Somethin went wrong with product price list edit",
                              devMessage: err.message,
                         });
                    } else if (data) {
                         return Responser({
                              res: res,
                              status: 200,
                              body: data,
                              message: "Product Price List edit Success!",
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

const editProduct = async (req: Request, res: Response) => {
     try {
          const product = new Product();

          const { id, product_name, product_code, category_id, unit_id } = req.body;
          const data = await product.productEdit({
               id,
               product_name,
               product_code,
               unit_id,
               category_id,
               callback: (err: any, data: any) => {
                    if (err) {
                         return Responser({
                              res: res,
                              status: 400,
                              body: null,
                              message: "Somethin went wrong with product edit",
                              devMessage: err.message,
                         });
                    } else if (data) {
                         return Responser({
                              res: res,
                              status: 201,
                              body: data,
                              message: "Product Eidt Success!",
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

const fetchProductPriceList = async (req: Request, res: Response) => {
     try {
          const product = new Product();

          const { product_id} = req.query;
          const data = await product.fetchProductPriceList({
               product_id,
               callback: (err: any, data: any) => {
                    if (err) {
                         return Responser({
                              res: res,
                              status: 400,
                              body: null,
                              message: "Somethin went wrong with product price list fetch",
                              devMessage: err.message,
                         });
                    } else if (data) {
                         return Responser({
                              res: res,
                              status: 200,
                              body: data,
                              message: "Price list fetch Success!",
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

const fetchPirceList = async (req: Request, res: Response) => {
     try {
          const product = new Product();

          const { product_id} = req.query;
          const data = await product.fetchPriceList({
               product_id,
               callback: (err: any, data: any) => {
                    if (err) {
                         return Responser({
                              res: res,
                              status: 400,
                              body: null,
                              message: "Somethin went wrong with product price list fetch",
                              devMessage: err.message,
                         });
                    } else if (data) {
                         return Responser({
                              res: res,
                              status: 200,
                              body: data,
                              message: "Price list fetch Success!",
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
export const productController = { editProductPriceList,editProduct, createProduct, fetchProduct, createProductPriceList,fetchProductPriceList,fetchPirceList };
