import { Route, Routes } from "react-router-dom";
import AdminLogin from "@/components/authentication/AdminLogin";

import Dashboard from "@/components/admin/Dashboard";
import AdminTutors from "@/components/admin/AdminTutor";
import AdminLayout from "@/components/layouts/AdminLayout";
import ProtectedAdminRoute from "../routes/ProtectedAdminRoute"
import AdminTutorDetails from "@/components/admin/AdminTutorDetails";
import PublicAdminRoute from "./PublicAdminRoute";
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
          {/* <ErrorBoundary> */}
          <Route path="tutors/:applicationId" element= {<AdminTutorDetails/>} />
          {/* </ErrorBoundary> */}
        </Route>
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
