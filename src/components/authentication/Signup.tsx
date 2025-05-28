import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../api/api";
import Lottie from "lottie-react";
import loginanime from "../../assets/Anime/logAnime.json";
import { Input } from "../common/Input";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error on change
  };

  const validateForm = () => {
    const { userName, email, password, confirmPassword } = formData;
    const errors: { [key: string]: string } = {};

    if (!userName.trim()) errors.userName = "Name is required";
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Invalid email format";
    }
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await signup(formData);
      if (response?.status === 200) {
        navigate("/user/verify-otp", { state: { email: formData.email } });
      }
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 px-4 font-sans text-sm">
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center gap-8 bg-black/70 backdrop-blur-md p-8 rounded-2xl border border-gray-700 shadow-2xl">
        
        {/* Lottie Animation */}
        <div className="w-full md:w-1/2">
          <Lottie animationData={loginanime} loop={true} className="w-full h-auto max-h-[500px]" />
        </div>

        {/* Signup Form */}
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-semibold text-white mb-2 tracking-wide">
            Welcome to <span className="text-cyan-400">Skwapper</span>
          </h2>
          <p className="text-gray-400 mb-6 text-xs">
            Dive into the future of learning. Sign up now 
          </p>

          <form onSubmit={handleSubmit} noValidate  className="space-y-4">
            <div>
              <Input name="userName" placeholder="Name" onChange={handleChange} />
              {errors.userName && <p className="text-red-500 text-xs mt-1">{errors.userName}</p>}
            </div>

            <div>
              <Input type="email" name="email" placeholder="Email" onChange={handleChange} />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <Input type="password" name="password" placeholder="Password" onChange={handleChange} />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <div>
              <Input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} />
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-blue-600 hover:to-cyan-500 text-white font-medium rounded-lg shadow-lg"
            >
              Create Account
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
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
            Continue with Google
          </button>

          <p className="mt-6 text-center text-xs text-gray-500">
            Already have an account?{" "}
            <a href="/user/login" className="text-cyan-400 hover:underline font-medium">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
