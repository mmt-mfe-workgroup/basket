import { BasketItem } from '../../types/props.types';

type ItemListProps = {
  products: BasketItem[];
  handleUpdateQuantity: (id: number, quantity: number) => void;
};

const ItemList = ({ products, handleUpdateQuantity }: ItemListProps) => {
  return (
    <div className='mx-auto max-w-5xl justify-center md:space-x-6'>
      <h2 className='text-2xl font-bold text-gray-900'>Your Basket</h2>
      <div>
        {products.map((product) => (
          <div className='flex mt-5' key={product.id}>
            <img src={product.thumbnail} alt='product-image' className='w-full rounded-lg sm:w-40' />
            <div className='ml-4 flex w-full justify-between text-left'>
              <div className='mt-2 mt-0'>
                <h3 className='text-lg font-bold text-gray-900'>{product.title}</h3>
                <p className='mt-1 text-xs text-gray-700'>Size: {product.size}</p>
                <div className='flex items-center border-gray-100 mt-2'>
                  <span
                    className='cursor-pointer rounded-l w-9 bg-gray-100 text-gray-900 py-2 px-3.5 duration-100 hover:bg-purple-500 hover:text-purple-50 text-center'
                    onClick={() => handleUpdateQuantity(product.id, Number(-1))}
                  >
                    -
                  </span>
                  <input
                    className='h-10 w-10 border bg-white text-center text-sm outline-none text-gray-700 font-bold'
                    type='number'
                    value={product.quantity}
                  />
                  <span
                    className='cursor-pointer rounded-r w-9 bg-gray-100 text-gray-900 py-2 px-3.5 duration-100 hover:bg-purple-500 hover:text-purple-50'
                    onClick={() => handleUpdateQuantity(product.id, Number(1))}
                  >
                    +
                  </span>
                </div>
              </div>
            </div>
            <div className='mt-2'>
              <p className='text-gray-900 text-md font-bold'>£{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemList;
