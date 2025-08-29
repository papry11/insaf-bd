import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate, Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faUser,
  faBagShopping,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount, token, setToken, setCartItems } =
    useContext(ShopContext);
  const navigate = useNavigate();

  const logOut = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

  return (
    <div className="px-4 md:px-12 flex flex-wrap items-center justify-between gap-4 py-5 font-medium border-b border-gray-300/60 relative z-20 ">
      {/* Logo */}
      <Link to="/" className="flex-shrink-0">
        <h1 className="prata-regular text-gray-800 text-xl sm:py-3 lg:text-4xl">
          INSAFF BD
        </h1>
      </Link>

      {/* Desktop Menu */}
      <ul className="hidden sm:flex gap-5 text-sm text-gray-800">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-white hidden" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-white hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-white hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-white hidden" />
        </NavLink>
      </ul>

      {/* Right Side Icons */}
      <div className="flex items-center gap-5 ml-auto sm:ml-0">
        <FontAwesomeIcon
          onClick={() => setShowSearch(true)}
          className="text-xl cursor-pointer"
          icon={faMagnifyingGlass}
        />

        {/* Profile */}
        {/* <div className="relative group">
          {!token ? (
            <Link to='/login'>
              <FontAwesomeIcon className="text-xl cursor-pointer" icon={faUser} />
            </Link>
          ) : (
            <FontAwesomeIcon className="text-xl cursor-pointer" icon={faUser} />
          )}

          {token && (
            <div className="hidden group-hover:block absolute right-0 pt-4 z-10">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                <p className="cursor-pointer hover:text-black">My Profile</p>
                <p onClick={() => navigate('/orders')} className="cursor-pointer hover:text-black">Orders</p>
                <p onClick={logOut} className="cursor-pointer hover:text-black">Log out</p>
              </div>
            </div>
          )}
        </div> */}

        {/* Cart */}
        <Link
          to="/cart"
          className="relative flex items-center gap-2 bg-[#b47ab1] hover:bg-[#a1519d] text-white px-3 py-2 rounded lg:px-6 lg:py-3"
        >
          Buy Now
          <div className="relative">
            <FontAwesomeIcon
              className="text-base lg:text-xl cursor-pointer"
              icon={faBagShopping}
            />
            {getCartCount() > 0 && (
              <span className="absolute -bottom-2 -right-2 w-4 h-4 flex items-center justify-center bg-red-600 text-white rounded-full text-[0.625rem] lg:text-xs">
                {getCartCount()}
              </span>
            )}
          </div>
        </Link>

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt="menu icon"
        />
      </div>

      {/* Sidebar menu for mobile */}
      <div
        className={`absolute top-0 right-0 bottom-0 h-screen overflow-hidden bg-white transition-all duration-300 ease-in-out ${
          visible ? "w-full max-w-xs shadow-lg" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-900 h-full">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img
              src={assets.menu_icon}
              className="h-4 rotate-180"
              alt="dropdown icon"
            />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border-b border-gray-200"
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border-b border-gray-200"
            to="/collection"
          >
            Collection
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border-b border-gray-200"
            to="/about"
          >
            About
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border-b border-gray-200"
            to="/contact"
          >
            Contact
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
