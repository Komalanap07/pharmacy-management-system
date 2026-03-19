import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Pill,
  Boxes,
  AlertTriangle,
  Settings,
  MapPin,
  QrCode,
  FileText,
  BarChart3
} from "lucide-react";

const Sidebar = () => {

  // 🔒 Only allow these routes
  const allowedRoutes = [
    "/admin",
    "/products",
    "/inventory",
    "/expiry-alert",
    "/product-config",
    "/rack-location",
    "/qr-scanner",
    "/prescription",
    "/analytics"
  ];

  const baseClasses =
    "d-flex align-items-center gap-2 px-4 py-3 text-decoration-none small transition";

  const activeClasses =
    "bg-primary bg-opacity-10 text-primary border-end border-4 border-primary fw-medium px-4 py-3";

  // 🔒 Block navigation if route not allowed
  const handleNavigation = (e: React.MouseEvent, path: string) => {
    if (!allowedRoutes.includes(path)) {
      e.preventDefault();
    }
  };

  return (
    <aside
      className="d-flex flex-column bg-white border-end"
      style={{ width: "260px", minHeight: "100vh" }}
    >
      {/* Header */}
      <div className="p-4 border-bottom">
        <h5 className="fw-semibold text-primary mb-1">
          M Pharma System
        </h5>
        <small className="text-muted">
          Management Console
        </small>
      </div>

      {/* Navigation */}
      <nav className="flex-fill py-3">

        <NavLink
          to="/admin"
          end
          onClick={(e) => handleNavigation(e, "/admin")}
          className={({ isActive }) =>
            `${baseClasses} ${isActive ? activeClasses : "text-dark"}`
          }
        >
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        <NavLink
          to="/products"
          onClick={(e) => handleNavigation(e, "/products")}
          className={({ isActive }) =>
            `${baseClasses} ${isActive ? activeClasses : "text-dark"}`
          }
        >
          <Pill size={18} />
          Products
        </NavLink>

        <NavLink
          to="/inventory"
          onClick={(e) => handleNavigation(e, "/inventory")}
          className={({ isActive }) =>
            `${baseClasses} ${isActive ? activeClasses : "text-dark"}`
          }
        >
          <Boxes size={18} />
          Inventory
        </NavLink>

        <NavLink
          to="/expiry-alert"
          onClick={(e) => handleNavigation(e, "/expiry-alert")}
          className={({ isActive }) =>
            `${baseClasses} ${isActive ? activeClasses : "text-dark"}`
          }
        >
          <AlertTriangle size={18} />
          Expiry Alert
        </NavLink>

        <NavLink
          to="/product-config"
          onClick={(e) => handleNavigation(e, "/product-config")}
          className={({ isActive }) =>
            `${baseClasses} ${isActive ? activeClasses : "text-dark"}`
          }
        >
          <Settings size={18} />
          Product Config
        </NavLink>

        <NavLink
          to="/rack-location"
          onClick={(e) => handleNavigation(e, "/rack-location")}
          className={({ isActive }) =>
            `${baseClasses} ${isActive ? activeClasses : "text-dark"}`
          }
        >
          <MapPin size={18} />
          Rack Location
        </NavLink>

        <NavLink
          to="/qr-scanner"
          onClick={(e) => handleNavigation(e, "/qr-scanner")}
          className={({ isActive }) =>
            `${baseClasses} ${isActive ? activeClasses : "text-dark"}`
          }
        >
          <QrCode size={18} />
          QR Scanner
        </NavLink>

        <NavLink
          to="/prescription"
          onClick={(e) => handleNavigation(e, "/prescription")}
          className={({ isActive }) =>
            `${baseClasses} ${isActive ? activeClasses : "text-dark"}`
          }
        >
          <FileText size={18} />
          Prescription
        </NavLink>

        <NavLink
          to="/analytics"
          onClick={(e) => handleNavigation(e, "/analytics")}
          className={({ isActive }) =>
            `${baseClasses} ${isActive ? activeClasses : "text-dark"}`
          }
        >
          <BarChart3 size={18} />
          Analytics
        </NavLink>

      </nav>

      {/* Footer */}
      <div className="p-4 border-top">
        <small className="text-muted">
          Phase 1: Admin Configuration
        </small>
      </div>
    </aside>
  );
};

export default Sidebar;