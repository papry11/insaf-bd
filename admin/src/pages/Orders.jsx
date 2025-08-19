
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { backendUrl } from '../App';
// import { toast } from 'react-toastify';
// import { assets } from '../assets/assets';

// const Orders = ({ token }) => {
//   const [orders, setOrders] = useState([]);
//   const [selectedImage, setSelectedImage] = useState(null); // For image preview modal

//   const fetchAllOrders = async () => {
//     if (!token) return;

//     try {
//       const response = await axios.post(
//         backendUrl + '/api/order/list',
//         {},
//         { headers: { token } }
//       );

//       if (response.data.success) {
//         setOrders(response.data.orders.reverse());
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   const statusHandler = async (event, orderId) => {
//     try {
//       const response = await axios.post(
//         backendUrl + '/api/order/status',
//         { orderId, status: event.target.value },
//         { headers: { token } }
//       );
//       if (response.data.success) {
//         await fetchAllOrders();
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   useEffect(() => {
//     fetchAllOrders();
//   }, [token]);

//   useEffect(() => {
//   if (orders.length > 0) {
//     console.log("Orders Data 👉", orders);
//   }
// }, [orders]);


//   return (
//     <div className="bg-gray-50 min-h-screen py-10 px-4 sm:px-8 md:px-12 lg:px-24">
//       <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-10 text-center">
//         🛍️ All Orders
//       </h2>

//       <div className="grid gap-8 md:grid-cols-2">
//         {orders.map((order, index) => (
//           <div
//             key={order._id}
//             className="bg-white border border-gray-200 rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300 flex flex-col gap-4"
//           >
//             {/* Header */}
//             <div className="flex items-center gap-4">
//               <img src={assets.parcel_icon} alt="Parcel" className="w-10 h-10" />
//               <div>
//                 <h4 className="text-lg font-semibold text-gray-800">Order #{index + 1}</h4>
//                 <p className="text-sm text-gray-500">
//                   {order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-GB') : 'N/A'}
//                 </p>
//               </div>
//             </div>

//             {/* Items */}
//             {/* <div className="text-sm text-gray-700 space-y-2 border-t pt-3">
//               {order.items.map((item, i) => (
//                 <div key={i} className="flex items-center gap-3">
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="w-10 h-10 rounded object-cover cursor-pointer transform transition-transform duration-300 hover:scale-125 hover:ring-2 hover:ring-orange-400"
//                     onClick={() => setSelectedImage(item.image)}
//                   />
//                   <p>
//                     <span className="font-medium">{item.name}</span> × {item.quantity}
//                     <span className="text-gray-500"> ({item.size})</span>
//                   </p>
//                 </div>
//               ))}
              
//             </div> */}

// {/* Items */}
// <div className="text-sm text-gray-700 space-y-2 border-t pt-3">
//   {order.items.map((item, i) => {
//     // Fallbacks
//     const imageSrc = item.image || item.product?.image?.[0] || assets.parcel_icon;
//     const name = item.name || item.product?.name || "Unknown Product";
//     const size = item.size || "";
//     const quantity = item.quantity || 1;

//     return (
//       <div key={i} className="flex items-center gap-3">
//         <img
//           src={imageSrc}
//           alt={name}
//           className="w-10 h-10 rounded object-cover cursor-pointer transform transition-transform duration-300 hover:scale-125 hover:ring-2 hover:ring-orange-400"
//           onClick={() => setSelectedImage(imageSrc)}
//         />
//         <p>
//           <span className="font-medium">{name}</span> × {quantity}
//           {size && <span className="text-gray-500"> ({size})</span>}
//         </p>
//       </div>
//     );
//   })}
// </div>



//             {/* Address */}
//             <div className="text-sm text-gray-600 border-t pt-3">
//               <p><strong>{order.address.fullName}</strong></p>
//               <p>{order.address.fullAddress}</p>
//               <p>{order.address.phone}</p>
//             </div>

//             {/* Status & Info Tags */}
//             <div className="flex flex-wrap justify-between items-center border-t pt-4 gap-3 text-sm text-gray-800">
//               <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold">
//                 ৳{order.amount}
//               </span>
//               <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">
//                 {order.paymentMethod}
//               </span>
//               <span
//                 className={`px-3 py-1 rounded-full font-semibold ${
//                   order.status === 'Delivered'
//                     ? 'bg-emerald-100 text-emerald-800'
//                     : order.status === 'Out for delivery'
//                     ? 'bg-yellow-100 text-yellow-800'
//                     : 'bg-gray-100 text-gray-700'
//                 }`}
//               >
//                 {order.status}
//               </span>
//             </div>

//             {/* Status Selector */}
//             <div className="mt-3">
//               <select
//                 onChange={(event) => statusHandler(event, order._id)}
//                 value={order.status}
//                 className="w-full p-2 rounded-md border border-gray-300 bg-gray-50 text-sm text-gray-700 focus:ring-2 focus:ring-orange-400"
//               >
//                 <option value="Order Placed">Order Placed</option>
//                 <option value="Out for delivery">Out for delivery</option>
//                 <option value="Delivered">Delivered</option>
//               </select>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* ✅ Image Modal Popup */}
//       {selectedImage && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
//           onClick={() => setSelectedImage(null)}
//         >
//           <img
//             src={selectedImage}
//             alt="Full view"
//             className="max-w-[90%] max-h-[80%] rounded-lg shadow-xl border-4 border-white"
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Orders;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // For image preview modal

  // ✅ Fetch Orders
  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        backendUrl + '/api/order/list',
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ✅ Update Status
  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/order/status',
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  useEffect(() => {
    if (orders.length > 0) {
      console.log("Orders Data 👉", orders);
    }
  }, [orders]);

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 sm:px-8 md:px-12 lg:px-24">
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-10 text-center">
        🛍️ All Orders
      </h2>

      <div className="grid gap-8 md:grid-cols-2">
        {orders.map((order, index) => (
          <div
            key={order._id}
            className="bg-white border border-gray-200 rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300 flex flex-col gap-4"
          >
            {/* Header */}
            <div className="flex items-center gap-4">
              <img src={assets.parcel_icon} alt="Parcel" className="w-10 h-10" />
              <div>
                <h4 className="text-lg font-semibold text-gray-800">Order #{index + 1}</h4>
                <p className="text-sm text-gray-500">
                  {order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-GB') : 'N/A'}
                </p>
              </div>
            </div>

            {/* Items */}
            <div className="text-sm text-gray-700 space-y-2 border-t pt-3">
              {order.items.map((item, i) => {
                // ✅ Safe image fallback
                const imageSrc =
                  item?.image?.[0] ||
                  item?.product?.image?.[0] ||
                  assets.parcel_icon;

                const name = item?.name || item?.product?.name || "Unknown Product";
                const size = item?.size || "";
                const quantity = item?.quantity || 1;

                return (
                  <div key={i} className="flex items-center gap-3">
                    <img
                      src={imageSrc}
                      alt={name}
                      className="w-10 h-10 rounded object-cover cursor-pointer transform transition-transform duration-300 hover:scale-125 hover:ring-2 hover:ring-orange-400"
                      onClick={() => setSelectedImage(imageSrc)}
                    />
                    <p>
                      <span className="font-medium">{name}</span> × {quantity}
                      {size && <span className="text-gray-500"> ({size})</span>}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Address */}
            <div className="text-sm text-gray-600 border-t pt-3">
              <p><strong>{order.address.fullName}</strong></p>
              <p>{order.address.fullAddress}</p>
              <p>{order.address.phone}</p>
            </div>

            {/* Status & Info Tags */}
            <div className="flex flex-wrap justify-between items-center border-t pt-4 gap-3 text-sm text-gray-800">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold">
                ৳{order.amount}
              </span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">
                {order.paymentMethod}
              </span>
              <span
                className={`px-3 py-1 rounded-full font-semibold ${
                  order.status === 'Delivered'
                    ? 'bg-emerald-100 text-emerald-800'
                    : order.status === 'Out for delivery'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {order.status}
              </span>
            </div>

            {/* Status Selector */}
            <div className="mt-3">
              <select
                onChange={(event) => statusHandler(event, order._id)}
                value={order.status}
                className="w-full p-2 rounded-md border border-gray-300 bg-gray-50 text-sm text-gray-700 focus:ring-2 focus:ring-orange-400"
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Image Modal Popup */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Full view"
            className="max-w-[90%] max-h-[80%] rounded-lg shadow-xl border-4 border-white"
          />
        </div>
      )}
    </div>
  );
};

export default Orders;
