import "./App.css";
import AdminLogin from "./components/Admin/AdminLogin";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserRegister from "./components/User/UserRegister";
import UserLogin from "./components/User/UserLogin";
import Dashboard from "./components/Admin/Dashboard";
import Categories from "./components/Admin/Categories";
import MainContent from "./components/Admin/MainContent";
import EditCategory from "./components/Admin/EditCategory";
import Products from "./components/Admin/Products";
import AddProducts from "./components/Admin/AddProducts";
import Users from "./components/Admin/Users";
import Orders from "./components/Admin/Orders";
import Navbar from "./components/UserInterface/Nav";
import Banner from "./components/UserInterface/Banner";
import Home from "./components/UserInterface/Home";
import { ToastContainer } from "react-toastify";
import ProductGrid from "./components/UserInterface/ProductGrid";
import ProductDetails from "./components/UserInterface/ProductDetails";
import CartItem from "./components/UserInterface/Cart";
import Placeorder from "./components/UserInterface/Placeorder";
import OrderHistory from "./components/UserInterface/Orderhistory";
import { logginContext } from "./context/LogginContext";
import { dropDown } from "./context/LogginContext";
import { useState } from "react";
import Layout from "./Layout";

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [open,setOpen]=useState(false)

  return (
    <div>
      <logginContext.Provider value={{ isLogged, setIsLogged }}>
      <dropDown.Provider value={{open,setOpen}}>  
        <Router>
          <Routes>
            {/* ============= ADMIN=============*/}
            <Route path="/adminlogin" element={<AdminLogin />} />

            <Route path="/adminDashboard" element={<Dashboard />}>
              <Route index element={<MainContent />} />
              <Route path="categories" element={<Categories />}></Route>
              <Route path="edit/:id" element={<EditCategory />}></Route>

              <Route path="products" element={<Products />}></Route>
              <Route path="addproducts" element={<AddProducts />}></Route>
              <Route path="products/:id" element={<AddProducts />}></Route>

              <Route path="users" element={<Users />}></Route>

              <Route path="orders" element={<Orders />}></Route>
            </Route>

            {/* ============= USER =============*/}
            <Route path="/register" element={<UserRegister />}></Route>

            <Route path="/login" element={<UserLogin />}></Route>

            <Route path="/" element={<Layout />}>

	    <Route index element={<Home/>}/> 


            <Route path="/products" element={<ProductGrid />}></Route>
            <Route
              path="/productDetails/:id"
              element={<ProductDetails />}
            ></Route>

            <Route path="/order" element={<Placeorder />}></Route>

            <Route path="/orders" element={<OrderHistory />}></Route>

	   </Route>

	    <Route path="/cart" element={<CartItem />}></Route>


          </Routes>
        </Router>

        <ToastContainer position="top-center" autoClose={2000} />
      </dropDown.Provider>
      </logginContext.Provider>
    </div>
  );
}

export default App;
