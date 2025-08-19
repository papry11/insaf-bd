import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        let allOrdersItem = [];

        response.data.data.forEach((order) => {
          order.items.forEach((item) => {
            console.log("Item from API:", item);
            allOrdersItem.push({
              ...item,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.createdAt, // Timestamp বা ISO string আসবে
            });
          });
        });

        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.error("Failed to load orders", error.message);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t border-gray-300 pt-16">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      <div>
        {orderData.map((item, index) => (
          <div
            key={`${item.name}-${item.size}-${item.date}-${index}`}
            className="py-4 border-t border-b border-gray-300 text-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div className="flex items-start gap-6 text-sm">
              <img
  src={item.image}
  alt={item.name}
  style={{ width: "60px", height: "60px", objectFit: "cover" }}
/>


              <div>
                <p className="sm:text-base font-medium">{item.name}</p>
                <div className="flex items-center gap-3 text-base text-gray-300">
                  <p>
                    {currency}
                    {item.price}
                  </p>
                  <p>Quantity : {item.quantity}</p>
                  <p>Size : {item.size}</p>
                </div>
                <p className="mt-2">
                  Date :
                  <span className="text-gray-400 ml-1">
                    {item.date
                      ? new Date(item.date).toLocaleDateString("en-GB")
                      : "N/A"}
                  </span>
                </p>
                <p className="mt-2">
                  payment :
                  <span className="text-gray-400 ml-1">
                    {item.paymentMethod}
                  </span>
                </p>
              </div>
            </div>

            <div className="md:w-1/2 flex justify-between">
              <div className="flex items-center gap-2">
                <p
                  className={`min-w-2 h-2 rounded-full ${
                    item.status === "Order Placed"
                      ? "bg-green-500"
                      : "bg-yellow-500"
                  }`}
                ></p>
                <p className="text-sm md:text-base">{item.status}</p>
              </div>
              <button
                onClick={loadOrderData}
                className="cursor-pointer border border-gray-300 px-4 py-2 text-sm font-medium rounded-sm"
              >
                Track order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
