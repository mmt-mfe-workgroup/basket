import { BasketItem } from '../../types/props.types';

const ItemList = ({ products }: { products: BasketItem[] }) => {
  return (
    <div className='mx-auto max-w-5xl justify-center md:space-x-6'>
        <h2 className='text-2xl font-bold text-gray-900'>Your Basket</h2>
        <div>
          {products.map((product) => (
            <div className='flex mt-5' key={product.id}>
              <img src={product.image} alt='product-image' className='w-full rounded-lg sm:w-40' />
              <div className='ml-4 flex w-full justify-between text-left'>
                <div className='mt-2 mt-0'>
                  <h3 className='text-lg font-bold text-gray-900'>{product.name}</h3>
                  <p className='mt-1 text-xs text-gray-700'>Size: {product.size}</p>
                  <input
                    className='h-10 w-10 border mt-2 bg-white text-center text-sm outline-none text-gray-700 font-bold'
                    type='number'
                    value={product.quantity}
                  />
                </div>
              </div>
              <div className="mt-2">
                <p className='text-gray-900 text-md font-bold'>£{product.price}</p>
                </div>
            </div>
          ))}
        </div>
    </div>
  );
};

export default ItemList;
