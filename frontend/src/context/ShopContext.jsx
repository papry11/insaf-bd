// import { createContext, useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// export const ShopContext = createContext();

// const ShopContextProvider = (props) => {
//   const currency = '৳';
//   const delivery_fee = 80;
//   const [userLocation, setUserLocation] = useState('dhaka');
//   const backendUrl = import.meta.env.VITE_BACKEND_URL;
//   const [search, setSearch] = useState('');
//   const [showSearch, setShowSearch] = useState(false);
//   const [cartItems, setCartItems] = useState({});
//   const [products, setProducts] = useState([]);
//   const [token, setToken] = useState('');
//   const navigate = useNavigate();

//   const addToCart = async (itemId, size) => {
//     if (!size) {
//       toast.error('Please select size');
//       return;
//     } else {
//       toast.success('Added to cart');
//     }
    

//     let cartData = structuredClone(cartItems);

//     if (cartData[itemId]) {
//       if (cartData[itemId][size]) {
//         cartData[itemId][size] += 1;
//       } else {
//         cartData[itemId][size] = 1;
//       }
//     } else {
//       cartData[itemId] = {};
//       cartData[itemId][size] = 1;
//     }

//     setCartItems(cartData);
// localStorage.setItem("cart", JSON.stringify(cartData));
// console.log("📦 Saved in localStorage:", localStorage.getItem("cart"));


//     if (token) {
//       try {
//         await axios.post(
//           backendUrl + '/api/cart/add',
//           { itemId, size },
//           { headers: { token } }
//         );
//       } catch (error) {
//         console.log(error);
//         toast.error(error.message);
//       }
//     }
//   };

//   const getCartCount = () => {
//     let totalCount = 0;
//     for (const items in cartItems) {
//       for (const item in cartItems[items]) {
//         try {
//           if (cartItems[items][item] > 0) {
//             totalCount += cartItems[items][item];
//           }
//         } catch (error) {
//           console.log(error);
//           toast.error(error.message);
//         }
//       }
//     }
//     return totalCount;
//   };

//   const updateQuantity = async (itemId, size, quantity) => {
//     let cartData = structuredClone(cartItems);
//     cartData[itemId][size] = quantity;
//     setCartItems(cartData);
//     if (token) {
//       try {
//         await axios.post(
//           backendUrl + '/api/cart/update',
//           { itemId, size, quantity },
//           { headers: { token } }
//         );
//       } catch (error) {
//         console.log(error);
//         toast.error(error.message);
//       }
//     }
//   };

//   const getCartAmount = () => {
//     let totalAmount = 0;
//     for (const items in cartItems) {
//       let itemInfo = products.find((product) => product._id === items);
//       for (const item in cartItems[items]) {
//         try {
//           if (cartItems[items][item] > 0) {
//             if (itemInfo && itemInfo.price) {
//               totalAmount += itemInfo.price * cartItems[items][item];
//             }
//           }
//         } catch (error) {
//           console.log(error);
//           toast.error(error.message);
//         }
//       }
//     }
//     return totalAmount;
//   };

//   // const getDeliveryFee = () => {
//   //   if (userLocation.toLowerCase() === 'dhaka') {
//   //     return 80;
//   //   } else {
//   //     return 150;
//   //   }
//   // };

//   const getDeliveryFee = () => {
//   if (userLocation.toLowerCase() === 'dhaka') {
//     return 80;
//   } else if (userLocation.toLowerCase() === 'sub-dhaka') {
//     return 120;
//   } else if (userLocation.toLowerCase() === 'outside-dhaka') {
//     return 150;
//   } else {
//     return 150; // fallback
//   }
// };


//   const getProductData = async () => {
//     try {
//       const response = await axios.get(backendUrl + '/api/product/list');
//       if (response.data.success) {
//         setProducts(response.data.products);
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   const getUserCart = async (userToken) => {
//     try {
//       const response = await axios.post(
//         backendUrl + '/api/cart/get',
//         {},
//         { headers: { token: userToken } }
//       );

//       if (response.data.success) {
//         setCartItems(response.data.cartData);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   useEffect(() => {
//     getProductData();
//   }, []);

//   useEffect(() => {
//     const savedToken = localStorage.getItem('token');
//     if (!token && savedToken) {
//       setToken(savedToken);
//       getUserCart(savedToken);
//     }
//   }, [token]);

//   useEffect(() => {
//   const savedCart = localStorage.getItem("cart");
//   if (savedCart) {
//     setCartItems(JSON.parse(savedCart));
//     console.log("🛒 Cart loaded from localStorage:", JSON.parse(savedCart));
//   }
// }, []);


//   const value = {
//     products,
//     currency,
//     delivery_fee,
//     getDeliveryFee,
//     userLocation,
//     setUserLocation,
//     search,
//     setSearch,
//     showSearch,
//     setShowSearch,
//     cartItems,
//     addToCart,
//     setCartItems,
//     getCartCount,
//     updateQuantity,
//     getCartAmount,
//     navigate,
//     backendUrl,
//     token,
//     setToken,
//   };

//   return (
//     <ShopContext.Provider value={value}>
//       {props.children}
//     </ShopContext.Provider>
//   );
// };

// export default ShopContextProvider;


import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = '৳';
  const delivery_fee = 80;
  const [userLocation, setUserLocation] = useState('dhaka');
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  // ✅ Add to Cart
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error('Please select size');
      return;
    } else {
      toast.success('Added to cart');
    }

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + '/api/cart/add',
          { itemId, size },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  // ✅ Remove from Cart
  const removeFromCart = (itemId, size) => {
    let cartData = structuredClone(cartItems);

    if (cartData[itemId] && cartData[itemId][size]) {
      delete cartData[itemId][size];

      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }

      setCartItems(cartData);
      toast.info("Removed from cart");
    }
  };

  // ✅ Cart Count
  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      }
    }
    return totalCount;
  };

  // ✅ Update Quantity
  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + '/api/cart/update',
          { itemId, size, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  // ✅ Cart Amount
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            if (itemInfo && itemInfo.price) {
              totalAmount += itemInfo.price * cartItems[items][item];
            }
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      }
    }
    return totalAmount;
  };

  // ✅ Delivery Fee
  const getDeliveryFee = () => {
    if (userLocation.toLowerCase() === 'dhaka') {
      return 80;
    } else if (userLocation.toLowerCase() === 'sub-dhaka') {
      return 120;
    } else if (userLocation.toLowerCase() === 'outside-dhaka') {
      return 150;
    } else {
      return 150; // fallback
    }
  };

  // ✅ Get Products
  const getProductData = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list');
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // ✅ Get User Cart (logged in user)
  const getUserCart = async (userToken) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/cart/get',
        {},
        { headers: { token: userToken } }
      );

      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // ✅ Load products on mount
  useEffect(() => {
    getProductData();
  }, []);

  // ✅ Check token on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (!token && savedToken) {
      setToken(savedToken);
      getUserCart(savedToken);
    }
  }, [token]);

  // ✅ Load guest cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
      console.log("🛒 Cart loaded from localStorage:", JSON.parse(savedCart));
    }
  }, []);

  // ✅ Always save cartItems to localStorage when it changes
  useEffect(() => {
    if (Object.keys(cartItems).length > 0) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
      console.log("💾 Cart saved to localStorage:", cartItems);
    } else {
      localStorage.removeItem("cart");
      console.log("🗑 Cart cleared from localStorage");
    }
  }, [cartItems]);

  const value = {
    products,
    currency,
    delivery_fee,
    getDeliveryFee,
    userLocation,
    setUserLocation,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    removeFromCart,   // ✅ Added removeFromCart here
    setCartItems,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    setToken,
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
