import { Product } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
interface Props{
    product: Product
}
const ProductCard = ({product}:Props) => {
  return (
    <Link href={`/products/${product._id}`}
    className='sm:w-[292px] sm:max-w-[292px] w-full flex-1 flex flex-col gap-4 rounded-md'>
        <div className='flex-1 relative flex flex-col gap-5 p-4 rounded-md'>
            <Image
            src={product.image}
            alt={product.title}
            width={200}
            height={200}
            className="max-h-[250px] object-contain w-full h-full bg-transparent"
            />
        </div>

        <div className='flex flex-col gap-3'>
          <h3 className='w-full max-w-[250px] truncate'>
            {product.title}
          </h3>
          <div className='flex justify-between'>
            <p className='text-gray-400 opacity-50 text-lg capitalize'>{product.category}</p>
            <p className='text-gray-400 text-lg font-semibold'>
              <span>{product?.currency}</span>
              <span>{product?.currentPrice}</span>
            </p>
          </div>
        </div>

    </Link>
  )
}

export default ProductCard