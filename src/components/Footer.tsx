
import { Link } from "react-router-dom";
import { MusicIcon, GithubIcon, TwitterIcon, InstagramIcon } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background border-t py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2">
              <MusicIcon className="h-6 w-6 text-soundboard-accent" />
              <span className="text-xl font-bold bg-gradient-to-r from-soundboard-primary to-soundboard-accent bg-clip-text text-transparent">
                SoundBoard
              </span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              Collaborative jam session recorder. Create, record, and mix music with
              friends from anywhere in the world.
            </p>
            <div className="flex space-x-4 mt-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-soundboard-accent transition-colors"
              >
                <GithubIcon size={18} />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-soundboard-accent transition-colors"
              >
                <TwitterIcon size={18} />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-soundboard-accent transition-colors"
              >
                <InstagramIcon size={18} />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>

          <div className="col-span-1">
            <h3 className="text-sm font-semibold">Product</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-soundboard-accent">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-soundboard-accent">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-soundboard-accent">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-sm font-semibold">Company</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-soundboard-accent">
                  About
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-soundboard-accent">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-soundboard-accent">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} SoundBoard. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link to="/" className="text-xs text-muted-foreground hover:text-soundboard-accent">
              Privacy
            </Link>
            <Link to="/" className="text-xs text-muted-foreground hover:text-soundboard-accent">
              Terms
            </Link>
            <Link to="/" className="text-xs text-muted-foreground hover:text-soundboard-accent">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
