// src/pages/RequestedSessions.tsx
import { useEffect, useState } from "react";
import axiosInstance from "@/api/axios-instance";
import { Link } from "react-router-dom";

interface SessionRequest {
  _id: string;
  tutorId: {
    _id: string;
    name: string;
    profileImage: string;
    title: string;
  };
  createdAt: string;
  status: "pending" | "accepted" | "rejected";
}

const RequestedSessions = () => {
  const [requests, setRequests] = useState<SessionRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axiosInstance.get("/user/session-requests");
        setRequests(res.data.requests);
      } catch (error) {
        console.error("Failed to fetch session requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  if (loading) {
    return (
      <div className="text-white text-center py-10">
        Loading your session requests...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-cyan-400 mb-6 text-center">
          Your Video Session Requests
        </h1>

        {requests.length === 0 ? (
          <p className="text-center text-gray-400">
            You haven't requested any video sessions yet.
          </p>
        ) : (
          <div className="space-y-4">
            {requests.map((req) => (
              <div
                key={req._id}
                className="bg-black/60 border border-gray-700 rounded-xl shadow-md p-5 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={req.tutorId.profileImage}
                    alt={req.tutorId.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="text-xl font-semibold text-cyan-300">
                      {req.tutorId.name}
                    </h2>
                    <p className="text-sm text-gray-400">{req.tutorId.title}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Requested on: {new Date(req.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div>
                  <span
                    className={`text-sm px-3 py-1 rounded-md ${
                      req.status === "pending"
                        ? "bg-yellow-700 text-yellow-300"
                        : req.status === "accepted"
                        ? "bg-green-700 text-green-300"
                        : "bg-red-700 text-red-300"
                    }`}
                  >
                    {req.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestedSessions;
