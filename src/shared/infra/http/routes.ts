import { Router } from 'express';

import { privateRoutes } from './private.routes'
import { publicRoutes } from './public.routes'

const routes = Router();

routes.use('/public', publicRoutes);
routes.use('/private', privateRoutes);

export { routes };
