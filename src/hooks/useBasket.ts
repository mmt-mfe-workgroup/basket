import { useEffect, useRef, useState } from 'react';
import { BasketItem, BasketEvent, VoucherEvent } from '../types/props.types';
import { PROMO_CODES } from '../constants/promoCodes';

const useBasket = () => {
  const [basketItems, setBasketItems] = useState<BasketItem[]>([]);
  const [subTotal, setSubTotal] = useState<number>(0);
  const [deliveryCost, setDeliveryCost] = useState<number>(0);
  const [discountAmount, setDiscountAmount] = useState<number>();
  const [voucherCode, setVoucherCode] = useState<string>();

  const basketItemsRef = useRef<BasketItem[]>([]);
  basketItemsRef.current = basketItems;

  /**
   * @private
   * Create and dispatch a custom event to update the basket count
   */
  const emitEventBasketCount = () => {
    const count = getTotalBasketCount();
    const event = new CustomEvent('basketItemCount', { detail: { basketItemCount: count } });
    window.dispatchEvent(event);
    console.log(`Basket count: ${count}`);
  };

  /**
   * @private
   * Create and dispatch a custom event to go to checkout
   */
  const emitEventGoCheckout = () => {
    const event = new CustomEvent('goToCheckout', { detail: { checkoutIntent: true } });
    window.dispatchEvent(event);
    console.log(`User wants to go to checkout`);
  };

  /**
   * Adds a product to the basket or if it already exists, updates the quantity
   */
  const addProductToBasket = (event: BasketEvent) => {
    if (!event.detail.product) return;

    const currentBasketItems = basketItemsRef.current;

    if (currentBasketItems?.find((item) => item.id === event.detail.product.id)) {
      updateQuantity(event.detail.product.id, 1);
    } else {
      const newProduct = { ...event.detail.product, quantity: 1 };

      setBasketItems((currentItems) => {
        const items = currentItems || [];
        const newItems = [...items, newProduct];
        return newItems;
      });
    }
  };

  /**
   * Updates the quantity of a given product in the basket. if the quantity is 0, the product is removed
   */
  const updateQuantity = (id: number, quantity: number) => {
    if (!basketItemsRef) return;
    const updatedBasket = basketItemsRef.current.map((item) => {
      if (item.id === id) {
        const newQuantity = Math.max(item.quantity + quantity, 0);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    // Remove any items that have quantity of zero
    const filteredBasket = updatedBasket.filter((item) => item.quantity > 0);
    setBasketItems(filteredBasket);
  };

  /**
   * Get the total number of items in the basket across all products
   */
  const getTotalBasketCount = () => {
    if (!basketItems) return 0;
    return basketItems.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0);
  };

  /**
   * Applies a discount in percent to the basket total based on the voucher code
   */
  const applyVoucherDiscount = (event: VoucherEvent) => {
    if (event.detail?.voucherCode) {
      const code = event.detail.voucherCode.toUpperCase();
      const discount = PROMO_CODES[code as keyof typeof PROMO_CODES];

      if (!discount) {
        setDiscountAmount(0);
        setVoucherCode('Invalid code');
        console.warn(`Invalid voucher code: ${code}`);
        return;
      }

      setDiscountAmount(discount);
      setVoucherCode(code);
    } else if (event.type === 'addVoucher') {
      setDiscountAmount(0.25); // hard coded for now
    }
  };

  /**
   * Event handler for the purchase button in the basket
   */
  const handlePurchaseButton = () => {
    if (!basketItems) return;
    emitEventGoCheckout();
  };

  /**
   * Clears all items from the basket
   */
  const clearBasket = () => {
    setBasketItems([]);
  };

  /**
   * Sync's basket items from shared MFE module
   */
  const syncStorage = ({ detail }: CustomEvent) => {
    detail.storage.basket.forEach((product: any) => addProductToBasket({ detail: product } as BasketEvent))
  }

  /**
   * Recalculates the subtotal when the basket items change
   */
  useEffect(() => {
    if (!basketItems) return;
    const total = basketItems.reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0);
    setSubTotal(total);
    emitEventBasketCount();
  }, [basketItems]);

  /**
   * When the page loads we want to setup the event listeners
   * and set the shipping cost
   */
  useEffect(() => {
    const handleAddToBasket = (event: Event) => addProductToBasket(event as BasketEvent);
    const handleApplyVoucher = (event: Event) => applyVoucherDiscount(event as VoucherEvent);
    const handleRefresh = (event: Event) => syncStorage(event as never);
    const handleClearBasket = () => clearBasket();

    // Attach the event listeners
    window.addEventListener('addToBasket', handleAddToBasket);
    window.addEventListener('addVoucher', handleApplyVoucher);
    window.addEventListener('clearBasket', handleClearBasket);
    window.addEventListener('MFE_SYNC', handleRefresh)
    
    setDeliveryCost(5.99);
    
    return () => {
      window.removeEventListener('addToBasket', addProductToBasket as EventListener);
      window.removeEventListener('addVoucher', applyVoucherDiscount as EventListener);
      window.removeEventListener('MFE_SYNC', handleRefresh)
    };
  }, []);

  return {
    basketItems,
    subTotal,
    deliveryCost,
    discountAmount,
    voucherCode,
    updateQuantity,
    handlePurchaseButton,
  };
};

export default useBasket;


