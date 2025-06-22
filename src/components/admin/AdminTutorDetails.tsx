import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/api/axios-instance";

interface TutorApplication {
  _id: string;
  status: string;
  documents: string[];
  title: string;
  bio: string;
  skills: string;
  experience: string;
  user: {
    _id: string;
    name: string;
    email: string;
    profilePic?: string;
  };
}

const AdminTutorDetails = () => {
  const { applicationId } = useParams<{ applicationId: string }>();
  const navigate = useNavigate();
  const [application, setApplication] = useState<TutorApplication | null>(null);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const res = await axiosInstance.get(`/admin/tutor-applications/${applicationId}`);
        setApplication(res.data);
      } catch (err) {
        console.error("Error fetching tutor details:", err);
      }
    };
    if (applicationId) fetchApplication();
  }, [applicationId]);

  const handleApprove = async () => {
    try {
      await axiosInstance.patch(`/admin/tutor-applications/${applicationId}/review`, {
        action: "approved",
      });
      navigate("/admin/tutors"); // Redirect back to tutor list
    } catch (err) {
      console.error("Approval failed:", err);
    }
  };

  if (!application) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Tutor Application Details</h2>

      <div className="bg-white p-6 rounded-lg shadow space-y-4 text-gray-800">
        <div className="flex items-center space-x-4">
          {application.user.profilePic && (
            <img
              src={application.user.profilePic}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover border"
            />
          )}
          <div>
            <p><strong>Name:</strong> {application.user.name}</p>
            <p><strong>Email:</strong> {application.user.email}</p>
          </div>
        </div>

        <p><strong>Title:</strong> {application.title || "N/A"}</p>
        <p><strong>Bio:</strong> {application.bio || "N/A"}</p>
        <p><strong>Skills:</strong> {application.skills || "N/A"}</p>
        <p><strong>Experience:</strong> {application.experience || "N/A"} years</p>

        <div>
          <p className="font-semibold mt-4 mb-2">Uploaded Documents:</p>
          <ul className="list-disc ml-6 space-y-1">
            {application.documents.map((doc, idx) => (
              <li key={idx}>
                <a href={doc} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  Document {idx + 1}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {application.status === "pending" && (
          <Button onClick={handleApprove} className="bg-green-600 text-white mt-4">
            Approve Tutor
          </Button>
        )}
      </div>
    </div>
  );
};

export default AdminTutorDetails;
