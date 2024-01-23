import { useEffect, useState } from 'react';
import ItemList from './components/ItemList';
import BasketTotal from './components/BasketTotal';
import { Product, BasketItem } from './types/props.types';
import './App.css';

const products: Product[] = [
  {
    id: 1,
    name: 'Nike Air Max 2019',
    price: 180,
    image:
      'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8',
    size: '12',
  },
  {
    id: 2,
    name: 'Nike Air Max 2020',
    price: 200,
    image:
      'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1131&q=80',
    size: '8.5',
  },
  {
    id: 1,
    name: 'Nike Air Max 2019',
    price: 180,
    image:
      'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8',
    size: '12',
  },
];

function App() {
  const [subTotal, setSubTotal] = useState(0);
  const [deliveryCost, setDeliveryCost] = useState(0);
  const [basketItems, setBasketItems] = useState(products);

  /** When the page loads we want to iterate over the products and find out
   * the quantity of each product based on the product id. */
  useEffect(() => {
    const basket: BasketItem[] = [];

    products.forEach((product) => {
      const item = basket.find((item) => item.id === product.id);
      if (item) {
        item.quantity += 1;
      } else {
        basket.push({ ...product, quantity: 1 });
      }
    });
    setBasketItems(basket);

    const total = products.reduce((acc, product) => {
      return acc + product.price;
    }, 0);
    setSubTotal(total);
    setDeliveryCost(5.99);
  }, []);

  // const calculateProductQuantity = (products: Product[]) => {
  //   return products.reduce((acc, product) => {
  //     return acc + product.quantity;
  //   }, 0);
  // }

  // const updateQuantity = (id: number, quantity: number) => { };

  return (
    <>
      <div className='bg-white p-6 rounded-lg'>
        <ItemList products={basketItems} />
        <BasketTotal productCost={subTotal} deliveryCost={deliveryCost} />
      </div>
    </>
  );
}

export default App;
