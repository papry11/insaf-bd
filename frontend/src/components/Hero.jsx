import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <div className="rounded-2xl min-h-screen flex flex-col-reverse lg:flex-row items-center justify-center  text-white px-6 lg:px-6 py-10 relative overflow-hidden">

     
      {/* Left Content */}
      <div className="z-10 w-full lg:w-1/2 flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-[3px] bg-pink-500 rounded"></div>
          <p className="uppercase text-pink-400 tracking-widest font-medium">Hello Everyone...</p>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-300 text-transparent bg-clip-text drop-shadow-lg animate-fade-in">
          Welcome To <br /> Next Fortune
        </h1>

        <p className="text-gray-300 max-w-lg text-lg pr-4">
          Unlock premium collections and shop with style. The future of fashion starts here.
        </p>

        <div>
          <Link to='/collection' class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                SHOP NOW !
              </span>
            </Link>
        </div>
      </div>

      {/* Right Image */}
      <div className="w-full lg:w-1/3 z-10 mb-10 lg:mb-0">
        <div className="rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-300 transform hover:scale-105">
          <img
            src={assets.main_logo}
            alt="hero"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
