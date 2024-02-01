import ItemList from './components/ItemList';
import BasketTotal from './components/BasketTotal';
import useBasket from './hooks/useBasket';

// const RemoteButton = lazy(() => import('UI/Button'));
import './App.css';

function App() {
  const {
    updateQuantity,
    handlePurchaseButton,
    basketItems,
    deliveryCost,
    subTotal,
    discountAmount,
    voucherCode,
  } = useBasket();

  return (
    <>
      {basketItems && (
        <div className='bg-white p-6 rounded-lg'>
          <ItemList
            products={basketItems}
            handleUpdateQuantity={updateQuantity}
          />

          <BasketTotal
            productCost={subTotal}
            deliveryCost={deliveryCost}
            discount={discountAmount}
            voucherCode={voucherCode}
            onButtonClick={handlePurchaseButton}
          />
        </div>
      )}
    </>
  );
}

export default App;
