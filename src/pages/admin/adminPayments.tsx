import { useEffect, useState } from "react";
import axiosInstance from "@/api/axios-instance";
import Pagination from "@/components/pagination/Pagination";

interface Payment {
  _id: string;
  student: {
    name: string;
  };
  tutorProfile: {
    name: string;
  };
  amount: number;
  status: "pending" | "succeeded" | "failed";
  requestStatus: "pending" | "confirmed" | "completed" | "cancelled";
  paymentDate: string;
  sessionTime: string;
}

const Payments = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;

  const fetchPayments = async (page: number) => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/payments?page=${page}&limit=${limit}`);
      setPayments(res.data.payments);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error("Failed to fetch payments", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments(currentPage);
  }, [currentPage]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Session Payments</h2>
      <div className="bg-white shadow rounded overflow-x-auto">
        {loading ? (
          <p className="p-4 text-gray-500">Loading payments...</p>
        ) : payments.length === 0 ? (
          <p className="p-4 text-gray-500">No payments yet.</p>
        ) : (
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="p-3">Student</th>
                <th className="p-3">Tutor</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Session Date</th>
                <th className="p-3">Time</th>
                <th className="p-3">Payment Status</th>
                <th className="p-3">Request Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p._id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{p.student.name}</td>
                  <td className="p-3">{p.tutorProfile.name}</td>
                  <td className="p-3">₹{p.amount}</td>
                  <td className="p-3">{p.paymentDate}</td>
                  <td className="p-3">{p.sessionTime}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        p.status === "succeeded"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        p.requestStatus === "confirmed"
                          ? "bg-blue-100 text-blue-700"
                          : p.requestStatus === "completed"
                          ? "bg-green-100 text-green-700"
                          : p.requestStatus === "cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {p.requestStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Payments;
