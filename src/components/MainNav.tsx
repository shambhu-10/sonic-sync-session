
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  MusicIcon, 
  MenuIcon, 
  XIcon, 
  User,
  LogOut
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const MainNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);
  
  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
  };

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (!user || !user.username) return "U";
    return user.username.substring(0, 2).toUpperCase();
  };

  return (
    <nav className="bg-background/95 backdrop-blur-sm sticky top-0 w-full z-50 border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <MusicIcon className="h-8 w-8 text-soundboard-accent animate-wave group-hover:animate-pulse transition-all duration-300" />
              <span className="text-xl font-bold bg-gradient-to-r from-soundboard-primary to-soundboard-accent bg-clip-text text-transparent group-hover:from-soundboard-accent group-hover:to-soundboard-primary transition-all duration-300">
                SoundBoard
              </span>
            </Link>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link
              to="/"
              className="text-foreground/80 hover:text-soundboard-accent px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className="text-foreground/80 hover:text-soundboard-accent px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Dashboard
            </Link>
            <Link
              to="/profile"
              className="text-foreground/80 hover:text-soundboard-accent px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Profile
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-2">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user.avatar_url || ""} alt={user.username || "User"} />
                      <AvatarFallback className="bg-soundboard-primary/20 text-soundboard-primary">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-500 hover:text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button
                  variant="outline"
                  className="border-soundboard-primary text-soundboard-primary hover:bg-soundboard-primary hover:text-white transition-all"
                  asChild
                >
                  <Link to="/auth?tab=login">Log in</Link>
                </Button>
                <Button
                  className="bg-soundboard-accent hover:bg-soundboard-secondary transition-all"
                  asChild
                >
                  <Link to="/auth?tab=signup">Get Started</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <XIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <MenuIcon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
          <Link
            to="/"
            className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-soundboard-primary/10 hover:text-soundboard-accent"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-soundboard-primary/10 hover:text-soundboard-accent"
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            to="/profile"
            className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-soundboard-primary/10 hover:text-soundboard-accent"
            onClick={() => setIsOpen(false)}
          >
            Profile
          </Link>
          <div className="pt-4 pb-3 border-t border-muted flex flex-col space-y-2">
            {user ? (
              <Button 
                variant="destructive" 
                className="w-full" 
                onClick={handleSignOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  className="border-soundboard-primary text-soundboard-primary hover:bg-soundboard-primary hover:text-white w-full"
                  asChild
                  onClick={() => setIsOpen(false)}
                >
                  <Link to="/auth?tab=login">Log in</Link>
                </Button>
                <Button
                  className="bg-soundboard-accent hover:bg-soundboard-secondary w-full"
                  asChild
                  onClick={() => setIsOpen(false)}
                >
                  <Link to="/auth?tab=signup">Get Started</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
