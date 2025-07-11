import { useEffect, useState } from "react";
import { getScheduledSessions } from "@/api/scheduledSessionApi"; 


interface ScheduledSession {
  _id: string;
  tutorId: {
    name: string;
    email: string;
  };
  studentId: {
    name: string;
    email: string;
  };
  status: string;
  duration: number;
  scheduledTime: string;
}

const ScheduledSessions = () => {
  const [sessions, setSessions] = useState<ScheduledSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const data = await getScheduledSessions(); // invoking the function;
        setSessions(data);
        console.log(data);
      } catch (err) {
        console.error("Failed to load scheduled sessions", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-10">
      <h1 className="text-3xl font-bold text-cyan-400 mb-6 text-center">
        Scheduled Sessions
      </h1>

      {loading ? (
        <p className="text-center text-gray-400">Loading...</p>
      ) : sessions.length === 0 ? (
        <p className="text-center text-gray-400">No scheduled sessions found.</p>
      ) : (
        <div className="space-y-4 max-w-3xl mx-auto">
          {sessions.map((session) => (
            <div key={session._id} className="bg-gray-800 p-4 rounded-md shadow-md">
              <p className="text-cyan-300 font-semibold">
                Student: {session.studentId.name}
              </p>
              <p className="text-gray-400">
                Scheduled Time: {new Date(session.scheduledTime).toLocaleString()}
              </p>
              <p className="text-gray-400">Duration: {session.duration} mins</p>
              <p
                className={`text-sm mt-2 font-medium ${
                  session.status === "completed"
                    ? "text-green-400"
                    : "text-yellow-400"
                }`}
              >
                Status: {session.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ScheduledSessions;
