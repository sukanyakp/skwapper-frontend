import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllCourses, getRecommendedCourses } from "../../api/courseApi";
import { getUserProfile } from "../../api/userApi";

interface Course {
  _id: string;
  category: string;
  description: string;
  thumbnail: string;
  language: string;
  songName: string;
  movieOrAlbum: string;
  price: number;
  level: "basic" | "intermediate" | "advanced";
}

interface UserProfile {
  instrument: string;
}

const AllCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedLevel, setSelectedLevel] = useState<string>("");
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const coursesRes = await getAllCourses();
        const allCourses = coursesRes.data.courses as Course[];
        setCourses(allCourses);

        const categories = [...new Set(allCourses.map((c) => c.category))];
        setAvailableCategories(categories);

        try {
          const profileRes = await getUserProfile();
          const profileData = profileRes.data as UserProfile;
          setUserProfile(profileData);

          if (profileData.instrument) {
            setSelectedCategory(profileData.instrument);
          }
        } catch {
          console.warn("No user profile found.");
        }
      } catch (err) {
        console.error("Failed to fetch initial data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    const fetchRecommended = async () => {
      if (!selectedCategory) {
        setFilteredCourses(courses);
        return;
      }

      try {
        const res = await getRecommendedCourses(selectedCategory);
        const recommended = res.data as Course[];
        setFilteredCourses(recommended);
        setSelectedLevel("");
      } catch (err) {
        console.error("Failed to fetch recommended:", err);
        const filtered = courses.filter(
          (course) => course.category === selectedCategory
        );
        setFilteredCourses(filtered);
      }
    };

    fetchRecommended();
  }, [selectedCategory, courses]);

  const displayedCourses = selectedLevel
    ? filteredCourses.filter((course) => course.level === selectedLevel)
    : filteredCourses;

  const handleViewClick = (courseId: string) => {
    if (!userProfile) {
      navigate("/create-profile");
    } else {
      navigate(`/course/${courseId}`);
    }
  };

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
        <h1 className="text-3xl font-bold text-cyan-400 mb-6 text-center">
          Explore Courses
        </h1>

        {!userProfile && (
          <div className="mb-6 text-yellow-300 bg-yellow-900/40 border border-yellow-600 p-4 rounded text-sm text-center">
            No profile found.{" "}
            <Link to="/create-profile" className="underline">
              Create your profile
            </Link>{" "}
            to get personalized course suggestions.
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
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {userProfile && filteredCourses.length > 0 && (
          <div className="flex justify-center mb-6 space-x-3">
            {["basic", "intermediate", "advanced"].map((level) => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`px-4 py-2 rounded-md border ${
                  selectedLevel === level
                    ? "bg-cyan-600 border-cyan-400 text-white"
                    : "bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
        )}

        {displayedCourses.length === 0 ? (
          <p className="text-center text-gray-400">
            No courses found for this category.
          </p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {displayedCourses.map((course) => (
              <div
                key={course._id}
                className="bg-black/60 border border-gray-700 rounded-xl shadow-md p-4 hover:shadow-cyan-500/30 transition"
              >
                <img
                  src={course.thumbnail}
                  alt={course.category}
                  className="w-full h-40 object-cover rounded-md mb-3"
                />
                <h2 className="text-xl font-semibold text-cyan-300">
                  {course.category}
                </h2>
                <p className="text-sm text-gray-400 mb-2">
                  {course.description.slice(0, 80)}...
                </p>

                <div className="text-sm text-gray-300 space-y-1 mb-3">
                  <p>
                    <strong>Category:</strong> {course.category}
                  </p>
                  <p>
                    <strong>Language:</strong> {course.language}
                  </p>
                  <p>
                    <strong>Song:</strong> {course.songName}
                  </p>
                  <p>
                    <strong>Album:</strong> {course.movieOrAlbum}
                  </p>
                  <p>
                    <strong>Level:</strong>{" "}
                    {course.level
                      ? course.level.charAt(0).toUpperCase() +
                        course.level.slice(1)
                      : "N/A"}
                  </p>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <span className="text-cyan-400 font-bold">
                    ₹{course.price}
                  </span>
                  <button
                    onClick={() => handleViewClick(course._id)}
                    className="text-sm bg-cyan-600 hover:bg-cyan-700 px-3 py-1 rounded-md transition"
                  >
                    View
                  </button>
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
