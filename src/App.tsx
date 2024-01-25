import { useEffect, useState, lazy, Suspense } from 'react';
import ItemList from './components/ItemList';
import BasketTotal from './components/BasketTotal';
import { Product, BasketItem, BasketEvent } from './types/props.types';

// @ts-ignore
const RemoteButton = lazy(() => import('UI/Button'));
import './App.css';

function App() {
  const [subTotal, setSubTotal] = useState(0);
  const [deliveryCost, setDeliveryCost] = useState(0);
  const [basketItems, setBasketItems] = useState<BasketItem[]>([]);

  /**
   * When the page loads we want to iterate over the products and find out
   * the quantity of each product based on the product id.
   */
  useEffect(() => {
    // if (!products) return;
    // const sortedBasket = sortProductQuantity(products);

    // // products.forEach((product) => {
    // //   const item = basket.find((item) => item.id === product.id);
    // //   if (item) {
    // //     item.quantity += 1;
    // //   } else {
    // //     basket.push({ ...product, quantity: 1 });
    // //   }
    // // });
    // setBasketItems(sortedBasket);

    // const total = products.reduce((acc, product) => {
    //   return acc + product.price;
    // }, 0);
    // setSubTotal(total);
    setDeliveryCost(5.99);
  }, []);

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
   * Listen for the addToBasket event and the product to state
   * when an event is received.
   */
  useEffect(() => {
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

    window.addEventListener('addToBasket', addProductToBasket as EventListener);

    return () => {
      window.removeEventListener('addToBasket', addProductToBasket as EventListener);
    };
  }, []);

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
  };

  return (
    <>
      {basketItems && (
        <div className='bg-white p-6 rounded-lg'>
          <ItemList products={basketItems} handleUpdateQuantity={updateQuantity} />

          <div className='mt-4 mb-2 flex flex-col items-start'>
            <p className='mb-4 text-gray-700'>Promo Code</p>
            <div className='button-wrap flex'>
              <Suspense fallback={<div>Loading...</div>}>
                <RemoteButton
                  label='Apply voucher'
                  onClick={() => console.log('applying voucher...')}
                />
              </Suspense>
            </div>
          </div>

          <BasketTotal productCost={subTotal} deliveryCost={deliveryCost} />
        </div>
      )}
    </>
  );
}

export default App;
