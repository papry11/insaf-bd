import React from 'react'
import { assets } from '../assets/assets' 

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-red-400'>
      
      {/* Easy Exchange */}
      <div>
        <img 
          src={assets.exchange_icon} 
          alt="Easy Exchange" 
          className='w-12 h-12 mx-auto mb-3'
        />
        <p className='font-semibold'>Easy Exchange Policy</p>
        <p className='text-white'>We offer hassle free exchange policy</p>
      </div>

      {/* Premium Quality */}
      <div>
        <img 
          src={assets.quality_icon} 
          alt="Premium Quality" 
          className='w-12 h-12 mx-auto mb-3'
        />
        <p className='font-semibold'>Premium Quality</p>
        <p className='text-white'>We provide premium quality product</p>
      </div>

      {/* Customer Support */}
      <div>
        <img 
          src={assets.support_img} 
          alt="Customer Support" 
          className='w-12 h-12 mx-auto mb-3'
        />
        <p className='font-semibold'>Best customer support</p>
        <p className='text-white'>We provide 24/7 customer support</p>
      </div>

    </div>
  )
}

export default OurPolicy
