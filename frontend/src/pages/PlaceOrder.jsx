import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    products,
  } = useContext(ShopContext);

  const [method, setMethod] = useState("cod");
  const [shippingCharge, setShippingCharge] = useState(0);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    fullAddress: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        shippingCharge: shippingCharge,
        amount: getCartAmount() + shippingCharge,
      };

      switch (method) {
        case "cod":
          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { token } }
          );
          if (response.data.success) {
            toast.success("অর্ডার সফলভাবে দেওয়া হয়েছে!");
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;

        default:
          break;
      }
    } catch (error) {
      console.error("Order Error:", error.message);
      toast.error("অর্ডার করার সময় সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
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
            onChange={onChangeHandler}
            name="fullName"
            value={formData.fullName}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full m-2"
            type="text"
            placeholder="Enter Your Name"
          />

          <label className="mx-2">Phone Number</label>
          <input
            required
            onChange={onChangeHandler}
            name="phone"
            value={formData.phone}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full m-2"
            type="number"
            placeholder="Enter Your Number"
          />

          <label className="mx-2">Address</label>
          <input
            required
            onChange={onChangeHandler}
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

export default PlaceOrder;