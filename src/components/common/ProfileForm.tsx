// components/ProfileForm.tsx
import React from "react";

interface ProfileFormProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  onSubmit: (e: React.FormEvent) => void;
  role: "student" | "tutor";
}

const ProfileForm: React.FC<ProfileFormProps> = ({ formData, setFormData, onSubmit, role }) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev: any) => ({ ...prev, image: e.target.files![0] }));
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="bg-black/70 p-8 rounded-xl max-w-xl w-full border border-gray-700 shadow-xl"
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-cyan-400">
        {role === "tutor" ? "Create Tutor Profile" : "Create Your Profile"}
      </h2>

      {/* Name */}
      <div className="mb-4">
        <label className="block text-sm mb-1">Name</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 text-white"
        />
      </div>

      {/* Bio */}
      <div className="mb-4">
        <label className="block text-sm mb-1">Bio</label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          rows={3}
          placeholder="Tell us a bit about yourself..."
          className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 text-white"
        />
      </div>
      {/* student  specific field*/}
       {role === "student" && (
        <>
         {/* Instrument */}
        <div className="mb-4">
          <label className="block text-sm mb-1">Instrument</label>
          <select
            name="instrument"
            value={formData.instrument}
            required 
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 text-white"
          >
            <option value="">Select an instrument</option>
            <option value="Guitar">Guitar</option>
            <option value="Piano">Piano</option>
            <option value="Drums">Drums</option>
            <option value="Violin">Violin</option>
            <option value="Vocals">Vocals</option>
            <option value="Other">Other</option>
          </select>
        </div>
        
        </>


        )}

          
      {/* Tutor-specific fields */}
      {role === "tutor" && (
        <>
          <div className="mb-4">
            <label className="block text-sm mb-1">Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 text-white"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-1">Skills</label>
            <input
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 text-white"
            />
          </div>
        </>
      )}

      {/* Experience */}
      <div className="mb-4">
        <label className="block text-sm mb-1">Experience (in years)</label>
        <input
          name="experience"
          onChange={handleChange}
          value={formData.experience}
          type="number"
          min="0"
          className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 text-white"
        />
      </div>

      {/* Location */}
      <div className="mb-4">
        <label className="block text-sm mb-1">Location</label>
        <input
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 text-white"
        />
      </div>

      {/* Image Upload */}
      <div className="mb-6">
        <label className="block text-sm mb-1">Profile Picture</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full text-white"
        />
        {formData.image && (
          <img
            src={URL.createObjectURL(formData.image)}
            alt="Preview"
            className="w-20 h-20 rounded-full mt-2 object-cover"
          />
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-cyan-600 hover:bg-cyan-700 py-2 rounded-md text-white font-semibold transition"
      >
        Save Profile
      </button>
    </form>
  );
};

export default ProfileForm;
