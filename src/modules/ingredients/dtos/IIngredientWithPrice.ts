import { CompaniesIngredients, Ingredient } from "@prisma/client";

export interface IIngredientWithPrice extends CompaniesIngredients {
   ingredient: Ingredient
}
