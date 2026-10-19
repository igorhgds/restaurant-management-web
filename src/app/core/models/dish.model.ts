export type DishCategory = 'BURGERS' | 'DRINKS' | 'SIDES' | 'DESSERTS' | 'SALADS';

export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: DishCategory;
  available: boolean;
}
