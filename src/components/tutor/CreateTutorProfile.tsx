import { useState } from "react";
import ProfileForm from "../common/ProfileForm";
import axiosInstance from "@/api/axios-instance";
import { useNavigate } from "react-router-dom";

export const CreateTutorProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    title: "",
    skills: "",
    experience: "",
    location: "",
    image: null,
  });

  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("bio", formData.bio);
      payload.append("experience", formData.experience);
      payload.append("location", formData.location);
      if (formData.image) {
        payload.append("image", formData.image);
      }

      const res = await axiosInstance.post("/tutor/profile", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("tutor     profile created:", res.data);
      navigate("tutor/profile");
    } catch (err) {
      console.error("Failed to create student profile:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <ProfileForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        role="tutor"
      />
    </div>
  );
};
