import { useEffect, useState } from "react";
import axiosInstance from "@/api/axios-instance";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {profileSchema} from "../../validations/tutor/createProfile"
import  { z } from "zod";

type FormData = z.infer<typeof profileSchema>;


const EditTutorProfile = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    bio: "",
    category: "",
    skills: [] as string[],
    experience: "",
    location: "",
    image: null as File | null,
  });

  const [availableSkills, setAvailableSkills] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch current profile
        const profileRes = await axiosInstance.get("/tutor/profile");
        const data = profileRes.data;

        setFormData({
          name: data.name || "",
          bio: data.bio || "",
          category: data.category || "",
          skills:
            typeof data.skills === "string"
              ? data.skills.split(",").map((s: string) => s.trim())
              : data.skills || [],
          experience: data.experience || "",
          location: data.location || "",
          image: null,
        });

        // Fetch skills
        const res = await axiosInstance.get("/courses");
          const coursesRes = res.data as { category : string }[];
        const uniqueSkills = [
          ...new Set(coursesRes.map((course: any) => course.category)),
        ];
        setAvailableSkills(uniqueSkills);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    };

    fetchData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillsChange = (value: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      skills: checked
        ? [...prev.skills, value]
        : prev.skills.filter((s) => s !== value),
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        image: e.target.files![0],
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {

      profileSchema.parse(formData);

      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("bio", formData.bio);
      // payload.append("category", formData.category);
      payload.append("experience", formData.experience);
      payload.append("location", formData.location);
      formData.skills.forEach((skill) => payload.append("skills", skill));
      if (formData.image) {
        payload.append("image", formData.image);
      }

      await axiosInstance.put("/tutor/profile", payload);
      toast("Update successful")

      navigate("/tutor/profile"); 

    } catch (err) {
      if (err instanceof z.ZodError) {
        console.error("Validation Error:", err.errors);
        toast(err.errors[0]?.message);
      } else {
        console.error("Failed to create tutor profile:", err);
      }
      console.error("Failed to update profile:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-black/70 p-8 rounded-xl max-w-xl w-full border border-gray-700 shadow-xl"
        noValidate
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-cyan-400">
          Edit Profile
        </h2>

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

        <div className="mb-4">
          <label className="block text-sm mb-1">Category</label>
          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 text-white"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Skills</label>
          <div className="grid grid-cols-2 gap-2">
            {availableSkills.map((skill, idx) => (
              <label key={idx} className="flex items-center space-x-2 text-sm">
                <input
                  type="checkbox"
                  value={skill}
                  checked={formData.skills.includes(skill)}
                  onChange={(e) =>
                    handleSkillsChange(skill, e.target.checked)
                  }
                  className="accent-cyan-500"
                />
                <span>{skill}</span>
              </label>
            ))}
          </div>
        </div>

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

        <div className="mb-4">
          <label className="block text-sm mb-1">Location</label>
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 text-white"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm mb-1">Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full text-white"
          />
            {formData.image && formData.image.size > 0 && (
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

export default EditTutorProfile;
