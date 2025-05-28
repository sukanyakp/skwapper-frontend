import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-6 py-4 border-b border-gray-700 bg-black/80 backdrop-blur-md">
      {/* Logo */}
      <h1 className="text-2xl font-bold text-cyan-400">Skwapper</h1>

      {/* Navigation Links */}
      <div className="flex items-center space-x-6 text-sm">
        <Link to="/" className="text-gray-300 hover:text-cyan-400 transition">
          Home
        </Link>
        <Link to="/about" className="text-gray-300 hover:text-cyan-400 transition">
          About
        </Link>
        <Link to="/courses" className="text-gray-300 hover:text-cyan-400 transition">
          Courses
        </Link>
        <Link to="/tutors" className="text-gray-300 hover:text-cyan-400 transition">
          Tutors
        </Link>
        <Link to="/chat" className="text-gray-300 hover:text-cyan-400 transition">
          Chat
        </Link>
        <Link to="/login" className="text-gray-300 hover:text-cyan-400 transition">
          Login
        </Link>
        <Link
          to="/signup"
          className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-white transition"
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
