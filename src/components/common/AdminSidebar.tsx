import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
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
import { logout } from "../../store/slices/adminSlice"; 

const AdminSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token"); 
    localStorage.removeItem("user")
    navigate("/admin/login");
  };

  return (
    <aside className="h-screen w-64 bg-white text-gray-800 shadow-md flex flex-col p-4 border-r">
      <h1 className="text-2xl font-bold mb-8 text-center text-indigo-600">Skwapper</h1>
      <nav className="flex flex-col gap-3">
        <Link
          to="/admin/dashboard"
          className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded"
        >
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        <Link
          to="/admin/tutors"
          className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded"
        >
          <Users size={20} />
          Tutors
        </Link>

        <Link
          to="/admin/students"
          className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded"
        >
          <GraduationCap size={20} />
          Students
        </Link>

        <Link
          to="/admin/courses"
          className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded"
        >
          <Book size={20} />
          Courses
        </Link>

        <Link
          to="/admin/payments"
          className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded"
        >
          <DollarSign size={20} />
          Payments
        </Link>

        <Link
          to="/admin/wallet"
          className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded"
        >
          <Wallet size={20} />
          Wallet
        </Link>

        <Link
          to="/admin/feedbacks"
          className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded"
        >
          <MessageSquare size={20} />
          Feedbacks
        </Link>

        {/* ✅ Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 mt-auto hover:bg-gray-100 p-2 rounded text-red-600"
        >
          <LogOut size={20} />
          Logout
        </button>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
