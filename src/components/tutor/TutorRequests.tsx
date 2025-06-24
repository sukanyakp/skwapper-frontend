import { useEffect, useState } from "react";
import axiosInstance from "@/api/axios-instance";

interface Student {
  _id: string;
  name: string;
  email: string;
}

interface RequestNotification {
  _id: string;
  senderId: Student;
  message: string;
  createdAt: string;
}

const TutorRequests = () => {
  const [requests, setRequests] = useState<RequestNotification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axiosInstance.get("/tutor/requests");
        setRequests(res.data);
      } catch (err) {
        console.error("Failed to load requests", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-10">
      <h1 className="text-3xl font-bold text-cyan-400 mb-6 text-center">Session Requests</h1>

      {loading ? (
        <p className="text-center text-gray-400">Loading...</p>
      ) : requests.length === 0 ? (
        <p className="text-center text-gray-400">No session requests received.</p>
      ) : (
        <div className="space-y-4 max-w-3xl mx-auto">
          {requests.map((req) => (
            <div key={req._id} className="bg-gray-800 p-4 rounded-md shadow">
              <p className="text-cyan-300 font-semibold">{req.senderId.name}</p>
              <p className="text-gray-300 text-sm">{req.senderId.email}</p>
              <p className="text-gray-400 mt-1">{req.message}</p>
              <p className="text-gray-500 text-xs mt-2">
                {new Date(req.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TutorRequests;
