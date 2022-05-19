import { injectable, inject } from 'tsyringe';

import { CompaniesIngredients } from '@prisma/client';

import { ICompaniesIngredientsRepository } from '../repositories/ICompaniesIngredientsRepository';
import AppError from '@shared/errors/AppError';


interface IRequest {
  id: string;
  companyId: string;
  isAvailable?: boolean;
  prices: {
    small?: number | null;
    medium?: number | null;
    large?: number | null;
  }
}

@injectable()
export class EditCompanyIngredientService {
  constructor(
    @inject('CompaniesIngredientsRepository')
    private companyIngredients: ICompaniesIngredientsRepository,
  ) {}

  public async execute({
    id,
    companyId,
    isAvailable,
    prices,
  }: IRequest): Promise<CompaniesIngredients> {
    const foundIngredient = await this.companyIngredients.findById(id);

    if (!foundIngredient || foundIngredient.fk_id_company !== companyId) {
      throw new AppError('Company Ingredient Not Found', 404);
    }

    const updatedIngredient = await this.companyIngredients.update({
      id,
      isAvailable,
      prices: {
        large: prices.large,
        medium: prices.medium,
        small: prices.small,
      }
    })


    return updatedIngredient;
  }
}
