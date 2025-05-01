
import { useState, useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import JamRoom from "./pages/JamRoom";
import Auth from "./pages/Auth";
import AuthCallback from "./pages/AuthCallback";
import Pricing from "./pages/Pricing";
import Blogs from "./pages/Blogs";
import Faqs from "./pages/Faqs";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import NavWrapper from "./components/NavWrapper";
import ProtectedRoute from "./components/ProtectedRoute";

// Content pages for footer links
import JamRooms from "./pages/JamRooms";
import LiveCollaboration from "./pages/LiveCollaboration";
import LoopRecording from "./pages/LoopRecording";
import TrackMixer from "./pages/TrackMixer";
import ExportMixdown from "./pages/ExportMixdown";
import MobileApp from "./pages/MobileApp";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Cookies from "./pages/Cookies";

import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "sonner";

const App = () => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <NavWrapper />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <Index />,
        },
        {
          path: "auth",
          element: <Auth />,
        },
        {
          path: "auth/callback",
          element: <AuthCallback />,
        },
        {
          path: "pricing",
          element: <Pricing />,
        },
        {
          path: "blogs",
          element: <Blogs />,
        },
        {
          path: "faqs",
          element: <Faqs />,
        },
        {
          path: "contact",
          element: <Contact />,
        },
        // New footer content pages
        {
          path: "jam-rooms",
          element: <JamRooms />,
        },
        {
          path: "live-collaboration",
          element: <LiveCollaboration />,
        },
        {
          path: "loop-recording",
          element: <LoopRecording />,
        },
        {
          path: "track-mixer",
          element: <TrackMixer />,
        },
        {
          path: "export-mixdown",
          element: <ExportMixdown />,
        },
        {
          path: "mobile-app",
          element: <MobileApp />,
        },
        {
          path: "privacy",
          element: <Privacy />,
        },
        {
          path: "terms",
          element: <Terms />,
        },
        {
          path: "cookies",
          element: <Cookies />,
        },
        {
          element: <ProtectedRoute />,
          children: [
            {
              path: "dashboard",
              element: <Dashboard />,
            },
            {
              path: "jam/:roomId?",
              element: <JamRoom />,
            },
            {
              path: "profile",
              element: <Profile />,
            },
          ],
        },
      ],
    },
  ]);

  if (!mounted) return null;

  return (
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster />
        <SonnerToaster position="top-center" expand={true} richColors />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
