import ProtectedRoute from "../routes/protected-routes";
import { Route, Routes } from "react-router-dom";
import TutorHome from "@/pages/tutor/TutorHome";
import TutorProfile from "@/pages/tutor/TutorProfile";
import TutorLayout from "@/components/layouts/TutorLayout";
import CreateCourse from "@/pages/tutor/CreateCourse";
import CreateTutorProfile from "@/pages/tutor/CreateTutorProfile";
import EditTutorProfile from "@/pages/tutor/EditTutorProfile";
import MyCourses from "@/pages/tutor/MyCourses";
import TutorRequests from "@/pages/tutor/TutorRequests";
import TutorSchedule from "@/pages/tutor/TutorSchedule";
import TutorAvailability from "@/pages/tutor/TutorAvailability";
import EnteredAvailability from "@/pages/tutor/EnteredAvailability";
import ScheduledSessions from "@/pages/tutor/ScheduledSessions";
// import TutorLayout from

const TutorRoutes = () => {
  return (
    <Routes>
      {/* <Route path="/signup" element={<TutorSignup />} /> */}
      <Route path="/home" element={<TutorHome/>}/>

      {/* Protect the pending-approval route */}
      <Route element={<ProtectedRoute />}>
      <Route  element={<TutorLayout/>}>
      
        <Route path="/create-profile" element ={<CreateTutorProfile/>}/>
        <Route path="/profile" element={<TutorProfile/>}/>
        <Route path="/create-course" element={<CreateCourse />} />
        <Route path="/profile/edit" element={<EditTutorProfile/>}/>

        <Route path="/courses" element={<MyCourses/>}/>
        <Route path="/requests" element={<TutorRequests/>}/>
        <Route path="/schedule" element={<TutorSchedule />} /> 
        {/* TutorSchedule is not needed */}

        <Route path="/availability" element={<TutorAvailability/>}/>
        <Route path="/availability/view" element={<EnteredAvailability/>} />

        <Route path="/session-scheduled" element={<ScheduledSessions/>}/>


      </Route>
      </Route>
    </Routes>
  );
};

export default TutorRoutes;
