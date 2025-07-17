import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store/store";
import { logout } from "../../store/slices/tutorSlice";
import { getTutorProfile } from "../../api/api"; 

const TutorNavbar = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleProfileRedirect = async () => {
    try {
      await getTutorProfile(); // Use API
      navigate("/tutor/profile");
    } catch (err: any) {
      if (err.response?.status === 404) {
        navigate("/tutor/create-profile");
      } else {
        console.error("Error checking profile:", err);
      }
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 border-b border-gray-700 bg-black/80 backdrop-blur-md">
      <h1 className="text-2xl font-bold text-cyan-400">Skwapper</h1>

      <div className="flex items-center space-x-6 text-sm">
        <Link to="/tutor/home" className="text-gray-300 hover:text-cyan-400 transition">
          Home
        </Link>

        {!user && (
          <Link to="/about" className="text-gray-300 hover:text-cyan-400 transition">
            About
          </Link>
        )}

        <Link to="/tutor/courses" className="text-gray-300 hover:text-cyan-400 transition">
          Courses
        </Link>

        <Link to="/tutor/chat" className="text-gray-300 hover:text-cyan-400 transition">
          Chat
        </Link>

        {!user && (
          <Link to="/login" className="text-gray-300 hover:text-cyan-400 transition">
            Login
          </Link>
        )}

        {user ? (
          <>
            <button
              onClick={handleProfileRedirect}
              className="w-9 h-9 rounded-full bg-cyan-600 text-white font-semibold flex items-center justify-center hover:bg-cyan-700 transition"
              title="Go to Profile"
            >
              {user.name?.charAt(0).toUpperCase()}
            </button>
            <button
              onClick={handleLogout}
              className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 rounded transition"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/signup"
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-white transition"
          >
            Get Started
          </Link>
        )}
      </div>
    </nav>
  );
};

export default TutorNavbar;
