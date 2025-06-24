import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/api/axios-instance";

const CreateCourse = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    price: "",
    language: "",
    songName: "",
    movieOrAlbum: "",
    thumbnail: null as File | null,
  });

  const [availableCategories, setAvailableCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosInstance.get("/courses");
        const courses = res.data as { title: string }[];
        const uniqueTitles = [...new Set(courses.map((course) => course.title))];
        setAvailableCategories(uniqueTitles);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, thumbnail: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = new FormData();
      payload.append("title", formData.title);
      payload.append("category", formData.category);
      payload.append("description", formData.description);
      payload.append("price", formData.price);
      payload.append("language", formData.language);
      payload.append("songName", formData.songName);
      payload.append("movieOrAlbum", formData.movieOrAlbum);
      if (formData.thumbnail) {
        payload.append("thumbnail", formData.thumbnail);
      }

      const res = await axiosInstance.post("/tutor/course", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Course created:", res.data);
      navigate("/tutor/courses");
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-black/80 p-8 rounded-xl max-w-2xl w-full border border-gray-700 shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-cyan-400">
          Create New Course
        </h2>

        {/* Title */}
        <InputField label="Course Title" name="title" value={formData.title} onChange={handleChange} required />

        {/* Category - Dynamic */}
        <div className="mb-4">
          <label className="block mb-1 text-sm">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600"
          >
            <option value="">Select category</option>
            {availableCategories.map((title, index) => (
              <option key={index} value={title}>
                {title}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block mb-1 text-sm">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            required
            className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600"
          ></textarea>
        </div>

        {/* Song Name */}
        <InputField label="Song Name" name="songName" value={formData.songName} onChange={handleChange} />

        {/* Movie or Album */}
        <InputField label="Movie or Album" name="movieOrAlbum" value={formData.movieOrAlbum} onChange={handleChange} />

        {/* Language */}
        <InputField label="Language" name="language" value={formData.language} onChange={handleChange} />

        {/* Price */}
        <InputField label="Price (₹)" name="price" type="number" value={formData.price} onChange={handleChange} required />

        {/* Thumbnail */}
        <div className="mb-6">
          <label className="block mb-1 text-sm">Course Thumbnail</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full text-white"
          />
          {formData.thumbnail && (
            <img
              src={URL.createObjectURL(formData.thumbnail)}
              alt="Preview"
              className="w-32 h-20 rounded-md mt-2 object-cover"
            />
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-cyan-600 hover:bg-cyan-700 py-2 rounded-md font-semibold transition"
        >
          Publish Course
        </button>
      </form>
    </div>
  );
};

const InputField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<any>) => void;
  required?: boolean;
}) => (
  <div className="mb-4">
    <label className="block mb-1 text-sm">{label}</label>
    <input
      name={name}
      value={value}
      type={type}
      onChange={onChange}
      required={required}
      className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600"
    />
  </div>
);

export default CreateCourse;
