// import { NavLink } from "react-router-dom";

// const Sidebar = () => {
//   return (
//     <aside className="w-64 bg-gray-900 text-white">
//       <div className="p-4 text-xl font-bold border-b border-gray-700">
//         Admin Panel
//       </div>

//       <nav className="p-4 space-y-2">
//         <NavLink
//           to="/admin"
//           className={({ isActive }) =>
//             `block rounded px-4 py-2 ${
//               isActive ? "bg-gray-700" : "hover:bg-gray-800"
//             }`
//           }
//         >
//           Dashboard
//         </NavLink>

//         <NavLink
//           to="/admin/users"
//           className="block rounded px-4 py-2 hover:bg-gray-800"
//         >
//           Users
//         </NavLink>

//         <NavLink
//           to="/admin/settings"
//           className="block rounded px-4 py-2 hover:bg-gray-800"
//         >
//           Settings
//         </NavLink>
//       </nav>
//     </aside>
//   );
// };

// export default Sidebar;
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  CloudRain,
  Database,
  Package,
  ShieldCheck,
  Waves,
  Table2
} from "lucide-react";

const Sidebar = () => {
  const baseClasses =
    "d-flex align-items-center gap-2 px-4 py-3 text-decoration-none small transition";

  const activeClasses =
    "bg-primary bg-opacity-10 text-primary border-end border-4 border-primary fw-medium px-4 py-3";

  return (
    <aside
      className="d-flex flex-column bg-white border-end"
      style={{ width: "260px", minHeight: "100vh" }}
    >
      {/* Header */}
      <div className="p-4 border-bottom">
        <h5 className="fw-semibold text-primary mb-1">
          Admin Panel
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
          className={({ isActive }) =>
            `${baseClasses} ${isActive ? activeClasses : "text-dark"}`
          }
        >
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        <NavLink
          to="/RecentProjects"
          className={({ isActive }) =>
            `${baseClasses} ${isActive ? activeClasses : "text-dark"}`
          }
        >
          <FolderKanban size={18} />
          Projects
        </NavLink>

        <NavLink
          to="/StormEventInput"
          className={({ isActive }) =>
            `${baseClasses} ${isActive ? activeClasses : "text-dark"}`
          }
        >
          <CloudRain size={18} />
          Storm Event Inputs
        </NavLink>

        <NavLink
          to="/AdditionalStoragee"
          className={({ isActive }) =>
            `${baseClasses} ${isActive ? activeClasses : "text-dark"}`
          }
        >
          <Database size={18} />
          Additional Storage
        </NavLink>

        <NavLink
          to="/admin/product-config"
          className={({ isActive }) =>
            `${baseClasses} ${isActive ? activeClasses : "text-dark"}`
          }
        >
          <Package size={18} />
          Product Config
        </NavLink>

        <NavLink
          to="/admin/design-check"
          className={({ isActive }) =>
            `${baseClasses} ${isActive ? activeClasses : "text-dark"}`
          }
        >
          <ShieldCheck size={18} />
          Design Check
        </NavLink>

        <NavLink
          to="/admin/hydrograph"
          className={({ isActive }) =>
            `${baseClasses} ${isActive ? activeClasses : "text-dark"}`
          }
        >
          <Waves size={18} />
          Hydrograph
        </NavLink>

        <NavLink
          to="/admin/calculation-table"
          className={({ isActive }) =>
            `${baseClasses} ${isActive ? activeClasses : "text-dark"}`
          }
        >
          <Table2 size={18} />
          Calculation Table
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
