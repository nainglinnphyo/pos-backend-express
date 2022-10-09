import { NextFunction,Request,Response } from 'express';
import jwt from 'jsonwebtoken';
import { Responser } from '../utilities';

function authenticateToken(req:Request, res:Response, next:NextFunction) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return Responser({res,message:"Prvoided Token",body:null,devMessage:"",status:401})

    jwt.verify(token, process.env.TOKEN_SECRET as string || "YAMA", (err: any, user: any) => {
    if (err) return Responser({res,message:"Prvoided Token is expried",body:null,devMessage:"",status:401})
    res.locals.user = user;
    next()
  })
}

export default authenticateToken;