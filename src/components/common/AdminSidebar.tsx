import { NavLink } from "react-router-dom";
import {
  LogOut,
  Book,
  Users,
  LayoutDashboard,
  Wallet,
  MessageSquare,
  DollarSign,
  GraduationCap,
} from "lucide-react";

const AdminSidebar = () => {
  return (
    <aside className="h-screen w-64 bg-white text-gray-800 shadow-md flex flex-col p-4 border-r">
      <h1 className="text-2xl font-bold mb-8 text-center text-indigo-600">Skwapper</h1>
      <nav className="flex flex-col gap-3">
        <NavLink
          to="/admin/dashboard"
          className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded"
        >
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/tutors"
          className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded"
        >
          <Users size={20} />
          Tutors
        </NavLink>

        <NavLink
          to="/admin/students"
          className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded"
        >
          <GraduationCap size={20} />
          Students
        </NavLink>

        <NavLink
          to="/admin/courses"
          className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded"
        >
          <Book size={20} />
          Courses
        </NavLink>

        <NavLink
          to="/admin/payments"
          className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded"
        >
          <DollarSign size={20} />
          Payments
        </NavLink>

        <NavLink
          to="/admin/wallet"
          className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded"
        >
          <Wallet size={20} />
          Wallet
        </NavLink>

        <NavLink
          to="/admin/feedbacks"
          className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded"
        >
          <MessageSquare size={20} />
          Feedbacks
        </NavLink>

        <NavLink
          to="/logout"
          className="flex items-center gap-3 mt-auto hover:bg-gray-100 p-2 rounded text-red-600"
        >
          <LogOut size={20} />
          Logout
        </NavLink>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
