
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { ShopContext } from "../context/ShopContext";

const GuestCheckout = () => {
  const { setCartItems: setContextCartItems, backendUrl } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    fullAddress: "",
  });

  const [method, setMethod] = useState("cod");
  const [shippingCharge, setShippingCharge] = useState(0);

  // ✅ localStorage থেকে cartItems load করা
  const [cartItems, setCartItems] = useState(() => {
    const stored = JSON.parse(localStorage.getItem("cart")) || {};
    return Object.entries(stored).flatMap(([productId, sizes]) =>
      Object.entries(sizes).map(([size, quantity]) => ({
        productId,
        size,
        quantity,
        price: 0, // পরে backend থেকে আনব
        name: "",
        image: "",
      }))
    );
  });

  const [total, setTotal] = useState(0);

  // ✅ backend থেকে product details এনে price বসানো
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

    if (cartItems.length > 0) {
      fetchProducts();
    }
  }, []);

  // ✅ subtotal calculate
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

  // ✅ Order Submit
  const handleOrder = async (e) => {
    e.preventDefault();
    try {
      const subtotal = cartItems.reduce(
        (acc, item) => acc + (item.price || 0) * item.quantity,
        0
      );
      const finalAmount = subtotal + shippingCharge;

      console.log("📦 Sending Guest Order Payload 👉", {
        fullName: formData.fullName,
        phone: formData.phone,
        fullAddress: formData.fullAddress,
        items: cartItems,
        amount: finalAmount,
        paymentMethod: method,
      });

    const res = await axios.post(
  `${backendUrl}/api/order/place-guest`,
  {
    fullName: formData.fullName,
    phone: formData.phone,
    fullAddress: formData.fullAddress,
    items: cartItems,
    amount: finalAmount,
    deliveryCharge: shippingCharge, 
    paymentMethod: method,
  }
);


      // ✅ Clear cart after order
      localStorage.removeItem("cart");
      setCartItems([]);
      setContextCartItems({});

      alert(`✅ অর্ডার সম্পন্ন হয়েছে! Tracking ID: ${res.data.trackingId}`);
    } catch (err) {
      console.error("❌ Order Failed:", err);
      alert("❌ অর্ডার ফেইল করেছে। আবার চেষ্টা করুন।");
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
          <Title text1={"GUEST"} text2={"CHECKOUT"} />
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
              className="w-full mt-6 relative inline-flex items-center justify-center p-3 mb-2 me-2 overflow-hidden text-base font-semibold text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default GuestCheckout;
