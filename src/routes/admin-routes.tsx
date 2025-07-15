import { Route, Routes } from "react-router-dom";
import AdminLogin from "@/pages/authentication/AdminLogin";
import Dashboard from "@/pages/admin/Dashboard";
import AdminTutors from "@/pages/admin/AdminTutor";
import AdminLayout from "@/components/layouts/AdminLayout";
import ProtectedAdminRoute from "../routes/ProtectedAdminRoute"
import AdminTutorDetails from "@/pages/admin/AdminTutorDetails";
import PublicAdminRoute from "./PublicAdminRoute";
import Courses from "@/pages/admin/Courses";
import CreateCourseForm from "@/pages/admin/CreateCourseForm";
import AdminUsers from "@/pages/admin/AdminUsers";
import Payments from "@/pages/admin/adminPayments";
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
          <Route path="payments" element={<Payments/>}/>
          {/* <ErrorBoundary> */}
          <Route path="tutors/:applicationId" element= {<AdminTutorDetails/>} />
          {/* </ErrorBoundary> */}
        </Route>
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
