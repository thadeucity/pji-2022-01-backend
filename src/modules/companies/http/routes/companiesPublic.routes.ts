import {Router} from 'express';

import {CompaniesPublicController} from '../controllers/CompaniesPublicController'

const companiesPublicRouter = Router();
const companiesPublicController = new CompaniesPublicController();

companiesPublicRouter.get('/:url', companiesPublicController.readByUrl);

export {companiesPublicRouter};
