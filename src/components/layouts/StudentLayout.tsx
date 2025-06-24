import React from 'react'
import Navbar from '../common/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../common/Footer'

const studentLayout = () => {
  return (
     <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white font-sans">
        <Navbar/>

        <Outlet/>

        <Footer/>

      
    </div>
  )
}

export default studentLayout
