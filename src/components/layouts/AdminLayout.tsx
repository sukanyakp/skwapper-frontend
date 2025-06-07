import { Outlet } from "react-router-dom";
import AdminSidebar from "@/components/common/AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
