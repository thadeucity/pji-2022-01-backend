import { Router } from 'express';

import { companiesPublicRouter } from '@modules/companies/http/routes/companiesPublic.routes';
import { ingredientsPublicRouter } from '@modules/ingredients/http/routes/ingredientsPublic.routes';

const publicRoutes = Router();

publicRoutes.use('/companies', companiesPublicRouter);
publicRoutes.use('/ingredients', ingredientsPublicRouter);

export { publicRoutes };
