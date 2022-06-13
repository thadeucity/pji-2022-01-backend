import { Request, Response } from "express";
import { container } from "tsyringe";

import { PublicBrowseIngredientsService } from "@modules/ingredients/services/PublicBrowseIngredientsService";

export class IngredientsPublicController {
  public async browseByCompany(req: Request, res: Response): Promise<Response> {
    const { companyId } = req.params || {};
    const { category } = req.query || {};

    const safeCategory = category ? category.toString().toLowerCase() : undefined;

    const browseIngredients = container.resolve(PublicBrowseIngredientsService);

    const ingredients = await browseIngredients.execute({
      companyId: companyId,
      category: safeCategory
    });


    return res.json(ingredients)
  }
}
