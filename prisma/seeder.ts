import { PrismaClient } from "@prisma/client";
import logger from "../src/config/logger";
const { user } = new PrismaClient();
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);
const load = async () => {
     await user.create({
          data: {
               username:"user",
               email: "yama@gmail.com",
               password: bcrypt.hashSync('yama@gmail.com', salt)
        }
     })
     logger.info('Added Campaign data')

}
load();