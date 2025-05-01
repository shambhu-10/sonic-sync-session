
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MusicIcon } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import ParticleBackground from "@/components/ParticleBackground";

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="relative min-h-[calc(100vh-64px)] flex flex-col">
      {/* Interactive particle background */}
      <ParticleBackground />
      
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center flex-grow">
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
                className="bg-soundboard-accent hover:bg-soundboard-secondary text-lg px-8 py-6"
                asChild
              >
                <Link to="/dashboard">Go to Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button
                  className="bg-soundboard-accent hover:bg-soundboard-secondary text-lg px-8 py-6"
                  asChild
                >
                  <Link to="/auth?tab=signup">Get Started</Link>
                </Button>
                
                <Button
                  variant="outline"
                  className="border-soundboard-primary text-soundboard-primary hover:bg-soundboard-primary hover:text-white text-lg px-8 py-6"
                  asChild
                >
                  <Link to="/auth?tab=login">Sign In</Link>
                </Button>
              </>
            )}
          </motion.div>
        </motion.div>
      </div>
      
      {/* Features Section (could expand this in the future) */}
      <div className="bg-muted py-20">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold mb-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Create Music Like Never Before
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div 
              className="bg-background p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-xl font-bold mb-3">Real-time Collaboration</h3>
              <p className="text-muted-foreground">
                Create music together with friends or collaborators in real-time, no matter where they are.
              </p>
            </motion.div>
            
            {/* Feature 2 */}
            <motion.div 
              className="bg-background p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-xl font-bold mb-3">High-Quality Recording</h3>
              <p className="text-muted-foreground">
                Record audio loops with professional quality directly in your browser.
              </p>
            </motion.div>
            
            {/* Feature 3 */}
            <motion.div 
              className="bg-background p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-xl font-bold mb-3">Export & Share</h3>
              <p className="text-muted-foreground">
                Export your creations and share them with the world or keep them private.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
