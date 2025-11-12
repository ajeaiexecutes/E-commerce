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




// import { createContext } from "react";

// export const logginContext = createContext();

// export const dropDown = createContext();


import { createContext, useState, useEffect } from "react";
import api from "../axios/axios";

export const logginContext = createContext();
export const dropDown = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check auth status on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Call your backend to verify session/token
        const res = await api.get('/check-auth'); // or whatever your endpoint is
        setIsLogged(res.data.isAuthenticated);
      } catch (error) {
        setIsLogged(false);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  return (
    <logginContext.Provider value={{ isLogged, setIsLogged }}>
      <dropDown.Provider value={{ open, setOpen }}>
        {!loading && children}
      </dropDown.Provider>
    </logginContext.Provider>
  );
};