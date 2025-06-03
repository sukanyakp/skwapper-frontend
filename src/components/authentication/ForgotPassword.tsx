import { useState } from "react";
import { sendResetRequest } from "../../api/api";
import { Input } from "../ui/input";
import { formSchema } from "../../validations/authentication/forgot-password"; 
// import type { FormType } from "../../validations/authentication/forgot-password";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ email?: string }>({});
  const [message, setMessage] = useState("");
  const [apiError, setApiError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setApiError("");
    setMessage("");

    const result = formSchema.safeParse({ email });

    if (!result.success) {
      const fieldErrors: { email?: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0] === "email") fieldErrors.email = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      const res = await sendResetRequest(email);

      if (res?.status === 200) {
        setMessage("If the email is registered, a reset link has been sent.");
        setEmail(""); // optional: clear the field
      }
    } catch (err) {
      console.error(err);
      setApiError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-black px-4">
      {/* Skwapper Branding */}
      <div className="absolute top-4 left-4 text-cyan-400 text-sm font-semibold tracking-widest">
        Skwapper
      </div>
      <form
        noValidate
        onSubmit={handleSubmit}
        className="bg-gray-900 p-6 rounded-lg shadow-lg text-white w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-bold">Forgot Password</h2>
        <p className="text-sm text-gray-400">
          Enter your email to receive a password reset link.
        </p>

        <Input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className=" text-white" 
        />

        {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
        {apiError && <p className="text-red-500 text-xs">{apiError}</p>}
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
