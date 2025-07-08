import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCourseById } from "@/api/courseApi";
import { createEnrollment } from "../../api/enrollementApi";

export interface Course {
  _id: string;
  category: string;
  description: string;
  thumbnail: string;
  language: string;
  title: string;
  movieOrAlbum: string;
  price: number;
  level: 'basic' | 'intermediate' | 'advanced';
  tutorProfile: {
    name: string;
    _id: string;
    hourlyRate: number;
  };
}

const CourseDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        if (id) {
          const res = await getCourseById(id);
          setCourse(res);
          console.log(res , 'res');
        }
      } catch (error) {
        console.error("Error fetching course details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handleEnrollments = async () => {
    if (!course) return;

    const tutor = {
      ...course.tutorProfile,
      hourlyRate: course.price, 
    };

    console.log(tutor ,'tutor at courseDetails');
    

    try {
      await createEnrollment( tutor );
    } catch (error) {
      console.log("Enrollment failed:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p>Loading course details...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p>Course not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-10">
      <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg border border-cyan-500/30">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-64 object-cover rounded-md mb-6"
        />
        <h1 className="text-3xl font-bold text-cyan-400 mb-2">{course.title}</h1>
        <p className="text-gray-300 text-sm mb-4 italic">{course.movieOrAlbum}</p>

        <div className="space-y-2 text-sm text-gray-200">
          {/* <p><strong>Tutor:</strong> {course.tutorProfile.name}</p> */}
          <p><strong>Category:</strong> {course.category}</p>
          <p><strong>Level:</strong> {course.level}</p>
          <p><strong>Language:</strong> {course.language}</p>
          <p><strong>Description:</strong> {course.description}</p>
          <p><strong>Price:</strong> ₹{course.price}</p>
        </div>

        <div className="mt-6 flex justify-between">
          <Link to="/courses" className="text-cyan-400 hover:underline">
            ← Back to Courses
          </Link>
          <button
            onClick={handleEnrollments}
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-md"
          >
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
