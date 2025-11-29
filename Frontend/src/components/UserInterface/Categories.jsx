import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../../axios/axios";
import { toast } from "react-toastify";

const categories = [
  {
    name: "Shirts",
    image: "https://www.beyours.in/cdn/shop/files/shirt.jpg?v=1710234254",
    path: "/products",
  },
  {
    name: "T Shirts",
    image: "https://www.beyours.in/cdn/shop/files/t-shirt.jpg?v=1710234254",
    path: "/sdjf",
  },
  {
    name: "Joggers",
    image: "https://www.beyours.in/cdn/shop/files/joggers.jpg?v=1710234254",
    path: "/husfkj",
  },
  {
    name: "Trousers",
    image: "	https://www.beyours.in/cdn/shop/files/trouser.jpg?v=1710234924",
    path: "/asff",
  },
  {
    name: "Winter",
    image: "https://www.beyours.in/cdn/shop/files/winter.jpg?v=1710234254",
    path: "/sfsf",
  },
];



const ShopByCategory = () => {
  const navigate = useNavigate();

  return (
    <section className="py-12 bg-white text-center">
      <h2 className="text-2xl md:text-3xl font-serif text-gray-900 mb-10">
        Shop by category
      </h2>

      <div className="flex flex-wrap justify-center gap-6 ">
        {categories.map((cat, index) => (
          <div
            key={index}
            onClick={() => navigate(cat.path)}
            className="cursor-pointer group w-[150px] sm:w-[150px] md:w-[150px] "
          >
            <div className="overflow-hidden rounded-lg shadow-sm">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-[150px] object-cover rounded-lg transition-transform duration-500 ease-in-out group-hover:scale-110"
              />
            </div>
            <p className="mt-3 text-sm md:text-base font-light text-gray-900 group-hover:font-medium transition-all duration-300">
              {cat.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShopByCategory;
