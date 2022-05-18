import { container } from 'tsyringe';

import '@providers/index';

import { ICompaniesRepository } from '@modules/companies/repositories/ICompaniesRepository';
import { CompaniesRepository } from '@modules/companies/repositories/prismaOrm/CompaniesRepository';

container.registerSingleton<ICompaniesRepository>(
  'CompaniesRepository',
  CompaniesRepository,
);
