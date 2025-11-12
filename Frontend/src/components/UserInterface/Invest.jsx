import React from "react";
import { useNavigate } from "react-router-dom";

const InvestInClassic = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-[#f3f3f3] text-center py-16 px-4">
      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-serif text-gray-900 mb-4">
        Beyours Says - Invest In Classic Fashion
      </h2>

      {/* Description */}
      <p className="max-w-2xl mx-auto text-sm md:text-base text-gray-700 leading-relaxed mb-6">
        Because it lasts – Seriously. Your dad's basic shirt & pant are still in
        fashion. And BEYOURS makes it thoughtfully, with functional designs &
        quality craftsmanship.
      </p>

      {/* Button */}
      <button
        onClick={() => navigate("/our-story")}
        className="bg-black text-white px-6 py-2 rounded-sm text-sm hover:bg-gray-900 transition-all duration-300 mb-10"
      >
        Read our story
      </button>

      {/* Stats Section */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 text-gray-900 text-sm md:text-base">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-black rounded-full"></span>
          <p className="uppercase tracking-wide">
            Timeless Fashion Since <br className="hidden md:block" /> 2018
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-black rounded-full"></span>
          <p className="uppercase tracking-wide">
            2.5 Lakh+ <br className="hidden md:block" /> Customers
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-black rounded-full"></span>
          <p className="uppercase tracking-wide">
            5000+ <br className="hidden md:block" /> Authentic Reviews
          </p>
        </div>
      </div>
    </section>
  );
};

export default InvestInClassic;
