import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import axiosInstance from "@/api/axios-instance";

const CreateProfilePage = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    bio: "",
    instrument: "",
    experience: "",
    location: "",
    image: null as File | null,
  });

  // 🔍 Redirect if profile already exists
  // useEffect(() => {
  //   const checkExistingProfile = async () => {
  //     try {
  //       const res = await axiosInstance.get("/user/profile");
  //       if (res.data) {
  //         navigate("/profile"); // If profile exists
  //       }
  //     } catch (err) {
  //       console.log("No profile found, continuing to creation form.");
  //     }
  //   };
  //   checkExistingProfile();
  // }, []);

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
      console.log('payload',payload);
      

      const res = await axiosInstance.post("/user/profile", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Profile submitted:", res.data);
      navigate("/profile");
    } catch (err) {
      console.error("Profile creation failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-12 flex items-center justify-center">
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

        {/* Instrument */}
        <div className="mb-4">
          <label className="block text-sm mb-1">Instrument</label>
          <select
            name="instrument"
            value={formData.instrument}
            required 
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 text-white"
          >
            <option value="">Select an instrument</option>
            <option value="Guitar">Guitar</option>
            <option value="Piano">Piano</option>
            <option value="Drums">Drums</option>
            <option value="Violin">Violin</option>
            <option value="Vocals">Vocals</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Experience */}
        <div className="mb-4">
          <label className="block text-sm mb-1">Experience (in years)</label>
          <input
            name="experience"
            onChange={handleChange}
            type="number"
            min="0"
            className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 text-white"
          />
        </div>

        {/* Location */}
        <div className="mb-4">
          <label className="block text-sm mb-1">Location</label>
          <input
            name="location"
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 text-white"
          />
        </div>

        {/* Image Upload */}
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

export default CreateProfilePage;
