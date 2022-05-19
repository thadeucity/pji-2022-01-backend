export interface IUpdateCompanyIngredientDTO {
  id: string;
  isAvailable?: boolean;
  prices?: {
    small?: number | null;
    medium?: number | null;
    large?: number | null;
  }
}
