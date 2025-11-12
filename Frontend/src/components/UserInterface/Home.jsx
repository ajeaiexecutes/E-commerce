import React, {  useContext, useRef, useState } from "react";
import Banner from "./Banner";
import Navbar from "./Nav";
import ShopByCategory from "./Categories";
import InvestInClassic from "./Invest";
import Footer from "./Footer";
import { dropDown } from "../../context/LogginContext";


const Home = () => {
  const categoryRef = useRef(null);

  const { open, setOpen } = useContext(dropDown);


  const scrollToCategory = () => {
    categoryRef.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div onClick={() => {
      if (open) {
        setOpen(!open)
      }
     }}>
      <Navbar scrollToCategory={scrollToCategory} />
        
      

      
        <Banner />
      
      <div ref={categoryRef}>
        <ShopByCategory />
      </div>
      
      <InvestInClassic />
      <Footer />
      
    </div>
  );
};

export default Home;
