import { container } from 'tsyringe';

import '@providers/index';

import { ICompaniesRepository } from '@modules/companies/repositories/ICompaniesRepository';
import { CompaniesRepository } from '@modules/companies/repositories/prismaOrm/CompaniesRepository';


import { IIngredientsRepository } from '@modules/ingredients/repositories/IIngredientsRepository';
import { IngredientsRepository } from '@modules/ingredients/repositories/prismaOrm/IngredientsRepository';

import { ICompaniesIngredientsRepository } from '@modules/ingredients/repositories/ICompaniesIngredientsRepository';
import { CompaniesIngredientsRepository } from '@modules/ingredients/repositories/prismaOrm/CompaniesIngredientsRepository';

container.registerSingleton<ICompaniesRepository>(
  'CompaniesRepository',
  CompaniesRepository,
);

container.registerSingleton<IIngredientsRepository>(
  'IngredientsRepository',
  IngredientsRepository,
);

container.registerSingleton<ICompaniesIngredientsRepository>(
  'CompaniesIngredientsRepository',
  CompaniesIngredientsRepository,
);
