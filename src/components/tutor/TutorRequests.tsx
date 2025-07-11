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
  const [selectedRequest, setSelectedRequest] = useState<RequestNotification | null>(null);
  const [scheduleTime, setScheduleTime] = useState("");
  const [submitting, setSubmitting] = useState(false);

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

  const handleApprove = async () => {

     console.log("Approve button clicked"); // Add this
    if (!selectedRequest || !scheduleTime) return;

    try {
      setSubmitting(true);
      console.log(selectedRequest._id , scheduleTime);
      
      await axiosInstance.post("/tutor/approve-request", {
        notificationId: selectedRequest._id,
        scheduledTime: scheduleTime,
      });
      setRequests((prev) => prev.filter((req) => req._id !== selectedRequest._id));
      setSelectedRequest(null);
    } catch (err) {
      console.error("Failed to approve request", err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDecline = async () => {
    if (!selectedRequest) return;

    try {
      setSubmitting(true);
      await axiosInstance.post("/tutor/decline-request", {
        requestId: selectedRequest._id,
      });
      setRequests((prev) => prev.filter((req) => req._id !== selectedRequest._id));
      setSelectedRequest(null);
    } catch (err) {
      console.error("Failed to decline request", err);
    } finally {
      setSubmitting(false);
    }
  };

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
            <div
              key={req._id}
              className="bg-gray-800 p-4 rounded-md shadow cursor-pointer hover:bg-gray-700"
              onClick={() => setSelectedRequest(req)}
            >
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

      {/* Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full space-y-4">
            <h3 className="text-lg font-bold text-cyan-400">Session Request</h3>
            <p><strong>From:</strong> {selectedRequest.senderId.name}</p>
            <p>{selectedRequest.message}</p>

            <div className="space-y-2">
              <label className="block text-sm">Schedule Time:</label>
              <input
                type="datetime-local"
                value={scheduleTime}
                onChange={(e) => setScheduleTime(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-gray-700 text-white"
              />
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={handleDecline}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-white"
                disabled={submitting}
              >
                Decline
              </button>
              <button
                onClick={handleApprove}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md text-white"
                disabled={submitting || !scheduleTime}
              >
                Approve
              </button>
            </div>
            <button
              onClick={() => setSelectedRequest(null)}
              className="text-gray-400 text-sm underline mt-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TutorRequests;
