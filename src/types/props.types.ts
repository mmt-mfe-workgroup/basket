export interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  image: string;
  size: string;
}

export type BasketItem = Product & {
  quantity: number;
};
