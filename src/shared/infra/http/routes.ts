import {Router, Request, Response} from 'express';

const companiesRouter = Router();

companiesRouter.get('/', async (_request: Request, response: Response): Promise<Response> => {
  return response.json({
    message: 'Hello World',
  });
});

const routes = Router();

routes.use('/companies', companiesRouter);

export { routes };
