import {Router} from 'express';

import {CompaniesSessionController} from '../controllers/CompaniesSessionController'

const sessionRouter = Router();
const sessionController = new CompaniesSessionController();

sessionRouter.post('/', sessionController.add);

export { sessionRouter };
