import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TutorSignup = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!files || files.length === 0) {
      setMessage("Please upload required documents.");
      return;
    }

    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append("documents", file));

    try {
      const res = await fetch("/api/tutor/apply", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setMessage("Application submitted. Await admin approval.");
        setTimeout(() => navigate("/"), 3000);
      } else {
        setMessage("Failed to submit. Please try again later.");
      }
    } catch (error) {
      setMessage("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-black text-white px-4">
      <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-lg w-full max-w-md space-y-4">
        <h2 className="text-xl font-bold mb-2">Become a Tutor</h2>
        <p className="text-sm text-gray-400">Upload your credentials for admin approval.</p>

        <input type="file" multiple onChange={handleFileChange} className="text-sm" />

        {message && <p className="text-xs text-cyan-400 mt-2">{message}</p>}

        <button
          type="submit"
          className="bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded w-full"
        >
          Submit Documents
        </button>
      </form>
    </div>
  );
};

export default TutorSignup;
