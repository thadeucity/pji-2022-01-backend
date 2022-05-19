import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client'
import { BrowseIngredientsService } from "@modules/ingredients/services/BrowseIngredientsService";
import { container } from "tsyringe";
import { ReadIngredientsService } from "@modules/ingredients/services/ReadIngredientsService";
import { EditIngredientService } from "@modules/ingredients/services/EditIngredientService";
import { CreateIngredientService } from "@modules/ingredients/services/CreateIngredientService";
import { DeleteIngredientService } from "@modules/ingredients/services/DeleteIngredientService";

const prisma = new PrismaClient()

export class IngredientsController {
  public async browse(req: Request, res: Response): Promise<Response> {
    const { category, name } = req.query || {};

    const safeCategory = category ? category.toString().toLowerCase() : undefined;
    const safeName = name ? name.toString() : undefined;

    const browseIngredients = container.resolve(BrowseIngredientsService);

    const ingredients = await browseIngredients.execute({
      category: safeCategory,
      name: safeName
    });

    return res.json(ingredients);
  }

  public async read(req: Request, res: Response): Promise<Response> {
    const { id } = req.params || {};

    const readIngredient = container.resolve(ReadIngredientsService);

    const ingredient = await readIngredient.execute({ id });

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

    const editIngredient = container.resolve(EditIngredientService);

    const updatedIngredient = await editIngredient.execute({
      id,
      category,
      description,
      name
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

    const createIngredient = container.resolve(CreateIngredientService);

    const newIngredient = await createIngredient.execute({
      category,
      description,
      name
    })

    return res.json({
      id: newIngredient.id,
      name: newIngredient.name,
      description: newIngredient.description,
      category: newIngredient.category,
    })
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params || {};

    const deleteIngredient = container.resolve(DeleteIngredientService);

    const deletedIngredient = await deleteIngredient.execute({ id })

    return res.json({
      message: 'Ingredient deleted: ' + deletedIngredient
    })
  }
}
