import { PrismaClient, CompaniesIngredients, Prisma } from '@prisma/client';

import { ICompaniesIngredientsRepository } from '../ICompaniesIngredientsRepository';
import { IIngredientWithPrice } from '@modules/ingredients/dtos/IIngredientWithPrice';
import { ICreateCompanyIngredientDTO } from '@modules/ingredients/dtos/ICreateCompanyIngredientDTO';
import { IUpdateCompanyIngredientDTO } from '@modules/ingredients/dtos/IUpdateCompanyIngredientDTO';
import { IUpdateIngredientPrice } from '@modules/ingredients/dtos/IUpdateIngredientPrice';
import { IUpdateIngredientAvailability } from '@modules/ingredients/dtos/IUpdateIngredientAvailability';

export class CompaniesIngredientsRepository implements ICompaniesIngredientsRepository {
  private ormRepository: Prisma.CompaniesIngredientsDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;

  constructor() {
    this.ormRepository = new PrismaClient().companiesIngredients;
  }

  public async findById(id: string): Promise<CompaniesIngredients | null> {
    const foundIngredient = await this.ormRepository.findFirst({
      where: { id },
      include: {
        ingredient: true
      }
    });

    return foundIngredient
  }

  public async findBy(data: Partial<CompaniesIngredients>): Promise<CompaniesIngredients | null> {
    const foundIngredient = await this.ormRepository.findFirst({
      where: data,
      include: {
        ingredient: true
      }
    });

    return foundIngredient
  }

  public async findAllByCompanyId(companyId: string): Promise<IIngredientWithPrice[]> {
    const foundIngredients = await this.ormRepository.findMany({
      where: { fk_id_company: companyId },
      include: {
        ingredient: true
      }
    });

    return foundIngredients
  }

  public async create(data: ICreateCompanyIngredientDTO): Promise<CompaniesIngredients> {
    const newCompanyIngredient = this.ormRepository.create({
      data: {
        fk_id_company: data.companyId,
        fk_id_ingredient: data.ingredientId,
        is_available: data.isAvailable,
        price_l: data.prices?.large,
        price_m: data.prices?.medium,
        price_s: data.prices?.small,
      }
    });

    return newCompanyIngredient;
  }

  public async update(data: IUpdateCompanyIngredientDTO): Promise<CompaniesIngredients> {
    return this.ormRepository.update({
      where: { id: data.id },
      data: {
        is_available: data.isAvailable,
        price_l: data.prices?.large,
        price_m: data.prices?.medium,
        price_s: data.prices?.small,
      }
    });
  }

  public async updatePrice(data: IUpdateIngredientPrice): Promise<CompaniesIngredients> {
    return this.ormRepository.update({
      where: { id: data.id },
      data: {
        price_l: data.large,
        price_m: data.medium,
        price_s: data.small,
      }
    });
  }

  public async updateAvailability(data: IUpdateIngredientAvailability): Promise<CompaniesIngredients> {
    return this.ormRepository.update({
      where: { id: data.id },
      data: { is_available: data.newAvailability }
    });
  }
}
