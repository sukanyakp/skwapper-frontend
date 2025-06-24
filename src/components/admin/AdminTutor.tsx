import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/api/axios-instance";
import { useNavigate } from "react-router-dom";

interface TutorApplication {
  _id: string;
  status: "pending" | "approved" | "rejected";
  isBlocked?: boolean;
  user: {
    _id: string;
    name: string;
    email: string;
  
  };
}

const AdminTutors = () => {
  const [applications, setApplications] = useState<TutorApplication[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      console.log( 'fetch all details .. ');
      const response = await axiosInstance.get("/admin/tutor-applications");
      
      setApplications(response.data);
    } catch (err) {
      console.error("Error fetching tutor applications:", err);
    }
  };

  const handleBlockToggle = async (userId: string, shouldBlock: boolean) => {
    try {
      await axiosInstance.patch(`/admin/users/${userId}/block-toggle`, {
        block: shouldBlock,
      });
      fetchApplications();
    } catch (err) {
      console.error("Error toggling block status:", err);
    }
  };

  const getBadgeColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "approved":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "";
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Tutor Applications</h2>
      <table className="min-w-full table-auto bg-white rounded shadow">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-4">Name</th>
            <th className="p-4">Email</th>
            <th className="p-4">Status</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application) => (
            <tr key={application._id} className="border-b hover:bg-gray-50">
              <td
                className="p-4 cursor-pointer hover:bg-gray-100 transition"
                onClick={() => navigate(`/admin/tutors/${application._id}`)}
              >
                {application.user.name}
              </td>
              <td
                className="p-4 cursor-pointer hover:bg-gray-100 transition"
                onClick={() => navigate(`/admin/tutors/${application._id}`)}
              >
                {application.user.email}
              </td>
              <td
                className={`p-4 ${getBadgeColor(application.status)} cursor-pointer hover:opacity-90 transition`}
                onClick={() => navigate(`/admin/tutors/${application._id}`)}
              >
                {application.status}
              </td>
              <td className="p-4">
                <Button
                  onClick={() =>
                    handleBlockToggle(application.user._id, !application.isBlocked)
                  }
                  className={
                    application.isBlocked
                      ? "bg-yellow-500 hover:bg-yellow-600"
                      : "bg-red-600 hover:bg-red-700"
                  }
                >
                  {application.isBlocked ? "Unblock" : "Block"}
                </Button>
              </td>
            </tr>
          ))}
          {applications.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center py-6 text-gray-500">
                No tutor applications found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTutors;
