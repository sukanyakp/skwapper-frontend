import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/api/axios-instance";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const courseSchema = z
  .object({
    title: z.string().nonempty("Title is required"),
    category: z.string().nonempty("Category is required"),
    level: z.enum(["basic", "intermediate", "advanced"], {
      required_error: "Level is required",
    }),
    description: z.string().nonempty("Description is required"),
    price: z.string().nonempty("Price is required"),
    language: z.string().nonempty("Language is required"),
    songName: z.string().optional(),
    movieOrAlbum: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.level === "advanced") {
      if (!data.songName || data.songName.trim() === "") {
        ctx.addIssue({
          path: ["songName"],
          code: z.ZodIssueCode.custom,
          message: "Song Name is required for advanced level",
        });
      }
      if (!data.movieOrAlbum || data.movieOrAlbum.trim() === "") {
        ctx.addIssue({
          path: ["movieOrAlbum"],
          code: z.ZodIssueCode.custom,
          message: "Movie or Album is required for advanced level",
        });
      }
    }
  });

type CourseFormData = z.infer<typeof courseSchema>;

const CreateCourse = () => {
  const navigate = useNavigate();
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
  });

  const level = watch("level");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosInstance.get("/courses");
        const courses = res.data.courses as { category: string }[];
        const uniqueCategory = [...new Set(courses.map((c) => c.category))];
        setAvailableCategories(uniqueCategory);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const onSubmit = async (data: CourseFormData) => {
    try {
      const payload = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value) payload.append(key, value);
      });
      if (thumbnail) payload.append("thumbnail", thumbnail);

      const res = await axiosInstance.post("/tutor/course", payload, {
        headers: { "Content-Type": "multipart/form-data" },
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
        onSubmit={handleSubmit(onSubmit)}
        className="bg-black/80 p-8 rounded-xl max-w-2xl w-full border border-gray-700 shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-cyan-400">
          Create New Course
        </h2>

        <InputField label="Course Title" name="title" register={register} error={errors.title?.message} />

        <div className="mb-4">
          <label className="block mb-1 text-sm">Category</label>
          <select
            {...register("category")}
            className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600"
          >
            <option value="">Select category</option>
            {availableCategories.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm">Level</label>
          <select
            {...register("level")}
            className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600"
          >
            <option value="">Select level</option>
            <option value="basic">Basic</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
          {errors.level && <p className="text-red-500 text-sm mt-1">{errors.level.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm">Description</label>
          <textarea
            {...register("description")}
            rows={4}
            className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600"
          ></textarea>
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
        </div>

        {level === "advanced" && (
          <>
            <InputField label="Song Name" name="songName" register={register} error={errors.songName?.message} />
            <InputField label="Movie or Album" name="movieOrAlbum" register={register} error={errors.movieOrAlbum?.message} />
          </>
        )}

        <InputField label="Language" name="language" register={register} error={errors.language?.message} />
        <InputField label="Price (₹)" name="price" type="number" register={register} error={errors.price?.message} />

        <div className="mb-6">
          <label className="block mb-1 text-sm">Course Thumbnail</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files && setThumbnail(e.target.files[0])}
            className="w-full text-white"
          />
          {thumbnail && (
            <img
              src={URL.createObjectURL(thumbnail)}
              alt="Preview"
              className="w-32 h-20 rounded-md mt-2 object-cover"
            />
          )}
        </div>

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
  register,
  error,
}: {
  label: string;
  name: keyof CourseFormData;
  type?: string;
  register: ReturnType<typeof useForm>["register"];
  error?: string;
}) => (
  <div className="mb-4">
    <label className="block mb-1 text-sm">{label}</label>
    <input
      type={type}
      {...register(name)}
      className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600"
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default CreateCourse;
