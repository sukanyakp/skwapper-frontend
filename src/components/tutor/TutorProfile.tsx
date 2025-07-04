import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/api/axios-instance";

const UserProfile = () => {
  const [profile, setProfile] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get("/tutor/profile");
        console.log(res.data, "data of user at userProfile");
        setProfile(res.data);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p>Loading profile...</p>
      </div>
    );
  }

  const skills =
    typeof profile.skills === "string"
      ? profile.skills.split(",").map((s: string) => s.trim())
      : profile.skills;

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-12">
      <div className="max-w-2xl mx-auto bg-black/70 p-8 rounded-xl border border-gray-700 shadow-lg">
        <h2 className="text-2xl font-bold text-cyan-400 mb-6 text-center">
          Your Profile
        </h2>

        {/* Profile Image */}
        <div className="flex justify-center mb-6">
          <img
            src={profile.profileImage}
            alt={`${profile.name}'s profile`}
            className="w-32 h-32 rounded-full border-4 border-cyan-500 object-cover shadow-md"
          />
        </div>

        {/* Profile Details */}
        <div className="space-y-4 text-lg">
          <p>
            <strong>Name:</strong> {profile.name}
          </p>
          <p>
            <strong>Bio:</strong> {profile.bio}
          </p>
          <div>
            <p className="font-semibold">Skills:</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {skills?.map((skill: string, idx: number) => (
                <span
                  key={idx}
                  className="bg-cyan-700/20 text-cyan-300 border border-cyan-600 px-3 py-1 text-sm rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <p>
            <strong>Experience:</strong> {profile.experience} years
          </p>
          <p>
            <strong>Location:</strong> {profile.location}
          </p>
          <p>
            <strong>Hourly Rate:</strong> ₹{profile.hourlyRate}
          </p>
        </div>

        {/* Edit Button */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate("/tutor/profile/edit")}
            className="bg-cyan-600 hover:bg-cyan-700 px-6 py-2 rounded-md font-semibold text-white transition"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
