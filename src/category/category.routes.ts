import { Router } from 'express';
import { categoryController } from './category.controller';
const categoryRouter = Router();

categoryRouter.post("/create", categoryController.createCategory);
categoryRouter.get("/fetch", categoryController.fetchCategory);

export default categoryRouter;