import React, { useEffect, useState, useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";


// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const LatestCollection = () => {
  const { products , getCartCount } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"LATEST"} text2={"COLLECTION"} />
        <Link to='/cart' className="relative pl-5">
          <FontAwesomeIcon className="text-3xl cursor-pointer text-gray-400" icon={faBagShopping} />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-red-600 text-white aspect-square rounded-full text-[12px]">{getCartCount()}</p>
        </Link>
      </div>

      {/* ✅ Product Slider with Autoplay */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={2}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false, // user click korleo autoplay bondho hobe na
        }}
        loop={true} // Infinite loop
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
        }}
      >
        {latestProducts.map((item, index) => (
          <SwiperSlide key={index}>
            <ProductItem
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default LatestCollection;
