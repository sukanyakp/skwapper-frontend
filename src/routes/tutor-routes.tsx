import ProtectedRoute from "../routes/protected-routes";
import { Route, Routes } from "react-router-dom";
import TutorHome from "@/components/tutor/TutorHome";
import TutorProfile from "@/components/tutor/TutorProfile";
import TutorLayout from "@/components/layouts/TutorLayout";
import CreateCourse from "@/components/tutor/CreateCourse";
import CreateTutorProfile from "@/components/tutor/CreateTutorProfile";
import EditTutorProfile from "@/components/tutor/EditTutorProfile";
import MyCourses from "@/components/tutor/MyCourses";
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


      </Route>
      </Route>
    </Routes>
  );
};

export default TutorRoutes;
