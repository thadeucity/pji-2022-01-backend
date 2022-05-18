import { Ingredient } from '@prisma/client';
import { ICreateIngredientDTO } from '../dtos/ICreateIngredientDTO';

export interface IIngredientsRepository {
  findById(id: string): Promise<Ingredient | null>;
  findAllByCategory(category: string): Promise<Ingredient[]>;
  create(data: ICreateIngredientDTO): Promise<Ingredient>;
  update(data: Partial<Ingredient>): Promise<Ingredient>;
  delete(id: string): Promise<string>;
}
