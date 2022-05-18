export interface IUpdateCompanyIngredientDTO {
  id: string;
  isAvailable: boolean;
  prices: {
    small: number;
    medium: number;
    large: number;
  }
}
