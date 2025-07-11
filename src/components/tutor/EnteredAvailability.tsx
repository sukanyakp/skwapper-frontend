import { useState, useEffect } from "react";
import { withAvailability } from "../hoc/WithAvailability";

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const EnteredAvailability = ({
  availability,
  setAvailability,
  updateAvailability,
  loading,
}: {
  availability: { [key: string]: { start: string; end: string }[] };
  setAvailability: any;
  updateAvailability: (data: any) => Promise<any>;
  loading: boolean;
}) => {
  const [editing, setEditing] = useState(false);
  const [formValues, setFormValues] = useState(availability);

  useEffect(() => {
    setFormValues(availability);
  }, [availability]);

  const handleSlotChange = (day: string, index: number, field: "start" | "end", value: string) => {
    const updatedSlots = [...(formValues[day] || [])];
    updatedSlots[index] = { ...updatedSlots[index], [field]: value };
    setFormValues((prev: any) => ({
      ...prev,
      [day]: updatedSlots,
    }));
  };

  const handleAddSlot = (day: string) => {
    const updatedSlots = [...(formValues[day] || []), { start: "", end: "" }];
    setFormValues((prev: any) => ({
      ...prev,
      [day]: updatedSlots,
    }));
  };

  const handleRemoveSlot = (day: string, index: number) => {
    const updatedSlots = [...(formValues[day] || [])];
    updatedSlots.splice(index, 1);
    setFormValues((prev: any) => ({
      ...prev,
      [day]: updatedSlots,
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
          <div key={day} className="mb-6">
            <h2 className="text-lg font-semibold text-cyan-300 mb-2">{day}</h2>

            {(formValues[day] || []).map((slot: any, index: number) => (
              <div key={index} className="flex gap-4 ml-4 mb-2 items-center">
                {editing ? (
                  <>
                    <input
                      type="time"
                      value={slot.start}
                      onChange={(e) => handleSlotChange(day, index, "start", e.target.value)}
                      className="bg-gray-800 border border-gray-600 px-2 py-1 rounded"
                    />
                    <span className="text-gray-400">to</span>
                    <input
                      type="time"
                      value={slot.end}
                      onChange={(e) => handleSlotChange(day, index, "end", e.target.value)}
                      className="bg-gray-800 border border-gray-600 px-2 py-1 rounded"
                    />
                    <button
                      onClick={() => handleRemoveSlot(day, index)}
                      className="text-red-400 hover:text-red-600 text-xs"
                    >
                      Remove
                    </button>
                  </>
                ) : (
                  <p className="text-sm text-white ml-4">
                    {slot.start} – {slot.end}
                  </p>
                )}
              </div>
            ))}

            {editing && (
              <button
                onClick={() => handleAddSlot(day)}
                className="ml-4 text-cyan-400 text-xs hover:underline"
              >
                + Add Time Slot
              </button>
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
