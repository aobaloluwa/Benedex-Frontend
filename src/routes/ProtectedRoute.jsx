import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Unauthorized from "../pages/public/Unauthorized";

function ProtectedRoute({ children, roles }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Unauthorized />;
  }

  return children;
}

export default ProtectedRoute;