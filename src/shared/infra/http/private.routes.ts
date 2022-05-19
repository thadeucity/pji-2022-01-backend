import { Router } from 'express';

import { companiesRouter } from '@modules/companies/http/routes/companies.routes';
import { ingredientsRouter } from '@modules/ingredients/http/routes/ingredients.routes';

import ensureAuthenticated from '@modules/companies/http/middlewares/ensureAuthenticated';


const privateRoutes = Router();

// privateRoutes.use(ensureAuthenticated);

privateRoutes.use('/companies', companiesRouter);
privateRoutes.use('/ingredients', ingredientsRouter);

export { privateRoutes };
