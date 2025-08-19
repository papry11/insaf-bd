import React from 'react'
import { assets } from '../assets/assets'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadphones } from "@fortawesome/free-solid-svg-icons";
import { faRightLeft } from "@fortawesome/free-solid-svg-icons";
import { faRankingStar } from "@fortawesome/free-solid-svg-icons";


const OurPolicy = () => {
  return (
      <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-red-400'>
          <div>
             <FontAwesomeIcon className='text-4xl text-white mb-3' icon={faRightLeft} />
              <p className='font-semibold'>Easy Exchange Policy</p>
              <p className='text-white'>We offer hassle free exchange policy</p>
          </div>
          <div>
              <FontAwesomeIcon className='text-4xl text-white mb-3' icon={faRankingStar} />
               <p className='font-semibold'>Premium Quality</p>
              <p className='text-white'>We provide premium quality product</p>
          </div>
          <div>
             <FontAwesomeIcon className='text-4xl text-white mb-3' icon={faHeadphones} />
               <p className='font-semibold'>Best customer support</p>
              <p className='text-white'>We provide 24/7 customer support</p>
          </div>
      
    </div>
  )
}

export default OurPolicy
