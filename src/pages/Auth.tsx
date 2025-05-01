
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  GithubIcon, 
  EyeIcon, 
  EyeOffIcon, 
  CheckIcon, 
  XIcon, 
  Mail, 
  LockKeyhole
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";

const Auth = () => {
  const { signIn, signUp, signInWithProvider, user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("login");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Login form states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  
  // Signup form states
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Redirect if already logged in
  if (user && !loading) {
    return <Navigate to="/dashboard" replace />;
  }
  
  const checkPasswordStrength = (password: string) => {
    let strength = 0;
    
    if (password.length >= 8) strength += 25;
    if (password.match(/[a-z]+/)) strength += 25;
    if (password.match(/[A-Z]+/)) strength += 25;
    if (password.match(/[0-9]+/) || password.match(/[^a-zA-Z0-9]+/)) strength += 25;
    
    return strength;
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setSignupPassword(newPassword);
    setPasswordStrength(checkPasswordStrength(newPassword));
  };

  const getStrengthLabel = () => {
    if (passwordStrength <= 25) return "Weak";
    if (passwordStrength <= 50) return "Fair";
    if (passwordStrength <= 75) return "Good";
    return "Strong";
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 25) return "bg-red-500";
    if (passwordStrength <= 50) return "bg-yellow-500";
    if (passwordStrength <= 75) return "bg-green-400";
    return "bg-green-500";
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      await signIn(loginEmail, loginPassword);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      await signUp(signupEmail, signupPassword, username);
      setActiveTab("login");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container max-w-md mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="overflow-hidden bg-card dark:bg-gray-900 shadow-md">
          <CardHeader className="space-y-1 text-center pb-0">
            <motion.h1 
              className="text-3xl font-bold tracking-tight text-primary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Welcome to SoundBoard
            </motion.h1>
          </CardHeader>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            {/* Login Tab */}
            <TabsContent value="login">
              <form onSubmit={handleLoginSubmit}>
                <CardContent className="space-y-4 pt-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="password">Password</Label>
                      <Link
                        to="/forgot-password"
                        className="text-xs text-soundboard-accent hover:text-soundboard-primary"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <LockKeyhole className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="password"
                        type={showLoginPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="pl-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowLoginPassword(!showLoginPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                      >
                        {showLoginPassword ? (
                          <EyeOffIcon className="h-4 w-4" />
                        ) : (
                          <EyeIcon className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-soundboard-accent hover:bg-soundboard-secondary transition-all"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Signing in..." : "Sign In"}
                  </Button>
                  
                  <div className="relative flex justify-center items-center">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <span className="relative bg-card px-2 text-xs text-muted-foreground dark:bg-gray-900">
                      Or continue with
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Button 
                      type="button"
                      variant="outline" 
                      className="transition-all" 
                      disabled={isSubmitting}
                      onClick={() => signInWithProvider("google")}
                    >
                      <svg className="mr-2 h-4 w-4" viewBox="0 0 533.5 544.3">
                        <path
                          d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                          fill="#4285f4"
                        />
                        <path
                          d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                          fill="#34a853"
                        />
                        <path
                          d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                          fill="#fbbc04"
                        />
                        <path
                          d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                          fill="#ea4335"
                        />
                      </svg>
                      Google
                    </Button>
                    <Button 
                      type="button"
                      variant="outline" 
                      className="transition-all" 
                      disabled={isSubmitting}
                      onClick={() => signInWithProvider("github")}
                    >
                      <GithubIcon className="mr-2 h-4 w-4" />
                      GitHub
                    </Button>
                  </div>
                </CardContent>
              </form>
            </TabsContent>
            
            {/* Signup Tab */}
            <TabsContent value="signup">
              <form onSubmit={handleSignupSubmit}>
                <CardContent className="space-y-4 pt-6">
                  <div className="space-y-2">
                    <Label htmlFor="signup-username">Username</Label>
                    <Input
                      id="signup-username"
                      placeholder="johndoe"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="name@example.com"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="signup-password"
                        type={showSignupPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={signupPassword}
                        onChange={handlePasswordChange}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowSignupPassword(!showSignupPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                      >
                        {showSignupPassword ? (
                          <EyeOffIcon className="h-4 w-4" />
                        ) : (
                          <EyeIcon className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    
                    {signupPassword && (
                      <motion.div 
                        className="mt-2 space-y-2"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">Password strength:</span>
                          <span className="text-xs font-medium">{getStrengthLabel()}</span>
                        </div>
                        <Progress value={passwordStrength} className={getStrengthColor()} />
                        
                        <div className="grid grid-cols-2 gap-2 mt-4">
                          <div className="flex items-center text-xs">
                            {signupPassword.length >= 8 ? (
                              <CheckIcon className="h-3 w-3 mr-1 text-green-500" />
                            ) : (
                              <XIcon className="h-3 w-3 mr-1 text-red-500" />
                            )}
                            <span className="text-muted-foreground">At least 8 characters</span>
                          </div>
                          <div className="flex items-center text-xs">
                            {signupPassword.match(/[a-z]/) && signupPassword.match(/[A-Z]/) ? (
                              <CheckIcon className="h-3 w-3 mr-1 text-green-500" />
                            ) : (
                              <XIcon className="h-3 w-3 mr-1 text-red-500" />
                            )}
                            <span className="text-muted-foreground">Upper & lowercase</span>
                          </div>
                          <div className="flex items-center text-xs">
                            {signupPassword.match(/[0-9]/) ? (
                              <CheckIcon className="h-3 w-3 mr-1 text-green-500" />
                            ) : (
                              <XIcon className="h-3 w-3 mr-1 text-red-500" />
                            )}
                            <span className="text-muted-foreground">At least 1 number</span>
                          </div>
                          <div className="flex items-center text-xs">
                            {signupPassword.match(/[^a-zA-Z0-9]/) ? (
                              <CheckIcon className="h-3 w-3 mr-1 text-green-500" />
                            ) : (
                              <XIcon className="h-3 w-3 mr-1 text-red-500" />
                            )}
                            <span className="text-muted-foreground">Special character</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-soundboard-accent hover:bg-soundboard-secondary transition-all"
                    disabled={isSubmitting || passwordStrength < 50}
                  >
                    {isSubmitting ? "Creating account..." : "Create Account"}
                  </Button>
                  
                  <div className="relative flex justify-center items-center">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <span className="relative bg-card px-2 text-xs text-muted-foreground dark:bg-gray-900">
                      Or continue with
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Button 
                      type="button"
                      variant="outline" 
                      className="transition-all" 
                      disabled={isSubmitting}
                      onClick={() => signInWithProvider("google")}
                    >
                      <svg className="mr-2 h-4 w-4" viewBox="0 0 533.5 544.3">
                        <path
                          d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                          fill="#4285f4"
                        />
                        <path
                          d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                          fill="#34a853"
                        />
                        <path
                          d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                          fill="#fbbc04"
                        />
                        <path
                          d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                          fill="#ea4335"
                        />
                      </svg>
                      Google
                    </Button>
                    <Button 
                      type="button"
                      variant="outline" 
                      className="transition-all" 
                      disabled={isSubmitting}
                      onClick={() => signInWithProvider("github")}
                    >
                      <GithubIcon className="mr-2 h-4 w-4" />
                      GitHub
                    </Button>
                  </div>
                </CardContent>
              </form>
            </TabsContent>
          </Tabs>
          
          <CardFooter className="flex justify-center py-4">
            <p className="text-sm text-muted-foreground">
              {activeTab === 'login' ? (
                <>
                  Don't have an account?{" "}
                  <Button 
                    variant="link" 
                    className="p-0 font-medium text-soundboard-accent hover:text-soundboard-primary"
                    onClick={() => setActiveTab('signup')}
                  >
                    Sign up
                  </Button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <Button 
                    variant="link" 
                    className="p-0 font-medium text-soundboard-accent hover:text-soundboard-primary"
                    onClick={() => setActiveTab('login')}
                  >
                    Sign in
                  </Button>
                </>
              )}
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default Auth;
