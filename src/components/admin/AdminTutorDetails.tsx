import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { BadgeCheck, FileText, UserCircle } from "lucide-react";
import { fetchTutorApplicationById, approveTutorApplication } from "../../api/adminApi";

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
        if (applicationId) {
          const data = await fetchTutorApplicationById(applicationId);
          setApplication(data);
        }
      } catch (err) {
        console.error("Error fetching tutor details:", err);
      }
    };
    fetchApplication();
  }, [applicationId]);

  const handleApprove = async () => {
    try {
      if (applicationId) {
        await approveTutorApplication(applicationId);
        navigate("/admin/tutors");
      }
    } catch (err) {
      console.error("Approval failed:", err);
    }
  };

  if (!application) {
    return <div className="p-6 text-center text-gray-500">Loading tutor application...</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white shadow-xl rounded-2xl p-8 space-y-6 border border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-800">Tutor Application</h2>
          <span
            className={`text-sm px-3 py-1 rounded-full font-medium ${
              application.status === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-green-100 text-green-700"
            }`}
          >
            {application.status.toUpperCase()}
          </span>
        </div>

        <div className="flex items-center gap-4">
          {application.user.profilePic ? (
            <img
              src={application.user.profilePic}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border-2"
            />
          ) : (
            <UserCircle className="w-20 h-20 text-gray-300" />
          )}
          <div>
            <p className="text-lg font-semibold">{application.user.name}</p>
            <p className="text-gray-600 text-sm">{application.user.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
          <div>
            <p className="font-semibold text-gray-900">Title:</p>
            <p>{application.title || "N/A"}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-900">Experience:</p>
            <p>{application.experience || "N/A"} years</p>
          </div>
          <div>
            <p className="font-semibold text-gray-900">Skills:</p>
            <p>{application.skills || "N/A"}</p>
          </div>
          <div className="md:col-span-2">
            <p className="font-semibold text-gray-900">Bio:</p>
            <p>{application.bio || "N/A"}</p>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-2">Uploaded Documents:</h4>
          {application.documents.length > 0 ? (
            <ul className="space-y-2">
              {application.documents.map((doc, idx) => (
                <li key={idx} className="flex items-center space-x-2">
                  <FileText className="text-blue-600" size={18} />
                  <a
                    href={doc}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View Document {idx + 1}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No documents uploaded.</p>
          )}
        </div>

        {application.status === "pending" && (
          <div className="pt-4 text-right">
            <Button
              onClick={handleApprove}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-2 rounded-xl shadow"
            >
              <BadgeCheck size={18} className="mr-2" />
              Approve Tutor
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTutorDetails;
