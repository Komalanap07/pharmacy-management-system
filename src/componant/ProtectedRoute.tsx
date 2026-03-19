 import { Navigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
interface Props {
  children: JSX.Element;
  allowedRoles?: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: Props) => {
  const { token, role } = useAuth();

  // Not logged in
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Role not allowed
  if (allowedRoles && !allowedRoles.includes(role || "")) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;