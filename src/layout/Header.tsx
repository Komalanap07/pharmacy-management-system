// import { useAuth } from "../../AuthContext";

// const Navbar = () => {
//   const { logout } = useAuth();

//   return (
//     <header className="flex items-center justify-between bg-white px-6 py-4 shadow">
//       <h1 className="text-lg font-semibold">Admin Dashboard</h1>

//       <button
//         onClick={logout}
//         className="rounded bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600"
//       >
//         Logout
//       </button>
//     </header>
//   );
// };

// export default Navbar;
import { useAuth } from "../../AuthContext";

type NavbarProps = {
  projectName: string;
  rainfallLocation: string;
  currentScreen: number;
};

const screenTitles = [
  "",
  "Dashboard",
  "Storm Event & Project Inputs",
  "Additional Storage Volumes",
  "Atlan Module Configuration",
  "Design Check",
  "Hydrograph — Volume Over Time",
  "Hydrograph Calculation Table",
];

const Navbar = ({
  projectName,
  rainfallLocation,
  currentScreen,
}: NavbarProps) => {
  const { logout } = useAuth();

  return (
    <header className="bg-white border-bottom px-4 py-3 shadow-sm">
      <div className="d-flex justify-content-between align-items-center">

        {/* Left Section */}
        <div>
          <h5 className="mb-1 text-dark mt-4">
            {screenTitles[currentScreen]}
          </h5>

          <div className="d-flex align-items-center text-muted small">
            <span>{projectName}</span>
            <span className="mx-2 text-secondary">|</span>
            <span>Location: {rainfallLocation}</span>
            <span className="mx-2 text-secondary">|</span>
            <span>Calculator: ATLAN Stormwater v2.0</span>
          </div>
        </div>

        {/* Right Section */}
        <div className="d-flex align-items-center gap-3 ">

          <span className="badge bg-success-subtle text-success border mt-4">
            Draft
          </span>

          {/* <button
            onClick={logout}
            className="btn btn-danger btn-sm"
          >
            Logout
          </button> */}

        </div>
      </div>
    </header>
  );
};

export default Navbar;
