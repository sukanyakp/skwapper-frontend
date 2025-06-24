import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import axiosInstance from "@/api/axios-instance";

const CreateStudentProfile = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  const [availableInstruments, setAvailableInstruments] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    bio: "",
    instrument: "",
    experience: "",
    location: "",
    image: null as File | null,
  });

  useEffect(() => {
    const fetchInstruments = async () => {
      try {
        const res = await axiosInstance.get("/courses");
        const courses = res.data as { category: string }[];
        const uniqueCategorys = [...new Set(courses.map((course) => course.category))];
        setAvailableInstruments(uniqueCategorys);
      } catch (err) {
        console.error("Failed to fetch instruments:", err);
      }
    };

    fetchInstruments();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, image: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("bio", formData.bio);
      payload.append("instrument", formData.instrument);
      payload.append("experience", formData.experience);
      payload.append("location", formData.location);
      if (formData.image) {
        payload.append("image", formData.image);
      }

      const res = await axiosInstance.post("/user/profile", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Student profile created:", res.data);
      navigate("/profile");
    } catch (err) {
      console.error("Failed to create student profile:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-black/70 p-8 rounded-xl max-w-xl w-full border border-gray-700 shadow-xl"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-cyan-400">
          Create Your Profile
        </h2>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm mb-1">Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 text-white"
          />
        </div>

        {/* Bio */}
        <div className="mb-4">
          <label className="block text-sm mb-1">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows={3}
            placeholder="Tell us a bit about yourself..."
            className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 text-white"
          />
        </div>

        {/* Instrument (Dynamic Single-Select) */}
        <div className="mb-4">
          <label className="block text-sm mb-1">Instrument</label>
          <select
            name="instrument"
            value={formData.instrument}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 text-white"
          >
            <option value="">Select an instrument</option>
            {availableInstruments.map((category, idx) => (
              <option key={idx} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Experience */}
        <div className="mb-4">
          <label className="block text-sm mb-1">Experience (in years)</label>
          <input
            name="experience"
            type="number"
            min="0"
            value={formData.experience}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 text-white"
          />
        </div>

        {/* Location */}
        <div className="mb-4">
          <label className="block text-sm mb-1">Location</label>
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 text-white"
          />
        </div>

        {/* Profile Picture */}
        <div className="mb-6">
          <label className="block text-sm mb-1">Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full text-white"
          />
          {formData.image && (
            <img
              src={URL.createObjectURL(formData.image)}
              alt="Preview"
              className="w-20 h-20 rounded-full mt-2 object-cover"
            />
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-cyan-600 hover:bg-cyan-700 py-2 rounded-md text-white font-semibold transition"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default CreateStudentProfile;
