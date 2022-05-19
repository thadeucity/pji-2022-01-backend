import { injectable, inject } from 'tsyringe';

import { CompaniesIngredients } from '@prisma/client';

import { ICompaniesIngredientsRepository } from '../repositories/ICompaniesIngredientsRepository';
import AppError from '@shared/errors/AppError';


interface IRequest {
  companyId: string;
  ingredientId: string;
  isAvailable?: boolean;
  prices: {
    small?: number | null;
    medium?: number | null;
    large?: number | null;
  }
}

@injectable()
export class CreateCompanyIngredientService {
  constructor(
    @inject('CompaniesIngredientsRepository')
    private companyIngredients: ICompaniesIngredientsRepository,
  ) {}

  public async execute({
    companyId,
    ingredientId,
    isAvailable,
    prices,
  }: IRequest): Promise<CompaniesIngredients> {
    const foundIngredient = await this.companyIngredients.findBy({
      fk_id_company: companyId,
      fk_id_ingredient: ingredientId,
    });

    if (foundIngredient) {
      throw new AppError('Ingredient already exists for this company');
    }

    const newIngredient = await this.companyIngredients.create({
      companyId,
      ingredientId,
      isAvailable,
      prices
    })


    return newIngredient;
  }
}
