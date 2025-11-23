import React, {  useContext, useRef, useState } from "react";
import Banner from "./Banner";
import Navbar from "./Nav";
import ShopByCategory from "./Categories";
import InvestInClassic from "./Invest";
import Footer from "./Footer";
import { dropDown } from "../../context/LogginContext";


const Home = () => {

  const { open, setOpen } = useContext(dropDown);

  return (
    <div onClick={() => {
      if (open) {
        setOpen(!open)
      }
     }}>
           
        <Banner />
         
        <ShopByCategory />
   
       <InvestInClassic />
     
       <Footer />
      
    </div>
  );
};

export default Home;
