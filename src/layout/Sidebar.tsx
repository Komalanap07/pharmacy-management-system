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
  const allowedRoutes = [
    "/admin", "/products", "/inventory", "/expiry-alert",
    "/product-config", "/rack-location", "/qr-scanner", "/prescription", "/analytics"
  ];

  const base = "flex items-center gap-2 px-4 py-3 no-underline text-sm transition-colors";
  const active = "bg-cyan-50 text-cyan-600 border-r-4  font-medium";
  const inactive = "text-gray-700 hover:bg-cyan-50";

  const handleNavigation = (e: React.MouseEvent, path: string) => {
    if (!allowedRoutes.includes(path)) e.preventDefault();
  };

  return (
    <aside className="flex flex-col shadow-sm bg-white w-[260px] min-h-screen">
      <div className="p-4 shadow-sm">
        <h5 className="font-semibold text-cyan-600 ">M Pharma System</h5>
        <small className="text-gray-500">Management Console</small>
      </div>

      <nav className="flex-1 py-3">
        <NavLink to="/admin" end onClick={(e) => handleNavigation(e, "/admin")}
          className={({ isActive }) => `${base} ${isActive ? active : inactive}`}>
          <LayoutDashboard size={18} /> Dashboard
        </NavLink>

        <NavLink to="/products" onClick={(e) => handleNavigation(e, "/products")}
          className={({ isActive }) => `${base} ${isActive ? active : inactive}`}>
          <Pill size={18} /> Products
        </NavLink>

        <NavLink to="/inventory" onClick={(e) => handleNavigation(e, "/inventory")}
          className={({ isActive }) => `${base} ${isActive ? active : inactive}`}>
          <Boxes size={18} /> Inventory
        </NavLink>

        <NavLink to="/expiry-alert" onClick={(e) => handleNavigation(e, "/expiry-alert")}
          className={({ isActive }) => `${base} ${isActive ? active : inactive}`}>
          <AlertTriangle size={18} /> Expiry Alert
        </NavLink>

        <NavLink to="/product-config" onClick={(e) => handleNavigation(e, "/product-config")}
          className={({ isActive }) => `${base} ${isActive ? active : inactive}`}>
          <Settings size={18} /> Product Config
        </NavLink>

        <NavLink to="/rack-location" onClick={(e) => handleNavigation(e, "/rack-location")}
          className={({ isActive }) => `${base} ${isActive ? active : inactive}`}>
          <MapPin size={18} /> Rack Location
        </NavLink>

        <NavLink to="/qr-scanner" onClick={(e) => handleNavigation(e, "/qr-scanner")}
          className={({ isActive }) => `${base} ${isActive ? active : inactive}`}>
          <QrCode size={18} /> QR Scanner
        </NavLink>

        <NavLink to="/prescription" onClick={(e) => handleNavigation(e, "/prescription")}
          className={({ isActive }) => `${base} ${isActive ? active : inactive}`}>
          <FileText size={18} /> Prescription
        </NavLink>

        <NavLink to="/analytics" onClick={(e) => handleNavigation(e, "/analytics")}
          className={({ isActive }) => `${base} ${isActive ? active : inactive}`}>
          <BarChart3 size={18} /> Analytics
        </NavLink>
      </nav>

      <div className="p-4 shadow-sm">
        <small className="text-gray-400">Phase 1: Admin Configuration</small>
      </div>
    </aside>
  );
};

export default Sidebar;
