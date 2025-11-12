import React, { useState,useContext } from "react";
import { ShoppingCart,User,ChevronDown } from "lucide-react"; // lightweight icon
import { Link, useNavigate } from "react-router-dom";
import Categories from "../UserInterface/Categories";
import { dropDown, logginContext } from "../../context/LogginContext";
import api from "../../axios/axios";
import { toast } from "react-toastify";

const Navbar = ({ scrollToCategory }) => {
  const navigate=useNavigate()

  const { isLogged, setIsLogged } = useContext(logginContext);
  const {open,setOpen}=useContext(dropDown)
 
  async function handleLogout() {
    try {
      const res = await api.post('/logout');
      setIsLogged(false); 
      console.log("response on logout",res)
      toast.success("Logout sucessfull");
      navigate('/login')
    } catch (error) {
      toast.error('something went wrong');
      console.log(error);
      
    }
  }
    

  return (
    <nav className=" w-full bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-widest">
          B E Y O U R S
        </Link>

        {/* Center Menu */}
        <ul className="hidden md:flex md:gap-4  lg:gap-8 text-sm text-gray-800">
          <li><Link to="/home" className="hover:text-black">Home</Link></li>
          <li className="hover:text-black" onClick={scrollToCategory}>Shop By Category</li>
          <li><Link to="/products" className="hover:text-black">Shop By Product</Link></li>
          <li><Link to="/journal" className="hover:text-black">The Beyours Journal</Link></li>
        </ul>
 
        {/* Right Side */}
        <div className=" flex items-center gap-5 text-sm">
          <Link to="/search" className="hover:text-black">Search</Link>
          {
            isLogged ?
            <div className=" flex relative">
                <User className=" w-4 h-4 mr-1  " onClick={()=>setOpen(!open)}/>
                {open &&
                  <div className="absolute -bottom-5 -right-3 top-5 w-fit h-fit  border border-black bg-white shadow-black shadow-xl text-black z-10 p-3  flex flex-col gap-2"
                  
                  >
                    
                      <Link to="/orders" className="transition duration-500 hover:bg-black hover:text-white p-2">Orders</Link>
                      <button className="transition duration-500 hover:bg-black hover:text-white p-2 " onClick={handleLogout}>Logout</button> 
                    
                  </div>
                }
               </div>
              

//{/* <ChevronDown className="absolute right-1 top-2.5 w-4 h-4 text-gray-500 pointer-events-none" /> */}
            :
            <Link to="/login" className="hover:text-black">Login</Link>
              
          }

          {isLogged && <Link to="/cart" className="relative flex items-center gap-1">
            <ShoppingCart size={18} />
            {/* <span className="absolute -top-2 -right-3 bg-black text-white text-xs rounded-full px-1.5">
              0
            </span> */}
          </Link>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
