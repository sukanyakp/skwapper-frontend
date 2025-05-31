import { useState } from "react";
import { sendResetRequest } from "../../api/api";
import { Input } from "../ui/input";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      const res = await sendResetRequest(email);

      if (res?.status === 200) {
        setMessage("If the email is registered, a reset link has been sent.");
        setError("");
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-black px-4">
      <form onSubmit={handleSubmit} className="bg-gray-900 p-6 rounded-lg shadow-lg text-white w-full max-w-md space-y-4">
        <h2 className="text-xl font-bold">Forgot Password</h2>
        <p className="text-sm text-gray-400">
          Enter your email to receive a password reset link.
        </p>

        <Input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {error && <p className="text-red-500 text-xs">{error}</p>}
        {message && <p className="text-green-500 text-xs">{message}</p>}

        <button
          type="submit"
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-2 rounded"
        >
          Send Reset Link
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
