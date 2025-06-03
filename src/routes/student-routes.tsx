import ForgotPassword from '@/components/authentication/ForgotPassword'
import Login from '@/components/authentication/Login'
import ResetPassword from '@/components/authentication/ResetPassword'
import Signup from '@/components/authentication/Signup'
import VerifyOtp from '@/components/authentication/VerifyOtp'
import About from '@/components/student/About'
import Home from '@/components/student/Home'

import { Route, Routes } from 'react-router-dom'

const StudentRoutes = () => {
  return (
    <Routes>
      < Route  path="/" element={<Home/>}/>
      < Route  path="/about" element={<About/>}/>
      < Route  path="/signup" element={<Signup/>}/>
      < Route  path="/verify-otp" element ={<VerifyOtp/>}/>
      < Route  path="/login"  element = {<Login/>}/>
      < Route path='/forgot-password' element = {<ForgotPassword/>} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />

    </Routes>
  )
}

export default StudentRoutes
