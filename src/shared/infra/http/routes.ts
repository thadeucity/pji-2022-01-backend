import { Router } from 'express';

import { privateRoutes } from './private.routes'
import { publicRoutes } from './public.routes'
import { sessionRouter } from '../../../modules/companies/http/routes/session.routes'

const routes = Router();

routes.use('/public', publicRoutes);
routes.use('/private', privateRoutes);
routes.use('/session', sessionRouter);

export { routes };
