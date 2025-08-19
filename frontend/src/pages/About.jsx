import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <section className=" text-gray-100 py-20 px-6 sm:px-12 lg:px-24">
      {/* Title */}
      <div className="text-center text-3xl mb-6">
        <Title text1="ABOUT" text2="US" />
        
      </div>

      {/* Grid Content */}
      <div className="grid md:grid-cols-2 gap-12 items-center bg-gradient-to-br from-[#161b22] to-[#111827] p-10 rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.4)] border border-gray-400">
        
        {/* Image */}
        <div className="relative">
          <div className="absolute -top-5 -left-5 w-full h-full border-2 border-gray-400 rounded-xl z-0" />
          <img
            src={assets.about_img}
            alt="About INSAF BD"
            className="relative z-10 rounded-xl w-full object-cover shadow-lg"
          />
        </div>

        {/* Text */}
        <div className="space-y-6 text-[15px] font-light leading-[1.8]">
          <p>
            <span className="text-red-400 font-semibold">Next Fortune</span> is a bold new name in online fashion where quality meets affordability. 
            We believe fashion isn't just about appearance — it's about self-confidence, identity, and lifestyle.
          </p>

          <p>
            Since launching in <span className="text-red-400 font-semibold">2020</span>, we've been committed to delivering trendy fashion 
            with honesty, speed, and care. Your trust means everything to us, and every order is treated like the first.
          </p>

          <p>
            With fast delivery, responsive support, and handpicked collections, NEXT FORTUNE is not just a shop — it's your style partner.
          </p>

          <div className="pt-4 border-t border-red-400">
            <h3 className="text-lg font-semibold text-white mb-2">Our Goal</h3>
            <p className="text-gray-300">
              To provide a reliable, stylish, and smooth online shopping experience for everyone.
              We ensure you discover your fashion favorites effortlessly and receive them right on time — every time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
