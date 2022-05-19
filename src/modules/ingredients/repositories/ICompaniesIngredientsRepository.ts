import { CompaniesIngredients } from '@prisma/client';

import { IUpdateIngredientPrice } from '../dtos/IUpdateIngredientPrice';
import { IUpdateIngredientAvailability } from '../dtos/IUpdateIngredientAvailability';
import { ICreateCompanyIngredientDTO } from '../dtos/ICreateCompanyIngredientDTO';
import { IUpdateCompanyIngredientDTO } from '../dtos/IUpdateCompanyIngredientDTO';
import { IIngredientWithPrice } from '../dtos/IIngredientWithPrice';

export interface ICompaniesIngredientsRepository {
  findById(id: string): Promise<CompaniesIngredients | null>;
  findBy(data: Partial<CompaniesIngredients>): Promise<CompaniesIngredients | null>;
  findAllByCompanyId(companyId: string): Promise<IIngredientWithPrice[]>;

  create(data: ICreateCompanyIngredientDTO): Promise<CompaniesIngredients>;
  update(data: IUpdateCompanyIngredientDTO): Promise<CompaniesIngredients>;
  updatePrice(pricePayload: IUpdateIngredientPrice): Promise<CompaniesIngredients>;
  updateAvailability(availabilityPayload: IUpdateIngredientAvailability): Promise<CompaniesIngredients>;
}
