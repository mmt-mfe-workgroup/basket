import { useEffect, useState } from 'react';
import { Product, BasketItem, BasketEvent, VoucherEvent } from '../types/props.types';

const useBasket = () => {
  const [basketItems, setBasketItems] = useState<BasketItem[]>([]);
  const [subTotal, setSubTotal] = useState<number>(0);
  const [deliveryCost, setDeliveryCost] = useState<number>(0);
  const [discountAmount, setDiscountAmount] = useState<number>(0);

  /**
   * Recalculates the subtotal when the basket items change
   */
  useEffect(() => {
    if (!basketItems) return;
    const total = basketItems.reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0);
    setSubTotal(total);
  }, [basketItems]);

  /**
   * When the page loads we want to setup the event listeners
   * and set the shipping cost
   */
  useEffect(() => {
    window.addEventListener('addToBasket', addProductToBasket as EventListener);
    window.addEventListener('applyVoucher', applyVoucherDiscount as EventListener);
    setDeliveryCost(5.99);

    return () => {
      window.removeEventListener('addToBasket', addProductToBasket as EventListener);
      window.removeEventListener('applyVoucher', applyVoucherDiscount as EventListener);
    };
  }, []);

  /**
   * Create and dispatch a custom event to update the basket count
   */
  const emitEventBasketCount = (count: number) => {
    const event = new CustomEvent('basketItemCount', { detail: { basketItemCount: count } });
    window.dispatchEvent(event);
    console.log(`Basket count: ${count}`);
  };

  /**
   * Loops through the products and sorts them by quantity
   */
  const sortProductQuantity = (products: Product[]) => {
    const basket: BasketItem[] = [];

    products.forEach((product) => {
      const item = basket.find((item) => item.id === product.id);
      if (item) {
        item.quantity += 1;
      } else {
        basket.push({ ...product, quantity: 1 });
      }
    });

    return basket;
  };

  /**
   * Adds a product to the basket or if it already exists, updates the quantity
   */
  const addProductToBasket = (event: BasketEvent) => {
    if (!event.detail.product) return;

    // If the product ID already exists in the basket, update the quantity
    // otherwise add the product to the basket.
    if (basketItems?.find((item) => item.id === event.detail.product.id)) {
      updateQuantity(event.detail.product.id, 1);
    } else {
      setBasketItems((currentItems) => {
        const items = currentItems || [];
        const newItems = [...items, event.detail.product];
        const sortedBasket = sortProductQuantity(newItems);
        return sortedBasket;
      });
    }
  };

  /**
   * Updates the quantity of a given product in the basket
   * The quantity cannot be reduced below 0
   */
  const updateQuantity = (id: number, quantity: number) => {
    if (!basketItems) return;
    const updatedBasket = basketItems.map((item) => {
      if (item.id === id) {
        const newQuantity = Math.max(item.quantity + quantity, 0);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setBasketItems(updatedBasket);
    console.log(`Basket items: ${JSON.stringify(updatedBasket)}`);
    emitEventBasketCount(updatedBasket.length);
  };

  /**
   * Applies a discount in percent to the basket total based on the voucher code
   */
  const applyVoucherDiscount = (event: VoucherEvent) => {
    if (!event.detail.discountAmount) return;
    setDiscountAmount(event.detail.discountAmount);
  };

  return { basketItems, subTotal, deliveryCost, discountAmount, updateQuantity };
};

export default useBasket;
