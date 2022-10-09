import { User } from "./user.service";
import { Request, Response } from "express";
import { Responser } from "../utilities";
import { PrismaClient } from "@prisma/client";

interface IRegister {
  username: string;
  email: string;
  password: string;
}

const { user } = new PrismaClient();
const register = async (req: Request, res: Response) => {
  const user = new User();
  try {
    const { username, email, password }: IRegister = req.body;
    const data = await user.register({
      username,
      email,
      password,
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
            message: "Register Success!",
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
      },
    });
  } catch (error) {
    return Responser({
      res: res,
      status: 500,
      body: null,
      message: error,
      devMessage: error.message,
    });
  }
};

const login = async (req: Request, res: Response) => {
  const user = new User();
  try {
    const { email, password } = req.body;
    const data = await user.login({
      email,
      password,
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
            message: "Login Success!",
            devMessage: "",
          });
        } else {
          return Responser({
            res: res,
            status: 500,
            body: null,
            message: err.message,
            devMessage: err,
          });
        }
      },
    });
  } catch (err) {
    return Responser({
      res: res,
      status: 500,
      body: null,
      message: err,
      devMessage: err.message,
    });
  }
};

const me = async (req: Request, res: Response) => {
  try {
    const userData = await user.findUnique({
      where: { id:res.locals.user.id },
    });
    if (userData) {
      return Responser({
        res,
        status: 200,
        body: userData,
        message: "user fetch success",
        devMessage: "",
      });
    } else {
      return Responser({
        res,
        status: 400,
        body: null,
        message: "user fetch fail",
        devMessage: "",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
export const userController = { login, register, me };
