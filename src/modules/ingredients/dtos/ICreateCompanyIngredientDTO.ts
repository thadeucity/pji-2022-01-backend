export interface ICreateCompanyIngredientDTO {
  companyId: string;
  ingredientId: string;
  isAvailable: boolean;
  prices: {
    small: number;
    medium: number;
    large: number;
  }
}
