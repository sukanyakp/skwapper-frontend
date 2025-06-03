import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Input } from "../ui/input";
import { resetPassword } from "../../api/api";
import { resetPasswordSchema } from "../../validations/authentication/reset-password"; // update path if needed

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string }>({});
  const [apiError, setApiError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setApiError("");
    setMessage("");

    const result = resetPasswordSchema.safeParse({ password, confirmPassword });

    if (!result.success) {
      const fieldErrors: { password?: string; confirmPassword?: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0] === "password") fieldErrors.password = err.message;
        if (err.path[0] === "confirmPassword") fieldErrors.confirmPassword = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      const res = await resetPassword(token, password);
      if (res?.status === 200) {
        setMessage("Password reset successful!");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (err) {
      console.error(err);
      setApiError("Invalid or expired reset link.");
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
          className=" text-white" 
        />
        {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}

        <Input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className=" text-white" 
        />
        {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}

        {apiError && <p className="text-red-500 text-xs">{apiError}</p>}
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
