import React from 'react'

const ProductCard = ({product}) => {
  return (
    <div className='min-w-48 max-w-48 h-64 p-2 border rounded-lg w-full text-left'>
      <div className='full h-40 border overflow-hidden'>
      <img className='w-auto h-40 mx-auto' src={product.img}/>
      </div>
        <p className='truncate mt-2'>{product.name}</p>
        <p className='text-sm text-gray-500 mt-2'>{(product.price)}</p>
    </div>
  )
}

export default ProductCard