import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { assets } from "../assets/assets"; 

const slides = [
  {
    id: 1,
    bg: assets.slide1,
    title: "Step Into Style",
    desc: "Discover the latest collection of women’s dresses that combine elegance and comfort for every occasion.",
    button: "Discover More",
    layout: "left",
  },
  {
    id: 2,
    bg: assets.slide2,
    title: "Trendy Looks, Every Day",
    desc: "Upgrade your wardrobe with our curated range of chic dresses designed for the modern woman.",
    button: "Shop Now",
    layout: "left",
  },
  {
    id: 3,
    bg: assets.slide3,
    title: "Your Perfect Dress Awaits",
     desc: "Find your dream dress from our exclusive collection and make every moment unforgettable.",
    button: "Explore Collection",
    layout: "left",
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => nextSlide(), 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const slide = slides[index];

  const variants = {
    enter: (direction) => ({ opacity: 0, x: direction * 120, scale: 1.01 }),
    center: { opacity: 1, x: 0 },
    exit: (direction) => ({ opacity: 0, x: direction * -120, scale: 0.99 }),
  };

  return (
    <div className="relative w-full h-[65vh] overflow-hidden font-sans bg-black">
      {/* Background */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={slide.id}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 1.1, ease: "easeInOut" }}
          className="absolute inset-0 bg-center bg-no-repeat bg-cover"
          style={{ backgroundImage: `url(${slide.bg})` }}
        />
      </AnimatePresence>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Navigation Arrows */}
      <div className="absolute inset-0 flex justify-between items-center px-6 z-30 pointer-events-none">
        <button
          onClick={prevSlide}
          className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition pointer-events-auto text-white shadow-md"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition pointer-events-auto text-white shadow-md"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Slide Content */}
      <div className="relative z-20 flex items-center justify-center h-full px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id + "content"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`w-full max-w-5xl grid gap-4 ${
              slide.layout === "center"
                ? "text-center"
                : "text-left md:grid-cols-2 justify-items-start"
            }`}
          >
            <div
              className={`${
                slide.layout === "center"
                  ? "mx-auto text-white"
                  : "text-white "
              }`}
            >
              <h1
                className={`font-bold drop-shadow-md ${
                  slide.layout === "center"
                    ? "text-4xl md:text-5xl lg:text-6xl"
                    : "text-3xl md:text-4xl lg:text-5xl"
                }`}
              >
                {slide.title}
              </h1>
              <p className="text-base md:text-lg opacity-80 mt-3 max-w-md">
                {slide.desc}
              </p>
              {slide.button && (
                <a href="/collection">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-5 px-6 py-3 bg-white text-black font-medium text-sm md:text-base rounded-xl shadow-md hover:shadow-lg transition-all"
                  >
                    {slide.button}
                  </motion.button>
                </a>
              )}
            </div>

            {/* Empty column for left layout */}
            {slide.layout !== "center" && <div />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {slides.map((_, i) => (
          <motion.div
            key={i}
            onClick={() => {
              setDirection(i > index ? 1 : -1);
              setIndex(i);
            }}
            whileHover={{ scale: 1.3 }}
            className={`h-2 rounded-full cursor-pointer transition-all ${
              i === index ? "bg-white w-8" : "bg-white/40 w-2"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
