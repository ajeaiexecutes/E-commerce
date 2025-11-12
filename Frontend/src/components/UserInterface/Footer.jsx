import React from "react";
import {
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 px-6 md:px-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
        {/* MOST TRENDING */}
        <div>
          <h3 className="font-semibold text-lg mb-4 tracking-wide">MOST TRENDING</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>Travel Cargo</li>
            <li>Classic Shirt</li>
            <li>All Rounder Pajama</li>
            <li>Tailor Ready Pants</li>
            <li>Textured Shirts</li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h3 className="font-semibold text-lg mb-4 tracking-wide">SUPPORT</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>Return & Exchange Policy</li>
            <li>Returns or Exchange</li>
            <li>Track Your Order</li>
            <li>FAQs</li>
            <li>Contact Us</li>
          </ul>
        </div>

        {/* INFORMATION */}
        <div>
          <h3 className="font-semibold text-lg mb-4 tracking-wide">INFORMATION</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>About Us</li>
            <li>All Reviews</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Sitemap</li>
            <li>Blogs</li>
          </ul>
        </div>

        {/* FOLLOW US */}
        <div>
          <h3 className="font-semibold text-lg mb-4 tracking-wide">FOLLOW US</h3>
          <div className="flex flex-wrap gap-3 mb-4">
            <a href="#" className="border border-gray-700 p-2 hover:bg-gray-800 transition rounded">
              <Facebook size={18} />
            </a>
            <a href="#" className="border border-gray-700 p-2 hover:bg-gray-800 transition rounded">
              <Twitter size={18} />
            </a>
            <a href="#" className="border border-gray-700 p-2 hover:bg-gray-800 transition rounded">
              <Instagram size={18} />
            </a>
            
            <a href="#" className="border border-gray-700 p-2 hover:bg-gray-800 transition rounded">
              <Youtube size={18} />
            </a>
          </div>

          {/* App buttons */}
          <div className="flex gap-3 flex-wrap">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Google Play"
              className="h-10"
            />
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="App Store"
              className="h-10"
            />
          </div>
        </div>
      </div>

      {/* Divider line */}
      <div className="border-t border-gray-800 my-6"></div>

      {/* Bottom text */}
      <div className="text-center text-gray-400 text-xs space-y-2">
        <p>
          ALL ABOVE LISTED PRODUCTS ARE MANUFACTURED BY A AND N GROUP, MARKETED
          BY BEYOURS ESSENTIALS PRIVATE LIMITED
        </p>
        <p>© 2025 BEYOURS | ALL RIGHTS RESERVED</p>
      </div>
    </footer>
  );
};

export default Footer;
