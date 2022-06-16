import {Router} from 'express';

import {CompaniesSessionController} from '../controllers/CompaniesSessionController'

const sessionRouter = Router();
const sessionController = new CompaniesSessionController();

sessionRouter.post('/', (req, res) => res.send('Hello World!'));

export { sessionRouter };
