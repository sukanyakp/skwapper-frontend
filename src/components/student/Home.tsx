import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import learn from "../../assets/Anime/learn.json";
import Lottie from "lottie-react";
import { checkApplicationStatus, checkTutorStatus } from "../../api/tutorApi"; // Adjust the path if necessary


const Home = () => {
  const [tutorStatus, setTutorStatus] = useState<"applied" | "notApplied" | null>(null);
  const navigate = useNavigate()
   
  const handleApplicationStatus = async () =>{
    try {

      const res = await checkApplicationStatus()
      console.log(res?.data.isApproved , "isApproved");
      
      setTutorStatus(res?.data.status); 
      if(res?.data.status == "notApplied"){
        navigate("/apply-tutor")

      }else if(res?.data.status == "applied"){
        navigate("/pending-approval")
      }else if (res?.data.isApproved){
        navigate("/tutor/home")
      } 
      
    } catch (error) {
      console.log(error);
      
    }
  }


 

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white font-sans">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <header className="flex flex-col-reverse md:flex-row items-center justify-between px-8 md:px-16 py-20 gap-10">
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Learn Music from Anywhere
          </h2>
          <p className="text-gray-400 text-sm md:text-base mb-6">
            Master instruments like Guitar, Piano, Drums, Violin, and more through online lessons from expert tutors.
          </p>
          <Link to="/signup">
            <button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-blue-600 hover:to-cyan-500 text-white font-medium px-6 py-3 rounded-xl shadow-md transition-transform transform hover:scale-105 text-sm">
              Start Learning Music
            </button>
          </Link>
        </div>

        {/* Lottie Animation */}
        <div className="w-full md:w-1/2">
          <Lottie animationData={learn} loop={true} className="w-full h-auto max-h-[380px]" />
        </div>
      </header>

      {/* Features Section */}
      <section className="px-8 md:px-16 py-16 bg-gray-900">
        <h3 className="text-2xl md:text-3xl font-semibold text-center mb-10">
          Why Learn Music with Us?
        </h3>
        <div className="grid md:grid-cols-3 gap-10 text-center">
          <Feature
            title="Live & Recorded Classes"
            description="Attend live sessions or learn at your own pace with high-quality recorded lessons."
            icon="🎼"
          />
          <Feature
            title="Instrument-Specific Training"
            description="Choose from Guitar, Piano, Drums, Violin, Vocals, and more."
            icon="🎸"
          />
          <Feature
            title="Learn from Experts"
            description="Our experienced musicians will guide you from beginner to pro."
            icon="👨‍🏫"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-8 md:px-16 py-16 text-center bg-gradient-to-r from-cyan-600 to-blue-600">
        <h4 className="text-xl md:text-2xl font-semibold mb-4">
          Join Thousands of Aspiring Musicians
        </h4>
        <p className="text-white/80 text-sm mb-6">
          Start your musical journey with professional guidance and creative learning.
        </p>
        <Link to="/signup">
          <button className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-900 transition">
            Get Started for Free
          </button>
        </Link>
      </section>

      {/* Top Related Courses Section */}
      <section className="px-8 md:px-16 py-16 bg-gray-950">
        <h3 className="text-2xl md:text-3xl font-semibold text-center mb-10 text-white">
          Top Related Courses
        </h3>
        <div className="grid gap-8 md:grid-cols-3">
          {topCourses.map((course, idx) => (
            <CourseCard key={idx} course={course} />
          ))}
        </div>
      </section>

      {/* Best Selling Courses Section */}
      <section className="px-8 md:px-16 py-16 bg-gray-900">
        <h3 className="text-2xl md:text-3xl font-semibold text-center mb-10 text-white">
          Best Selling Courses
        </h3>
        <div className="grid gap-8 md:grid-cols-3">
          {bestSellers.map((course, idx) => (
            <CourseCard key={idx} course={course} />
          ))}
        </div>
      </section>

      {/* Become a Tutor Section */}
      <section className="px-8 md:px-16 py-16 text-center bg-gradient-to-r from-cyan-600 to-blue-600">
        <h3 className="text-2xl md:text-3xl font-semibold mb-4">
          Want to Teach Music?
        </h3>
        <p className="text-white/80 text-sm md:text-base mb-6 max-w-xl mx-auto">
          Share your musical skills with students across the world. Join our platform as a tutor and start teaching online.
        </p>

          
            <button onClick={handleApplicationStatus} className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-900 transition text-sm">
             Become a Tutor
            </button>
        
      
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

// Feature Component
const Feature = ({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) => (
  <div className="bg-black/80 p-6 rounded-xl border border-gray-700 shadow-lg">
    <div className="text-4xl mb-3">{icon}</div>
    <h4 className="text-lg font-semibold mb-2">{title}</h4>
    <p className="text-sm text-gray-400">{description}</p>
  </div>
);

// CourseCard Component
const CourseCard = ({ course }: { course: any }) => (
  <div className="bg-black/80 p-5 rounded-xl border border-gray-700 hover:shadow-xl transition">
    <div className="h-40 bg-gray-700 rounded-lg mb-4 flex items-center justify-center text-white text-sm">
      {/* Placeholder thumbnail */}
      Thumbnail Image
    </div>
    <h4 className="text-lg font-semibold mb-1">{course.title}</h4>
    <p className="text-sm text-gray-400 mb-2">By {course.instructor}</p>
    <span className="inline-block bg-cyan-700 text-xs px-2 py-1 rounded-full mb-3">
      {course.category}
    </span>
    <button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2 text-sm rounded-md">
      Enroll Now
    </button>
  </div>
);

// Sample Data
const topCourses = [
  {
    title: "Beginner Guitar Essentials",
    instructor: "John Mayer",
    category: "Guitar",
  },
  {
    title: "Learn Piano in 30 Days",
    instructor: "Emily Clarke",
    category: "Piano",
  },
  {
    title: "Mastering Classical Vocals",
    instructor: "Ravi Kumar",
    category: "Vocals",
  },
];

const bestSellers = [
  {
    title: "Hip-Hop Dance Basics",
    instructor: "Liza Johnson",
    category: "Dance",
  },
  {
    title: "Bollywood Dance Groove",
    instructor: "Ritika Sharma",
    category: "Dance",
  },
  {
    title: "Complete Violin Guide",
    instructor: "Sarah Lee",
    category: "Violin",
  },
];

export default Home;
