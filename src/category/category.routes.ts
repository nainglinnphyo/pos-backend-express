import { Router } from 'express';
import { categoryController } from './category.controller';
const categoryRouter = Router();

categoryRouter.post("/create", categoryController.createCategory);

export default categoryRouter;