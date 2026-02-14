import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
// import { ROLES } from "../../roles";
import type { Role } from "../../roles";
import { useAuth } from "../../AuthContext";

interface Props {
  allowedRoles: Role[];
  children: ReactNode;
}

const ProtectedRoute = ({ allowedRoles, children }: Props) => {
  const { token, role } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
