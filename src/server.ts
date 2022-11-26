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

import { Responser } from './utilities';
import routes from "./routes";
var options = {
	explorer: true
};

app.use('/uploads', express.static(`${__dirname}/../uploads`));

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