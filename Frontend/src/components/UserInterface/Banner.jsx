import React from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <section
      className="
        relative 
        w-full 
        h-[60vh] 
        md:h-[80vh] 
        lg:h-[90vh] 
        bg-cover 
        bg-center 
        flex 
        items-center 
        justify-center
      "
      style={{
        backgroundImage:
          "url('https://www.beyours.in/cdn/shop/files/banner-classic_1.jpg?v=1760290157&width=2000')",
      }}
    >
      {/* Optional overlay for better contrast */}
      <div className="absolute inset-0 bg-black/10"></div>

      {/* Centered Button */}
      <div className="relative z-10 text-center">
        <Link
          to="/products"
          className="
            inline-block 
            px-8 
            py-3 
            border 
            border-black 
            bg-white 
            text-black 
            text-xs 
            md:text-sm 
            tracking-[0.2em] 
            uppercase 
            hover:bg-black 
            hover:text-white 
            transition-all 
            duration-300
          "
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
};

export default Banner;
