import { injectable, inject } from 'tsyringe';
import { Ingredient } from '@prisma/client';

import { IIngredientsRepository } from '../repositories/IIngredientsRepository';


interface IRequest {
  name?: string;
  description?: string;
  category?: string;
}

@injectable()
export class BrowseIngredientsService {
  constructor(
    @inject('IngredientsRepository')
    private ingredients: IIngredientsRepository,
  ) {}

  public async execute({
    name,
    description,
    category,
  }: IRequest): Promise<Ingredient[]> {
    const foundIngredients = await this.ingredients.findAllBy({
      name,
      category,
      description
    });


    return foundIngredients;
  }
}
