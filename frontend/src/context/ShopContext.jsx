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
  const [categories, setCategories] = useState([]);
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  // ================================
  //       CATEGORY FETCH
  // ================================
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(backendUrl + "/api/category/list");
        if (res.data.success) {
          setCategories(res.data.categories);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  // ================================
  //       PRODUCTS FETCH
  // ================================
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

  useEffect(() => {
    getProductData();
  }, []);

  // ================================
  //          CART LOGIC
  // ================================
  const addToCart = async (itemId, size = "") => {
    toast.success('Added to cart');
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

    const product = products.find(p => p._id === itemId) || {};
    window.dataLayer.push({
      event: 'add_to_cart',
      ecommerce: {
        items: [{
          item_id: itemId,
          item_name: product.name || "",
          price: product.price || 0,
          quantity: 1,
        }]
      }
    });

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

  const removeFromCart = (itemId, size) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId] && cartData[itemId][size]) {
      delete cartData[itemId][size];
      if (Object.keys(cartData[itemId]).length === 0) delete cartData[itemId];
      setCartItems(cartData);
      toast.info("Removed from cart");
    }
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) totalCount += cartItems[items][item];
      }
    }
    return totalCount;
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0 && itemInfo?.price) {
          totalAmount += itemInfo.price * cartItems[items][item];
        }
      }
    }
    return totalAmount;
  };

  const getDeliveryFee = () => {
    if (userLocation.toLowerCase() === 'dhaka') return 80;
    if (userLocation.toLowerCase() === 'sub-dhaka') return 120;
    if (userLocation.toLowerCase() === 'outside-dhaka') return 150;
    return 150;
  };

  // ================================
  //   PROVIDER VALUES
  // ================================
  const value = {
    products,
    categories,
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
    removeFromCart,
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
