import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { registerTutor, checkTutorStatus } from "@/api/tutorApi";
import { getAllCourseCategories } from "../../api/api";

const TutorSignup = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availableSkills, setAvailableSkills] = useState<string[]>([]);
  const navigate = useNavigate();

  const [category, setCategory] = useState("");
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const categories = await getAllCourseCategories(); // ✅ replaced
        setAvailableSkills(categories);
      } catch (error) {
        console.error("Failed to fetch skills", error);
      }
    };
    fetchSkills();
  }, []);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await checkTutorStatus();
        if (res?.data?.hasApplied && !res.data.approved) {
          navigate("/pending-approval", { replace: true });
        }
      } catch (error) {
        console.error("Failed to check tutor status", error);
      }
    };
    fetchStatus();
  }, [navigate]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!files?.length || !category || !bio || !skills || !experience) {
      setMessage("Please complete all fields and upload documents.");
      return;
    }

    try {
      setIsSubmitting(true);

      const statusRes = await checkTutorStatus();
      if (statusRes?.data?.hasApplied) {
        navigate("/pending-approval", { replace: true });
        return;
      }

      const formData = new FormData();
      Array.from(files).forEach((file) => formData.append("documents", file));
      formData.append("category", category);
      formData.append("bio", bio);
      formData.append("skills", skills);
      formData.append("experience", experience);

      const res = await registerTutor(formData);

      if (res?.status === 201) {
        navigate("/pending-approval");
      } else {
        setMessage("Failed to submit. Please try again later.");
      }
    } catch (err: any) {
      if (err.response?.status === 409) {
        navigate("/pending-approval", { replace: true });
      } else if (err.response) {
        setMessage(err.response.data?.message || "Submission failed.");
      } else {
        setMessage("Network error. Please try again later.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-black text-white px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-lg w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-bold mb-2">Become a Tutor</h2>
        <p className="text-sm text-gray-400">
          Upload your credentials and information for admin approval.
        </p>

        <input
          type="text"
          placeholder="Category (e.g. Piano Tutor)"
          className="w-full p-2 rounded text-white"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <textarea
          placeholder="Bio"
          className="w-full p-2 rounded text-white"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />

        <select
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          className="w-full p-2 rounded text-white"
          required
        >
          <option value="">Select a skill</option>
          {availableSkills.map((skill) => (
            <option key={skill} value={skill}>
              {skill}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Years of Experience"
          className="w-full p-2 rounded text-white"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        />

        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="text-sm"
        />

        {message && <p className="text-xs text-cyan-400 mt-2">{message}</p>}

        <button
          type="submit"
          className="bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded w-full disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Documents"}
        </button>
      </form>
    </div>
  );
};

export default TutorSignup;
