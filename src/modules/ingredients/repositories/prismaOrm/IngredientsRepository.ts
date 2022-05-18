import { PrismaClient, Ingredient, Prisma } from '@prisma/client';

import { ICreateIngredientDTO } from '@modules/ingredients/dtos/ICreateIngredientDTO';
import { IIngredientsRepository } from '../IIngredientsRepository';

export class IngredientsRepository implements IIngredientsRepository {
  private ormRepository: Prisma.IngredientDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;

  constructor() {
    this.ormRepository = new PrismaClient().ingredient;
  }

  public async findById(id: string): Promise<Ingredient | null> {
    const foundIngredient = await this.ormRepository.findUnique({ where: { id } });
    return foundIngredient;
  }

  public async findAllByCategory(category: string): Promise<Ingredient[]> {
    const foundIngredient = await this.ormRepository.findMany({ where: { category } });
    return foundIngredient;
  }

  public async create(ingredientData: ICreateIngredientDTO): Promise<Ingredient> {
    const newIngredient = this.ormRepository.create({
      data: { ...ingredientData }
    });

    return newIngredient;
  }

  public async update(payload: Partial<Ingredient>): Promise<Ingredient> {
    return this.ormRepository.update({
      where: { id: payload.id },
      data: payload
    });
  }

  public async delete(id: string): Promise<string> {
    this.ormRepository.delete({ where: { id } });

    return id;
  }
}
