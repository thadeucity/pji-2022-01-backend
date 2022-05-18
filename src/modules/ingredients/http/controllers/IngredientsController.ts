import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class IngredientsController {
  public async browse(req: Request, res: Response): Promise<Response> {
    const { category } = req.query || {};

    const safeCategory = (String(category) || '').toLowerCase();

    const ingredients = await prisma.ingredient.findMany({
      where: {
        category: safeCategory || undefined,
      }
    });

    return res.json(ingredients);
  }

  public async read(req: Request, res: Response): Promise<Response> {
    const { id } = req.params || {};

    const ingredient = await prisma.ingredient.findUnique({where: {id}});

    if (!ingredient) {
      return res.status(404).json({
        message: 'ingredient not found'
      })
    }

    return res.json({
      id: ingredient.id,
      name: ingredient.name,
      description: ingredient.description,
      category: ingredient.category,
    })
  }

  public async edit(req: Request, res: Response): Promise<Response> {
      const { id } = req.params || {};

      const {
        name,
        description,
        category,
      } = req.body || {};

      const ingredient = await prisma.ingredient.findUnique({where: {id}});

      if (!ingredient) {
        return res.status(404).json({
          message: 'ingredient not found'
        })
      }

      const updatedIngredient = await prisma.ingredient.update({
        where: {id},
        data: {
          name: name || ingredient.name,
          description: description || ingredient.description,
          category: category || ingredient.category,
        }
      })

      return res.json({
        id: updatedIngredient.id,
        name: updatedIngredient.name,
        description: updatedIngredient.description,
        category: updatedIngredient.category,
      })
  }

  public async add(req: Request, res: Response): Promise<Response> {
    const {
      name,
      description,
      category,
    } = req.body || {};

    const ingredient = await prisma.ingredient.create({
      data: {
        name,
        description,
        category,
      }
    })

    return res.json({
      id: ingredient.id,
      name: ingredient.name,
      description: ingredient.description,
      category: ingredient.category,
    })
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params || {};

    const ingredient = await prisma.ingredient.findUnique({where: {id}});

    if (!ingredient) {
      return res.status(404).json({
        message: 'ingredient not found'
      })
    }

    await prisma.ingredient.delete({where: {id}});

    return res.json({
      message: 'ingredient deleted'
    })
  }
}
