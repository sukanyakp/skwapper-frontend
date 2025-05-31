import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Input } from "../ui/input";
import { resetPassword } from "../../api/api";

const ResetPassword = () => {
  const { token } = useParams(); // Grab token from URL
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await resetPassword(token, password);
      if (res?.status === 200) {
        setMessage("Password reset successful!");
        setError("");
        setTimeout(() => navigate("/login"), 2000); // Redirect to login after 2 seconds
      }
    } catch (error) {
      setError("Invalid or expired reset link.");
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-black px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-6 rounded-lg shadow-lg text-white w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-bold">Reset Your Password</h2>

        <Input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {error && <p className="text-red-500 text-xs">{error}</p>}
        {message && <p className="text-green-500 text-xs">{message}</p>}

        <button
          type="submit"
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-2 rounded"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
