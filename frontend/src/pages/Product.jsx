
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { products, currency , addToCart } = useContext(ShopContext);
  const { productId } = useParams();
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  useEffect(() => {
    const found = products.find((item) => item._id === productId);
    if (found) {
      setProductData(found);
      setImage(found.image[0]);
    }
  }, [productId, products]);

  return productData ? (
    <div className="pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/*------------------------------------ products data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/*-------------------------------- products image */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                key={index}
                src={item}
                onClick={() => setImage(item)}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                alt=""
              />
            ))}
          </div>
          <div className="flex-1">
            <img src={image} className="w-full h-auto" alt="Main product" />
          </div>
        </div>

        {/*-------------------------------------- product info */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-400 md:w-4/5">
            {productData.description}
          </p>

          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSize(item)}
                  className={`py-2 px-4 rounded border transition 
                    ${
                      item === size
                        ? "border-[#f375ed] bg-[#fff7ff] text-[#d642cf]"
                        : "border-gray-600/40 bg-white"
                    }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <Link 
            to='/cart' 
            onClick={() => addToCart(productData._id, size || "")} // size optional
           className="bg-[#b47ab1] px-8 py-2 rounded text-white 
             transition transform duration-300 ease-in-out
             hover:scale-105 hover:bg-[#9b5fa0]"
          >
              Select
          </Link>

          <hr className="mt-8 sm:w-4/5 text-gray-300 " />
          <div className="text-sm text-gray-600 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* display related product ----------------------*/}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : (
    <div className="opacity-0">Loading...</div>
  );
};

export default Product;

