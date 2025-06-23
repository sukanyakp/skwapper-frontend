// AdminCourses.tsx
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Courses = () => {
  const navigate = useNavigate();

  const handleCreateNew = () => {
    navigate("/admin/courses/new");
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Courses</h2>
        <Button onClick={handleCreateNew} className="bg-cyan-600 text-white">
          + Create New Course
        </Button>
      </div>
      {/* Replace with course list component or logic */}
      <div className="bg-white p-4 rounded shadow">
        <p className="text-gray-600">List of existing courses will be displayed here...</p>
      </div>
    </div>
  );
};

export default Courses;