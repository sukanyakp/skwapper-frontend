export const CourseCard = ({ course }: { course: any }) => (
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
