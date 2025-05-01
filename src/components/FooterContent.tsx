
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Music, 
  Twitter, 
  Facebook, 
  Instagram, 
  Github,
  Mail
} from "lucide-react";

const FooterContent = () => {
  return (
    <div className="container mx-auto px-4 pt-12 pb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand and description */}
        <div className="space-y-4">
          <Link to="/" className="flex items-center space-x-2">
            <Music className="h-6 w-6 text-soundboard-accent" />
            <span className="text-xl font-bold">SoundBoard</span>
          </Link>
          <p className="text-muted-foreground">
            Collaborate and create music with musicians from around the world in real-time.
          </p>
          <div className="flex space-x-4">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-soundboard-accent/10 hover:text-soundboard-accent">
              <Twitter className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-soundboard-accent/10 hover:text-soundboard-accent">
              <Facebook className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-soundboard-accent/10 hover:text-soundboard-accent">
              <Instagram className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-soundboard-accent/10 hover:text-soundboard-accent">
              <Github className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {/* Features */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Features</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/#how-it-works" className="text-muted-foreground hover:text-soundboard-accent transition-colors">
                Live Collaboration
              </Link>
            </li>
            <li>
              <Link to="/#how-it-works" className="text-muted-foreground hover:text-soundboard-accent transition-colors">
                Audio Mixer
              </Link>
            </li>
            <li>
              <Link to="/#how-it-works" className="text-muted-foreground hover:text-soundboard-accent transition-colors">
                Recording Tools
              </Link>
            </li>
            <li>
              <Link to="/#how-it-works" className="text-muted-foreground hover:text-soundboard-accent transition-colors">
                Export & Share
              </Link>
            </li>
          </ul>
        </div>
        
        {/* Pricing */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Pricing</h3>
          <ul className="space-y-2">
            <li>
              <span className="text-muted-foreground">
                Free Plan - Get started with basic features
              </span>
            </li>
            <li>
              <span className="text-muted-foreground">
                Pro Plan - $9.99/mo for unlimited recording
              </span>
            </li>
            <li>
              <span className="text-muted-foreground">
                Team Plan - $24.99/mo for professional studios
              </span>
            </li>
          </ul>
        </div>
        
        {/* About & Resources */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Resources</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/about" className="text-muted-foreground hover:text-soundboard-accent transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/blog" className="text-muted-foreground hover:text-soundboard-accent transition-colors">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-muted-foreground hover:text-soundboard-accent transition-colors">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/faqs" className="text-muted-foreground hover:text-soundboard-accent transition-colors">
                FAQs
              </Link>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Blog posts */}
      <div className="mt-10 pt-8 border-t">
        <h3 className="text-lg font-semibold mb-4">Latest from our Blog</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="group">
            <h4 className="font-medium group-hover:text-soundboard-accent transition-colors">
              5 Tips for Better Online Jam Sessions
            </h4>
            <p className="text-sm text-muted-foreground">
              Learn how to optimize your setup for the best collaborative music experience online.
            </p>
          </div>
          <div className="group">
            <h4 className="font-medium group-hover:text-soundboard-accent transition-colors">
              The Future of Music Collaboration: Web-Based DAWs
            </h4>
            <p className="text-sm text-muted-foreground">
              How browser-based music tools are revolutionizing the way musicians work together.
            </p>
          </div>
        </div>
      </div>
      
      {/* Subscribe */}
      <div className="mt-10 pt-8 border-t">
        <div className="max-w-md">
          <h3 className="text-lg font-semibold mb-2">Stay Connected</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Subscribe to our newsletter for tips, new features, and updates.
          </p>
          <div className="flex space-x-2">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full pl-10 pr-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-soundboard-accent"
              />
            </div>
            <Button className="bg-soundboard-accent hover:bg-soundboard-secondary transition-all">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="mt-10 pt-8 border-t text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} SoundBoard. All rights reserved.
        </p>
        <div className="flex justify-center space-x-4 mt-2">
          <Link to="/privacy" className="text-xs text-muted-foreground hover:text-soundboard-accent transition-colors">
            Privacy Policy
          </Link>
          <Link to="/terms" className="text-xs text-muted-foreground hover:text-soundboard-accent transition-colors">
            Terms of Service
          </Link>
          <Link to="/contact" className="text-xs text-muted-foreground hover:text-soundboard-accent transition-colors">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FooterContent;
