
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-6xl font-bold text-cyan-400 mb-4">404</h1>
      <p className="text-xl mb-2">Oops! The page you're looking for doesn't exist.</p>
      <p className="text-sm text-gray-400 mb-6">It might have been moved or deleted.</p>
      <Link
        to="/"
        className="bg-cyan-600 hover:bg-cyan-700 text-white px-5 py-2 rounded-md font-medium transition"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
