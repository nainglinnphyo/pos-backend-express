import { Router } from 'express';
import { categoryController } from './category.controller';
const categoryRouter = Router();

categoryRouter.post("/create", categoryController.createCategory);
categoryRouter.get("/fetch", categoryController.fetchCategory);
categoryRouter.delete("/delete", categoryController.deleteCategory);
categoryRouter.put("/edit", categoryController.editCategory);

export default categoryRouter;