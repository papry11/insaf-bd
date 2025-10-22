// import React from "react";
// import { useLocation } from "react-router-dom";

// const OrderConfirmation = () => {
//   const location = useLocation();
//   const { orderId, deliveryCity } = location.state || {};

//   const deliveryTime = deliveryCity === "dhaka" ? "2 দিনের মধ্যে" : "3 দিনের মধ্যে";

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-purple-150 p-4">
//       <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 max-w-sm w-full text-center">
//         <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
//           Thanks for your order!
//         </h1>

//         <div className="flex flex-col gap-2 mb-4 text-gray-700 text-sm sm:text-base">
//           <p>
//             Delivery inside Dhaka:{" "}
//             <span className="font-medium text-purple-600">{deliveryCity === "dhaka" ? "2 দিনের মধ্যে" : "2 দিনের মধ্যে"}</span>
//           </p>
//           <p>
//             Delivery outside Dhaka:{" "}
//             <span className="font-medium text-purple-600">{deliveryCity === "dhaka" ? "3 দিনের মধ্যে" : "3 দিনের মধ্যে"}</span>
//           </p>
//         </div>

//         <div className="my-4 p-4 bg-purple-50 rounded-md border border-purple-100">
//           <p className="text-xs sm:text-sm text-gray-600 mb-1">আপনার ট্র্যাকিং আইডি:</p>
//           <p className="text-base sm:text-lg font-medium text-purple-700 break-words">{orderId}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderConfirmation;


import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId, deliveryCity } = location.state || {};

  useEffect(() => {
    const orderPlaced = localStorage.getItem("orderPlaced");

    if (!orderId || !orderPlaced) {
      navigate("/", { replace: true });
      return;
    }

    const handlePopState = () => {
      navigate("/", { replace: true });
    };
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      localStorage.removeItem("orderPlaced");
    };
  }, [orderId, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-purple-150 p-4">
      <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 max-w-sm w-full text-center">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
          Thanks for your order!
        </h1>

        <div className="flex flex-col gap-2 mb-4 text-gray-700 text-sm sm:text-base">
          <p>
            Delivery inside Dhaka:{" "}
            <span className="font-medium text-purple-600">
              {deliveryCity === "dhaka" ? "2 দিনের মধ্যে" : "2 দিনের মধ্যে"}
            </span>
          </p>
          <p>
            Delivery outside Dhaka:{" "}
            <span className="font-medium text-purple-600">
              {deliveryCity === "dhaka" ? "3 দিনের মধ্যে" : "3 দিনের মধ্যে"}
            </span>
          </p>
        </div>

        <div className="my-4 p-4 bg-purple-50 rounded-md border border-purple-100">
          <p className="text-xs sm:text-sm text-gray-600 mb-1">আপনার ট্র্যাকিং আইডি:</p>
          <p className="text-base sm:text-lg font-medium text-purple-700 break-words">{orderId}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
