import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLoginSchema } from "../../validations/admin/adminLoginSchema";
import { Input } from "../ui/input";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/store/slices/adminSlice"; // Adjust path as needed
import { login } from "@/api/api";


export default function AdminLogin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setApiError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = adminLoginSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as string;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      setLoading(true);

      const res = await login(formData);

      // Store access token in localStorage
      // localStorage.setItem("accessToken", res?.data.token);

      //  Store admin info in Redux
      console.log(res?.data.user);
      
      dispatch(loginSuccess({admin : res?.data.user ,accessToken : res?.data.token})); // reloading issue solved


      // Navigate to dashboard
      navigate("/admin/dashboard");
    } catch (err) {
      console.error("Login failed", err);
      setApiError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-full max-w-sm"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Admin Login</h2>

        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-1 px-3 py-2 border rounded"
        />
        {errors.email && (
          <p className="text-red-500 text-xs mb-2">{errors.email}</p>
        )}

        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full mb-1 px-3 py-2 border rounded"
        />
        {errors.password && (
          <p className="text-red-500 text-xs mb-2">{errors.password}</p>
        )}

        {apiError && <p className="text-red-500 text-sm mb-2">{apiError}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
