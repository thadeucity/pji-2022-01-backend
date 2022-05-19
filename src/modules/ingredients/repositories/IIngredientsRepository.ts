import { Ingredient } from '@prisma/client';
import { ICreateIngredientDTO } from '../dtos/ICreateIngredientDTO';

export interface IIngredientsRepository {
  findById(id: string): Promise<Ingredient | null>;
  findBy(data: Partial<Ingredient>): Promise<Ingredient | null>;
  findAllBy(data: Partial<Ingredient>): Promise<Ingredient[]>;
  create(data: ICreateIngredientDTO): Promise<Ingredient>;
  update(data: Partial<Ingredient>): Promise<Ingredient>;
  delete(id: string): Promise<string>;
}
