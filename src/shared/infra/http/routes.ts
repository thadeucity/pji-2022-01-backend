import { Router } from 'express';

import { companiesRouter } from '@modules/companies/http/routes/companies.routes';
import { companiesRouter as pc } from '@modules/companies/http/routes/companiesPublic.routes';

import { ingredientsRouter } from '@modules/ingredients/http/routes/ingredients.routes';
import { ingredientsPublicRouter } from '@modules/ingredients/http/routes/ingredientsPublic.routes';

const routes = Router();

const publicRoutes = Router();
const privateRoutes = Router();

publicRoutes.use('/companies', pc);
publicRoutes.use('/ingredients', ingredientsPublicRouter);

privateRoutes.use('/companies', companiesRouter);
privateRoutes.use('/ingredients', ingredientsRouter);


routes.use('/public', publicRoutes);
routes.use('/private', privateRoutes);

export { routes };
