import HeroCarousel from '@/components/HeroCarousel'
import SearchBar from '@/components/SearchBar'
import Image from 'next/image'
import React from 'react'
import {getAllProducts} from "@/lib/actions"
import ProductCard from '@/components/ProductCard'

const Home = async () => {

  const allProducts = await getAllProducts();

  return (
   <>
   <section className="flex flex-col px-6 md:px-20 py-24">
      <div className='flex lg:flex-row flex-wrap gap-16'>
        <div className="flex flex-col justify-center">
          {/* <p className='small-text text-red-700'>
            Smart Shopping starts here:<Image 
            src="/assets/icons/arrow-right.svg"
            alt="arrow-right"
            width={16}
            height={16}
            />
            </p> */}
            <h1 className="text-4xl font-bold ">
              Unleash the Power of 
              <span className='text-red-600'> PriceTracker</span>
            </h1>
            <p className='mt-6'>
            Powerful, self-serve product and growth analytics to help you convert, engage, and retain more.
            </p>

            <SearchBar/>
        </div>

        <HeroCarousel/>
      </div>
   </section>

   <section className='trending-section'>
    <h2 className='section-text text-2xl font-bold'>Trending</h2>

    <div className='flex flex-wrap gap-x-8 gap-y-16'>
      {allProducts?.map((product)=>(
        <ProductCard key={product._id} product={product} />))}
    </div>
   </section>
   </>
  )
}

export default Home