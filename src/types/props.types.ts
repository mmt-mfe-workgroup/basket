export interface Product {
  id: number;
  title: string;
  price: number;
  description?: string;
  brand?: string;
  category?: string;
  thumbnail: string;
  size?: string;
  rating?: number;
  stock?: number;
}

export type BasketItem = Product & {
  quantity: number;
};

export interface BasketEvent extends Event {
  detail: {
    product: BasketItem;
  };
}
export interface StorageEvent extends Event {
  detail: {
    storage: {
      basket: BasketItem[];
    }
  };
}

export interface VoucherEvent extends Event {
  detail: {
    voucherCode: string;
  };
}