import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import AdminTable from "@/components/admin/AdminTable";
import Pagination from "@/components/pagination/Pagination";
import { fetchTutors, toggleTutorBlockStatus, toggleUserBlockStatus } from "../../api/adminApi";

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
  const limit = 5;
  const navigate = useNavigate();

  useEffect(() => {
    fetchApplications(currentPage);
  }, [currentPage]);

  const fetchApplications = async (page: number) => {
    try {
      const data = await fetchTutors(page, limit);
      setApplications(data.applications);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error("Error fetching tutor applications:", err);
      toast.error("Error loading tutors");
    }
  };

  const handleBlockToggle = async (userId: string, shouldBlock: boolean) => {
    try {
      console.log('handleBlockToggle l  l l     ');
      
      await toggleUserBlockStatus(userId, shouldBlock); //toggleTutorBlockStatus
      fetchApplications(currentPage);
    } catch (err) {
      console.error("Failed to toggle block status", err);
      toast.error("Failed to update tutor status");
    }
  };

  const getApplicationStatusBadge = (status: string) => {
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

  const getBlockStatusBadge = (isBlocked: boolean) =>
    isBlocked ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700";

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Tutors Management</h2>

      <AdminTable
        data={applications}
        columns={[
          {
            header: "Name",
            render: (app) => (
              <span
                className="cursor-pointer text-blue-600 hover:underline"
                onClick={() => navigate(`/admin/tutors/${app._id}`)}
              >
                {app.user.name}
              </span>
            ),
          },
          {
            header: "Email",
            render: (app) => (
              <span
                className="cursor-pointer text-blue-600 hover:underline"
                onClick={() => navigate(`/admin/tutors/${app._id}`)}
              >
                {app.user.email}
              </span>
            ),
          },
          {
            header: "Application Status",
            render: (app) => (
              <span
                className={`px-2 py-1 rounded text-sm font-semibold ${getApplicationStatusBadge(
                  app.status
                )}`}
              >
                {app.status}
              </span>
            ),
          },
          {
            header: "Block Status",
            render: (app) => (
              <span
                className={`px-2 py-1 rounded text-sm font-medium ${getBlockStatusBadge(
                  app.isBlocked ?? false
                )}`}
              >
                {app.isBlocked ? "Blocked" : "Active"}
              </span>
            ),
          },
        ]}
        showBlockButton
        onBlockToggle={(id, shouldBlock) => handleBlockToggle(id, shouldBlock)}
        getId={(app) => app.user._id}
        isBlocked={(app) => app.isBlocked ?? false}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default AdminTutors;
