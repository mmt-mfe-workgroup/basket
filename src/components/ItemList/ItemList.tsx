const ItemList = () => {
  const products = [
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

  return (
    <div className='mx-auto max-w-5xl justify-center md:space-x-6'>
      <div className='rounded-lg bg-white p-6'>
        <h2 className='text-lg font-bold text-gray-900'>Your Basket</h2>
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
                      value='2'
                    />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItemList;
