import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCompanyIngredientService } from "@modules/ingredients/services/CreateCompanyIngredientService";
import { EditCompanyIngredientService } from "@modules/ingredients/services/EditCompanyIngredientService";

export class IngredientCompanyController {
  public async add(req: Request, res: Response): Promise<Response> {
    const { ingredientId } = req.params || {};
    const { id: companyId } = req.company || {};

    const {
      prices,
      isAvailable,
    } = req.body || {}

    const createCompanyIngredient = container.resolve(CreateCompanyIngredientService);

    const companyIngredient = await createCompanyIngredient.execute({
      ingredientId,
      companyId,
      prices,
      isAvailable
    })

    return res.json({ id: companyIngredient.id })
  }

  public async edit(req: Request, res: Response): Promise<Response> {
    const { companyIngredientId } = req.params || {};
    const { id: companyId } = req.company || {};

    const {
      prices,
      isAvailable,
    } = req.body || {}

    const editCompanyIngredient = container.resolve(EditCompanyIngredientService);

    const companyIngredient = await editCompanyIngredient.execute({
      id: companyIngredientId,
      companyId,
      prices,
      isAvailable
    })

    return res.json({ id: companyIngredient.id })
  }
}
