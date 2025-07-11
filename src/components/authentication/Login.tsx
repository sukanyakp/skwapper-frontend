import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/api";
import Lottie from "lottie-react";
import loginanime from "../../assets/Anime/logAnime.json";
import { Input } from "../ui/input";
import { formSchema } from "../../validations/authentication/login";
import { loginSuccess } from "@/store/slices/userSlice";
import { useDispatch } from "react-redux";
import { toast } from "sonner"; // ✅ Import toast

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = formSchema.safeParse(formData);

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
      const response = await login(formData);

      if (response?.status === 200 && response.data?.user && response.data?.token) {
        dispatch(
          loginSuccess({
            user: response.data.user,
            accessToken: response.data.token,
          })
        );
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/");
      } else {
        toast.error("Login failed. Please try again.");
      }
    } catch (error: any) {
      console.error("Login failed:", error);
      const message = error?.response?.data?.message || "Login failed. Please try again.";
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 px-4 font-sans text-sm">
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center gap-8 bg-black/70 backdrop-blur-md p-8 rounded-2xl border border-gray-700 shadow-2xl">
        {/* Lottie Animation */}
        <div className="w-full md:w-1/2">
          <Lottie animationData={loginanime} loop={true} className="w-full h-auto max-h-[500px]" />
        </div>

        {/* Login Form */}
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-semibold text-white mb-2 tracking-wide">
            Welcome Back to <span className="text-cyan-400">Skwapper</span>
          </h2>
          <p className="text-gray-400 mb-6 text-xs">
            Enter your credentials to access your account
          </p>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className=" text-white"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <Input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className=" text-white"
              />
              <div className="flex justify-between items-center">
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
                <a href="/forgot-password" className="text-sx text-cyan-400 hover:underline ml-auto">
                  Forgot Password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-blue-600 hover:to-cyan-500 text-white font-medium rounded-lg shadow-lg text-sm"
            >
              Log In
            </button>
          </form>

          <div className="flex items-center my-6 gap-2">
            <hr className="flex-grow border-t border-gray-600" />
            <span className="text-gray-500 text-xs">or</span>
            <hr className="flex-grow border-t border-gray-600" />
          </div>

          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 border border-gray-700 rounded-lg py-2 bg-gray-900 hover:bg-gray-800 text-white transition text-sm"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>

          <p className="mt-6 text-center text-xs text-gray-500">
            Don’t have an account?{" "}
            <a href="/signup" className="text-cyan-400 hover:underline font-medium">
              Create one
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
