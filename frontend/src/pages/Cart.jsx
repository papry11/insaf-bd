// import React, { useContext, useEffect, useState } from "react";
// import { ShopContext } from "../context/ShopContext";
// import Title from "../components/Title";
// import { assets } from "../assets/assets";
// import CartTotal from "../components/CartTotal";

// const Cart = () => {
//   const {
//     products,
//     currency,
//     cartItems,
//     updateQuantity,
//     navigate,
//   } = useContext(ShopContext);
//   const [cartData, setCartData] = useState([]);

//   useEffect(() => {
//     if (products.length > 0) {
//       const tempData = [];
//       for (const items in cartItems) {
//         if (cartItems[items]) {
//           for (const size in cartItems[items]) {
//             if (cartItems[items][size] > 0) {
//               tempData.push({
//                 _id: items,
//                 size: size,
//                 quantity: cartItems[items][size],
//               });
//             }
//           }
//         }
//       }
//       setCartData(tempData);
//     }
//   }, [cartItems, products]);

//   return (
//     <div className="pt-14 px-4">
//       <div className="text-2xl mb-3">
//         <Title text1={"YOUR"} text2={"CART"} />
//       </div>

//       {cartData.length === 0 ? (
//         // Cart empty condition
//         <p className="text-center text-red-400 text-2xl my-10">
//           Your cart is empty
//         </p>
//       ) : (
//         // Cart has items
//         <div className="flex flex-col lg:flex-row gap-8">
//           <div className="flex-1 flex flex-col gap-6">
//             {cartData.map((item, index) => {
//               const ProductData = products.find(
//                 (product) => product._id === item._id
//               );
//               return (
//                 <div
//                   key={index}
//                   className="py-4 border-t border-gray-300/50 text-gray-200 flex items-start gap-6"
//                 >
//                   <img
//                     className="w-16 sm:w-20"
//                     src={ProductData.image[0]}
//                     alt=""
//                   />
//                   <div>
//                     <p className="text-xs sm:text-lg font-medium">
//                       {ProductData.name}
//                     </p>
//                     <div className="flex items-center gap-5 mt-2">
//                       <p>
//                         {currency}
//                         {ProductData.price}
//                       </p>
//                       <p className="px-2 sm:px-3 sm:py-1 bg-gray-600">
//                         {item.size}
//                       </p>
//                       <input
//                         onChange={(e) =>
//                           e.target.value === "" || e.target.value === "0"
//                             ? null
//                             : updateQuantity(
//                                 item._id,
//                                 item.size,
//                                 Number(e.target.value)
//                               )
//                         }
//                         className="text-center bg-gray-600 max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
//                         type="number"
//                         min={1}
//                         defaultValue={item.quantity}
//                       />
//                       <img
//                         onClick={() => updateQuantity(item._id, item.size, 0)}
//                         className="w-5 mr-4 sm:w-5 cursor-pointer"
//                         src={assets.bin_icon}
//                         alt=""
//                       />
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           <div className="w-full lg:w-1/3 mb-10 border border-gray-300 p-10">
//             <CartTotal />
//             <div className="w-full ">
//               <button
//                 onClick={() => navigate("/place-order")}
//                 className="mt-2 relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
//               >
//                 <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
//                   PROCEED TO CHECKOUT
//                 </span>
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;


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
    removeFromCart,   // ✅ added removeFromCart
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
                  className="py-4 border-t border-gray-300/50 text-gray-200 flex items-start gap-6"
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
                      <p className="px-2 sm:px-3 sm:py-1 bg-gray-600">
                        {item.size}
                      </p>

                      {/* ✅ quantity update */}
                      <input
                        onChange={(e) =>
                          e.target.value === "" || e.target.value === "0"
                            ? null
                            : updateQuantity(
                                item._id,
                                item.size,
                                Number(e.target.value)
                              )
                        }
                        className="text-center bg-gray-600 max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                        type="number"
                        min={1}
                        defaultValue={item.quantity}
                      />

                      {/* ✅ removeFromCart instead of updateQuantity(...,0) */}
                      <img
                        onClick={() => removeFromCart(item._id, item.size)}
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
                className="mt-2 relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
              >
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                  PROCEED TO CHECKOUT
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

