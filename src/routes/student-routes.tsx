import ForgotPassword from '@/components/authentication/ForgotPassword'
import Login from '@/components/authentication/Login'
import ResetPassword from '@/components/authentication/ResetPassword'
import Signup from '@/components/authentication/Signup'
import VerifyOtp from '@/components/authentication/VerifyOtp'
import About from '@/components/student/About'
import Home from '@/components/student/Home'

import { Route, Routes } from 'react-router-dom'
import PublicRoutes from './public-routes'
import CreateProfilePage from '@/components/student/CreateProfile'
import UserProfile from '@/components/student/UserProfile'
import ProtectedRoute from './protected-routes'
import TutorSignup from '@/components/authentication/TutorSignup'

const StudentRoutes = () => {
  return (
    <Routes>

      < Route  element={<PublicRoutes />}>
      
      < Route  path="/login"      element = {<Login/>}/>

      < Route  path="/signup"     element={<Signup/>}/>
      < Route  path="/verify-otp" element ={<VerifyOtp/>}/>
      < Route  path='/forgot-password'       element = {<ForgotPassword/>} />
      <Route   path="/reset-password/:token" element={<ResetPassword />} />


      </Route>
      <Route element = {<ProtectedRoute/>} >

      <Route path="/create-profile" element={<CreateProfilePage />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path='/apply-tutor' element = {<TutorSignup/>}/>  
      {/* apply for tutor  */}

      </Route>
       {/* Accessible to everyone */}
      < Route  path="/about"  element={<About/>}/>
      < Route  path="/"       element={<Home/>}/>

    </Routes>
  )
}

export default StudentRoutes
