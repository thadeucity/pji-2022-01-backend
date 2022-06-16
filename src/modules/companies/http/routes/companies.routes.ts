import {Router} from 'express';

import {CompaniesController} from '../controllers/CompaniesContoller'

const companiesRouter = Router();
const companiesController = new CompaniesController();

companiesRouter.post('/', companiesController.add);
companiesRouter.patch('/:id', companiesController.edit);

export {companiesRouter};
