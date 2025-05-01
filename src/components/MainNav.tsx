
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  MusicIcon, 
  MenuIcon, 
  XIcon, 
  User,
  LogOut,
  LayoutDashboard
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
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";

const MainNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();

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

  // Check if the current route matches the provided path
  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  // Logo animation variants
  const logoVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: { 
      scale: 1.1, 
      rotate: [0, -5, 5, -3, 3, 0],
      transition: { 
        duration: 0.7,
        ease: "easeInOut",
        times: [0, 0.2, 0.4, 0.6, 0.8, 1],
      }
    },
    tap: { 
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  // Pulse animation for the icon
  const pulseVariants = {
    initial: { 
      boxShadow: "0 0 0 0 rgba(255, 79, 115, 0)" 
    },
    pulse: {
      boxShadow: [
        "0 0 0 0 rgba(255, 79, 115, 0.7)",
        "0 0 0 10px rgba(255, 79, 115, 0)"
      ],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: "loop" as const
      }
    }
  };

  return (
    <nav className="bg-background/95 backdrop-blur-sm sticky top-0 w-full z-50 border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <motion.div
                variants={logoVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                className="flex items-center justify-center rounded-full p-1"
              >
                <motion.div
                  variants={pulseVariants}
                  initial="initial"
                  animate="pulse"
                  className="rounded-full"
                >
                  <MusicIcon className="h-8 w-8 text-soundboard-accent" />
                </motion.div>
              </motion.div>
              <motion.span 
                className="text-xl font-bold bg-gradient-to-r from-soundboard-primary to-soundboard-accent bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                SoundBoard
              </motion.span>
            </Link>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {user && (
              <>
                <Link
                  to="/dashboard"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors relative overflow-hidden group ${
                    isActive('/dashboard') 
                      ? 'text-soundboard-accent' 
                      : 'text-foreground/80 hover:text-soundboard-accent'
                  }`}
                >
                  <span>Dashboard</span>
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-soundboard-accent transform ${
                    isActive('/dashboard') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  } transition-transform duration-300 origin-left`}></span>
                </Link>
                <Link
                  to="/profile"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors relative overflow-hidden group ${
                    isActive('/profile') 
                      ? 'text-soundboard-accent' 
                      : 'text-foreground/80 hover:text-soundboard-accent'
                  }`}
                >
                  <span>Profile</span>
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-soundboard-accent transform ${
                    isActive('/profile') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  } transition-transform duration-300 origin-left`}></span>
                </Link>
              </>
            )}
            <Link
              to="/faqs"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors relative overflow-hidden group ${
                isActive('/faqs') 
                  ? 'text-soundboard-accent' 
                  : 'text-foreground/80 hover:text-soundboard-accent'
              }`}
            >
              <span>FAQs</span>
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-soundboard-accent transform ${
                isActive('/faqs') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              } transition-transform duration-300 origin-left`}></span>
            </Link>
            <Link
              to="/pricing"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors relative overflow-hidden group ${
                isActive('/pricing') 
                  ? 'text-soundboard-accent' 
                  : 'text-foreground/80 hover:text-soundboard-accent'
              }`}
            >
              <span>Pricing</span>
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-soundboard-accent transform ${
                isActive('/pricing') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              } transition-transform duration-300 origin-left`}></span>
            </Link>
            <Link
              to="/blogs"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors relative overflow-hidden group ${
                isActive('/blogs') 
                  ? 'text-soundboard-accent' 
                  : 'text-foreground/80 hover:text-soundboard-accent'
              }`}
            >
              <span>Blogs</span>
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-soundboard-accent transform ${
                isActive('/blogs') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              } transition-transform duration-300 origin-left`}></span>
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-2">
            {/* Add theme toggle button */}
            <ThemeToggle />
            
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
                    <Link to="/dashboard" className="cursor-pointer">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
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
          <div className="flex md:hidden items-center space-x-2">
            {/* Add theme toggle to mobile view too */}
            <ThemeToggle />
            
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
          {user && (
            <>
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
            </>
          )}
          <Link
            to="/faqs"
            className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-soundboard-primary/10 hover:text-soundboard-accent"
            onClick={() => setIsOpen(false)}
          >
            FAQs
          </Link>
          <Link
            to="/pricing"
            className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-soundboard-primary/10 hover:text-soundboard-accent"
            onClick={() => setIsOpen(false)}
          >
            Pricing
          </Link>
          <Link
            to="/blogs"
            className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-soundboard-primary/10 hover:text-soundboard-accent"
            onClick={() => setIsOpen(false)}
          >
            Blogs
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
