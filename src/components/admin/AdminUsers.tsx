import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/api/axios-instance";
import Pagination from "@/components/pagination/Pagination";

interface User {
  _id: string;
  name: string;
  email: string;
  isBlocked?: boolean;
  role?: string;
}

const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const fetchUsers = async (page: number) => {
    try {
      const res = await axiosInstance.get(`/admin/users?page=${page}&limit=${limit}`);
      setUsers(res.data.users);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
  };

  const handleBlockToggle = async (userId: string, shouldBlock: boolean) => {
    try {
      await axiosInstance.patch(`/admin/users/${userId}/block-toggle`, {
        block: shouldBlock,
      });
      fetchUsers(currentPage);
    } catch (err) {
      console.error("Failed to toggle block status", err);
    }
  };

  const getStatusBadge = (isBlocked: boolean) =>
    isBlocked
      ? "bg-red-100 text-red-700"
      : "bg-green-100 text-green-700";

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">All Users</h2>
      <div className="overflow-x-auto rounded shadow border border-gray-200 bg-white">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50 border-t">
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4 capitalize">{user.role || "N/A"}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded text-sm font-medium ${getStatusBadge(user.isBlocked ?? false)}`}
                    >
                      {user.isBlocked ? "Blocked" : "Active"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Button
                      size="sm"
                      onClick={() => handleBlockToggle(user._id, !user.isBlocked)}
                      className={
                        user.isBlocked
                          ? "bg-yellow-500 hover:bg-yellow-600"
                          : "bg-red-600 hover:bg-red-700"
                      }
                    >
                      {user.isBlocked ? "Unblock" : "Block"}
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center px-6 py-6 text-gray-500">
                  No users found.
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

export default AdminUsers;
