import { Route, Routes } from "react-router-dom";
import AdminLogin from "@/components/authentication/AdminLogin";
import Dashboard from "@/components/admin/Dashboard";
import AdminTutors from "@/components/admin/AdminTutor";
import AdminLayout from "@/components/layouts/AdminLayout";
import ProtectedAdminRoute from "../routes/ProtectedAdminRoute"
import AdminTutorDetails from "@/components/admin/AdminTutorDetails";
import PublicAdminRoute from "./PublicAdminRoute";
import Courses from "@/components/admin/Courses";
import CreateCourseForm from "@/components/admin/CreateCourseForm";
import AdminUsers from "@/components/admin/AdminUsers";
// import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";

const AdminRoutes = () => {
  return (
    <Routes>
      
      <Route  element={<PublicAdminRoute/>}>
      <Route path="/login" element={<AdminLogin />} />
      </Route>
     

      {/* Protected routes */}
      <Route element={<ProtectedAdminRoute />}>
        <Route path="/" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="tutors" element={<AdminTutors />} />
          <Route path="courses" element={<Courses/>}/>
          <Route path="courses/new" element={<CreateCourseForm/>}/>
          <Route path="students" element={<AdminUsers/>}/>
          {/* <ErrorBoundary> */}
          <Route path="tutors/:applicationId" element= {<AdminTutorDetails/>} />
          {/* </ErrorBoundary> */}
        </Route>
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
