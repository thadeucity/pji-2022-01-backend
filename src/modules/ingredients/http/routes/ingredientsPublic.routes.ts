import {Router} from 'express';

import {IngredientsPublicController} from '../controllers/IngredientsPublicController'

const ingredientsPublicRouter = Router();
const ingredientsPublicController = new IngredientsPublicController();

ingredientsPublicRouter.get('/:companyId', ingredientsPublicController.browseByCompany);

export {ingredientsPublicRouter};
