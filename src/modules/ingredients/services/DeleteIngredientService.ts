import { injectable, inject } from 'tsyringe';

import { IIngredientsRepository } from '../repositories/IIngredientsRepository';


interface IRequest {
  id: string
}

@injectable()
export class DeleteIngredientService {
  constructor(
    @inject('IngredientsRepository')
    private ingredients: IIngredientsRepository,
  ) {}

  public async execute({
    id
  }: IRequest): Promise<string> {
    const foundIngredients = await this.ingredients.findById(id);

    if (foundIngredients) {
      await this.ingredients.delete(id);
    }

    return id;
  }
}
