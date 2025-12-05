import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price }) => {
  const { currency, addToCart } = useContext(ShopContext);

  const handleSelect = (e) => {
    e.stopPropagation();
    e.preventDefault();
    addToCart(id);
  };

  return (
    <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl">
      <Link to={`/Product/${id}`}>
        <div className="h-64 overflow-hidden rounded-t-2xl">
          <img
            className="w-full h-full object-cover"
            src={image[0]}
            alt={name}
          />
        </div>

        <div className="p-4 bg-white">
          <p className="text-sm font-medium text-gray-700 truncate">{name}</p>
          <p className="text-sm font-semibold text-gray-900 mt-1">
            {currency}{price}
          </p>
        </div>
      </Link>

      <button
        onClick={handleSelect}
        className="absolute top-3 right-3 bg-white/80 border border-gray-400 text-gray-800 hover:bg-gray-800 hover:text-white px-3 py-1 rounded-md shadow-sm backdrop-blur-sm transition-all duration-300 ease-in-out hover:scale-105 cursor-pointer text-xs font-medium"
      >
        Select
      </button>
    </div>
  );
};

export default ProductItem;
