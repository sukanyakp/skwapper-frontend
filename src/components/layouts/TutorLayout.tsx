import React from 'react'
import TutorNavbar from '../common/TutorNavbar'
import { Outlet } from 'react-router-dom'
import Footer from '../common/Footer'

const TutorLayout = () => {
  return (
     <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white font-sans">
      <TutorNavbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default TutorLayout
