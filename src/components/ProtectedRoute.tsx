
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Spinner } from "./ui/spinner";
import { useEffect } from "react";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Log for debugging
  useEffect(() => {
    console.log("ProtectedRoute - User state:", !!user, "Loading:", loading);
  }, [user, loading]);

  if (loading) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center">
        <Spinner size="lg" />
        <p className="mt-4 text-lg text-muted-foreground">Verifying your session...</p>
      </div>
    );
  }

  if (!user) {
    // Redirect to login, but save where they were going
    return <Navigate to="/auth" state={{ from: location.pathname }} replace />;
  }

  // If user is authenticated, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;
