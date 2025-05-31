import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyOtp } from "../../api/api";
import { toast } from "sonner"


const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (index === 5 && value && newOtp.every((digit) => digit !== "")) {
      handleSubmit(newOtp.join(""));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (finalOtp: string) => {
    try {
      const response = await verifyOtp(email, finalOtp);
      if (response?.status === 201) {
        navigate("/login");
        console.log('dont go ok ?');
        
      } else {
        toast("OTP verification failed");
      }
    } catch (error) {
      console.error("OTP verification error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 px-4">
      <div className="bg-black/80 border border-gray-700 p-10 rounded-2xl shadow-xl text-center w-full max-w-md">
        <h2 className="text-2xl font-semibold text-white mb-2 tracking-wide">
          Verify Your <span className="text-cyan-400">Email</span>
        </h2>
        <p className="text-gray-400 text-sm mb-6">
          Enter the 6-digit code sent to <span className="text-white">{email}</span>
        </p>

        <div className="flex justify-center gap-3 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => (inputRefs.current[index] = el)}
              className="w-10 h-12 text-xl text-white text-center bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          ))}
        </div>

        <button
          onClick={() => handleSubmit(otp.join(""))}
          className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-blue-600 hover:to-cyan-500 text-white font-medium rounded-lg shadow-md  text-sm"
        >
          Verify OTP
        </button>
      </div>
    </div>
  );
};

export default VerifyOtp;
