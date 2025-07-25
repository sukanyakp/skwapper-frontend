import { useEffect, useState } from "react";
import { toast } from "sonner";
import AdminTable from "./AdminTable";
import Pagination from "@/components/pagination/Pagination";
import { fetchAllStudents, toggleUserBlockStatus } from "../../api/adminApi";

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
  const [search ,setSearch] = useState('')
  const limit = 5;

  useEffect(() => {
    loadUsers(currentPage,search);
  }, [currentPage,search]);

  const loadUsers = async (page: number,search: string='') => {
    try {
      const data = await fetchAllStudents(page, limit ,search);
      setUsers(data.users);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error("Failed to fetch users", err);
      toast.error("Error loading users");
    }
  };

  const handleBlockToggle = async (userId: string, shouldBlock: boolean) => {
    try {
      await toggleUserBlockStatus(userId, shouldBlock);
      loadUsers(currentPage);
    } catch (err) {
      console.error("Failed to toggle block status", err);
      toast.error("Failed to update user status");
    }
  };

  const getStatusBadge = (isBlocked: boolean) =>
    isBlocked ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700";

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Students Management</h2>
      <div className="mb-4 max-w-sm">
        <input 
        type="text"
        placeholder="Search students by name or email..."
        value={search}
        onChange={(e) =>{
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
        className="w-full px-4 py-2 border rounded-md text-black"
         />

      </div>

      <AdminTable
        data={users}
        columns={[
          { header: "Name", render: (u) => u.name },
          { header: "Email", render: (u) => u.email },
          { header: "Role", render: (u) => u.role || "N/A" },
          {
            header: "Status",
            render: (u) => (
              <span
                className={`px-2 py-1 rounded text-sm font-medium ${getStatusBadge(
                  u.isBlocked ?? false
                )}`}
              >
                {u.isBlocked ? "Blocked" : "Active"}
              </span>
            ),
          },
        ]}
        showBlockButton
        onBlockToggle={handleBlockToggle}
        isBlocked={(u) => u.isBlocked ?? false}
        getId={(u) => u._id}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default AdminUsers;
