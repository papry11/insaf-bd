import React from 'react'

const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center justify-between py-2 px-[4%]'>
          <h1 className="prata-regular text-2xl sm:py-3 lg:text-4xl">NEXT FORTUNE <span className='text-sm text-pink-700'>Admin panal</span></h1>
          <button onClick={()=>setToken('')} className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>LOGOUT</button>
    </div>
  )
}

export default Navbar
