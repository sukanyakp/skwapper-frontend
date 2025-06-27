import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/api/axios-instance";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/pagination/Pagination";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5; // limit : : : 
  const navigate = useNavigate();

  useEffect(() => {
    fetchApplications(currentPage);
  }, [currentPage]);

  const fetchApplications = async (page: number) => {
    try {
      const res = await axiosInstance.get(`/admin/tutor-applications?page=${page}&limit=${limit}`);
      setApplications(res.data.applications); // expected to be `applications`
      setTotalPages(res.data.totalPages);     // expected to be `totalPages`

      console.log(res.data.applications , 'applications');
      console.log(res.data.totalPages,'total pages');
      
      
    } catch (err) {
      console.error("Error fetching tutor applications:", err);
    }
  };

  const handleBlockToggle = async (userId: string, shouldBlock: boolean) => {
    try {
      await axiosInstance.patch(`/admin/users/${userId}/block-toggle`, {
        block: shouldBlock,
      });
      fetchApplications(currentPage);
    } catch (err) {
      console.error("Error toggling block status:", err);
    }
  };

  const getBadgeColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "";
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Tutor Applications</h2>
      <div className="overflow-x-auto rounded shadow border border-gray-200 bg-white">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {applications.length > 0 ? (
              applications.map((application) => (
                <tr
                  key={application._id}
                  className="hover:bg-gray-50 border-t"
                >
                  <td
                    className="px-6 py-4 cursor-pointer"
                    onClick={() => navigate(`/admin/tutors/${application._id}`)}
                  >
                    {application.user.name}
                  </td>
                  <td
                    className="px-6 py-4 cursor-pointer"
                    onClick={() => navigate(`/admin/tutors/${application._id}`)}
                  >
                    {application.user.email}
                  </td>
                  <td
                    className={`px-6 py-4 font-semibold ${getBadgeColor(application.status)} rounded cursor-pointer`}
                    onClick={() => navigate(`/admin/tutors/${application._id}`)}
                  >
                    {application.status}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Button
                      size="sm"
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
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center px-6 py-6 text-gray-500">
                  No tutor applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default AdminTutors;
