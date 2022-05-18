import {Router} from 'express';

import {IngredientsController} from '../controllers/IngredientsController'
import {IngredientCompanyController} from '../controllers/IngredientCompanyController'

const ingredientsRouter = Router();
const ingredientsController = new IngredientsController();
const ingredientCompanyController = new IngredientCompanyController();

ingredientsRouter.get('/', ingredientsController.browse);
ingredientsRouter.get('/:id', ingredientsController.read);
ingredientsRouter.put('/:id/edit', ingredientsController.edit);
ingredientsRouter.post('/', ingredientsController.add);
ingredientsRouter.delete('/:id', ingredientsController.delete);

ingredientsRouter.patch('/:ingredientId/company/:companyId/price', ingredientCompanyController.setPrice);
ingredientsRouter.patch('/:ingredientId/company/:companyId/availability', ingredientCompanyController.setAvailability);

export {ingredientsRouter};
