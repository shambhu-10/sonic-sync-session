
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { GithubIcon, EyeIcon, EyeOffIcon, CheckIcon, XIcon } from "lucide-react";
import { toast } from "sonner";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

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
    setPassword(newPassword);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate signup process
    setTimeout(() => {
      toast("Please connect Supabase", {
        description: "Authentication requires connecting to Supabase first."
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="container max-w-md mx-auto px-4 py-16">
      <Card className="animate-fade-in">
        <CardHeader className="space-y-1 text-center">
          <h1 className="text-2xl font-bold tracking-tight">Create an account</h1>
          <p className="text-sm text-muted-foreground">
            Join SoundBoard and start making music together
          </p>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-4 w-4" />
                  ) : (
                    <EyeIcon className="h-4 w-4" />
                  )}
                </button>
              </div>
              
              {password && (
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Password strength:</span>
                    <span className="text-xs font-medium">{getStrengthLabel()}</span>
                  </div>
                  <Progress value={passwordStrength} className={getStrengthColor()} />
                  
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <div className="flex items-center text-xs">
                      {password.length >= 8 ? (
                        <CheckIcon className="h-3 w-3 mr-1 text-green-500" />
                      ) : (
                        <XIcon className="h-3 w-3 mr-1 text-red-500" />
                      )}
                      <span className="text-muted-foreground">At least 8 characters</span>
                    </div>
                    <div className="flex items-center text-xs">
                      {password.match(/[a-z]/) && password.match(/[A-Z]/) ? (
                        <CheckIcon className="h-3 w-3 mr-1 text-green-500" />
                      ) : (
                        <XIcon className="h-3 w-3 mr-1 text-red-500" />
                      )}
                      <span className="text-muted-foreground">Upper & lowercase</span>
                    </div>
                    <div className="flex items-center text-xs">
                      {password.match(/[0-9]/) ? (
                        <CheckIcon className="h-3 w-3 mr-1 text-green-500" />
                      ) : (
                        <XIcon className="h-3 w-3 mr-1 text-red-500" />
                      )}
                      <span className="text-muted-foreground">At least 1 number</span>
                    </div>
                    <div className="flex items-center text-xs">
                      {password.match(/[^a-zA-Z0-9]/) ? (
                        <CheckIcon className="h-3 w-3 mr-1 text-green-500" />
                      ) : (
                        <XIcon className="h-3 w-3 mr-1 text-red-500" />
                      )}
                      <span className="text-muted-foreground">Special character</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <Button
              type="submit"
              className="w-full bg-soundboard-accent hover:bg-soundboard-secondary transition-all"
              disabled={isLoading || passwordStrength < 50}
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </Button>
            
            <div className="relative flex justify-center items-center">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <span className="relative bg-card px-2 text-xs text-muted-foreground">
                Or continue with
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="transition-all" disabled={isLoading}>
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
              <Button variant="outline" className="transition-all" disabled={isLoading}>
                <GithubIcon className="mr-2 h-4 w-4" />
                GitHub
              </Button>
            </div>
          </CardContent>
        </form>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-soundboard-accent hover:text-soundboard-primary"
            >
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
