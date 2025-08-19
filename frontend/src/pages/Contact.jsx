import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <section className="min-h-screen px-6 sm:px-12 lg:px-24 py-10 flex flex-col items-center text-gray-300">
      {/* Header */}
      <div className="text-center max-w-xl w-full mb-8">
        <div className="text-center text-3xl mb-6">
        <Title text1="CONTACT" text2="US" />
        
      </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-16 max-w-6xl w-full bg-[#161b22] shadow-lg rounded-2xl p-8 sm:p-12 border border-gray-700">
        {/* Image Section */}
        <div className="md:w-1/2 flex justify-center items-center">
          <img
            src={assets.contact_img}
            alt="Contact Visual"
            className="rounded-xl w-full max-h-96 object-cover shadow-lg border border-gray-700"
          />
        </div>

        {/* Info Section */}
        <div className="md:w-1/2 flex flex-col justify-center gap-10">
          {/* Office Info */}
          <div>
            <h3 className="text-xl font-semibold text-red-400 border-b border-gray-600 pb-2 mb-4">
              Our Office
            </h3>
            <address className="not-italic space-y-1 text-base text-gray-400 leading-relaxed">
              <p>Banani</p>
              <p>Dhaka, 1213</p>
              <p>
                Tel:{" "}
                <a href="tel:+88019820xxxxx" className="text-gray-400 hover:underline">
                  +88019820*****
                </a>
              </p>
              <p>
                Email:{" "}
                <a
                  href="mailto:prescripto@gmail.com"
                  className="text-gray-400 hover:underline"
                >
                  NextFortune@gmail.com
                </a>
              </p>
            </address>
          </div>

          {/* Careers */}
          <div>
            <h3 className="text-xl font-semibold text-red-400 border-b border-gray-600 pb-2 mb-4">
              Careers at Next fortune
            </h3>
            <p className="text-gray-400 mb-4 leading-relaxed">
              Explore job opportunities and be part of a growing team committed to healthcare innovation.
            </p>
              <button to='/collection' class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
              <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                CONTACT US
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

