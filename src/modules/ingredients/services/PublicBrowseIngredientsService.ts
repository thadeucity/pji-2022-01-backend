import { injectable, inject } from 'tsyringe';

import { ICompaniesIngredientsRepository } from '../repositories/ICompaniesIngredientsRepository';


interface IRequest {
  companyId: string;
  category?: string;
}

interface ParsedIngredientProps {
  id: string;
  name: string;
  description?: string | null;
  category: string;
  prices: {
    small?: number | null;
    medium?: number | null;
    large?: number | null;
  }
}

interface IResponse {
  ingredients: ParsedIngredientProps[]
}

@injectable()
export class PublicBrowseIngredientsService {
  constructor(
    @inject('CompaniesIngredientsRepository')
    private companyIngredients: ICompaniesIngredientsRepository,
  ) {}

  public async execute({
    companyId,
    category,
  }: IRequest): Promise<IResponse> {
    const foundIngredients = await this.companyIngredients.findAllByCompanyId(companyId);

    const parsedIngredients = foundIngredients.map((ingredientRes): ParsedIngredientProps => {
      return {
        id: ingredientRes.ingredient?.id || '',
        name: ingredientRes.ingredient?.name,
        description: ingredientRes.ingredient?.description,
        category: ingredientRes.ingredient?.category,
        prices: {
          small: ingredientRes.price_s,
          medium: ingredientRes.price_m,
          large: ingredientRes.price_l,
        }
      }
    }).filter(
      ingredient => !!ingredient.id && !!ingredient.name && !!ingredient.category
    ).filter(
      ingredient => !category || ingredient.category === category
    )


    return { ingredients: parsedIngredients };
  }
}
