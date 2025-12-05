import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faCartShopping, faBars } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [drawer, setDrawer] = useState(false);
  const { setShowSearch, getCartCount } = useContext(ShopContext);
  const navigate = useNavigate();

  return (
    <>
      {/* ✅ Navbar Height spacer (only for desktop overlap fix) */}
      <div className="h-[72px] md:h-[86px] w-full"></div>

      {/* Navbar Wrapper */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] md:w-[80%] bg-white/85 backdrop-blur-lg rounded-2xl shadow-md border border-gray-200 z-50 transition-all duration-300">

        {/* Navbar Content */}
        <div className="flex items-center justify-between px-5 md:px-8 h-14">

          {/* Logo */}
          <Link to="/">
            <h1 className="text-xl md:text-2xl font-semibold text-gray-900 tracking-wide">
              INSAFF <span className="text-gray-500">BD</span>
            </h1>
          </Link>

          {/* Desktop Links */}
          <nav className="hidden md:flex gap-10 text-[13px] font-medium text-gray-600">
            {[
              { label: "HOME", to: "/" },
              { label: "SHOP", to: "/collection" },
              { label: "ABOUT", to: "/about" },
              { label: "CONTACT", to: "/contact" },
            ].map((item, i) => (
              <NavLink key={i} to={item.to} className="relative group">
                {({ isActive }) => (
                  <>
                    <span className={isActive ? "text-black" : "group-hover:text-black"}>
                      {item.label}
                    </span>
                    <span
                      className={`absolute left-1/2 -translate-x-1/2 bottom-[-5px] h-[2px] bg-black transition-all duration-500 ${
                        isActive ? "w-5" : "w-0 group-hover:w-7"
                      }`}
                    ></span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-4 md:gap-6 text-gray-700">

            {/* Search */}
            <button onClick={() => setShowSearch(true)}>
              <FontAwesomeIcon icon={faMagnifyingGlass} className="text-base hover:text-black transition" />
            </button>

            {/* Cart */}
            <button onClick={() => navigate("/cart")} className="relative">
              <FontAwesomeIcon icon={faCartShopping} className="text-base md:text-lg hover:text-black transition" />
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-3 w-[20px] h-[20px] bg-red-600 text-white font-bold text-[10px] flex items-center justify-center rounded-full shadow-sm">
                  {getCartCount()}
                </span>
              )}
            </button>

            {/* Mobile Menu */}
            <button onClick={() => setDrawer(true)} className="md:hidden">
              <FontAwesomeIcon icon={faBars} className="text-lg" />
            </button>

          </div>
        </div>
      </header>

      {/* Mobile Overlay */}
      <div
        onClick={() => setDrawer(false)}
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm transition-all duration-500 z-40 ${
          drawer ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Mobile Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full bg-white w-64 shadow-2xl z-50 transform transition-all duration-500 ${
          drawer ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col p-6 gap-5 text-gray-800 font-medium text-sm">
          <button onClick={() => setDrawer(false)} className="self-end text-3xl font-light leading-none">×</button>

          {[
            { label: "Home", to: "/" },
            { label: "Shop", to: "/collection" },
            { label: "About", to: "/about" },
            { label: "Contact", to: "/contact" },
          ].map((item, i) => (
            <NavLink
              key={i}
              to={item.to}
              onClick={() => setDrawer(false)}
              className="px-3 py-2 rounded-xl hover:bg-gray-100 transition"
            >
              {item.label}
            </NavLink>
          ))}

          <div className="pt-4 border-t border-gray-200 text-gray-500 text-xs tracking-widest">
            SHOP SMART • LIVE BETTER
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
