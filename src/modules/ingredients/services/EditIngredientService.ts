import { injectable, inject } from 'tsyringe';
import { Ingredient } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import { IIngredientsRepository } from '../repositories/IIngredientsRepository';


interface IRequest {
  id: string;
  name?: string;
  description?: string;
  category?: string;
}

@injectable()
export class EditIngredientService {
  constructor(
    @inject('IngredientsRepository')
    private ingredients: IIngredientsRepository,
  ) {}

  public async execute({
    id,
    name,
    description,
    category,
  }: IRequest): Promise<Ingredient> {
    const currentIngredient = await this.ingredients.findById(id);

    if (!currentIngredient) {
      throw new AppError('Ingredient not found', 404);
    }

    const newIngredient = await this.ingredients.update({
      id: currentIngredient.id,
      name: name || currentIngredient.name,
      description: description || currentIngredient.description,
      category: category || currentIngredient.category,
    });

    return newIngredient;
  }
}
