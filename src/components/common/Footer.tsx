import { FaInstagram, FaYoutube, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#1a1d21] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Left Section - Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Skwapper</h2>
          <p className="text-sm text-gray-400 mb-4">
            Learn music and dance from expert tutors across the world. Skwapper helps you discover your rhythm and unlock your creative potential.
          </p>
          <div className="flex gap-3">
            <a href="#" className="bg-gray-800 p-2 rounded hover:bg-gray-700 transition">
              <FaInstagram className="text-white text-lg" />
            </a>
            <a href="#" className="bg-gray-800 p-2 rounded hover:bg-gray-700 transition">
              <FaYoutube className="text-white text-lg" />
            </a>
            <a href="#" className="bg-gray-800 p-2 rounded hover:bg-gray-700 transition">
              <FaLinkedinIn className="text-white text-lg" />
            </a>
          </div>
        </div>

        {/* Top Courses */}
        <div>
          <h4 className="text-sm font-semibold uppercase mb-4">Popular Courses</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>Piano for Beginners</li>
            <li>Hip-Hop Dance</li>
            <li>Guitar Essentials</li>
            <li>Classical Vocals</li>
          </ul>
        </div>

        {/* Platform Links */}
        <div>
          <h4 className="text-sm font-semibold uppercase mb-4">Platform</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>About</li>
            <li>Find a Tutor</li>
            <li>Become a Tutor</li>
            <li>Contact Us</li>
          </ul>
        </div>

        {/* Help & Legal */}
        <div>
          <h4 className="text-sm font-semibold uppercase mb-4">Support</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>Help Center</li>
            <li>FAQs</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
      </div>

      {/* Bottom line */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Skwapper. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
