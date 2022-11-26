import { Router } from 'express';
import { unitController } from './unit.controller';
const unitRouter = Router();

unitRouter.get("/fetch", unitController.fetchUnit);
unitRouter.post("/create", unitController.createUnit);

export default unitRouter;