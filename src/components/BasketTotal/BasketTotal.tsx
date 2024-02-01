const BasketTotal = ({
  productCost,
  deliveryCost,
  discount,
  voucherCode,
  onButtonClick,
}: {
  productCost: number;
  deliveryCost: number;
  discount?: number;
  voucherCode?: string;
  onButtonClick: () => void;
}) => {
  const subTotal = productCost + deliveryCost;
  const discountAmount = discount ? productCost * discount : 0;
  const basketTotal = discount ? subTotal - discountAmount : subTotal;

  return (
    <div className='mt-6 h-full'>
      <hr className='my-4 ' />
      <div className='mb-2 flex justify-between'>
        <p className='text-gray-700'>Subtotal</p>
        <p className='text-gray-700'>£{productCost}</p>
      </div>

      {voucherCode && (
        <div className='mb-2 flex justify-between'>
          <p className='text-gray-700'>Discount - <span className="text-sm italic">{voucherCode}</span></p>
          <p className='text-red-600'>- £{discountAmount}</p>
        </div>
      )}

      <div className='flex justify-between'>
        <p className='text-gray-700'>Shipping</p>
        <p className='text-gray-700'>£{deliveryCost}</p>
      </div>

      <div className='text-gray-700 text-xs text-left mt-1 italic'>
        <p>Estimated delivery 14 - 16 March</p>
      </div>

      <hr className='my-4 ' />
      <div className='flex justify-between text-gray-900'>
        <p className='text-lg font-bold'>Total</p>
        <div className='text-gray-900'>
          <p className='mb-1 text-lg font-bold'>£{basketTotal.toFixed(2)}</p>
        </div>
      </div>
      <button
        className='mt-6 w-full rounded-md bg-purple-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600'
        onClick={onButtonClick}
      >
        Purchase
      </button>
    </div>
  );
};

export default BasketTotal;
