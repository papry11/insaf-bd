import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const {
    products,
    currency,
    cartItems,
    updateQuantity,
    removeFromCart,
    navigate,
  } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        if (cartItems[items]) {
          for (const size in cartItems[items]) {
            if (cartItems[items][size] > 0) {
              tempData.push({
                _id: items,
                size: size,
                quantity: cartItems[items][size],
              });
            }
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  // ✅ quantity update with add_to_cart event
  const handleQuantityChange = (product, size, value) => {
    if (value === "" || value === "0") return;

    updateQuantity(product._id, size, Number(value));

    // Pixel Event: add_to_cart
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "add_to_cart",
      ecommerce: {
        items: [
          {
            item_id: product._id,
            item_name: product.name,
            price: product.price,
            quantity: Number(value),
            item_variant: size,
          },
        ],
      },
    });
  };

  // ✅ removeFromCart with remove_from_cart event
  const handleRemove = (product, size) => {
    removeFromCart(product._id, size);

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "remove_from_cart",
      ecommerce: {
        items: [
          {
            item_id: product._id,
            item_name: product.name,
            price: product.price,
            quantity: 1, 
            item_variant: size,
          },
        ],
      },
    });
  };

  return (
    <div className="pt-14 px-4">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      {cartData.length === 0 ? (
        <p className="text-center text-red-400 text-2xl my-10">
          Your cart is empty
        </p>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 flex flex-col gap-6">
            {cartData.map((item, index) => {
              const ProductData = products.find(
                (product) => product._id === item._id
              );
              return (
                <div
                  key={index}
                  className="py-4 border-t border-gray-300/50 text-gray-600 flex items-start gap-6"
                >
                  <img
                    className="w-16 sm:w-20"
                    src={ProductData.image[0]}
                    alt=""
                  />
                  <div>
                    <p className="text-xs sm:text-lg font-medium">
                      {ProductData.name}
                    </p>
                    <div className="flex items-center gap-5 mt-2">
                      <p>
                        {currency}
                        {ProductData.price}
                      </p>
                      <p className="px-2 sm:px-3 sm:py-1 bg-white-600">
                        {item.size}
                      </p>

                      {/* ✅ quantity update */}
                      <input
                        onChange={(e) =>
                          handleQuantityChange(
                            ProductData,
                            item.size,
                            e.target.value
                          )
                        }
                        className="text-center bg-gray-200 max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                        type="number"
                        min={1}
                        defaultValue={item.quantity}
                      />

                      {/* ✅ removeFromCart */}
                      <img
                        onClick={() => handleRemove(ProductData, item.size)}
                        className="w-5 mr-4 sm:w-5 cursor-pointer"
                        src={assets.bin_icon}
                        alt="Delete"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="w-full lg:w-1/3 mb-10 border border-gray-300 p-10">
            <CartTotal />
            <div className="w-full ">
              <button
                onClick={() => navigate("/place-order")}
                className="w-full mt-6 px-12 py-2 rounded-full font-semibold text-white text-lg
          bg-gradient-to-r from-[#9b5fa0] to-[#7f3f85] 
          shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl"
              >
                ORDER NOW
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
