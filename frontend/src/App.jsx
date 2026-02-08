// import React, { useState } from 'react';
// import { Route, Routes } from 'react-router-dom';
// import Home from './pages/Home';
// import About from './pages/About';
// import Collection from './pages/Collection';
// import Contact from './pages/Contact';
// import Product from './pages/Product';
// import Cart from './pages/Cart';
// import Login from './pages/Login';
// import PlaceOrder from './pages/PlaceOrder';
// import Orders from './pages/Orders';
// import GuestCheckout from './pages/GuestCheckout';
// import TrackOrder from './pages/TrackOrder';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import SearchBar from './components/SearchBar';
// import { ToastContainer } from 'react-toastify';

// const App = () => {
//   const [token] = useState(localStorage.getItem("token"));

//   return (
//     <div className='px-4 sm:px-[svw] md:px-[7vw] lg:px-[9vw]'>
//       <ToastContainer />
//       <Navbar />
//       <SearchBar />
//       <Routes>
//         <Route path='/' element={<Home />} />
//         <Route path='/collection' element={<Collection />} />
//         <Route path='/about' element={<About />} />
//         <Route path='/contact' element={<Contact />} />
//         <Route path='/product/:productId' element={<Product />} />
//         <Route path='/cart' element={<Cart />} />
//         <Route path='/login' element={<Login />} />
//         <Route path='/place-order' element={token ? <PlaceOrder /> : <GuestCheckout />} />
//         <Route path='/guest-checkout' element={<GuestCheckout />} />
//         <Route path='/orders' element={<Orders />} />
//         <Route path='/track-order' element={<TrackOrder />} />
//       </Routes>
//       {/* element={token ? <PlaceOrder /> : <GuestCheckout />} */}
//       <Footer />
//     </div>
//   );
// };

// export default App;

import React, { useEffect } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Collection from "./pages/Collection";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import GuestCheckout from "./pages/GuestCheckout";
import TrackOrder from "./pages/TrackOrder";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import { ToastContainer } from "react-toastify";
import OrderConfirmation from "./pages/OrderConfirmation";

// Route tracking - Smart PageView tracking for SPA navigation
const RouteTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Track PageView on route changes (after initial page load)
    if (typeof window !== 'undefined' && window.fbq && window._fbqInitialized) {
      // Skip the first route if initial PageView was already tracked
      if (window._initialPageViewTracked && location.pathname !== '/') {
        // Small delay to ensure React routing is complete
        const timeoutId = setTimeout(() => {
          window.fbq('track', 'PageView');
          console.log('📊 Meta Pixel: PageView tracked for route:', location.pathname);
        }, 50);

        return () => clearTimeout(timeoutId);
      }
    }
  }, [location.pathname]);

  return null;
};

const App = () => {
  return (
    <div className="px-4 sm:px-[svw] md:px-[7vw] lg:px-[9vw]">
      <RouteTracker />
      <ToastContainer />
      <Navbar />
      <SearchBar />
   
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />

        {/* /place-order রিডাইরেক্ট হবে /guest-checkout-এ */}
        <Route
          path="/place-order"
          element={<Navigate to="/guest-checkout" replace />}
        />
        <Route path="/guest-checkout" element={<GuestCheckout />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />

        <Route path="/track-order" element={<TrackOrder />} />
      </Routes>

      <Footer />
      </div>
  );
};

export default App;
