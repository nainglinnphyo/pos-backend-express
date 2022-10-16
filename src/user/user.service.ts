import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const saltRounds = 10;

const { user } = new PrismaClient();

export class User {
  async register({ username, email, password, callback }) {
    const emailExit = await user.findFirst({
      where: {
        email: email,
      },
    });
    if (emailExit) callback("Email already registered", null);

    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = await user.create({
      data: {
        username: username,
        email: email,
        password: hash,
      },
    });
    if (user) {
      callback(null, newUser);
    } else {
      callback(null, null);
    }
  }

  async login({ email, password, callback }) {
    const emailExit = await user.findFirstOrThrow({
      where: {
        email: email,
      },
    });
    if (!emailExit) {
      callback("Email not found!", null);
    } else {
      const checkPassword = bcrypt.compareSync(password, emailExit?.password);
      if (checkPassword) {
        const token = jwt.sign(
          { id: emailExit.id.toString() },
          process.env.TOKEN_SECRET || "YAMA",
          { expiresIn: "12hr" }
        );
        callback(null, { ...emailExit, token: token });
      } else {
        callback("Wrong Password!", null);
      }
    }
  }
}
