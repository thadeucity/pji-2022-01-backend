import 'reflect-metadata'

import dotenv from 'dotenv'
import cors from 'cors'

import express, { Request, Response, NextFunction } from 'express';

import { routes } from './routes';

dotenv.config();

const APP_PORT = 3009;

const main = async () => {
  const app = express();

  app.use(cors());

  app.use(express.json());

  app.use(routes);

  app.listen(APP_PORT, () => {
    console.log(`Example app listening on port ${APP_PORT}!`);
  });
}

main();
