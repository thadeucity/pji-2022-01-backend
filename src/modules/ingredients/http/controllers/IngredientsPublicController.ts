import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class IngredientsPublicController {
  public async browseByCompany(req: Request, res: Response): Promise<Response> {
    const { companyId } = req.params || {};

    const ingredients = await prisma.companiesIngredients.findMany({
      where: { fk_id_company: companyId },
      include: {
        ingredient: true
      }
    });

    const safeIngredients = ingredients.map(ingredientRelation => {
      return {
        id: ingredientRelation.ingredient.id,
        name: ingredientRelation.ingredient.name,
        description: ingredientRelation.ingredient.description,
        category: ingredientRelation.ingredient.category,
        prices: {
          small: ingredientRelation.price_s,
          medium: ingredientRelation.price_m,
          large: ingredientRelation.price_l,
        }
      }
    })


    return res.json({
      ingredients: safeIngredients
    })
  }
}
