import React from 'react'

const NewsletterBox = () => {

    const onSubmitHandler = (event) => {
        event.preventDefault();
    }
  return (
    <div className='text-center'>
          <p className='text-2xl font-medium text-gray-white'>Subscribe now & get 20% off</p>
          <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex flex-items-center gap-3 mx-auto my-6 pl-3 border border-gray-400/40 rounded' action="">
              <input className='w-full sm:flex-1 outline-none' type="email" placeholder='Enter your email' />
             <button type="button" className="bg-gray-800 px-6 py-2 rounded text-white 
             transition transform duration-300 ease-in-out
             hover:scale-105 hover:bg-[#9b5fa0]">SUBSCRIBE</button>
          </form>
    </div>
  )
}

export default NewsletterBox
