import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


const navIcons = [
  {src:'/assets/icons/search.svg', alt: 'search' },
  { src: '/assets/icons/black-heart.svg', alt: 'heart' },
  { src: '/assets/icons/user.svg', alt: 'user'},
]
const Navbar = () => {
  return (
   <header className='w-full fixed top-0 left-0 z-50 bg-white/80 dark:bg-zinc-700 backdrop-blur-md shadow-md border-b border-gray-300 dark:border-gray-500 transition-colors duration-300'>
    <nav className='flex justify-between items-center px-8 py-4'>
      <Link href="/" className='flex items-center gap-2'>
      <Image
       src='/assets/icons/logo.svg'
       width={30}
       height={30}
       alt='logo'
      />

      <p className="text-xl font-semibold text-gray-900 dark:text-white">
       Price<span className='text-red-600'>Track</span>
      </p>
      </Link>
      <div className="flex items-center gap-6">
      {navIcons.map((icon) => (
            <Image 
              key={icon.alt}
              src={icon.src}
              alt={icon.alt}
              width={28}
              height={28}
              className="object-contain cursor-pointer"
            />
          ))}
      </div>
    </nav>
   </header>
  )
}

export default Navbar