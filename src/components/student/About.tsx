import { Link } from "react-router-dom";
import Footer from "../common/Footer";
import Navbar from "../common/Navbar";

const About = () => {
  return (
       <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white font-sans">
      {/* Navbar */}
      <Navbar />
    <section className="bg-gray-900 text-white px-8 md:px-16 py-20">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-cyan-400">
            About Skwapper
          </h2>
          <p className="text-gray-300 mb-6 text-sm md:text-base leading-relaxed">
            Skwapper is a platform built to connect learners with passionate tutors in the fields of dance, music, art, and communication. Whether you're picking up a guitar for the first time or mastering your voice, we bring professional mentors to your fingertips — from anywhere in the world.
          </p>
          <p className="text-gray-400 mb-6 text-sm md:text-base leading-relaxed">
            Our goal is to create a global learning ecosystem where knowledge, skills, and creativity are exchanged effortlessly. From live sessions to recorded classes, we ensure high-quality learning with flexibility and personalization.
          </p>
          <Link to="/courses">
            <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg font-medium transition text-sm">
              Explore Our Courses
            </button>
          </Link>
        </div>

        {/* Optional Image or Illustration */}
        <div>
          <img
            src="https://images.unsplash.com/photo-1581092915371-5b8d6d3de81b"
            alt="Learning Illustration"
            className="rounded-lg shadow-lg w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
    <Footer/>
      </div>
  );
};

export default About;
