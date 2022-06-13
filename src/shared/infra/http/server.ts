import 'reflect-metadata'

import dotenv from 'dotenv'
import cors from 'cors'
import express, { Request, Response, NextFunction } from 'express';

import { routes } from './routes';

import '@shared/container';
import AppError from '@shared/errors/AppError';

dotenv.config();

const APP_PORT = 3333;

const main = async () => {
  const app = express();

  app.use(cors());

  app.use(express.json());

  app.use(routes);

  app.use(express.static('public'));

  app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    console.error(err);

    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  });

  app.listen(APP_PORT, () => {
    console.log(`Example app listening on port ${APP_PORT}!`);
  });
}

main();
