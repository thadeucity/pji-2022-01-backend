import { injectable, inject } from 'tsyringe';
import { Ingredient } from '@prisma/client';

import { IIngredientsRepository } from '../repositories/IIngredientsRepository';
import AppError from '@shared/errors/AppError';


interface IRequest {
  id: string
}

@injectable()
export class ReadIngredientsService {
  constructor(
    @inject('IngredientsRepository')
    private ingredients: IIngredientsRepository,
  ) {}

  public async execute({
    id
  }: IRequest): Promise<Ingredient> {
    const foundIngredients = await this.ingredients.findById(id);

    if (!foundIngredients) {
      throw new AppError('Ingredient not found', 404);
    }

    return foundIngredients;
  }
}
