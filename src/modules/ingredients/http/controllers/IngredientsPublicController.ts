import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class IngredientsPublicController {
  public async browseByCompany(req: Request, res: Response): Promise<Response> {
    const { companyId } = req.params || {};

    const ingredients = await prisma.companiesIngredients.findMany({
      where: { fk_id_company: companyId },
      include: {
        ingredients: true
      }
    });

    const safeIngredients = ingredients.map(ingredient => {
      return {
        id: ingredient.ingredients.id,
        name: ingredient.ingredients.name,
        description: ingredient.ingredients.description,
        category: ingredient.ingredients.category,
        prices: {
          small: ingredient.price_s,
          medium: ingredient.price_m,
          large: ingredient.price_l,
        }
      }
    })


    return res.json({
      ingredients: safeIngredients
    })
  }
}
