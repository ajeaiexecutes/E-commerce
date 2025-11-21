// import { createContext, useEffect, useState } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [isLoggedIn, setIsLoggedIn] = useState(false)
    
//     useEffect(() => {
//         const savedLoggin = localStorage.getItem("isLoggedin")
//         if (savedLoggin === "true") {
//             setIsLoggedIn(true)
//         }
//     }, []);


//     useEffect(() => {
//         localStorage.setItem("isLoggedin", isLoggedIn)
//     }, [isLoggedIn]);


//     //login logout function

//     const login = () => {
//         setIsLoggedIn(true);
//         localStorage.setItem("isLoggedIn","true")
//     }

//     const logout = () => {
//         setIsLoggedIn(false);
//         localStorage.removeItem("isLoggedIn");
//         localStorage.removeItem(i)
//     }
// }




 import { createContext } from "react";

 export const logginContext = createContext();

 export const dropDown = createContext();


//import { createContext, useState, useEffect } from "react";
import api from "../axios/axios";

export const logginContext = createContext();
export const dropDown = createContext();


