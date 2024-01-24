export interface Product {
  id: number;
  name: string;
  price: number;
  title?: string;
  description?: string;
  image: string;
  size: string;
}

export type BasketItem = Product & {
  quantity: number;
};
