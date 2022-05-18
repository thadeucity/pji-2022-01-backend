import { Router } from 'express';

import { companiesRouter } from '@modules/companies/http/routes/companies.routes';
import { companiesRouter as pc } from '@modules/companies/http/routes/companiesPublic.routes';

const routes = Router();

const publicRoutes = Router();
const privateRoutes = Router();

publicRoutes.use('/companies', pc);
privateRoutes.use('/companies', companiesRouter);


routes.use('/public', publicRoutes);
routes.use('/private', privateRoutes);

export { routes };
