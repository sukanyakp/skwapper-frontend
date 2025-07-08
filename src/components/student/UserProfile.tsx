import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/api/axios-instance";

const UserProfile = () => {
  const [profile, setProfile] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get("/user/profile");
        console.log(res.data, 'data of user at userProfile');
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

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-12">
      <div className="max-w-2xl mx-auto bg-black/70 p-8 rounded-xl border border-gray-700 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-cyan-400">Your Profile</h2>
          <button
            onClick={() => navigate("/profile/edit")}
            className="text-sm text-cyan-400 hover:underline"
          >
            Edit Profile
          </button>
        </div>

        {/* Profile Image */}
        <div className="flex justify-center mb-6">
          <img
            src={profile.profileImage}
            alt={`${profile.name}'s profile`}
            className="w-32 h-32 rounded-full border-4 border-cyan-500 object-cover shadow-md"
          />
        </div>

        {/* Profile Details */}
        <div className="space-y-2 text-lg">
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Bio:</strong> {profile.bio}</p>
          <p><strong>Instrument:</strong> {profile.instrument}</p>
          <p><strong>Experience:</strong> {profile.experience} years</p>
          <p><strong>Location:</strong> {profile.location}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
