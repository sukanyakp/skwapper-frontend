import {
  Users,
  GraduationCap,
  BookOpen,
  DollarSign,
  MessageSquare,
  Wallet,
} from "lucide-react";

const cards = [
  {
    title: "Total Tutors",
    value: 45,
    icon: <Users className="text-indigo-600" size={28} />,
  },
  {
    title: "Total Students",
    value: 120,
    icon: <GraduationCap className="text-green-600" size={28} />,
  },
  {
    title: "Courses",
    value: 18,
    icon: <BookOpen className="text-blue-600" size={28} />,
  },
  {
    title: "Payments",
    value: "₹1,20,000",
    icon: <DollarSign className="text-yellow-600" size={28} />,
  },
  {
    title: "Wallet Balance",
    value: "₹10,000",
    icon: <Wallet className="text-purple-600" size={28} />,
  },
  {
    title: "Feedbacks",
    value: 32,
    icon: <MessageSquare className="text-pink-600" size={28} />,
  },
];

const AdminDashboard = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Admin Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
          key={index}
            className="bg-white p-5 rounded-xl shadow-md flex items-center justify-between"
          >
            <div>
              <p className="text-gray-500 text-sm">{card.title}</p>
              <h3 className="text-xl font-semibold text-gray-800">{card.value}</h3>
            </div>
            <div>{card.icon}</div>
          </div>
        ))}
        
      </div>
    </div>
  );
};

export default AdminDashboard;
