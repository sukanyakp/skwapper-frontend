import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store/store";
import { logout } from "@/store/slices/userSlice";
import { getUserProfile } from "../../api/api";

const Navbar = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleProfileRedirect = async () => {
    try {
      const res = await getUserProfile(); // API module
      if (res?.data) {
        navigate("/profile");
      }
    } catch (err: any) {
      if (err.response?.status === 404) {
        navigate("/create-profile");
      } else {
        console.error("Error checking profile:", err);
      }
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="flex justify-between items-center px-6 py-4 border-b border-gray-700 bg-black/80 backdrop-blur-md relative">
      <h1 className="text-2xl font-bold text-cyan-400">Skwapper</h1>

      <div className="flex items-center space-x-6 text-sm">
        <Link to="/" className="text-gray-300 hover:text-cyan-400 transition">Home</Link>
        {!user && <Link to="/about" className="text-gray-300 hover:text-cyan-400 transition">About</Link>}
        <Link to="/courses" className="text-gray-300 hover:text-cyan-400 transition">Courses</Link>
        <Link to="/tutors" className="text-gray-300 hover:text-cyan-400 transition">Tutors</Link>
        <Link to="/chat" className="text-gray-300 hover:text-cyan-400 transition">Chat</Link>

        {!user ? (
          <>
            <Link to="/login" className="text-gray-300 hover:text-cyan-400 transition">Login</Link>
            <Link
              to="/signup"
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-white transition"
            >
              Get Started
            </Link>
          </>
        ) : (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-9 h-9 rounded-full bg-cyan-600 text-white font-semibold flex items-center justify-center hover:bg-cyan-700 transition"
              title="Profile Menu"
            >
              {user.name?.charAt(0).toUpperCase()}
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10 text-sm text-gray-800">
                <button
                  onClick={handleProfileRedirect}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                >
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
