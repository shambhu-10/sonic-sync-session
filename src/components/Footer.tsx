
import { Link } from "react-router-dom";
import { 
  MusicIcon, 
  GithubIcon, 
  TwitterIcon, 
  InstagramIcon, 
  Mail,
  Phone
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Footer */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
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
                <Link to="/jam" className="text-sm text-muted-foreground hover:text-soundboard-accent">
                  Jam Rooms
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-soundboard-accent">
                  Live Collaboration
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-soundboard-accent">
                  Mobile App (Coming Soon)
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-sm font-semibold">Features</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-soundboard-accent">
                  Loop Recording
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-soundboard-accent">
                  Track Mixer
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-soundboard-accent">
                  Export Mixdown
                </Link>
              </li>
            </ul>

            <h3 className="text-sm font-semibold mt-6">Pricing</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/pricing" className="text-sm text-muted-foreground hover:text-soundboard-accent">
                  Free Plan
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-sm text-muted-foreground hover:text-soundboard-accent">
                  Pro Plan (Coming Soon)
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold">FAQs</h3>
                <ul className="mt-4 space-y-2">
                  <li>
                    <Link to="/faqs" className="text-sm text-muted-foreground hover:text-soundboard-accent">
                      How do I create a Jam Room?
                    </Link>
                  </li>
                  <li>
                    <Link to="/faqs" className="text-sm text-muted-foreground hover:text-soundboard-accent">
                      Can I export my mixes?
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold">Blog</h3>
                <ul className="mt-4 space-y-2">
                  <li>
                    <Link to="/blogs" className="text-sm text-muted-foreground hover:text-soundboard-accent">
                      5 Tips for Better Online Jams
                    </Link>
                  </li>
                  <li>
                    <Link to="/blogs" className="text-sm text-muted-foreground hover:text-soundboard-accent">
                      How SoundBoard Simplifies Collaboration
                    </Link>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold">Contact</h3>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center text-sm text-muted-foreground">
                    <Mail className="h-4 w-4 mr-2" />
                    <Link to="/contact" className="hover:text-soundboard-accent">
                      support@soundboard.app
                    </Link>
                  </li>
                  <li className="flex items-center text-sm text-muted-foreground">
                    <Phone className="h-4 w-4 mr-2" />
                    <Link to="/contact" className="hover:text-soundboard-accent">
                      +1 234 567 890
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile Footer with Accordions */}
        <div className="md:hidden space-y-6">
          <Link to="/" className="flex items-center space-x-2">
            <MusicIcon className="h-6 w-6 text-soundboard-accent" />
            <span className="text-xl font-bold bg-gradient-to-r from-soundboard-primary to-soundboard-accent bg-clip-text text-transparent">
              SoundBoard
            </span>
          </Link>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="product">
              <AccordionTrigger>Product</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 pl-2">
                  <li>
                    <Link to="/jam" className="text-sm text-muted-foreground hover:text-soundboard-accent">
                      Jam Rooms
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="text-sm text-muted-foreground hover:text-soundboard-accent">
                      Live Collaboration
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="text-sm text-muted-foreground hover:text-soundboard-accent">
                      Mobile App (Coming Soon)
                    </Link>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="features">
              <AccordionTrigger>Features</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 pl-2">
                  <li>
                    <Link to="/" className="text-sm text-muted-foreground hover:text-soundboard-accent">
                      Loop Recording
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="text-sm text-muted-foreground hover:text-soundboard-accent">
                      Track Mixer
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="text-sm text-muted-foreground hover:text-soundboard-accent">
                      Export Mixdown
                    </Link>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="pricing">
              <AccordionTrigger>Pricing</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 pl-2">
                  <li>
                    <Link to="/pricing" className="text-sm text-muted-foreground hover:text-soundboard-accent">
                      Free Plan
                    </Link>
                  </li>
                  <li>
                    <Link to="/pricing" className="text-sm text-muted-foreground hover:text-soundboard-accent">
                      Pro Plan (Coming Soon)
                    </Link>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="faqs">
              <AccordionTrigger>FAQs</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 pl-2">
                  <li>
                    <Link to="/faqs" className="text-sm text-muted-foreground hover:text-soundboard-accent">
                      How do I create a Jam Room?
                    </Link>
                  </li>
                  <li>
                    <Link to="/faqs" className="text-sm text-muted-foreground hover:text-soundboard-accent">
                      Can I export my mixes?
                    </Link>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="blog">
              <AccordionTrigger>Blog</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 pl-2">
                  <li>
                    <Link to="/blogs" className="text-sm text-muted-foreground hover:text-soundboard-accent">
                      5 Tips for Better Online Jams
                    </Link>
                  </li>
                  <li>
                    <Link to="/blogs" className="text-sm text-muted-foreground hover:text-soundboard-accent">
                      How SoundBoard Simplifies Collaboration
                    </Link>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="contact">
              <AccordionTrigger>Contact</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 pl-2">
                  <li className="flex items-center text-sm">
                    <Mail className="h-4 w-4 mr-2" />
                    <Link to="/contact" className="text-muted-foreground hover:text-soundboard-accent">
                      support@soundboard.app
                    </Link>
                  </li>
                  <li className="flex items-center text-sm">
                    <Phone className="h-4 w-4 mr-2" />
                    <Link to="/contact" className="text-muted-foreground hover:text-soundboard-accent">
                      +1 234 567 890
                    </Link>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <div className="flex justify-center space-x-4 pt-4">
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
        
        {/* Copyright section - for both mobile and desktop */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">
            &copy; {currentYear} SoundBoard. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link to="/privacy" className="text-xs text-muted-foreground hover:text-soundboard-accent">
              Privacy
            </Link>
            <Link to="/terms" className="text-xs text-muted-foreground hover:text-soundboard-accent">
              Terms
            </Link>
            <Link to="/cookies" className="text-xs text-muted-foreground hover:text-soundboard-accent">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
