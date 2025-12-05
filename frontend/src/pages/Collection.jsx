import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import { useLocation } from "react-router-dom";

const Collection = () => {
  const { products, search, showSearch, categories } = useContext(ShopContext);
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const categoryQuery = query.get("category");

  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");

  const toggleCategory = (e) => {
    const value = e.target.value;

    if (category.includes(value)) {
      setCategory((prev) => prev.filter((item) => item !== value));
    } else {
      setCategory((prev) => [...prev, value]);
    }
  };

  // FILTER LOGIC
  const applyFilter = () => {
    let productsCopy = products.slice();

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    } else if (categoryQuery) {
      productsCopy = productsCopy.filter(
        (item) =>
          item.category.toLowerCase() === categoryQuery.toLowerCase()
      );
    }

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let fpcopy = filterProducts.slice();

    switch (sortType) {
      case "low-high":
        setFilterProducts(fpcopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilterProducts(fpcopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
    }
  };

  useEffect(() => {
    if (categoryQuery) {
      setCategory([categoryQuery]);
    } else {
      setCategory([]);
    }
  }, [categoryQuery]);

  useEffect(() => {
    applyFilter();
  }, [category, search, showSearch, products, categoryQuery]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-6 pt-10">
      
      {/* FILTERS - Always Visible, Modern Look */}
      <div className="w-full sm:w-60">

        <p className="my-2 text-xl font-semibold text-gray-800 flex items-center gap-2">
          FILTERS 
        </p>

        <div className="
          bg-white/70 backdrop-blur-xl shadow-lg border border-gray-200 
          px-5 py-5 rounded-2xl transition-all hover:shadow-xl
        ">
          <p className="mb-4 text-base font-semibold text-pink-700 tracking-wide">
            Categories
          </p>

          <div className="flex flex-col gap-3 text-sm">
            {categories.map((cat) => (
              <label
                key={cat._id}
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all
                  ${
                    category.includes(cat.name)
                      ? "bg-pink-200 text-black shadow-md"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
              >
                <input
                  className="w-4 h-4 cursor-pointer accent-gray-700"
                  type="checkbox"
                  value={cat.name}
                  checked={category.includes(cat.name)}
                  onChange={toggleCategory}
                />
                <span className="font-medium">{cat.name}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* PRODUCTS */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />

          <select
            onChange={(e) => setSortType(e.target.value)}
            className="bg-white border border-gray-300 text-sm px-3 py-2 rounded-xl shadow-sm"
          >
            <option value="relavent">Sort by: Relevant</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 gap-y-8">
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
