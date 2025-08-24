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
      <div className="flex flex-col md:flex-row gap-16 max-w-6xl w-full  shadow-lg rounded-2xl p-8 sm:p-12 border border-gray-300">
        {/* Image Section */}
        <div className="md:w-1/2 flex justify-center items-center">
          <img
            src={assets.contact_img}
            alt="Contact Visual"
            className="rounded-xl w-full max-h-96 object-cover shadow-lg border"
          />
        </div>

        {/* Info Section */}
        <div className="md:w-1/2 flex flex-col justify-center gap-10">
          {/* Office Info */}
          <div>
            <h3 className="text-xl font-semibold text-[#b47ab1] border-b border-gray-600 pb-2 mb-4">
              Our Office
            </h3>
            <address className="not-italic space-y-1 text-base text-gray-800 leading-relaxed">
              <p>MIRPUR 10 </p>
              <p>Dhaka, 1216</p>
              <p>
                Tel:{" "}
                <a href="tel:+8801970549838" className="text-gray-800 hover:underline">
                  +8801970549838
                </a>
              </p>
              <p>
                Email:{" "}
                <a
                  href="mailto:insaffbd@gmail.com"
                  className="text-gray-400 hover:underline"
                >
                  inssaffbd@gmail.com
                </a>
              </p>
            </address>
          </div>

          {/* Careers */}
          <div>
            <h3 className="text-xl font-semibold text-[#b47ab1] border-b border-gray-600 pb-2 mb-4">
              Careers at INSAAF BD
            </h3>
            <p className="text-gray-800 mb-4 leading-relaxed">
              Explore job opportunities and be part of a growing team committed to healthcare innovation.
            </p>
              <button to='/collection' className="bg-[#b47ab1] px-6 py-2 rounded text-white 
             transition transform duration-300 ease-in-out
             hover:scale-105 hover:bg-[#9b5fa0]">
                CONTACT US
             
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

