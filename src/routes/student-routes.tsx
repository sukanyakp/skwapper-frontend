import { Route, Routes } from 'react-router-dom'
import PublicRoutes from './public-routes'
import ProtectedRoute from './protected-routes'

import ForgotPassword from '@/pages/authentication/ForgotPassword'
import Login from '@/pages/authentication/Login'
import ResetPassword from '@/pages/authentication/ResetPassword'
import Signup from '@/pages/authentication/Signup'
import VerifyOtp from '@/pages/authentication/VerifyOtp'
import About from '@/pages/student/About'
import Home from '@/pages/student/Home'
import CreateProfilePage from '@/pages/student/CreateProfile'
import UserProfile from '@/pages/student/UserProfile'
import TutorSignup from '@/pages/authentication/TutorSignup'
import StudentLayout from '../components/layouts/StudentLayout' 
import PendingApproval from '@/pages/authentication/PendingApproval'
import AllCourses from '@/pages/courses/AllCourses'
import Tutors from '@/pages/student/Tutors'
import TutorDetails from '@/pages/student/TutorDetails'

import NotFound from '@/components/common/NotFound'
import Courses from '@/pages/admin/Courses'
import CourseDetails from '@/pages/courses/CourseDetails'
import RequestedSessions from '@/pages/student/RequestedSessions'
import EditStudentProfile from '@/pages/student/EditProfile'


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
          <Route path='/profile/edit' element={<EditStudentProfile/>}/>
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
