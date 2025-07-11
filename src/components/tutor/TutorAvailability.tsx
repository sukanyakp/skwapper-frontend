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
  availability: { [key: string]: Array<{ start: string; end: string }> };
  setAvailability: React.Dispatch<React.SetStateAction<any>>;
  saveAvailability: () => Promise<any>;
  loading: boolean;
}) => {
  const navigate = useNavigate();

  const handleTimeChange = (day: string, index: number, field: "start" | "end", value: string) => {
    setAvailability((prev: any) => {
      const updated = [...(prev[day] || [])];
      updated[index][field] = value;
      return {
        ...prev,
        [day]: updated,
      };
    });
  };

  const addTimeSlot = (day: string) => {
    setAvailability((prev: any) => ({
      ...prev,
      [day]: [...(prev[day] || []), { start: "", end: "" }],
    }));
  };

  const removeTimeSlot = (day: string, index: number) => {
    setAvailability((prev: any) => {
      const updated = [...(prev[day] || [])];
      updated.splice(index, 1);
      return {
        ...prev,
        [day]: updated,
      };
    });
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
      <div className="max-w-3xl mx-auto bg-black/70 p-6 rounded-lg border border-gray-700 shadow-md">
        <h2 className="text-2xl font-bold text-cyan-400 text-center mb-6">
          Set Your Weekly Availability
        </h2>

        <div className="space-y-6">
          {daysOfWeek.map((day) => (
            <div key={day}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300 font-semibold">{day}</span>
                <button
                  type="button"
                  onClick={() => addTimeSlot(day)}
                  className="text-xs text-cyan-400 hover:underline"
                >
                  + Add Slot
                </button>
              </div>

              {(availability[day] || []).map((slot, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 justify-between mb-2 text-sm"
                >
                  <Input
                    type="time"
                    className="w-full max-w-[150px]"
                    value={slot.start}
                    onChange={(e) => handleTimeChange(day, index, "start", e.target.value)}
                  />
                  <span className="text-gray-400">to</span>
                  <Input
                    type="time"
                    className="w-full max-w-[150px]"
                    value={slot.end}
                    onChange={(e) => handleTimeChange(day, index, "end", e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => removeTimeSlot(day, index)}
                    className="text-red-500 text-xs hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ))}
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
