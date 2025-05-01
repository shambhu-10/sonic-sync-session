
import { ThemeProvider } from "@/contexts/ThemeContext";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster 
          position="top-center" 
          closeButton 
          richColors 
          toastOptions={{
            duration: 4000,
            className: "font-medium",
          }} 
        />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
