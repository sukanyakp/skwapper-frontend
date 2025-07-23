import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store/store";
import { logout } from "../../store/slices/tutorSlice";
import { getTutorProfile } from "../../api/api";
import { Menu, X } from "lucide-react"; // For icons

const TutorNavbar = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleProfileRedirect = async () => {
    try {
      await getTutorProfile();
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const NavLinks = () => (
    <>
      <Link to="/tutor/home" className="text-gray-300 hover:text-cyan-400 transition">Home</Link>
      {!user && <Link to="/about" className="text-gray-300 hover:text-cyan-400 transition">About</Link>}
      <Link to="/tutor/courses" className="text-gray-300 hover:text-cyan-400 transition">Courses</Link>
      <Link to="/tutor/chat" className="text-gray-300 hover:text-cyan-400 transition">Chat</Link>
    </>
  );

  return (
    <nav className="w-full border-b border-gray-700 bg-black/80 backdrop-blur-md relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-cyan-400">Skwapper</h1>

        {/* Desktop */}
        <div className="hidden md:flex items-center space-x-6 text-sm">
          <NavLinks />
          {!user ? (
            <>
              <Link to="/login" className="text-gray-300 hover:text-cyan-400 transition">Login</Link>
              <Link to="/signup" className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-white transition">Get Started</Link>
            </>
          ) : (
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
          )}
        </div>

        {/* Mobile toggle button */}
        <button className="md:hidden text-gray-300" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div ref={dropdownRef} className="md:hidden px-4 pb-4 flex flex-col space-y-4 text-sm bg-black/90 border-t border-gray-700">
          <NavLinks />
          {!user ? (
            <>
              <Link to="/login" className="text-gray-300 hover:text-cyan-400 transition">Login</Link>
              <Link to="/signup" className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-white transition text-center">Get Started</Link>
            </>
          ) : (
            <>
              <button
                onClick={handleProfileRedirect}
                className="w-full text-left text-gray-300 hover:text-cyan-400"
              >
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left text-red-400 hover:text-red-500"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default TutorNavbar;
