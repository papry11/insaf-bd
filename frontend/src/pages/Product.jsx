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
          <p className="mt-5 text-gray-300 md:w-4/5">
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
                        ? "border-red-400 bg-white text-red-500"
                        : "border-gray-200/40 bg-black"
                    }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
           <button onClick={()=>addToCart(productData._id,size)} class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
              <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                ADD TO CART
              </span>
          </button>
           <Link to='/cart'
            class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
              <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                GO TO CART
              </span>
            </Link>
          <hr className="mt-8 sm:w-4/5 text-gray-300 " />
          <div className="text-sm text-gray-200 mt-5 flex flex-col gap-1">
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
