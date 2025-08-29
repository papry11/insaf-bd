import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-b from-[#faf7fb] via-[#f3eaf7] to-[#e7d8ee] rounded-3xl shadow-lg overflow-hidden py-20 px-6 sm:px-10 lg:px-20 text-center">
      {/* Subtle glow behind */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(224,138,220,0.15),transparent_70%)]"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6 max-w-3xl mx-auto">
        {/* Small Intro */}
          {/* Accent line */}
        
        <p className=" uppercase text-[#7f3f85] tracking-[0.2em] text-sm sm:text-base font-medium">
          Assalamu Walaikum...
        </p>
        <div className="w-20 h-1 bg-gradient-to-r from-[#e08adc] to-[#F15BB5] rounded-full"></div>
        {/* Main Heading */}
        <h1 className="text-4xl sm:text-4xl lg:text-6xl font-extrabold leading-tight 
          bg-gradient-to-r from-[#aa13a3] via-[#9B5DE5] to-[#F15BB5] 
          text-transparent bg-clip-text drop-shadow-md">
          WELCOME TO INSAFF BD
        </h1>

      
        {/* Subtitle */}
        <p className="text-gray-700 text-base sm:text-lg max-w-xl">
          Discover timeless fashion with a modern touch.  
          Premium collections crafted to elevate your lifestyle.
        </p>

        {/* CTA */}
        <Link
          to="/collection"
          className="mt-6 px-12 py-3 rounded-full font-semibold text-white text-lg
          bg-gradient-to-r from-[#9b5fa0] to-[#7f3f85] 
          shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl"
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
};

export default Hero;

