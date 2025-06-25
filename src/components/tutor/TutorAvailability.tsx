// src/pages/TutorAvailability.tsx
import { useState } from "react";
import axiosInstance from "@/api/axios-instance";
import { toast } from "sonner";
import { Input } from "../ui/input";

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const TutorAvailability = () => {
  const [availability, setAvailability] = useState<{ [key: string]: { start: string; end: string } }>({});

  const handleTimeChange = (day: string, field: "start" | "end", value: string) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    try {
      await axiosInstance.post("/tutor/availability", { availability });
      toast.success("Availability saved successfully!");
    } catch (error) {
      toast.error("Failed to save availability.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-2xl font-bold text-cyan-400 mb-6">Set Your Availability</h1>

      <div className="space-y-4">
        {daysOfWeek.map((day) => (
          <div key={day} className="flex items-center space-x-4">
            <div className="w-24">{day}</div>
            <Input
              type="time"
              className="p-1 rounded text-white"
              value={availability[day]?.start || ""}
              onChange={(e) => handleTimeChange(day, "start", e.target.value)}
            />
            <span className="text-gray-300">to</span>
            <Input
              type="time"
              className="p-1 rounded text-white"
              value={availability[day]?.end || ""}
              onChange={(e) => handleTimeChange(day, "end", e.target.value)}
            />
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="mt-6 bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded"
      >
        Save Availability
      </button>
    </div>
  );
};

export default TutorAvailability;
