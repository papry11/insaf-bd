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
    <div className="relative">
      <Link to={`/Product/${id}`}>
        <div className="overflow-hidden">
          <img
            className="w-full object-cover"
            src={image[0]}
            alt={name}
          />
          <div className="pt-3 pb-1 text-gray-600">
            <p className="text-sm">{name}</p>
            <p className="text-sm font-medium">
              {currency}{price}
            </p>
          </div>
        </div>
      </Link>

      {/* ✅ Now this will stay in card corner */}
      <button
        onClick={handleSelect}
        className="absolute top-2 right-2 bg-gray-500 hover:bg-[#b47ab1] text-white text-xs px-3 py-1 rounded-md shadow-md transform transition duration-300 ease-in-out hover:scale-115 cursor-pointer"
      >
        Select
      </button>
    </div>
  );
};

export default ProductItem;
