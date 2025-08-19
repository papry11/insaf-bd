import React, { useState } from 'react';
import axios from 'axios';

const TrackOrder = () => {
  const [trackingId, setTrackingId] = useState("");
  const [order, setOrder] = useState(null);

  const fetchOrder = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/api/order/track/${trackingId}`);
      setOrder(res.data.order);
    } catch (err) {
      console.error(err);
      alert("Order not found");
    }
  };

  return (
    <div>
      <h2>Track Your Order</h2>
      <input
        type="text"
        placeholder="Enter Tracking ID"
        value={trackingId}
        onChange={(e) => setTrackingId(e.target.value)}
      />
      <button onClick={fetchOrder}>Track</button>

      {order && (
        <div>
          <h3>Order Status: {order.status}</h3>
          <p>Total Amount: {order.amount}</p>
          <p>Placed At: {new Date(order.createdAt).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default TrackOrder;
