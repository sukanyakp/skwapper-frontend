import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import axiosInstance from "../../api/axios-instance"; 

const TutorNavbar = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  console.log(user , 'user at navbar');
  
  const navigate = useNavigate();


// Inside the Navbar component
const handleProfileRedirect = async () => {  // THIS is the main cause of profile Redirect 
  try {
    const res = await axiosInstance.get("/tutor/profile");
    // Assuming success means profile exists
    navigate("/tutor/profile"); // or wherever you want to show existing profile
  } catch (err: any) {
    if (err.response?.status === 404) {
      // No profile exists
      navigate("/tutor/create-profile");
    } else {
      console.error("Error checking profile:", err);
      // Optional: show an error message or redirect to login
    }
  }
};


  return (
    <nav className="flex justify-between items-center px-6 py-4 border-b border-gray-700 bg-black/80 backdrop-blur-md">
      {/* Logo */}
      <h1 className="text-2xl font-bold text-cyan-400">Skwapper</h1>

      {/* Navigation Links */}
      <div className="flex items-center space-x-6 text-sm">
        <Link to="/" className="text-gray-300 hover:text-cyan-400 transition">
          Home
        </Link>

        {!user && (
          <Link to="/about" className="text-gray-300 hover:text-cyan-400 transition">
            About
          </Link>
        )}

        <Link to="/courses" className="text-gray-300 hover:text-cyan-400 transition">
          Courses
        </Link>
        <Link to="/tutors" className="text-gray-300 hover:text-cyan-400 transition">
          Tutors
        </Link>
        <Link to="/chat" className="text-gray-300 hover:text-cyan-400 transition">
          Chat
        </Link>

        {!user && (
          <Link to="/login" className="text-gray-300 hover:text-cyan-400 transition">
            Login
          </Link>
        )}

        {user ? (
          <button
            onClick={handleProfileRedirect}
            className="w-9 h-9 rounded-full bg-cyan-600 text-white font-semibold flex items-center justify-center hover:bg-cyan-700 transition"
            title="Go to Profile"
          >
            {user.name?.charAt(0).toUpperCase()}
          </button>
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
