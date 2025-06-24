import { useEffect, useState } from "react";
import axiosInstance from "@/api/axios-instance";
import { Link } from "react-router-dom";

interface Course {
  _id: string;
  category: string;
  description: string;
  thumbnail: string;
  language: string;
  songName: string;
  movieOrAlbum: string;
  price: number;
}

interface UserProfile {
  instrument: string;
}

const AllCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileAndCourses = async () => {
      try {
        // Fetch all courses
        const coursesRes = await axiosInstance.get("/courses");
        const allCourses = coursesRes.data as Course[]

        setCourses(allCourses);

        const categories = [
          ...new Set(allCourses.map((course: Course) => course.category)),
        ];
        setAvailableCategories(categories);

        // Fetch profile
        try {
          const profileRes = await axiosInstance.get("/user/profile");
          setUserProfile(profileRes.data);
          setSelectedCategory(profileRes.data.instrument); // pre-filter
        } catch (err) {
          console.warn("No profile found.");
        }
      } catch (err) {
        console.error("Failed to fetch data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileAndCourses();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      setFilteredCourses(
        courses.filter((course) => course.category === selectedCategory)
      );
    } else {
      setFilteredCourses(courses);
    }
  }, [selectedCategory, courses]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p>Loading courses...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-cyan-400 mb-6 text-center">Explore Courses</h1>

        {!userProfile && (
          <div className="mb-6 text-yellow-300 bg-yellow-900/40 border border-yellow-600 p-4 rounded text-sm text-center">
            No profile found. <Link to="/create-profile" className="underline">Create your profile</Link> to get personalized course suggestions.
          </div>
        )}

        <div className="mb-6 flex justify-center">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-gray-800 border border-gray-600 px-4 py-2 rounded-md text-white"
          >
            <option value="">All Categories</option>
            {availableCategories.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {filteredCourses.length === 0 ? (
          <p className="text-center text-gray-400">No courses found for this category.</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {filteredCourses.map((course) => (
              <div
                key={course._id}
                className="bg-black/60 border border-gray-700 rounded-xl shadow-md p-4 hover:shadow-cyan-500/30 transition"
              >
                <img
                  src={course.thumbnail}
                  alt={course.category}
                  className="w-full h-40 object-cover rounded-md mb-3"
                />
                <h2 className="text-xl font-semibold text-cyan-300">{course.category}</h2>
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
                    to={`/course/${course._id}`}
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
    </div>
  );
};

export default AllCourses;
