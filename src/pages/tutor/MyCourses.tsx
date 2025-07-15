import { useEffect, useState } from "react";
import axiosInstance from "@/api/axios-instance";
import { Link } from "react-router-dom";

interface Course {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  language: string;
  songName: string;
  movieOrAlbum: string;
  price: number;
}

const MyCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axiosInstance.get("/tutor/my-courses");
        setCourses(res.data);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p>Loading courses...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-10">
      <h1 className="text-3xl font-bold text-cyan-400 mb-6 text-center">Available Courses</h1>

      {courses.length === 0 ? (
        <p className="text-center text-gray-400">No courses available.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-black/60 border border-gray-700 rounded-xl shadow-md p-4 hover:shadow-cyan-500/30 transition"
            >
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-40 object-cover rounded-md mb-3"
              />
              <h2 className="text-xl font-semibold text-cyan-300">{course.title}</h2>
              <p className="text-sm text-gray-400 mb-2">{course.description.slice(0, 80)}...</p>

              <div className="text-sm text-gray-300 space-y-1 mb-3">
                <p><strong>Category:</strong> {course.category}</p>
                <p><strong>Language:</strong> {course.language}</p>
                <p><strong>Song:</strong> {course.songName}</p>
                <p><strong>Album:</strong> {course.movieOrAlbum}</p>
              </div>

              <div className="flex justify-between items-center mt-4">
                <span className="text-cyan-400 font-bold">₹{course.price}</span>
                <Link
                  to={`/course/${course.id}`}
                  className="text-sm bg-cyan-600 hover:bg-cyan-700 px-3 py-1 rounded-md transition"
                >
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCourses;
