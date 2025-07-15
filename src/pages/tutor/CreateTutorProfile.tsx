import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import axiosInstance from "@/api/axios-instance";
import { profileSchema } from "@/validations/tutor/createProfile";
import z from "zod";
import { toast } from "sonner";

// FormData Type
type FormData = z.infer<typeof profileSchema>;

const CreateTutorProfile = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  const [availableSkills, setAvailableSkills] = useState<string[]>([]);

  const [formData, setFormData] = useState<FormData>({
    name: user?.name || "",
    bio: "",
    category: "",
    skills: [],
    experience: "",
    location: "",
    image: new File([], ""),
  });

  useEffect(() => {
const fetchSkills = async () => {
  try {
    const res = await axiosInstance.get("/courses");
    const courses = res.data.courses as { category: string }[];

    const uniqueSkills = [...new Set(courses.map((course) => course.category))];
    setAvailableSkills(uniqueSkills);
  } catch (err) {
    console.error("Failed to fetch skills:", err);
  }
};


    fetchSkills();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      skills: checked
        ? [...prev.skills, value]
        : prev.skills.filter((skill) => skill !== value),
    }));
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
      payload.append("category", formData.category);
      payload.append("experience", formData.experience);
      payload.append("location", formData.location);
      formData.skills.forEach((skill) => payload.append("skills", skill));
      if (formData.image) {
        payload.append("image", formData.image);
      }

      await axiosInstance.post("/tutor/profile", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/tutor/home");
    } catch (err) {
      if (err instanceof z.ZodError) {
        toast.error(err.errors[0]?.message);
      } else {
        toast.error("Something went wrong while creating profile.");
        console.error(err);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-black/70 p-8 rounded-xl max-w-xl w-full border border-gray-700 shadow-xl"
        noValidate
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-cyan-400">Create Tutor Profile</h2>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm mb-1">Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
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

        {/* Category */}
        <div className="mb-4">
          <label className="block text-sm mb-1">Category</label>
          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 text-white"
          />
        </div>

        {/* Skills Multi-Select */}
        <div className="mb-4">
          <label className="block text-sm mb-1">Skills</label>
          <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto p-2 border border-gray-600 rounded-md bg-gray-800">
            {availableSkills.map((skill, idx) => (
              <label key={idx} className="flex items-center text-sm space-x-2">
                <input
                  type="checkbox"
                  value={skill}
                  checked={formData.skills.includes(skill)}
                  onChange={handleSkillsChange}
                  className="accent-cyan-600"
                />
                <span>{skill}</span>
              </label>
            ))}
          </div>
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
          {formData.image instanceof File && formData.image.size > 0 && (
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

export default CreateTutorProfile; 