import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "../AuthContext";

// 1️⃣ Bootstrap (load first)
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";

// 2️⃣ Tailwind (load AFTER bootstrap so utilities override)
import "./index.css";

// Bootstrap JS
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Datatables
import "datatables.net-bs5";
import "datatables.net-responsive-bs5";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);