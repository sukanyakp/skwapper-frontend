import { Link } from "react-router-dom";

 export const ActionButton = ({ text, to }: { text: string; to: string }) => (
  <Link to={to}>
    <button  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-blue-600 hover:to-cyan-500 text-white px-5 py-3 rounded-xl shadow-md text-sm transition-transform transform hover:scale-105">
      {text}
    </button>
  </Link>
);
