import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white font-sans">
      
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 border-b border-gray-700 bg-black/80 backdrop-blur-md">
        <h1 className="text-2xl font-bold text-cyan-400">Skwapper</h1>
        <div className="space-x-4">
          <Link to="/login" className="text-sm hover:text-cyan-400">Login</Link>
          <Link to="/signup" className="text-sm px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg">Get Started</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="flex flex-col-reverse md:flex-row items-center justify-between px-8 md:px-16 py-20 gap-10">
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Empower Your Learning Journey
          </h2>
          <p className="text-gray-400 text-sm md:text-base mb-6">
            Skwapper is your gateway to smarter, simpler, and more engaging education. Learn at your pace, anytime, anywhere.
          </p>
          <Link to="/signup">
            <button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-blue-600 hover:to-cyan-500 text-white font-medium px-6 py-3 rounded-xl shadow-md transition-transform transform hover:scale-105 text-sm">
              Start Learning Now
            </button>
          </Link>
        </div>
        <div className="md:w-1/2">
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/online-education-3870235-3224630.png"
            alt="Learning"
            className="w-full max-w-md mx-auto"
          />
        </div>
      </header>

      {/* Features Section */}
      <section className="px-8 md:px-16 py-16 bg-gray-900">
        <h3 className="text-2xl md:text-3xl font-semibold text-center mb-10">
          Why Choose Skwapper?
        </h3>
        <div className="grid md:grid-cols-3 gap-10 text-center">
          <Feature
            title="Interactive Lessons"
            description="Engage with dynamic content, quizzes, and projects to truly grasp concepts."
            icon="🎯"
          />
          <Feature
            title="Progress Tracking"
            description="Stay motivated with real-time feedback and personalized progress reports."
            icon="📊"
          />
          <Feature
            title="Expert Support"
            description="Our mentors and community are here to guide you every step of the way."
            icon="💡"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 md:px-16 py-16 text-center bg-gradient-to-r from-cyan-600 to-blue-600">
        <h4 className="text-xl md:text-2xl font-semibold mb-4">Join Thousands of Learners</h4>
        <p className="text-white/80 text-sm mb-6">
          Begin your journey to mastery with Skwapper today.
        </p>
        <Link to="/signup">
          <button className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-900 transition">
            Get Started for Free
          </button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-500 text-sm border-t border-gray-700">
        &copy; {new Date().getFullYear()} Skwapper. All rights reserved.
      </footer>
    </div>
  );
};

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

export default Home;
