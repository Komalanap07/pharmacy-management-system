 
import { Routes, Route,Navigate  } from "react-router-dom";
 import ProtectedRoute from "../../src/componant/ProtectedRoute";
 import { ROLES } from "../../roles";

import Login from "../../src/auth/login";
import AdminDashboard from "../pages/Dashboard";
import { RecentProjects } from "../pages/project/Project";
import AdditionalStorage from "../pages/Stormwater sizing calculater/Additional Storage/AdditionalStorage";
import BOQPricing from "../pages/Pricing And BOQ/PricingAndBOQ";
import NewProjectStormWater from "../pages/Stormwater sizing calculater/NewProjectDetails";
import ProjectType from "../pages/ProjectType";
import NewProjectEcocube from "../pages/Ecocube cost calculator/ecocubeProjectDetails";
import StormEventInput from "../pages/Stormwater sizing calculater/storm event Inputs/StormEventInputs";
import AdditionalStoragee from "../pages/Stormwater sizing calculater/Additional Storage/AdditionalStoragee";

const AppRoutes = () => {
  return (
    <Routes>
      
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Login route */}
      <Route path="/login" element={<Login />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/RecentProjects"
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <RecentProjects />
          </ProtectedRoute>
        }
      />
      {/* First type calculator routes */}
      <Route
        path="/NewProjectStormwater"
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <NewProjectStormWater />
          </ProtectedRoute>
        }
      />
      <Route
        path="/StormEventInput"
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <StormEventInput />
          </ProtectedRoute>
        }
      />
      <Route
        path="/AdditionalStoragee"
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <AdditionalStoragee />
          </ProtectedRoute>
        }
      />



      {/* Second calculator routes */}
      <Route
        path="/NewProjectEcocube"
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <NewProjectEcocube />
          </ProtectedRoute>
        }
      />
      <Route
        path="/AdditionalStorage"
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <AdditionalStorage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/BOQPricing"
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <BOQPricing />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ProjectType"
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <ProjectType />
          </ProtectedRoute>
        }
      />

      {/* Catch-all: redirect unknown routes to /login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
