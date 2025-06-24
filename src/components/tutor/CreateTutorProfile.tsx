import { useEffect, useState } from "react";
import axiosInstance from "@/api/axios-instance";
import { useNavigate } from "react-router-dom";

const CreateTutorProfile = () => {
  const [formData, setFormData] = useState({
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
    const fetchSkills = async () => {
      try {
        const res = await axiosInstance.get("/courses");
        const courses = res.data as { category : string }[];
        const uniqueSkills = [...new Set(courses.map((course) => course.category))];
        setAvailableSkills(uniqueSkills);
        console.log(availableSkills , 'availableSkills');
        
      } catch (error) {
        console.error("Failed to fetch skills:", error);
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

  const handleSkillsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData((prev) => ({ ...prev, skills: selected }));
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
      console.error("Failed to create tutor profile:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-black/70 p-8 rounded-xl max-w-xl w-full border border-gray-700 shadow-xl"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-cyan-400">Create Tutor Profile</h2>

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
  <label className="block text-sm mb-2">Skills</label>
  <div className="grid grid-cols-2 gap-2">
    {availableSkills.map((skill, idx) => (
      <label key={idx} className="flex items-center space-x-2 text-sm">
        <input
          type="checkbox"
          value={skill}
          checked={formData.skills.includes(skill)}
          onChange={(e) => {
            const checked = e.target.checked;
            const value = e.target.value;
            setFormData((prev) => ({
              ...prev,
              skills: checked
                ? [...prev.skills, value]
                : prev.skills.filter((s) => s !== value),
            }));
          }}
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
          {formData.image && (
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
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default CreateTutorProfile;
