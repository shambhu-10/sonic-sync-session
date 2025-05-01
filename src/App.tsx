
import { useState, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
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
  
  if (!mounted) return null;

  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<NavWrapper>{/* Outlet will be rendered here */}</NavWrapper>}>
            <Route index element={<Index />} />
            <Route path="auth" element={<Auth />} />
            <Route path="auth/callback" element={<AuthCallback />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="faqs" element={<Faqs />} />
            <Route path="contact" element={<Contact />} />
            
            {/* Footer content pages */}
            <Route path="jam-rooms" element={<JamRooms />} />
            <Route path="live-collaboration" element={<LiveCollaboration />} />
            <Route path="loop-recording" element={<LoopRecording />} />
            <Route path="track-mixer" element={<TrackMixer />} />
            <Route path="export-mixdown" element={<ExportMixdown />} />
            <Route path="mobile-app" element={<MobileApp />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="terms" element={<Terms />} />
            <Route path="cookies" element={<Cookies />} />
            
            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="jam/:roomId?" element={<JamRoom />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
        <SonnerToaster position="top-center" expand={true} richColors />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
