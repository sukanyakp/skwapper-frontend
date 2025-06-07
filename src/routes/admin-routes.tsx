import Dashboard from "@/components/admin/Dashboard";
import AdminLogin from "@/components/authentication/AdminLogin";
import AdminRegister from "@/components/authentication/AdminRegister";
import AdminLayout from "../components/layouts/AdminLayout";
import { Route, Routes } from "react-router-dom";
import AdminTutors from "@/components/admin/AdminTutor";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<AdminLogin />} />
      <Route path="/register" element={<AdminRegister />} />

      {/* Protected Routes with Sidebar */}
      <Route path="/" element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="/tutors" element={<AdminTutors />} />

        {/* You can also add /tutors, /students, etc. here */}
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
