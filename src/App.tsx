
import { ThemeProvider } from "@/contexts/ThemeContext";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <ThemeProvider>
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
    </ThemeProvider>
  );
}

export default App;
