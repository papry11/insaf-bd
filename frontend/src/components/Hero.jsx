import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="border border-[#bb72b7] rounded-2xl flex flex-col lg:flex-row items-center justify-center bg-[#e0d7e0] text-white px-4 sm:px-6 lg:px-12 py-16 relative overflow-hidden">
      <div className="z-10 w-full lg:w-1/2 flex flex-col gap-4 sm:gap-6 items-center text-center">
        {/* Small Top Line */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-[3px] bg-[#bb72b7] rounded"></div>
          <p className="uppercase text-blue-950 tracking-widest text-sm sm:text-base font-medium">
            Assalamu Walaikum...
          </p>
        </div>

        {/* Main Heading */}
        <h1
          className="text-3xl sm:text-4xl lg:text-6xl font-extrabold 
               sm:whitespace-normal lg:whitespace-nowrap text-shadow-black
               bg-gradient-to-r from-[#e08adc] via-[#9B5DE5] to-[#F15BB5]
              text-transparent bg-clip-text drop-shadow-lg animate-fade-in"
        >
          WELCOME TO INSAFF BD
        </h1>

        {/* Subtitle */}
        <p className="text-gray-800 max-w-md sm:max-w-lg text-sm sm:text-base px-2 sm:px-4">
          Unlock premium collections and shop with style. The future of fashion
          starts here.
        </p>

        {/* Button */}
        <div>
          <Link
            to="/collection"
            className="bg-[#9b5fa0] px-6 py-2 rounded text-white 
             transition transform duration-300 ease-in-out
             hover:scale-105 hover:bg-[#7f3f85]"
          >
            SHOP NOW !
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
