import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/api/axios-instance";

interface Course {
  _id: string;
  title: string;
  description: string;
}

const Courses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  const handleCreateNew = () => {
    navigate("/admin/courses/new");
  };

  const fetchCourses = async () => {
    try {
      const res = await axiosInstance.get("/admin/courses");
      setCourses(res.data);
    } catch (err) {
      console.error("Error fetching courses:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Courses</h2>
        <Button onClick={handleCreateNew} className="bg-cyan-600 text-white">
          + Create New Course
        </Button>
      </div>

      <div className="bg-white p-4 rounded shadow">
        {loading ? (
          <p className="text-gray-500">Loading courses...</p>
        ) : courses.length === 0 ? (
          <p className="text-gray-500">No courses available.</p>
        ) : (
          <table className="w-full table-auto">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">Title</th>
                <th className="p-3">Description</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course._id} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-semibold">{course.title}</td>
                  <td className="p-3 text-gray-700">{course.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Courses;
