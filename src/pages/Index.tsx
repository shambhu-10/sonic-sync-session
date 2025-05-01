
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MusicIcon, Headphones, Users, Download, Star, ArrowUp } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import InteractiveParticleBackground from "@/components/InteractiveParticleBackground";

const Index = () => {
  const { user } = useAuth();
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Handle scroll for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-64px)] flex flex-col">
      {/* New interactive particle background animation */}
      <InteractiveParticleBackground />
      
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center flex-grow relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl"
        >
          <motion.div 
            className="flex items-center justify-center mb-8"
            whileHover={{ rotate: [0, -10, 10, -5, 5, 0], scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <MusicIcon className="h-16 w-16 text-soundboard-accent" />
          </motion.div>
          
          <motion.h1 
            className="text-4xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-soundboard-primary to-soundboard-accent bg-clip-text text-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Collaborate & Create Music Together
          </motion.h1>
          
          <motion.p 
            className="text-xl mb-10 text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Record, mix and share loops in real-time with musicians around the world. 
            Create virtual jam sessions with powerful audio tools.
          </motion.p>
          
          <motion.div 
            className="space-x-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            {user ? (
              <Button
                className="bg-soundboard-accent hover:bg-soundboard-secondary text-lg px-8 py-6 hover:scale-105 transition-transform"
                asChild
              >
                <Link to="/dashboard">Go to Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button
                  className="bg-soundboard-accent hover:bg-soundboard-secondary text-lg px-8 py-6 hover:scale-105 transition-transform"
                  asChild
                >
                  <Link to="/auth?tab=signup">Get Started</Link>
                </Button>
                
                <Button
                  variant="outline"
                  className="border-soundboard-primary text-soundboard-primary hover:bg-soundboard-primary hover:text-white text-lg px-8 py-6 hover:scale-105 transition-transform"
                  asChild
                >
                  <Link to="/auth?tab=login">Sign In</Link>
                </Button>
              </>
            )}
          </motion.div>
        </motion.div>
      </div>
      
      {/* Features Section - ENHANCED with better typography and visual design */}
      <div className="bg-gradient-to-br from-soundboard-accent/5 to-soundboard-primary/10 py-20 relative overflow-hidden" id="features">
        {/* Add decorative background elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-soundboard-accent/10 rounded-full filter blur-[100px]"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-soundboard-primary/10 rounded-full filter blur-[80px]"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <motion.span 
              className="inline-block text-soundboard-accent font-medium mb-2"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              FEATURES
            </motion.span>
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-soundboard-primary to-soundboard-accent bg-clip-text text-transparent"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Create Music Like Never Before
            </motion.h2>
            <motion.div 
              className="h-1 w-20 bg-gradient-to-r from-soundboard-primary to-soundboard-accent rounded-full mx-auto mt-6"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
            ></motion.div>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Feature 1 */}
            <motion.div 
              className="bg-background/80 backdrop-blur-sm p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow hover:scale-[1.02] transition-all duration-300 relative overflow-hidden group border border-white/10"
              variants={itemVariants}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-soundboard-primary/5 to-soundboard-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="bg-soundboard-accent/10 p-3 rounded-xl w-12 h-12 flex items-center justify-center mb-4">
                <Users className="text-soundboard-accent h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Real-time Collaboration</h3>
              <p className="text-muted-foreground">
                Create music together with friends or collaborators in real-time, no matter where they are.
              </p>
            </motion.div>
            
            {/* Feature 2 */}
            <motion.div 
              className="bg-background/80 backdrop-blur-sm p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow hover:scale-[1.02] transition-all duration-300 relative overflow-hidden group border border-white/10"
              variants={itemVariants}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-soundboard-primary/5 to-soundboard-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="bg-soundboard-accent/10 p-3 rounded-xl w-12 h-12 flex items-center justify-center mb-4">
                <Headphones className="text-soundboard-accent h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">High-Quality Recording</h3>
              <p className="text-muted-foreground">
                Record audio loops with professional quality directly in your browser.
              </p>
            </motion.div>
            
            {/* Feature 3 */}
            <motion.div 
              className="bg-background/80 backdrop-blur-sm p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow hover:scale-[1.02] transition-all duration-300 relative overflow-hidden group border border-white/10"
              variants={itemVariants}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-soundboard-primary/5 to-soundboard-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="bg-soundboard-accent/10 p-3 rounded-xl w-12 h-12 flex items-center justify-center mb-4">
                <Download className="text-soundboard-accent h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Export & Share</h3>
              <p className="text-muted-foreground">
                Export your creations and share them with the world or keep them private.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* How It Works Section */}
      <div className="py-20" id="how-it-works">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold mb-16 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            How It Works
          </motion.h2>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              className="flex flex-col items-center text-center"
              variants={itemVariants}
            >
              <motion.div 
                className="bg-soundboard-accent/10 p-6 rounded-full mb-6"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Headphones className="h-10 w-10 text-soundboard-accent" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-3">Create a Jam Room</h3>
              <p className="text-muted-foreground">
                Start by creating a new room with your preferred BPM and key signature.
                Invite friends or keep it public for anyone to join.
              </p>
            </motion.div>
            
            <motion.div
              className="flex flex-col items-center text-center"
              variants={itemVariants}
            >
              <motion.div 
                className="bg-soundboard-accent/10 p-6 rounded-full mb-6"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Users className="h-10 w-10 text-soundboard-accent" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-3">Collaborate in Real-Time</h3>
              <p className="text-muted-foreground">
                Record audio loops, adjust volumes, and mix tracks together.
                Everyone can contribute their unique sounds to the session.
              </p>
            </motion.div>
            
            <motion.div
              className="flex flex-col items-center text-center"
              variants={itemVariants}
            >
              <motion.div 
                className="bg-soundboard-accent/10 p-6 rounded-full mb-6"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Download className="h-10 w-10 text-soundboard-accent" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-3">Export & Share</h3>
              <p className="text-muted-foreground">
                When your masterpiece is complete, export it and share it with others.
                Download high-quality audio files for your portfolio.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Testimonials Section with ENHANCED Animation and Visual Design */}
      <div className="bg-gradient-to-tl from-soundboard-primary/10 to-soundboard-accent/5 py-20 relative overflow-hidden">
        {/* Add decorative elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/3 right-0 w-80 h-80 bg-soundboard-accent/10 rounded-full filter blur-[80px]"></div>
          <div className="absolute bottom-0 left-1/4 w-96 h-72 bg-soundboard-primary/10 rounded-full filter blur-[100px]"></div>
          <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-soundboard-accent/30 rounded-full"></div>
          <div className="absolute top-2/3 right-1/4 w-6 h-6 bg-soundboard-primary/20 rounded-full"></div>
          <div className="absolute top-1/2 left-3/4 w-3 h-3 bg-soundboard-accent/20 rounded-full"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <motion.span 
              className="inline-block text-soundboard-accent font-medium mb-2"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              TESTIMONIALS
            </motion.span>
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-soundboard-primary to-soundboard-accent bg-clip-text text-transparent"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              What Musicians Are Saying
            </motion.h2>
            <motion.div 
              className="h-1 w-20 bg-gradient-to-r from-soundboard-primary to-soundboard-accent rounded-full mx-auto mt-6"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
            ></motion.div>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                name: "Alex Johnson",
                role: "Professional Guitarist",
                quote: "SoundBoard has completely changed how I collaborate with other musicians across the globe. The real-time jam sessions feel like we're in the same room.",
                imageIndex: 1
              },
              {
                name: "Samantha Lee",
                role: "Music Producer",
                quote: "As a producer, I love how easy it is to collect ideas and loops from different artists. The interface is intuitive and the sound quality is excellent.",
                imageIndex: 2
              },
              {
                name: "Marcus Davis",
                role: "Bedroom Beatmaker",
                quote: "I've gone from making beats alone in my room to collaborating with artists worldwide. This platform has opened so many doors for my music career.",
                imageIndex: 3
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-background/80 backdrop-blur-sm p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-white/10 relative overflow-hidden"
                variants={itemVariants}
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
              >
                {/* Decorative gradient corner */}
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br from-soundboard-primary/20 to-soundboard-accent/20 rounded-full blur-xl"></div>
                
                <div className="z-10 relative">
                  <div className="flex items-center mb-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-soundboard-primary to-soundboard-accent flex items-center justify-center text-white text-lg font-bold">
                        {testimonial.name.charAt(0)}
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                      <p className="text-sm text-soundboard-accent">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic relative">
                    <span className="text-4xl absolute -top-3 -left-2 text-soundboard-accent/20">"</span>
                    <span className="relative">{testimonial.quote}</span>
                    <span className="text-4xl absolute -bottom-6 -right-2 text-soundboard-accent/20">"</span>
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      
      {/* CTA Section with Enhanced Animation */}
      <div className="py-20 bg-gradient-to-r from-soundboard-primary/20 to-soundboard-accent/20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <motion.h2 
              className="text-3xl font-bold mb-6"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Ready to Make Music Together?
            </motion.h2>
            <motion.p 
              className="text-xl text-muted-foreground mb-10"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Join thousands of musicians creating, collaborating, and sharing their music with the world.
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Button
                className="bg-soundboard-accent hover:bg-soundboard-secondary text-white text-lg px-10 py-6 hover:scale-105 transition-transform"
                asChild
              >
                <Link to="/auth?tab=signup">Start Creating Now</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Back to top button */}
      {showBackToTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed bottom-8 right-8 bg-soundboard-accent hover:bg-soundboard-secondary text-white p-3 rounded-full shadow-lg z-50 hover:scale-110 transition-transform"
          onClick={scrollToTop}
        >
          <ArrowUp className="h-6 w-6" />
        </motion.button>
      )}
    </div>
  );
};

export default Index;
