import {Router} from 'express';

import {CompaniesPublicController} from '../controllers/CompaniesPublicController'

const companiesRouter = Router();
const companiesPublicController = new CompaniesPublicController();

companiesRouter.get('/:url', companiesPublicController.readByUrl);

export {companiesRouter};
