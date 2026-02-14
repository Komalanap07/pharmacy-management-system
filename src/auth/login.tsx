import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import { ROLES } from "../../roles";
// // import { Eye } from "lucide-react";

// const Login = () => {
//   const navigate = useNavigate();
//   const { login } = useAuth();
// const EyeIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="18"
//     height="18"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     className="text-blue-600"
//   >
//     <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
//     <circle cx="12" cy="12" r="3" />
//   </svg>
// );

//   const handleLogin = () => {
//     // mock response from backend
//     const role = ROLES.ADMIN;
//     const token = "jwt_token";

//     login(token, role);
//     navigate(`/${role.toLowerCase()}`);
//   };

//   return (
//     <div className="flex h-screen w-full bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200">
//       {/* Left Section */}
//       <div className="hidden w-1/2 flex-col items-center justify-center px-16 lg:flex">
//         <h1 className="mb-3 text-center text-3xl font-semibold text-slate-800">
//           Welcome to Your AI-Powered <br /> Makeover Hub
//         </h1>
//         <p className="mb-10 max-w-md text-center text-sm text-slate-500">
//           Give outdated things a fresh, modern twist all with the power of AI.
//         </p>

//         {/* WIP Card */}
//         <div className="flex h-[360px] w-[260px] items-center justify-center rounded-xl bg-slate-200 text-xl tracking-wide text-slate-600">
//           WIP
//         </div>
//       </div>

//       {/* Right Section */}
//       <div className="flex w-full items-center justify-center lg:w-1/2">
//         <div className="w-[420px] rounded-2xl bg-white p-10 shadow-xl">
//           {/* Logo */}
//           <div className="mb-8 flex items-center gap-2">
//             <span className="text-lg font-semibold tracking-wide text-slate-800">
               
//             </span>
//             <span className="h-3 w-3 rotate-45 bg-yellow-400" />
//           </div>

//           <h2 className="mb-1 text-2xl font-semibold text-slate-800">
//             Sign-in
//           </h2>
//           <p className="mb-8 text-sm text-slate-500">
//             Sign Up to transform the old into something extraordinary.
//           </p>

//           {/* Email */}
//           <div className="mb-5">
//             <label className="mb-1 block text-xs font-medium text-slate-500">
//               Email ID
//             </label>
//             <div className="flex items-center gap-2 rounded-xl border-2 border-blue-500 px-4 py-3">
//               <span className="text-slate-400">@</span>
//               <input
//                 type="email"
//                 defaultValue="admin@gmail.com"
//                 className="w-full bg-transparent text-sm text-slate-700 outline-none"
//               />
//             </div>
//           </div>

//           {/* Password */}
//           <div className="mb-6">
//             <label className="mb-1 block text-xs font-medium text-slate-500">
//               Password
//             </label>
//             <div className="flex items-center justify-between rounded-xl bg-slate-100 px-4 py-3">
//               <div className="flex items-center gap-2">
//                 <span className="text-slate-400">🔒</span>
//                 <input
//                   type="password"
//                   value="password"
//                   readOnly
//                   className="w-full bg-transparent text-sm text-slate-700 outline-none"
//                 />
//               </div>
//               <EyeIcon />
//             </div>
//           </div>

//           {/* Login Button */}
//           <button
//             onClick={handleLogin}
//             className="mb-3 w-full rounded-xl bg-blue-600 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
//           >
//             Login
//           </button>
//            <button className="btn btn-info">
//             h
//            </button>
//           <div className="mb-6 text-right text-xs text-blue-600">
//             Forgot password?
//           </div>

//           {/* Footer Links */}
//           <p className="mb-10 text-center text-sm text-slate-500">
//             I don't have an account.
//             <span className="cursor-pointer text-blue-600">
//               {" "}
//               Create new account
//             </span>
//           </p>

//           <p className="text-center text-xs text-slate-400">
//             Copyright © 2023 Yokogawa. All Rights Reserved
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
import { useState} from "react";

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
  const navigate = useNavigate();
  const { login } = useAuth();

   const handleLogin = () => {
    // mock response from backend
    const role = ROLES.ADMIN;
    const token = "jwt_token";

    login(token, role);
    navigate(`/${role.toLowerCase()}`);
  };

  return (
    <div
      className="d-flex"
      style={{
        height: "100vh",
        background:
          "linear-gradient(135deg,#f1f5f9,#f8fafc,#e5e7eb)",
      }}
    >
      {/* Left Section */}
      <div
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
      </div>

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
          {/* Logo Placeholder */}
          <div className="d-flex align-items-center gap-2"></div>

          <h2
            className="fw-semibold"
            style={{ marginTop: 32, fontSize: 24 }}
          >
            Sign-in
          </h2>

          {/* <p
            style={{
              fontSize: 14,
              color: "#64748b",
              marginBottom: 32,
            }}
          >
            Sign Up to transform the old into something extraordinary.
          </p> */}

          {/* Email */}
          <div style={{ marginBottom: 20 }}>
            <label className="form-label">Email ID</label>
            <div
              className="d-flex align-items-center"
              style={{
                // marginTop: 2,
                gap: 8,
                border: "2px solid #2563eb",
                borderRadius: 10,
                padding: "12px 14px",
              }}
            >
              <span style={{ color: "#94a3b8" }}>@</span>
              <input
                type="email"
                defaultValue="admin@gmail.com"
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
                // marginTop: 6,
                background: "#f1f5f9",
                borderRadius: 10,
                padding: "12px 14px",
              }}
            >
              <input
                type="password"
                value="password"
                readOnly
                className="border-0 bg-transparent"
                style={{
                  outline: "none",
                  fontSize: 14,
                }}
              />
              <EyeIcon />
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

          {/* Login */}
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

          {/* <p
            style={{
              marginTop: 32,
              textAlign: "center",
              fontSize: 12,
              color: "#94a3b8",
            }}
          >
            Copyright © 2023. All Rights Reserved
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
