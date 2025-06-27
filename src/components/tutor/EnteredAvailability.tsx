// src/pages/EnteredAvailability.tsx
import { useState, useEffect } from "react";
import { withAvailability } from "../hoc/WithAvailability";

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const EnteredAvailability = ({
  availability,
  setAvailability,
  updateAvailability,
  loading,
}: {
  availability: { [key: string]: { start: string; end: string } };
  setAvailability: any;
  updateAvailability: (data: any) => Promise<any>;
  loading: boolean;
}) => {
  const [editing, setEditing] = useState(false);
  const [formValues, setFormValues] = useState(availability);

  useEffect(() => {
    setFormValues(availability);
  }, [availability]);

  const handleChange = (day: string, field: "start" | "end", value: string) => {
    setFormValues((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value,
      },
    }));
  };

  const handleSave = async () => {
    try {
      await updateAvailability(formValues);
      setAvailability(formValues);
      setEditing(false);
    } catch (err) {
      console.error("Failed to update availability", err);
    }
  };

  if (loading) {
    return <div className="text-white text-center py-10">Loading availability...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-10">
      <div className="max-w-3xl mx-auto bg-black/70 border border-gray-700 rounded-xl p-8 shadow-lg">
        <h1 className="text-2xl text-cyan-400 font-bold mb-6 text-center">Your Availability</h1>

        {daysOfWeek.map((day) => (
          <div key={day} className="mb-4">
            <h2 className="text-lg font-semibold text-cyan-300">{day}</h2>
            {editing ? (
              <div className="flex gap-4 ml-4">
                <input
                  type="time"
                  value={formValues[day]?.start || ""}
                  onChange={(e) => handleChange(day, "start", e.target.value)}
                  className="bg-gray-800 border border-gray-600 px-2 py-1 rounded"
                />
                <input
                  type="time"
                  value={formValues[day]?.end || ""}
                  onChange={(e) => handleChange(day, "end", e.target.value)}
                  className="bg-gray-800 border border-gray-600 px-2 py-1 rounded"
                />
              </div>
            ) : availability[day] ? (
              <p className="ml-4 text-white text-sm">
                {availability[day].start} – {availability[day].end}
              </p>
            ) : (
              <p className="ml-4 text-gray-500 text-sm">Not set</p>
            )}
          </div>
        ))}

        <div className="mt-6 text-center">
          {editing ? (
            <>
              <button
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md font-semibold mr-4"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setEditing(false);
                  setFormValues(availability);
                }}
                className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-md font-semibold"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-md font-semibold"
            >
              Edit Availability
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default withAvailability(EnteredAvailability);
