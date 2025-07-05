import { Route, Routes } from 'react-router-dom'
import PublicRoutes from './public-routes'
import ProtectedRoute from './protected-routes'

import ForgotPassword from '@/components/authentication/ForgotPassword'
import Login from '@/components/authentication/Login'
import ResetPassword from '@/components/authentication/ResetPassword'
import Signup from '@/components/authentication/Signup'
import VerifyOtp from '@/components/authentication/VerifyOtp'
import About from '@/components/student/About'
import Home from '@/components/student/Home'
import CreateProfilePage from '@/components/student/CreateProfile'
import UserProfile from '@/components/student/UserProfile'
import TutorSignup from '@/components/authentication/TutorSignup'
import StudentLayout from '../components/layouts/StudentLayout' 
import PendingApproval from '@/components/authentication/PendingApproval'
import AllCourses from '@/components/courses/AllCourses'
import Tutors from '@/components/student/Tutors'
import TutorDetails from '@/components/student/TutorDetails'

import NotFound from '@/components/common/NotFound'
import Courses from '@/components/admin/Courses'
import CourseDetails from '@/components/courses/CourseDetails'
import RequestedSessions from '@/components/student/RequestedSessions'


const StudentRoutes = () => {
  return (
    <Routes>
       <Route path="*" element={<NotFound />} />

      {/* Public Routes */}
      <Route element={<PublicRoutes />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        {/* <Route path='/courses' element={<Courses/>}/> */}
      </Route>

      {/* Protected Routes with Layout */}
      <Route element={<ProtectedRoute />}>
        <Route element={<StudentLayout />}>
          <Route path="/create-profile" element={<CreateProfilePage />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/apply-tutor" element={<TutorSignup />} />
          <Route path="/pending-approval" element={<PendingApproval />} />
              <Route path='/courses' element= {<AllCourses/>}/>
              <Route path='/course/:id' element={<CourseDetails/>}/>
              <Route path='/tutors' element = {<Tutors/>}/>
              <Route path='/tutors/:tutorId' element= {<TutorDetails/>}/>
              <Route path='/tutors/session-requests' element={<RequestedSessions/>}/> 
              {/* change the route here  */}
        </Route>
      </Route>

      {/* Publicly accessible routes */}
      <Route path="/about" element={<About />} />
      <Route path="/" element={<Home />} />
  
    </Routes>
  )
}

export default StudentRoutes
