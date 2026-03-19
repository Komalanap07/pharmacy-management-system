import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import { ROLES } from "../../roles";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import bgImage from "../../src/assets/loginbg.jpg"; // ✅ ADDED BG IMAGE

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

type Role = "admin" | "engineer" | "roles";

const EyeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ color: "#2563eb" }}
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const Login = () => {
  const [role, setRole] = useState<Role>("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        toast.error("Login failed. Please check your credentials.");
        throw new Error("Login failed");
      }

      const data = await response.json();

      const roles = data.user.roles[0];
      const token = data.access_token;
      const roleConst = ROLES.ADMIN;

      login(token, roles);

      toast.success("Login successful!");

      navigate(`/${roleConst.toLowerCase()}`);
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div
      className="d-flex"
      style={{
        height: "100vh",
        background:
          `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <ToastContainer />

      {/* Left Section */}
      {/* <div
        className="d-flex flex-column justify-content-center align-items-center flex-fill"
        style={{ padding: "64px" }}
      >
        <h1
          className="text-center fw-semibold"
          style={{ fontSize: 28 }}
        >
          Welcome to Your AI-Powered <br /> Makeover Hub
        </h1>

        <p
          className="text-center"
          style={{
            marginTop: 12,
            marginBottom: 40,
            maxWidth: 420,
            color: "#64748b",
            fontSize: 14,
          }}
        >
          Give outdated things a fresh, modern twist all with the power of AI.
        </p>

        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            height: 360,
            width: 260,
            borderRadius: 12,
            background: "#e5e7eb",
            fontSize: 20,
            color: "#475569",
          }}
        >
          WIP
        </div>
      </div> */}

      {/* Right Section */}
      <div className="d-flex justify-content-center align-items-center flex-fill">
        <div
          style={{
            width: 420,
            background: "#ffffff",
            borderRadius: 16,
            padding: 40,
            boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
          }}
        >
          <div className="d-flex align-items-center gap-2"></div>

          <h2
            className="fw-semibold"
            style={{ marginTop: 32, fontSize: 24 }}
          >
            Sign-in
          </h2>

          {/* Email */}
          <div style={{ marginBottom: 20 }}>
            <label className="form-label">Email ID</label>
            <div
              className="d-flex align-items-center"
              style={{
                gap: 8,
                border: "2px solid #2563eb",
                borderRadius: 10,
                padding: "12px 14px",
              }}
            >
              <span style={{ color: "#94a3b8" }}>@</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-0 w-100"
                style={{
                  outline: "none",
                  fontSize: 14,
                }}
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: 20 }}>
            <label className="form-label">Password</label>
            <div
              className="d-flex justify-content-between align-items-center"
              style={{
                background: "#f1f5f9",
                borderRadius: 10,
                padding: "12px 14px",
              }}
            >
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-0 bg-transparent w-100"
                style={{
                  outline: "none",
                  fontSize: 14,
                }}
              />

              <div
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: "pointer", color: "#2563eb" }}
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </div>
            </div>
          </div>

          {/* Role Dropdown */}
          <div style={{ marginBottom: 20 }}>
            <label className="form-label">Role</label>
            <div className="dropdown ">
              <button
                className="btn w-100 text-start dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                style={{
                  padding: "12px",
                  borderRadius: 10,
                  border: "1px solid #cbd5f5",
                  background: "#ffffff",
                }}
              >
                {role}
              </button>

              <ul
                className="dropdown-menu w-100"
                style={{
                  borderRadius: 8,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
                }}
              >
                {["admin", "engineer", "roles"].map((r) => (
                  <li key={r}>
                    <button
                      className="dropdown-item"
                      onClick={() => setRole(r as Role)}
                      style={{ fontSize: 14 }}
                    >
                      {r}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="w-100"
            style={{
              padding: "14px",
              borderRadius: 12,
              background: "#2563eb",
              color: "#ffffff",
              border: "none",
              fontSize: 14,
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Login
          </button>

          <p
            style={{
              marginTop: 12,
              textAlign: "right",
              fontSize: 12,
              color: "#2563eb",
            }}
          >
            Forgot password?
          </p>

          <p
            style={{
              marginTop: 32,
              textAlign: "center",
              fontSize: 14,
              color: "#64748b",
            }}
          >
            I don't have an account.
            <span style={{ color: "#2563eb", cursor: "pointer" }}>
              {" "}
              Create new account
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;