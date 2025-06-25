import { useState } from "react";
import axiosInstance from "@/api/axios-instance";
import { toast } from "sonner";
import { Input } from "../ui/input";

const TutorSchedule = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("30"); // in minutes
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time) return toast("Please select date and time");

    try {
      setLoading(true);
      const res = await axiosInstance.post("/tutor/schedule-session", {
        date,
        time,
        duration,
      });
      toast("Session scheduled successfully!");
      setDate("");
      setTime("");
    } catch (error) {
      console.error("Scheduling error:", error);
      toast("Failed to schedule session");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-black/70 p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-700"
      >
        <h2 className="text-xl font-bold text-cyan-400 mb-6 text-center">Schedule a Video Session</h2>

        <label className="block mb-3">
          <span>Date</span>
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 rounded text-white mt-1"
            required
          />
        </label>

        <label className="block mb-3">
          <span>Time</span>
          <Input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full p-2 rounded text-white   mt-1"
            required
          />
        </label>

        <label className="block mb-5">
          <span>Duration (mins)</span>
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full p-2 rounded text-white mt-1"
          >
            <option value="30">30</option>
            <option value="45">45</option>
            <option value="60">60</option>
          </select>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-cyan-600 hover:bg-cyan-700 p-2 rounded font-semibold"
        >
          {loading ? "Scheduling..." : "Schedule Session"}
        </button>
      </form>
    </div>
  );
};

export default TutorSchedule;
