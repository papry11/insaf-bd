
// import React, { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import Title from "../components/Title";
// import CartTotal from "../components/CartTotal";
// import { ShopContext } from "../context/ShopContext";
// import { useNavigate } from "react-router-dom";
// import { trackPurchase } from "../utils/metaPixel"; // ✅ Added
// import { v4 as uuidv4 } from "uuid";

// const GuestCheckout = () => {
//   const { setCartItems: setContextCartItems, backendUrl } =
//     useContext(ShopContext);

//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     fullName: "",
//     phone: "",
//     fullAddress: "",
//     note: "", // ✳️ New field for note
//   });

//   const [method, setMethod] = useState("cod");
//   const [shippingCharge, setShippingCharge] = useState(0);

//   const [cartItems, setCartItems] = useState(() => {
//     const stored = JSON.parse(localStorage.getItem("cart")) || {};
//     return Object.entries(stored).flatMap(([productId, sizes]) =>
//       Object.entries(sizes).map(([size, quantity]) => ({
//         productId,
//         size,
//         quantity,
//         price: 0,
//         name: "",
//         image: "",
//       }))
//     );
//   });

//   const [total, setTotal] = useState(0);

//   // Fetch product details from backend
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const updated = await Promise.all(
//           cartItems.map(async (item) => {
//             const res = await axios.get(`${backendUrl}/api/product/${item.productId}`);
//             const product = res.data;
//             return {
//               ...item,
//               price: product.price || 0,
//               name: product.name || "",
//               image: product.image?.[0] || "",
//             };
//           })
//         );
//         setCartItems(updated);
//       } catch (err) {
//         console.error("❌ Product fetch error:", err);
//       }
//     };

//     if (cartItems.length > 0) fetchProducts();
//   }, []);

//   // Calculate subtotal
//   useEffect(() => {
//     const sum = cartItems.reduce(
//       (acc, item) => acc + (item.price || 0) * item.quantity,
//       0
//     );
//     setTotal(sum);
//   }, [cartItems]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleOrder = async (e) => {
//     e.preventDefault();
//     try {
//       const subtotal = cartItems.reduce(
//         (acc, item) => acc + (item.price || 0) * item.quantity,
//         0
//       );
//       const finalAmount = subtotal + shippingCharge;

//        // 🔹 Generate unique token per checkout
//         const orderToken = uuidv4();

//        const res = await axios.post(`${backendUrl}/api/order/place-guest`, {
//         fullName: formData.fullName,
//         phone: formData.phone,
//         fullAddress: formData.fullAddress,
//         note: formData.note, // ✳️ Include note in order payload
//         items: cartItems,
//         amount: finalAmount,
//         deliveryCharge: shippingCharge,
//          paymentMethod: method,
//          orderToken, // ✅ send token
//       });

//       if (res.data?.trackingId) {
//         // ✅ Meta Pixel Purchase Event (Custom Function)
//         trackPurchase({
//           items: cartItems,
//           amount: finalAmount,
//         });

//         // ✅ Fallback direct fbq call (optional safeguard)
//         if (window.fbq) {
//           window.fbq("track", "Purchase", {
//             value: finalAmount,
//             currency: "BDT",
//             contents: cartItems.map((item) => ({
//               id: item.productId,
//               quantity: item.quantity,
//               item_price: item.price,
//             })),
//             content_type: "product",
//           });
//         }

//         // ✅ GTM dataLayer push
//         window.dataLayer = window.dataLayer || [];
//         window.dataLayer.push({
//           event: "purchase",
//           ecommerce: {
//             transaction_id: res.data.trackingId,
//             value: finalAmount,
//             currency: "BDT",
//             items: cartItems.map((item) => ({
//               item_id: item.productId,
//               item_name: item.name,
//               price: item.price,
//               quantity: item.quantity,
//             })),
//           },
//         });

//         // ✅ Clear cart
//         localStorage.removeItem("cart");
//         setCartItems([]);
//         setContextCartItems({});

//         // ✅ Redirect to Order Confirmation
//         navigate("/order-confirmation", {
//           state: {
//             orderId: res.data.trackingId,
//             deliveryCity: shippingCharge <= 100 ? "dhaka" : "outside",
//           },
//         });
//       } else {
//         alert("❌ অর্ডার ব্যর্থ হয়েছে, আবার চেষ্টা করুন।");
//       }
//     } catch (err) {
//       console.error("❌ Order Failed:", err);
//       alert("❌ অর্ডার ফেইল করেছে। আবার চেষ্টা করুন।");
//     }
//   };

//   return (
//     <form
//       onSubmit={handleOrder}
//       className="flex flex-col sm:flex-row justify-between gap-4 pt-5 min-h-[80vh] border-t"
//     >
//       {/* LEFT SIDE */}
//       <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
//         <div className="text-xl sm:text-2xl my-3">
//           <Title text1={"DELIVERY"} text2={"INFORMATION"} />
//         </div>
//         <div className="gap-3">
//           <label className="mx-2">Name</label>
//           <input
//             required
//             onChange={handleChange}
//             name="fullName"
//             value={formData.fullName}
//             className="border border-gray-300 rounded py-1.5 px-3.5 w-full m-2"
//             type="text"
//             placeholder="Enter Your Name"
//           />

//           <label className="mx-2">Phone Number</label>
//           <input
//             required
//             onChange={handleChange}
//             name="phone"
//             value={formData.phone}
//             className="border border-gray-300 rounded py-1.5 px-3.5 w-full m-2"
//             type="tel"
//             placeholder="Enter Your Number"
//           />

//           <label className="mx-2">Address</label>
//           <input
//             required
//             onChange={handleChange}
//             name="fullAddress"
//             value={formData.fullAddress}
//             className="border border-gray-300 rounded py-1.5 px-3.5 w-full m-2"
//             type="text"
//             placeholder="Enter Your Address"
//           />

//             {/* ✳️ Note Box */}
//           <label className="mx-2">Note (optional)</label>
//           <textarea
//             name="note"
//             onChange={handleChange}
//             value={formData.note}
//             rows={3}
//             placeholder="Enter any special note..."
//             className="border border-gray-300 rounded py-1.5 px-3.5 w-full m-2"
//           ></textarea>


//           {/* Shipping Charge */}
//           <div className="w-full m-2 border border-gray-300 rounded p-4">
//             <p className="mb-2 font-semibold">Shipping Charge :</p>
//             <div className="flex flex-col sm:flex-row gap-4">
//               <label className="flex items-center gap-2">
//                 <input
//                   required
//                   type="radio"
//                   name="shipping"
//                   value="inside"
//                   onChange={() => setShippingCharge(80)}
//                 />
//                 Inside Dhaka (৳80)
//               </label>
//               <label className="flex items-center gap-2">
//                 <input
//                   required
//                   type="radio"
//                   name="shipping"
//                   value="sub-dhaka"
//                   onChange={() => setShippingCharge(100)}
//                 />
//                 Sub Dhaka (৳100)
//               </label>
//               <label className="flex items-center gap-2">
//                 <input
//                   required
//                   type="radio"
//                   name="shipping"
//                   value="outside"
//                   onChange={() => setShippingCharge(150)}
//                 />
//                 Outside Dhaka (৳150)
//               </label>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* RIGHT SIDE */}
//       <div className="mt-8">
//         <div className="mt-8 min-w-80">
//           <CartTotal shippingCharge={shippingCharge} />
//         </div>
//         <div className="mt-12">
//           <Title text1={"PAYMENT"} text2={"METHOD"} />
//           <div className="flex gap-3 flex-col lg:flex-row">
//             <div
//               onClick={() => setMethod("cod")}
//               className="flex items-center gap-3 border border-gray-300 p-2 px-3 cursor-pointer"
//             >
//               <p
//                 className={`min-w-3.5 h-3.5 border border-gray-300 rounded-full ${
//                   method === "cod" ? "bg-green-400" : ""
//                 }`}
//               ></p>
//               <p className="text-gray-500 text-sm font-medium mx-4">
//                 CASH ON DELIVERY
//               </p>
//             </div>
//           </div>
//           <div className="w-full">
//             <button
//               type="submit"
//               className="w-full mt-6 px-12 py-2 rounded-full font-semibold text-white text-lg
//               bg-gradient-to-r from-[#9b5fa0] to-[#7f3f85]
//               shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl"
//             >
//               PLACE ORDER
//             </button>
//           </div>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default GuestCheckout;







import React, { useState, useEffect, useContext } from "react"; 
import axios from "axios";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import { trackPurchase } from "../utils/metaPixel"; // ✅ Added
import { v4 as uuidv4 } from "uuid";

const GuestCheckout = () => {
  const { setCartItems: setContextCartItems, backendUrl } =
    useContext(ShopContext);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    fullAddress: "",
    note: "", // ✳️ New field for note
  });

  const [method, setMethod] = useState("cod");
  const [shippingCharge, setShippingCharge] = useState(0);

  const [cartItems, setCartItems] = useState(() => {
    const stored = JSON.parse(localStorage.getItem("cart")) || {};
    return Object.entries(stored).flatMap(([productId, sizes]) =>
      Object.entries(sizes).map(([size, quantity]) => ({
        productId,
        size,
        quantity,
        price: 0,
        name: "",
        image: "",
      }))
    );
  });

  const [total, setTotal] = useState(0);

  // 🔹 Loader / processing state
  const [isProcessing, setIsProcessing] = useState(false);

  // Prevent page refresh/back during checkout
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isProcessing) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isProcessing]);

  // Fetch product details from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const updated = await Promise.all(
          cartItems.map(async (item) => {
            const res = await axios.get(`${backendUrl}/api/product/${item.productId}`);
            const product = res.data;
            return {
              ...item,
              price: product.price || 0,
              name: product.name || "",
              image: product.image?.[0] || "",
            };
          })
        );
        setCartItems(updated);
      } catch (err) {
        console.error("❌ Product fetch error:", err);
      }
    };

    if (cartItems.length > 0) fetchProducts();
  }, []);

  // Calculate subtotal
  useEffect(() => {
    const sum = cartItems.reduce(
      (acc, item) => acc + (item.price || 0) * item.quantity,
      0
    );
    setTotal(sum);
  }, [cartItems]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOrder = async (e) => {
    e.preventDefault();
    setIsProcessing(true); // 🔹 Start loader & disable button

    try {
      const subtotal = cartItems.reduce(
        (acc, item) => acc + (item.price || 0) * item.quantity,
        0
      );
      const finalAmount = subtotal + shippingCharge;

      // 🔹 Generate unique token per checkout
      const orderToken = uuidv4();

      const res = await axios.post(`${backendUrl}/api/order/place-guest`, {
        fullName: formData.fullName,
        phone: formData.phone,
        fullAddress: formData.fullAddress,
        note: formData.note,
        items: cartItems,
        amount: finalAmount,
        deliveryCharge: shippingCharge,
        paymentMethod: method,
        orderToken, // ✅ send token
      });

      if (res.data?.trackingId) {
        // ✅ Meta Pixel Purchase Event (Custom Function)
        trackPurchase({
          items: cartItems,
          amount: finalAmount,
        });

        // ✅ Fallback direct fbq call (optional safeguard)
        if (window.fbq) {
          window.fbq("track", "Purchase", {
            value: finalAmount,
            currency: "BDT",
            contents: cartItems.map((item) => ({
              id: item.productId,
              quantity: item.quantity,
              item_price: item.price,
            })),
            content_type: "product",
          });
        }

        // ✅ GTM dataLayer push
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "purchase",
          ecommerce: {
            transaction_id: res.data.trackingId,
            value: finalAmount,
            currency: "BDT",
            items: cartItems.map((item) => ({
              item_id: item.productId,
              item_name: item.name,
              price: item.price,
              quantity: item.quantity,
            })),
          },
        });

        // ✅ Clear cart
        localStorage.removeItem("cart");
        setCartItems([]);
        setContextCartItems({});

        // ✅ Redirect to Order Confirmation
        navigate("/order-confirmation", {
          state: {
            orderId: res.data.trackingId,
            deliveryCity: shippingCharge <= 100 ? "dhaka" : "outside",
          },
        });
      } else {
        alert("❌ অর্ডার ব্যর্থ হয়েছে, আবার চেষ্টা করুন।");
      }
    } catch (err) {
      console.error("❌ Order Failed:", err);
      if (err.response?.data?.message) {
        alert(err.response.data.message); // duplicate order message
      } else {
        alert("❌ অর্ডার ফেইল করেছে। আবার চেষ্টা করুন।");
      }
    } finally {
      setIsProcessing(false); // 🔹 Stop loader
    }
  };

  return (
    <form
      onSubmit={handleOrder}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 min-h-[80vh] border-t"
    >
      {/* LEFT SIDE */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="gap-3">
          <label className="mx-2">Name</label>
          <input
            required
            onChange={handleChange}
            name="fullName"
            value={formData.fullName}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full m-2"
            type="text"
            placeholder="Enter Your Name"
          />

          <label className="mx-2">Phone Number</label>
          <input
            required
            onChange={handleChange}
            name="phone"
            value={formData.phone}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full m-2"
            type="tel"
            placeholder="Enter Your Number"
          />

          <label className="mx-2">Address</label>
          <input
            required
            onChange={handleChange}
            name="fullAddress"
            value={formData.fullAddress}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full m-2"
            type="text"
            placeholder="Enter Your Address"
          />

          {/* ✳️ Note Box */}
          <label className="mx-2">Note (optional)</label>
          <textarea
            name="note"
            onChange={handleChange}
            value={formData.note}
            rows={3}
            placeholder="Enter any special note..."
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full m-2"
          ></textarea>

          {/* Shipping Charge */}
          <div className="w-full m-2 border border-gray-300 rounded p-4">
            <p className="mb-2 font-semibold">Shipping Charge :</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <label className="flex items-center gap-2">
                <input
                  required
                  type="radio"
                  name="shipping"
                  value="inside"
                  onChange={() => setShippingCharge(80)}
                />
                Inside Dhaka (৳80)
              </label>
              <label className="flex items-center gap-2">
                <input
                  required
                  type="radio"
                  name="shipping"
                  value="sub-dhaka"
                  onChange={() => setShippingCharge(100)}
                />
                Sub Dhaka (৳100)
              </label>
              <label className="flex items-center gap-2">
                <input
                  required
                  type="radio"
                  name="shipping"
                  value="outside"
                  onChange={() => setShippingCharge(150)}
                />
                Outside Dhaka (৳150)
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal shippingCharge={shippingCharge} />
        </div>
        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border border-gray-300 p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border border-gray-300 rounded-full ${
                  method === "cod" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>
          <div className="w-full">
            <button
              type="submit"
              disabled={isProcessing} // 🔹 disable during processing
              className={`w-full mt-6 px-12 py-2 rounded-full font-semibold text-white text-lg
                bg-gradient-to-r from-[#9b5fa0] to-[#7f3f85]
                shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl
                ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isProcessing ? "Order Processing..." : "PLACE ORDER"} {/* 🔹 Loader text */}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default GuestCheckout;



