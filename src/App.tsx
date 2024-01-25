import { lazy, Suspense } from 'react';
import ItemList from './components/ItemList';
import BasketTotal from './components/BasketTotal';
import useBasket from './hooks/useBasket';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const RemoteButton = lazy(() => import('UI/Button'));
import './App.css';

function App() {
  const { updateQuantity, basketItems, deliveryCost, subTotal } = useBasket();

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
