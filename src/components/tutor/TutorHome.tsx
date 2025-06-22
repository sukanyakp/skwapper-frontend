import { Link } from "react-router-dom";
import Footer from "../common/Footer";
import TutorNavbar from "../common/TutorNavbar";

const TutorHome = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white font-sans">
      {/* Navbar */}
      <TutorNavbar />

      {/* Dashboard Summary */}
      <section className="px-8 md:px-16 py-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">Welcome Back, Tutor!</h2>
        <div className="grid md:grid-cols-4 gap-6 text-center">
          <SummaryCard title="Active Courses" value="5" />
          <SummaryCard title="Total Earnings" value="₹42,500" />
          <SummaryCard title="Students Enrolled" value="120" />
          <SummaryCard title="Average Rating" value="4.8 ⭐" />
        </div>
      </section>

      {/* Actions Section */}
      <section className="px-8 md:px-16 py-10 bg-gray-900">
        <h3 className="text-2xl font-semibold text-center mb-8">Quick Actions</h3>
        <div className="flex flex-wrap gap-6 justify-center">
          <ActionButton text="Create New Course" to="/tutor/create-course" />
          <ActionButton text="Edit Profile" to="/tutor/profile/edit" />
          <ActionButton text="My Courses" to="/tutor/courses" />
          <ActionButton text="View Student Requests" to="/tutor/requests" />
          <ActionButton text="Schedule a Lecture" to="/tutor/schedule" />
        </div>
      </section>

      {/* Top Rated Courses */}
      <section className="px-8 md:px-16 py-16 bg-gray-950">
        <h3 className="text-2xl md:text-3xl font-semibold text-center mb-10 text-white">
          Top Rated Courses
        </h3>
        <div className="grid gap-8 md:grid-cols-3">
          {topRatedCourses.map((course, idx) => (
            <CourseCard key={idx} course={course} />
          ))}
        </div>
      </section>

      {/* Best Selling Courses */}
      <section className="px-8 md:px-16 py-16 bg-gray-900">
        <h3 className="text-2xl md:text-3xl font-semibold text-center mb-10 text-white">
          Best Selling Courses
        </h3>
        <div className="grid gap-8 md:grid-cols-3">
          {bestSellingCourses.map((course, idx) => (
            <CourseCard key={idx} course={course} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

// Summary Card
const SummaryCard = ({ title, value }: { title: string; value: string }) => (
  <div className="bg-black/80 p-6 rounded-xl border border-gray-700 shadow-lg">
    <h4 className="text-lg font-semibold mb-2">{title}</h4>
    <p className="text-2xl font-bold text-cyan-400">{value}</p>
  </div>
);

// Action Button
const ActionButton = ({ text, to }: { text: string; to: string }) => (
  <Link to={to}>
    <button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-blue-600 hover:to-cyan-500 text-white px-5 py-3 rounded-xl shadow-md text-sm transition-transform transform hover:scale-105">
      {text}
    </button>
  </Link>
);

// Course Card
const CourseCard = ({ course }: { course: any }) => (
  <div className="bg-black/80 p-5 rounded-xl border border-gray-700 hover:shadow-xl transition">
    <div className="h-40 bg-gray-700 rounded-lg mb-4 flex items-center justify-center text-white text-sm">
      Thumbnail Image
    </div>
    <h4 className="text-lg font-semibold mb-1">{course.title}</h4>
    <p className="text-sm text-gray-400 mb-2">By {course.instructor}</p>
    <span className="inline-block bg-cyan-700 text-xs px-2 py-1 rounded-full mb-3">
      {course.category}
    </span>
    <button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2 text-sm rounded-md">
      View Details
    </button>
  </div>
);

// Sample Data
const topRatedCourses = [
  {
    title: "Fingerstyle Guitar Mastery",
    instructor: "Amit Roy",
    category: "Guitar",
  },
  {
    title: "Advanced Vocal Training",
    instructor: "Neha Thomas",
    category: "Vocals",
  },
  {
    title: "Jazz Piano Essentials",
    instructor: "Karthik Iyer",
    category: "Piano",
  },
];

const bestSellingCourses = [
  {
    title: "Complete Drum Course",
    instructor: "Rahul Das",
    category: "Drums",
  },
  {
    title: "Violin for All Levels",
    instructor: "Divya Menon",
    category: "Violin",
  },
  {
    title: "Music Theory Simplified",
    instructor: "Anita Rao",
    category: "Theory",
  },
];

export default TutorHome;
