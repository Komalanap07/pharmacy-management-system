import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import { ROLES } from "../../roles";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import bgImage from "../assets/loginbg.jpg";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
type Role = "admin" | "engineer" | "roles";

const Login = () => {
  const [role, setRole] = useState<Role>("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) { toast.error("Login failed. Please check your credentials."); return; }
      const data = await response.json();
      login(data.access_token, data.user.roles[0]);
      toast.success("Login successful!");
      navigate(`/${ROLES.ADMIN.toLowerCase()}`);
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div
      className="flex h-screen"
      style={{
        background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${bgImage})`,
        backgroundSize: "cover", backgroundPosition: "center",
      }}
    >
      <ToastContainer />

      <div className="flex justify-center items-center flex-1">
        <div className="bg-white rounded-2xl p-10 w-[420px] shadow-2xl">
          <h2 className="font-semibold text-2xl mt-8">Sign-in</h2>

          {/* Email */}
          <div className="mb-5 mt-4">
            <label className="block text-sm mb-1">Email ID</label>
            <div className="flex items-center gap-2 border-2 border-blue-500 rounded-xl px-3 py-3">
              <span className="text-gray-400">@</span>
              <input
                type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                className="flex-1 outline-none text-sm border-0"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-5">
            <label className="block text-sm mb-1">Password</label>
            <div className="flex justify-between items-center bg-gray-100 rounded-xl px-3 py-3">
              <input
                type={showPassword ? "text" : "password"} value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 outline-none text-sm bg-transparent border-0"
              />
              <div onClick={() => setShowPassword(!showPassword)} className="cursor-pointer text-blue-600">
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </div>
            </div>
          </div>

          {/* Role Dropdown */}
          <div className="mb-5 relative">
            <label className="block text-sm mb-1">Role</label>
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full text-left border border-blue-200 rounded-xl px-3 py-3 text-sm bg-white flex justify-between items-center"
            >
              {role}
              <span className="text-gray-400">▾</span>
            </button>
            {dropdownOpen && (
              <ul className="absolute w-full bg-white border rounded-xl shadow-lg z-10 mt-1">
                {(["admin", "engineer", "roles"] as Role[]).map((r) => (
                  <li key={r}>
                    <button
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                      onClick={() => { setRole(r); setDropdownOpen(false); }}
                    >
                      {r}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-sm font-medium"
          >
            Login
          </button>

          <p className="mt-3 text-right text-xs text-blue-600 cursor-pointer">Forgot password?</p>
          <p className="mt-8 text-center text-sm text-gray-400">
            I don't have an account.{" "}
            <span className="text-blue-600 cursor-pointer">Create new account</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
