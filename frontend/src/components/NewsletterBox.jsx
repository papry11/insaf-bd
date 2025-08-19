import React from 'react'

const NewsletterBox = () => {

    const onSubmitHandler = (event) => {
        event.preventDefault();
    }
  return (
    <div className='text-center'>
          <p className='text-2xl font-medium text-gray-white'>Subscribe now & get 20% off</p>
          <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex flex-items-center gap-3 mx-auto my-6 pl-3 border border-gray-200/40 rounded' action="">
              <input className='w-full sm:flex-1 outline-none' type="email" placeholder='Enter your email' />
             <button type="button" class="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium text-sm px-8 py-3 text-center rounded">SUBSCRIBE</button>
          </form>
    </div>
  )
}

export default NewsletterBox
