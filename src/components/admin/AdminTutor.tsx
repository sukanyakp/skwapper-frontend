import { useEffect, useState } from "react";
// import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import AdminSidebar from "../common/AdminSidebar";
import axios from "axios";

interface Tutor {
  id: string;
  name: string;
  email: string;
  status: "Pending" | "Approved" | "Flagged" | "Blocked";
}

const AdminTutors = () => {
  const [tutors, setTutors] = useState<Tutor[]>([]);

  useEffect(() => {
    fetchTutors();
  }, []);

  const fetchTutors = async () => {
    const response = await axios.get("/api/admin/tutors"); // Your backend route
    setTutors(response.data);
  };

  const handleStatusChange = async (id: string, action: "approve" | "block" | "unblock") => {
    await axios.patch(`/api/admin/tutors/${id}/${action}`);
    fetchTutors(); // Refresh list
  };

  const getBadgeColor = (status: string) => {
    switch (status) {
      case "Pending": return "bg-yellow-100 text-yellow-700";
      case "Approved": return "bg-green-100 text-green-700";
      case "Flagged": return "bg-red-100 text-red-700";
      case "Blocked": return "bg-gray-300 text-gray-800";
      default: return "";
    }
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-6">Tutors</h2>

        <div className="overflow-x-auto rounded-lg shadow-md bg-white">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tutors.map((tutor) => (
                <tr key={tutor.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{tutor.name}</td>
                  <td className="p-4">{tutor.email}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-sm font-medium ${getBadgeColor(tutor.status)}`}>
                      {tutor.status}
                    </span>
                  </td>
                  <td className="p-4 space-x-2">
                    {tutor.status === "Pending" && (
                      <Button onClick={() => handleStatusChange(tutor.id, "approve")} className="bg-green-500 text-white hover:bg-green-600">
                        Approve
                      </Button>
                    )}
                    {(tutor.status === "Approved" || tutor.status === "Flagged") && (
                      <Button onClick={() => handleStatusChange(tutor.id, "block")} className="bg-red-500 text-white hover:bg-red-600">
                        Block
                      </Button>
                    )}
                    {tutor.status === "Blocked" && (
                      <Button onClick={() => handleStatusChange(tutor.id, "unblock")} className="bg-blue-500 text-white hover:bg-blue-600">
                        Unblock
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminTutors;
