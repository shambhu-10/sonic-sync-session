
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

  // Animation variants
  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.footer 
      className="bg-background border-t py-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={footerVariants}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Footer */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div className="col-span-1 md:col-span-1" variants={itemVariants}>
            <Link to="/" className="flex items-center space-x-2 hover:scale-105 transition-transform">
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
              <motion.a
                href="#"
                className="text-muted-foreground hover:text-soundboard-accent transition-colors"
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <GithubIcon size={18} />
                <span className="sr-only">GitHub</span>
              </motion.a>
              <motion.a
                href="#"
                className="text-muted-foreground hover:text-soundboard-accent transition-colors"
                whileHover={{ scale: 1.2, rotate: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <TwitterIcon size={18} />
                <span className="sr-only">Twitter</span>
              </motion.a>
              <motion.a
                href="#"
                className="text-muted-foreground hover:text-soundboard-accent transition-colors"
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <InstagramIcon size={18} />
                <span className="sr-only">Instagram</span>
              </motion.a>
            </div>
          </motion.div>

          <motion.div className="col-span-1" variants={itemVariants}>
            <h3 className="text-sm font-semibold">Product</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/jam-rooms" className="text-sm text-muted-foreground hover:text-soundboard-accent transition-colors story-link">
                  Jam Rooms
                </Link>
              </li>
              <li>
                <Link to="/live-collaboration" className="text-sm text-muted-foreground hover:text-soundboard-accent transition-colors story-link">
                  Live Collaboration
                </Link>
              </li>
              <li>
                <Link to="/mobile-app" className="text-sm text-muted-foreground hover:text-soundboard-accent transition-colors story-link">
                  Mobile App (Coming Soon)
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div className="col-span-1" variants={itemVariants}>
            <h3 className="text-sm font-semibold">Features</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/loop-recording" className="text-sm text-muted-foreground hover:text-soundboard-accent transition-colors story-link">
                  Loop Recording
                </Link>
              </li>
              <li>
                <Link to="/track-mixer" className="text-sm text-muted-foreground hover:text-soundboard-accent transition-colors story-link">
                  Track Mixer
                </Link>
              </li>
              <li>
                <Link to="/export-mixdown" className="text-sm text-muted-foreground hover:text-soundboard-accent transition-colors story-link">
                  Export Mixdown
                </Link>
              </li>
            </ul>

            <h3 className="text-sm font-semibold mt-6">Pricing</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/pricing" className="text-sm text-muted-foreground hover:text-soundboard-accent transition-colors story-link">
                  Free Plan
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-sm text-muted-foreground hover:text-soundboard-accent transition-colors story-link">
                  Pro Plan (Coming Soon)
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div className="col-span-1" variants={itemVariants}>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold">FAQs</h3>
                <ul className="mt-4 space-y-2">
                  <li>
                    <Link to="/faqs" className="text-sm text-muted-foreground hover:text-soundboard-accent transition-colors story-link">
                      How do I create a Jam Room?
                    </Link>
                  </li>
                  <li>
                    <Link to="/faqs" className="text-sm text-muted-foreground hover:text-soundboard-accent transition-colors story-link">
                      Can I export my mixes?
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold">Blog</h3>
                <ul className="mt-4 space-y-2">
                  <li>
                    <Link to="/blogs" className="text-sm text-muted-foreground hover:text-soundboard-accent transition-colors story-link">
                      5 Tips for Better Online Jams
                    </Link>
                  </li>
                  <li>
                    <Link to="/blogs" className="text-sm text-muted-foreground hover:text-soundboard-accent transition-colors story-link">
                      How SoundBoard Simplifies Collaboration
                    </Link>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold">Contact</h3>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center text-sm text-muted-foreground hover:text-soundboard-accent transition-colors">
                    <Mail className="h-4 w-4 mr-2" />
                    <Link to="/contact" className="story-link">
                      support@soundboard.app
                    </Link>
                  </li>
                  <li className="flex items-center text-sm text-muted-foreground hover:text-soundboard-accent transition-colors">
                    <Phone className="h-4 w-4 mr-2" />
                    <Link to="/contact" className="story-link">
                      +1 234 567 890
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
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
                    <Link to="/jam-rooms" className="text-sm text-muted-foreground hover:text-soundboard-accent transition-colors">
                      Jam Rooms
                    </Link>
                  </li>
                  <li>
                    <Link to="/live-collaboration" className="text-sm text-muted-foreground hover:text-soundboard-accent transition-colors">
                      Live Collaboration
                    </Link>
                  </li>
                  <li>
                    <Link to="/mobile-app" className="text-sm text-muted-foreground hover:text-soundboard-accent transition-colors">
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
                    <Link to="/loop-recording" className="text-sm text-muted-foreground hover:text-soundboard-accent transition-colors">
                      Loop Recording
                    </Link>
                  </li>
                  <li>
                    <Link to="/track-mixer" className="text-sm text-muted-foreground hover:text-soundboard-accent transition-colors">
                      Track Mixer
                    </Link>
                  </li>
                  <li>
                    <Link to="/export-mixdown" className="text-sm text-muted-foreground hover:text-soundboard-accent transition-colors">
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
                    <Link to="/pricing" className="text-sm text-muted-foreground hover:text-soundboard-accent transition-colors">
                      Free Plan
                    </Link>
                  </li>
                  <li>
                    <Link to="/pricing" className="text-sm text-muted-foreground hover:text-soundboard-accent transition-colors">
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
                    <Link to="/faqs" className="text-sm text-muted-foreground hover:text-soundboard-accent transition-colors">
                      How do I create a Jam Room?
                    </Link>
                  </li>
                  <li>
                    <Link to="/faqs" className="text-sm text-muted-foreground hover:text-soundboard-accent transition-colors">
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
                    <Link to="/blogs" className="text-sm text-muted-foreground hover:text-soundboard-accent transition-colors">
                      5 Tips for Better Online Jams
                    </Link>
                  </li>
                  <li>
                    <Link to="/blogs" className="text-sm text-muted-foreground hover:text-soundboard-accent transition-colors">
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
                    <Link to="/contact" className="text-muted-foreground hover:text-soundboard-accent transition-colors">
                      support@soundboard.app
                    </Link>
                  </li>
                  <li className="flex items-center text-sm">
                    <Phone className="h-4 w-4 mr-2" />
                    <Link to="/contact" className="text-muted-foreground hover:text-soundboard-accent transition-colors">
                      +1 234 567 890
                    </Link>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <div className="flex justify-center space-x-4 pt-4">
            <motion.a
              href="#"
              className="text-muted-foreground hover:text-soundboard-accent transition-colors"
              whileHover={{ scale: 1.2, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <GithubIcon size={18} />
              <span className="sr-only">GitHub</span>
            </motion.a>
            <motion.a
              href="#"
              className="text-muted-foreground hover:text-soundboard-accent transition-colors"
              whileHover={{ scale: 1.2, rotate: -5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <TwitterIcon size={18} />
              <span className="sr-only">Twitter</span>
            </motion.a>
            <motion.a
              href="#"
              className="text-muted-foreground hover:text-soundboard-accent transition-colors"
              whileHover={{ scale: 1.2, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <InstagramIcon size={18} />
              <span className="sr-only">Instagram</span>
            </motion.a>
          </div>
        </div>
        
        {/* Copyright section - for both mobile and desktop */}
        <motion.div 
          className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center"
          variants={itemVariants}
        >
          <p className="text-xs text-muted-foreground">
            &copy; {currentYear} SoundBoard. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link to="/privacy" className="text-xs text-muted-foreground hover:text-soundboard-accent transition-colors story-link">
              Privacy
            </Link>
            <Link to="/terms" className="text-xs text-muted-foreground hover:text-soundboard-accent transition-colors story-link">
              Terms
            </Link>
            <Link to="/cookies" className="text-xs text-muted-foreground hover:text-soundboard-accent transition-colors story-link">
              Cookies
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
