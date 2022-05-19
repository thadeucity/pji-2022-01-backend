import { injectable, inject } from 'tsyringe';
import { Ingredient } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import { IIngredientsRepository } from '../repositories/IIngredientsRepository';


interface IRequest {
  name: string;
  description?: string;
  category: string;
}

@injectable()
export class CreateIngredientService {
  constructor(
    @inject('IngredientsRepository')
    private ingredients: IIngredientsRepository,
  ) {}

  public async execute({
    name,
    description,
    category,
  }: IRequest): Promise<Ingredient> {
    const checkIngredientExists = await this.ingredients.findBy({
      name,
      category,
    });

    if (checkIngredientExists) {
      throw new AppError(`This ingredient already exists: ${checkIngredientExists.id}`);
    }

    const newIngredient = await this.ingredients.create({
      name,
      description,
      category,
    });

    return newIngredient;
  }
}
