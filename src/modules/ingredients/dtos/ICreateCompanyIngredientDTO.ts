export interface ICreateCompanyIngredientDTO {
  companyId: string;
  ingredientId: string;
  isAvailable?: boolean;
  prices: {
    small?: number | null;
    medium?: number | null;
    large?: number | null;
  }
}
