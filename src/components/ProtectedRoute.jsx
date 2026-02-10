import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useAuth();

  /* ✅ Check if user is authenticated */
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  /* ✅ Check if user has allowed role */
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  /* ✅ Check if doctor is approved */
  if (user?.role === "doctor" && !user?.approved) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning text-center">
          <h4>⏳ Account Pending Approval</h4>
          <p>
            Your doctor account is awaiting admin approval. Please check back
            later.
          </p>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
