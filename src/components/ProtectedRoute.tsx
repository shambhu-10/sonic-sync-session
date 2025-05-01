
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Spinner } from "./ui/spinner";
import { useEffect } from "react";

const ProtectedRoute = () => {
  const { user, loading, session } = useAuth();
  const location = useLocation();

  // Log for debugging
  useEffect(() => {
    console.log("ProtectedRoute - User state:", !!user, "Session:", !!session, "Loading:", loading);
  }, [user, session, loading]);

  if (loading) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center">
        <Spinner size="lg" className="text-primary" />
        <p className="mt-4 text-lg text-muted-foreground">Verifying your session...</p>
      </div>
    );
  }

  if (!user || !session) {
    // Save current location for redirect after login
    const currentPath = location.pathname;
    if (currentPath !== '/auth') {
      sessionStorage.setItem('authRedirectPath', currentPath);
    }
    
    // Redirect to login
    return <Navigate to="/auth" replace />;
  }

  // If user is authenticated, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;
