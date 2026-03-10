import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, roles }) {

  const token = localStorage.getItem("auth_token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  // Not logged in
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // Role protection
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}  