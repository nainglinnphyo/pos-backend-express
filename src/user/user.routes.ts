import { Router } from 'express';
import { userController } from './user.controller';
import { loginValidator, registerValidator } from '../middleware/validatorMiddleware';
import authenticateToken from '../middleware/authMiddleware';
const userRoute = Router();

userRoute.post("/register", registerValidator, userController.register);
userRoute.post("/login", loginValidator, userController.login);
userRoute.get("/me",authenticateToken, userController.me);

export default userRoute;