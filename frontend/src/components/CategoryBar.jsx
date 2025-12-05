import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { useNavigate, useLocation } from "react-router-dom";
import Title from './Title';

const pastelColors = [
  "bg-pink-100",
  "bg-purple-100",
  "bg-blue-100",
  "bg-green-100",
  "bg-yellow-100",
  "bg-indigo-100",
  "bg-teal-100",
  "bg-orange-100"
];

const CategoryBar = () => {
  const { categories } = useContext(ShopContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get("category");
    setActiveCategory(cat || "all");
  }, [location.search]);

  const handleCategoryClick = (catName) => {
    setActiveCategory(catName);
    navigate(catName === "all" ? "/collection" : `/collection?category=${encodeURIComponent(catName)}`);
  };

  return (
    <div className="w-full py-16 bg-gray-50">
      {/* Headline */}
      <div className="text-center text-3xl py-8">
        <Title text1={'EXPLORE BY'} text2={'CATEGORIES'} />
      </div>

      {/* Category Cards */}
      <div className="flex flex-wrap justify-center gap-6">
        {/* All Category */}
        <div
          onClick={() => handleCategoryClick("all")}
          className={`cursor-pointer w-40 h-28 flex items-center justify-center rounded-xl border border-gray-200 text-gray-800 font-semibold
            ${activeCategory === "all" 
              ? "shadow-xl transform scale-105 bg-white" 
              : "hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out bg-white"} 
            backdrop-blur-sm`}
        >
          All
        </div>

        {categories.map((cat, index) => {
          const colorClass = pastelColors[index % pastelColors.length];
          return (
            <div
              key={cat._id}
              onClick={() => handleCategoryClick(cat.name)}
              className={`cursor-pointer w-40 h-28 text-lg flex items-center justify-center rounded-xl text-gray-800 font-semibold border border-transparent
                ${colorClass} 
                ${activeCategory === cat.name 
                  ? "shadow-xl transform scale-105 border-gray-300" 
                  : "hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out"}`}
            >
              {cat.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryBar;
