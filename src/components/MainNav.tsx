
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MusicIcon, MenuIcon, XIcon } from "lucide-react";

const MainNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-background/95 backdrop-blur-sm sticky top-0 w-full z-50 border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <MusicIcon className="h-8 w-8 text-soundboard-accent animate-wave" />
              <span className="text-xl font-bold bg-gradient-to-r from-soundboard-primary to-soundboard-accent bg-clip-text text-transparent">
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
            <Button
              variant="outline"
              className="border-soundboard-primary text-soundboard-primary hover:bg-soundboard-primary hover:text-white transition-all"
              asChild
            >
              <Link to="/login">Log in</Link>
            </Button>
            <Button
              className="bg-soundboard-accent hover:bg-soundboard-secondary transition-all"
              asChild
            >
              <Link to="/signup">Get Started</Link>
            </Button>
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
            <Button
              variant="outline"
              className="border-soundboard-primary text-soundboard-primary hover:bg-soundboard-primary hover:text-white w-full"
              asChild
              onClick={() => setIsOpen(false)}
            >
              <Link to="/login">Log in</Link>
            </Button>
            <Button
              className="bg-soundboard-accent hover:bg-soundboard-secondary w-full"
              asChild
              onClick={() => setIsOpen(false)}
            >
              <Link to="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
