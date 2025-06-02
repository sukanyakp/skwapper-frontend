import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  // const handleLogout = () => {
  //   // Clear any stored token or session data here if applicable
  //   // localStorage.removeItem("token");
  //   navigate("/admin"); // redirect back to login or landing
  // };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <p className="text-gray-700 mb-6">Welcome back, Admin!</p>

        <div className="flex justify-between items-center">
          {/* Add dashboard widgets/stats/controls here */}
          {/* <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Logout
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
