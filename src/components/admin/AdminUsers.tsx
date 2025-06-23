import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/api/axios-instance";

interface User {
  _id: string;
  name: string;
  email: string;
  isBlocked?: boolean;
  role?: string; // optional, if you use roles like "student", "tutor", "admin"
}

const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axiosInstance.get("/admin/users");
      setUsers(res.data);
      console.log(res.data , 'response of users');
      
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
  };

  const handleBlockToggle = async (userId: string, shouldBlock: boolean) => {
    try {
      await axiosInstance.patch(`/admin/users/${userId}/block-toggle`, {
        block: shouldBlock,
      });
      fetchUsers();
    } catch (err) {
      console.error("Failed to toggle block status", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Users</h2>
      <table className="min-w-full bg-white rounded shadow">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-4">Name</th>
            <th className="p-4">Email</th>
            <th className="p-4">Role</th>
            <th className="p-4">Status</th>
            <th className="p-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-6 text-gray-500">
                No users found.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user._id} className="border-b hover:bg-gray-50">
                <td className="p-4">{user.name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4 capitalize">{user.role || "N/A"}</td>
                <td className="p-4">
                  {user.isBlocked ? (
                    <span className="text-red-600">Blocked</span>
                  ) : (
                    <span className="text-green-600">Active</span>
                  )}
                </td>
                <td className="p-4">
                  <Button
                    onClick={() => handleBlockToggle(user._id, !user.isBlocked)}
                    className={user.isBlocked ? "bg-yellow-500" : "bg-red-500"}
                  >
                    {user.isBlocked ? "Unblock" : "Block"}
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;
