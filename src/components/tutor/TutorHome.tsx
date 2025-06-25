
import Footer from "../common/Footer";
import TutorNavbar from "../common/TutorNavbar";
import { ActionButton } from "../common/ActionButton";
import { SummaryCard } from "../common/SummaryCard";
import { CourseCard } from "../common/CourseCard";

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
          <ActionButton text="Set Your Availability" to="/tutor/availability" />
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
