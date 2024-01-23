import { useEffect, useState } from 'react';
import ItemList from './components/ItemList';
import BasketTotal from './components/BasketTotal';
import { Product } from './types/props.types';
import './App.css';

const products: Product[] = [
  {
    id: 1,
    name: 'Nike Air Max 2019',
    price: 180,
    image:
      'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8',
    size: '10',
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
    id: 3,
    name: 'Nike Air Max 2021',
    price: 220,
    image:
      'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8',
    size: '12',
  },
];

function App() {
  const [subTotal, setSubTotal] = useState(0);
  const [deliveryCost, setDeliveryCost] = useState(0);

  // Calculate the total product cost and shipping on load.
  useEffect(() => {
    const total = products.reduce((acc, product) => {
      return acc + product.price;
    }, 0);
    setSubTotal(total);
    setDeliveryCost(5.99);
  }, []);

  return (
    <>
      <div>
        <ItemList products={products} />
        <BasketTotal productCost={subTotal} deliveryCost={deliveryCost} />
      </div>
    </>
  );
}

export default App;
