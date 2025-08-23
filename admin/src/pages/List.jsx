import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'

const List = ({ token }) => {
  const [list, setList] = useState([])

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list')
      if (response.data.success) {
        setList(response.data.products)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/product/remove',
        { id },
        { headers: { token } }
      )

      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <>
      <p className="mb-2 font-semibold text-gray-700">All Products List</p>

      <div className="flex flex-col gap-2">
        {/* Table Header (Desktop Only) */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-3 border border-gray-300 bg-gray-100 text-sm font-semibold">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {/* Product List */}
        {list.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-[1fr_3fr_1fr_1fr_1fr] gap-3 md:gap-2 items-center p-3 border rounded-lg border-gray-200 text-sm bg-white shadow-sm"
          >
            {/* Image */}
            <div className="flex justify-center md:block">
              <img
                className="w-20 h-20 object-cover rounded-md"
                src={item.image[0]}
                alt={item.name}
              />
            </div>

            {/* Mobile Layout (stacked) */}
            <div className="flex flex-col md:hidden">
              <p className="font-medium text-gray-800">{item.name}</p>
              <p className="text-xs text-gray-500">{item.category}</p>
              <p className="text-sm text-green-500 font-semibold">{currency}{item.price}</p>
              <button
                onClick={() => removeProduct(item._id)}
                className="mt-2 bg-gray-600 text-white text-xs py-1 px-3 rounded hover:bg-red-400 transition"
              >
                Remove
              </button>
            </div>

            {/* Desktop Layout */}
            <p className="hidden md:block">{item.name}</p>
            <p className="hidden md:block">{item.category}</p>
            <p className="hidden md:block">{currency}{item.price}</p>
            <p
              onClick={() => removeProduct(item._id)}
              className="hidden md:block text-center text-red-600 cursor-pointer hover:underline"
            >
              Remove
            </p>
          </div>
        ))}
      </div>
    </>
  )
}

export default List
