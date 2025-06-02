import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerAdmin } from "../../api/adminApi"

export default function AdminRegister() {
  const [name , setName] = useState("")  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('form submitted');
    

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await registerAdmin(name, email, password);
      console.log(res , 'here is the response of frontend register .. .. .  ');
      
      if (res?.status === 201) {
        navigate("/admin/login");
      }
    } catch (err) {
      setError("Registration failed. Try another email.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4 text-center">Admin Registration</h2>
        <input 
        type="text" 
        placeholder="name"
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        className="w-full mb-3 px-3 py-2 border rounded"
        required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 px-3 py-2 border rounded"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-3 px-3 py-2 border rounded"
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="w-full mb-3 px-3 py-2 border rounded"
          required
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Register
        </button>
      </form>
    </div>
  );
}
