import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="px-6 md:px-16 lg:px-14 xl:px-3 pt-8 w-full text-white">
      <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-200/40 pb-6">
        <div className="md:max-w-96">
          <Link to="/">
            {" "}
            <h1 className="prata-regular text-2xl sm:py-3 lg:text-4xl">
              NEXT FORTUNE
            </h1>
          </Link>
          <p className="mt-6 text-sm">
            Next Fortune is a lifestyle for those who create their path, wear ambition, and build their own future. More than clothing, it's a powerful mindset. Own your story. Wear your drive. Live Next Fortune. Join the movement. Be the brand. Define your future.
          </p>
        </div>
        <div className="flex-1 flex items-start md:justify-end gap-20">
          <div>
            <h2 className="font-semibold mb-5 text-gray-200">Company</h2>
            <ul className="text-sm space-y-2">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/about">About us</a>
              </li>
              <li>
                <a href="/contact">Contact us</a>
              </li>
              <li>
                <a href="#">Privacy policy</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold mb-5 text-gray-200">Get in touch</h2>
            <div className="text-sm space-y-2">
              <p>
                Tel:{" "}
                <a href=" " className="text-blue-600 hover:underline">
                  01924252432
                </a>
              </p>
              <p>
                Email:{" "}
                <a
                  href="mailto:nextfortune@gamil.com"
                  className="text-blue-600 hover:underline"
                >
                  nextfortune@gamil.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <p className="pt-4 text-center text-xs md:text-sm pb-5">
        Copyright 2025 © NEXT FORTUNE All Right Reserved. DESIGNED & DEVELOPED BY
        JANNATUL FERDOUS PAPRY
      </p>
    </footer>
  );
};

export default Footer;
