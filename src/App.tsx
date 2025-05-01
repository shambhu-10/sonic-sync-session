
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import MainNav from "./components/MainNav";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import AuthCallback from "./pages/AuthCallback";
import Dashboard from "./pages/Dashboard";
import JamRoom from "./pages/JamRoom";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import { AnimatePresence } from "framer-motion";
import Faqs from "./pages/Faqs";
import Pricing from "./pages/Pricing";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import BackgroundMusic from "./components/BackgroundMusic";

// Create query client instance outside of the component
const queryClient = new QueryClient();

// Define App component as a proper function component
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <div className="flex flex-col min-h-screen">
                <MainNav />
                <BackgroundMusic />
                <div className="flex-grow">
                  <AnimatePresence mode="wait">
                    <Routes>
                      {/* Public Routes */}
                      <Route path="/" element={<Index />} />
                      <Route path="/auth" element={<Auth />} />
                      <Route path="/auth/callback" element={<AuthCallback />} />
                      <Route path="/faqs" element={<Faqs />} />
                      <Route path="/pricing" element={<Pricing />} />
                      <Route path="/blogs" element={<Blogs />} />
                      <Route path="/contact" element={<Contact />} />
                      
                      {/* Protected Routes */}
                      <Route element={<ProtectedRoute />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/jam/:roomId" element={<JamRoom />} />
                        <Route path="/profile" element={<Profile />} />
                      </Route>
                      
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </AnimatePresence>
                </div>
                <Footer />
              </div>
            </TooltipProvider>
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
