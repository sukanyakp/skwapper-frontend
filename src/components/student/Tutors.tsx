// Updated Tutors.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "@/api/axios-instance";

interface Tutor {
  _id: string;
  name: string;
  title: string;
  bio: string;
  skills: string;
  experience: number;
  profileImage: string;
}

const Tutors = () => {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const res = await axiosInstance.get("/user/tutors");
        setTutors(res.data);
      } catch (error) {
        console.error("Failed to fetch tutors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTutors();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-10">
      <h1 className="text-3xl font-bold text-cyan-400 mb-6 text-center">Meet Our Tutors</h1>

      {loading ? (
        <p className="text-center text-gray-400">Loading tutors...</p>
      ) : tutors.length === 0 ? (
        <p className="text-center text-gray-400">No tutors found.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {tutors.map((tutor) => (
            <Link to={`/tutors/${tutor._id}`} key={tutor._id}>
              <div className="bg-black/60 border border-gray-700 rounded-xl shadow-md p-4 hover:shadow-cyan-500/30 transition cursor-pointer">
                <img
                  src={tutor.profileImage}
                  alt={tutor.name}
                  className="w-32 h-32 object-cover rounded-full mx-auto mb-3"
                />
                <h2 className="text-xl font-semibold text-cyan-300 text-center">{tutor.name}</h2>
                <p className="text-sm text-gray-400 text-center italic">{tutor.title}</p>
                <p className="text-sm text-gray-300 mt-2">{tutor.bio}</p>
                <p className="text-sm mt-2"><strong>Skills:</strong> {tutor.skills}</p>
                <p className="text-sm"><strong>Experience:</strong> {tutor.experience} years</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tutors;
