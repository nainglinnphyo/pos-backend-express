import { PrismaClient } from '@prisma/client';
import express, { Express, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import "dotenv/config";
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import swaggerUi from 'swagger-ui-express'
import 'dotenv/config';
import log from './config/logger'
import fs from 'fs'
import readXlsxFile from "read-excel-file/node";

const prisma = new PrismaClient()


const app: Express = express();
const port: number = process.env.PORT as any;

const {product,unit,category,supplier,customer} = new PrismaClient();
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));
app.use(
	fileUpload({
		createParentPath: true,
	})
);

import swaggerDocument from '../swagger.json';
import { Responser } from './utilities';
import routes from "./routes";
var options = {
	explorer: true
};

app.use('/uploads', express.static(`${__dirname}/../uploads`));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

app.get("/api/v1/test",async (req:Request, res:Response) => {
	try {
	const test = async (filePath: fs.PathLike) => {
		await readXlsxFile(fs.createReadStream(filePath)).then(async (rows) => {
		    rows.shift()
			rows.forEach(async (row:any) => {
				const name = row[0]
				const s_name = row[1]
				const addres = row[2]
				const phone = row[3]

			await customer.create({
				data:{
					customers:row[0] ? row[0].toString() : "",
					short_name:row[1] ? row[1].toString() : "",
					address:row[2] ? row[2].toString() : "",
					phone:row[3] ? row[3].toString() : "",
				}
			})	
		    })
		})
	 }
	 test("/Users/nainglinnphyo/Desktop/For Future/Yama-Backend/supplier.xlsx");
	 return res.send("ok");
	} catch (error) {
		console.log(error.message)
	}
})

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development') {
	app.use("/api/v1/", routes);
} else {
	app.use('/api/v1/', (req: Request, res: Response) => {
		return Responser({
			res: res,
			status: 500,
			body: null,
			message: "Under Maintenance Mode",
			devMessage: "ှSrver is under Maintenance Mode",
		});
	});
}

async function main() {
	// Connect the client
	await prisma.$connect()
	// ... you will write your Prisma Client queries here
   }
   
   

app.listen(port, () => {
	main()
   .then(async () => {
	await prisma.$disconnect()
   })
   .catch(async (e) => {
	console.error(e)
	await prisma.$disconnect()
	process.exit(1)
   })
	log.info(`👌[server]: Server is running at http://localhost:${port}`);
});