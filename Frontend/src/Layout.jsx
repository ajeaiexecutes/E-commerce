import React from 'react'
import Navbar from './components/UserInterface/Nav'
import { Outlet } from 'react-router-dom'
import Footer from './components/UserInterface/Footer'


const Layout = () => {
    
  return (
    <div>
          <Navbar />
          <Outlet />
          <Footer/>
        
          
    </div>
  )
}

export default Layout
