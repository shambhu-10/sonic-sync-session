
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@/types";
import { toast } from "sonner";
import { Session as SupabaseSession } from "@supabase/supabase-js";

// Using our custom User type but Supabase's Session type structure
interface AuthContextType {
  session: SupabaseSession | null;
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signOut: () => Promise<void>;
  signInWithProvider: (provider: "github" | "google") => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<SupabaseSession | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Setting up auth state listener");
    
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log("Auth state changed:", event, currentSession?.user?.id);
        setSession(currentSession);
        
        if (currentSession?.user) {
          // Use setTimeout to avoid potential deadlocks with Supabase client
          setTimeout(async () => {
            try {
              const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', currentSession.user.id)
                .single();

              if (!error && data) {
                setUser(data as User);
              } else if (error) {
                console.error("Error fetching user profile:", error);
              }
            } catch (fetchError) {
              console.error("Exception fetching user profile:", fetchError);
            } finally {
              setLoading(false);
            }
          }, 0);
        } else {
          setUser(null);
          setLoading(false);
        }
      }
    );

    // Then check for existing session
    const initializeAuth = async () => {
      try {
        console.log("Checking for existing session...");
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        
        if (initialSession?.user) {
          console.log("Found existing session:", initialSession.user.id);
          setSession(initialSession);
          
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', initialSession.user.id)
            .single();

          if (!error && data) {
            setUser(data as User);
          } else {
            console.error("Error fetching initial user profile:", error);
          }
        } else {
          console.log("No existing session found");
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      
      if (data.session) {
        // Save session immediately to prevent loss
        setSession(data.session);
        setUser(data.user as any);
        toast.success("Signed in successfully! Welcome back!");
        navigate("/dashboard");
      }
    } catch (error: any) {
      let errorMessage = "Failed to sign in";
      
      // Handle specific error cases
      if (error.message.includes("Invalid login credentials")) {
        errorMessage = "Invalid email or password";
      } else if (error.message.includes("Email not confirmed")) {
        errorMessage = "Please verify your email before signing in";
      }
      
      toast.error(errorMessage, {
        description: error.message
      });
      console.error("Sign in error:", error.message);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, username: string) => {
    try {
      // Check if user already exists
      const { data: existingUsers, error: checkError } = await supabase
        .from('profiles')
        .select('id')
        .eq('username', username);
      
      if (checkError) {
        console.error("Error checking for existing user:", checkError);
      } else if (existingUsers && existingUsers.length > 0) {
        toast.error("Account creation failed", {
          description: "Username already taken. Please choose a different username."
        });
        return;
      }
      
      // Check if email is already in use by checking auth.users
      const { error: emailExistsError } = await supabase.auth
        .signInWithPassword({ email, password: "dummy-password-to-check-existence" });
      
      // If error doesn't include "Invalid login credentials", the email might be in use
      if (!emailExistsError || (emailExistsError && !emailExistsError.message.includes("Invalid login credentials"))) {
        toast.error("Account creation failed", {
          description: "Email address is already registered. Please sign in instead."
        });
        return;
      }
      
      // Proceed with sign up if checks pass
      const { data, error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            username
          }
        }
      });
      
      if (error) throw error;
      
      if (data.session) {
        // If auto-confirmed, sign in right away
        setSession(data.session);
        navigate("/dashboard");
        toast.success("Account created successfully! Welcome to SoundBoard!");
      } else {
        toast.success("Account created successfully!", {
          description: "Please check your email to confirm your account."
        });
      }
    } catch (error: any) {
      let errorMessage = "Failed to sign up";
      let description = error.message || "Please try again later.";
      
      // Handle specific error cases
      if (error.message.includes("already registered")) {
        errorMessage = "Email already registered";
        description = "This email is already in use. Please sign in instead.";
      }
      
      toast.error(errorMessage, {
        description: description
      });
      console.error("Sign up error:", error.message);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setSession(null);
      setUser(null);
      toast.success("Signed out successfully");
      navigate("/");
    } catch (error: any) {
      toast.error("Failed to sign out", {
        description: error.message
      });
      console.error("Sign out error:", error.message);
    }
  };

  const signInWithProvider = async (provider: "github" | "google") => {
    try {
      // Store the current path for redirect after auth
      sessionStorage.setItem('authRedirectPath', '/dashboard');
      
      // Get the current origin for the redirect URL
      const redirectTo = `${window.location.origin}/auth/callback`;
      console.log("Setting redirect URL:", redirectTo);
      
      const { data, error } = await supabase.auth.signInWithOAuth({ 
        provider,
        options: {
          redirectTo: redirectTo
        }
      });
      
      if (error) throw error;
      
      // Show a toast message indicating the redirect
      toast.info(`Redirecting to ${provider} for authentication...`);
    } catch (error: any) {
      toast.error(`Failed to sign in with ${provider}`, {
        description: error.message
      });
      console.error(`Sign in with ${provider} error:`, error.message);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      session, 
      user, 
      loading, 
      signIn, 
      signUp, 
      signOut, 
      signInWithProvider 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
