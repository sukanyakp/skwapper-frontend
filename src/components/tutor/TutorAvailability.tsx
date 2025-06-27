// src/pages/TutorAvailability.tsx
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { withAvailability } from "../hoc/WithAvailability";

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const TutorAvailability = ({
  availability,
  setAvailability,
  saveAvailability,
  loading,
}: {
  availability: { [key: string]: { start: string; end: string } };
  setAvailability: React.Dispatch<React.SetStateAction<any>>;
  saveAvailability: () => Promise<any>;
  loading: boolean;
}) => { 
  const navigate = useNavigate();

  const handleTimeChange = (day: string, field: "start" | "end", value: string) => {
    setAvailability((prev: any) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    try {
      await saveAvailability();
      toast.success("Availability saved successfully!");
      navigate("/tutor/availability/view");
    } catch (error) {
      toast.error("Failed to save availability.");
      console.error(error);
    }
  };

  if (loading) return <div className="text-white text-center py-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white py-10 px-4">
      <div className="max-w-2xl mx-auto bg-black/70 p-6 rounded-lg border border-gray-700 shadow-md">
        <h2 className="text-2xl font-bold text-cyan-400 text-center mb-6">
          Set Your Weekly Availability
        </h2>

        <div className="space-y-5">
          {daysOfWeek.map((day) => (
            <div key={day} className="flex items-center gap-3 justify-between text-sm">
              <span className="w-24 font-medium text-gray-300">{day}</span>

              <Input
                type="time"
                className="w-full max-w-[150px]"
                value={availability[day]?.start || ""}
                onChange={(e) => handleTimeChange(day, "start", e.target.value)}
              />

              <span className="text-gray-400">to</span>

              <Input
                type="time"
                className="w-full max-w-[150px]"
                value={availability[day]?.end || ""}
                onChange={(e) => handleTimeChange(day, "end", e.target.value)}
              />
            </div>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full mt-8 bg-cyan-600 hover:bg-cyan-700 py-2 rounded-md font-semibold transition"
        >
          Save Availability
        </button>
      </div>
    </div>
  );
};

export default withAvailability(TutorAvailability);
