
import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import NavWrapper from "./components/NavWrapper";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import AuthCallback from "./pages/AuthCallback";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import JamRoom from "./pages/JamRoom";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import JamRooms from "./pages/JamRooms";
import LiveCollaboration from "./pages/LiveCollaboration";
import LoopRecording from "./pages/LoopRecording";
import TrackMixer from "./pages/TrackMixer";
import ExportMixdown from "./pages/ExportMixdown";
import MobileApp from "./pages/MobileApp";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import Faqs from "./pages/Faqs";
import Pricing from "./pages/Pricing";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Cookies from "./pages/Cookies";
import { AuthProvider } from "./contexts/AuthContext";
import { Outlet } from "react-router-dom";

// AuthWrapper component to provide authentication context
const AuthWrapper = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};

// Define routes
const routes: RouteObject[] = [
  {
    element: <AuthWrapper />,
    children: [
      {
        path: "/",
        element: <NavWrapper />,
        children: [
          { index: true, element: <Index /> },
          { path: "auth", element: <Auth /> },
          { path: "auth/callback", element: <AuthCallback /> },
          // Protected routes
          {
            element: <ProtectedRoute />,
            children: [
              { path: "dashboard", element: <Dashboard /> },
              { path: "room/:roomId", element: <JamRoom /> },
              { path: "profile", element: <Profile /> },
            ],
          },
          // Public routes for features
          { path: "jam-rooms", element: <JamRooms /> },
          { path: "live-collaboration", element: <LiveCollaboration /> },
          { path: "loop-recording", element: <LoopRecording /> },
          { path: "track-mixer", element: <TrackMixer /> },
          { path: "export-mixdown", element: <ExportMixdown /> },
          { path: "mobile-app", element: <MobileApp /> },
          // Static pages
          { path: "blogs", element: <Blogs /> },
          { path: "contact", element: <Contact /> },
          { path: "faqs", element: <Faqs /> },
          { path: "pricing", element: <Pricing /> },
          { path: "privacy", element: <Privacy /> },
          { path: "terms", element: <Terms /> },
          { path: "cookies", element: <Cookies /> },
          // 404
          { path: "404", element: <NotFound /> },
          { path: "*", element: <Navigate to="/404" /> }
        ],
      },
    ],
  },
];

// Create router
export const router = createBrowserRouter(routes);
