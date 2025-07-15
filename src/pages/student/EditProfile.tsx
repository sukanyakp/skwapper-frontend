import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import axiosInstance from "@/api/axios-instance";
import { profileSchema } from "@/validations/student/createProfile";
import z from "zod";
import { toast } from "sonner";

type FormData = z.infer<typeof profileSchema>;

const EditStudentProfile = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  const [availableInstruments, setAvailableInstruments] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    bio: "",
    instrument: "",
    location: "",
    image: new File([], ""),
  });

  // Fetch existing profile and instrument list
  useEffect(() => {
    const fetchData = async () => {
      try {
        const instrumentRes = await axiosInstance.get("/courses");
        const courses = instrumentRes.data.courses as { category: string }[];
        const uniqueCategories = [...new Set(courses.map((course) => course.category))];
        setAvailableInstruments(uniqueCategories);

        const profileRes = await axiosInstance.get("/user/profile");
        const profile = profileRes.data;

        setFormData({
          name: profile.name || "",
          bio: profile.bio || "",
          instrument: profile.instrument || "",
          location: profile.location || "",
          image: new File([], ""), // empty initially
        });
      } catch (error) {
        console.error("Error fetching profile or instruments:", error);
        toast.error("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
      profileSchema.parse(formData);

      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("bio", formData.bio);
      payload.append("instrument", formData.instrument);
      payload.append("location", formData.location);
      if (formData.image && formData.image.size > 0) {
        payload.append("image", formData.image);
      }

      const res = await axiosInstance.put("/user/profile", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Profile updated successfully");
      navigate("/profile");
    } catch (err) {
      if (err instanceof z.ZodError) {
        toast.error(err.errors[0]?.message);
      } else {
        console.error("Profile update failed:", err);
        toast.error("Something went wrong while updating profile.");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-black/70 p-8 rounded-xl max-w-xl w-full border border-gray-700 shadow-xl"
        noValidate
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-cyan-400">Edit Your Profile</h2>

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
            className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 text-white"
          />
        </div>

        {/* Instrument */}
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
            {availableInstruments.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>
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

        {/* Profile Image */}
        <div className="mb-6">
          <label className="block text-sm mb-1">Change Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full text-white"
          />
          {formData.image instanceof File && formData.image.size > 0 && (
            <img
              src={URL.createObjectURL(formData.image)}
              alt="Preview"
              className="w-20 h-20 rounded-full mt-2 object-cover"
            />
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-cyan-600 hover:bg-cyan-700 py-2 rounded-md text-white font-semibold transition"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default EditStudentProfile;
