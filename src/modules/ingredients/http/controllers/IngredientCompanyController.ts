import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class IngredientCompanyController {
  public async setPrice(req: Request, res: Response): Promise<Response> {
    const { companyId, ingredientId } = req.params || {};

    const {
      small,
      medium,
      large,
    } = req.body || {};

    const company = await prisma.company.findUnique({where: {id: companyId}});

    if (!company) {
      return res.status(404).json({
        message: 'company not found'
      })
    }

    const ingredient = await prisma.ingredient.findUnique({where: {id: ingredientId}});

    if (!ingredient) {
      return res.status(404).json({
        message: 'ingredient not found'
      })
    }

    const priceRelation = await prisma.companiesIngredients.findFirst({
      where: {
        fk_id_company: companyId,
        fk_id_ingredient: ingredientId,
      }
    })

    if (!priceRelation) {
      const newPriceRelation = await prisma.companiesIngredients.create({
        data: {
          fk_id_company: companyId,
          fk_id_ingredient: ingredientId,
          price_s: small,
          price_m: medium,
          price_l: large,
        }
      })

      return res.json({
        id: newPriceRelation.id,
      })
    } else {
      const updatedPriceRelation = await prisma.companiesIngredients.update({
        where: {
          id: priceRelation.id,
        },
        data: {
          price_s: small,
          price_m: medium,
          price_l: large,
        }
      })

      return res.json({
        id: updatedPriceRelation.id,
      })
    }

  }

  public async setAvailability(req: Request, res: Response): Promise<Response> {
    const { companyId, ingredientId } = req.params || {};

    const {
      isAvailable,
    } = req.body || {};

    const conpanyIngredient = await prisma.companiesIngredients.findFirst({
      where: {
        fk_id_company: companyId,
        fk_id_ingredient: ingredientId,
      }
    })

    if(!conpanyIngredient) {
      return res.status(404).json({
        message: 'company ingredient not found'
      })
    }

    const updatedCompanyIngredient = await prisma.companiesIngredients.update({
      where: {
        id: conpanyIngredient.id,
      },
      data: {
        is_available: isAvailable,
      }
    })

    return res.json({
      id: updatedCompanyIngredient.id,
      newAvailability: updatedCompanyIngredient.is_available,
    })
  }
}
