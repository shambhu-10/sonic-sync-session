
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MusicIcon, Headphones, Users, Download, Star } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import WaveAnimation from "@/components/WaveAnimation";

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="relative min-h-[calc(100vh-64px)] flex flex-col">
      {/* Wave animation background instead of particles */}
      <WaveAnimation />
      
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
      
      {/* Features Section */}
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
      
      {/* How It Works Section */}
      <div className="py-20">
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <motion.div
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="bg-soundboard-accent/10 p-6 rounded-full mb-6">
                <Headphones className="h-10 w-10 text-soundboard-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Create a Jam Room</h3>
              <p className="text-muted-foreground">
                Start by creating a new room with your preferred BPM and key signature.
                Invite friends or keep it public for anyone to join.
              </p>
            </motion.div>
            
            <motion.div
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="bg-soundboard-accent/10 p-6 rounded-full mb-6">
                <Users className="h-10 w-10 text-soundboard-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Collaborate in Real-Time</h3>
              <p className="text-muted-foreground">
                Record audio loops, adjust volumes, and mix tracks together.
                Everyone can contribute their unique sounds to the session.
              </p>
            </motion.div>
            
            <motion.div
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="bg-soundboard-accent/10 p-6 rounded-full mb-6">
                <Download className="h-10 w-10 text-soundboard-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Export & Share</h3>
              <p className="text-muted-foreground">
                When your masterpiece is complete, export it and share it with others.
                Download high-quality audio files for your portfolio.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Testimonials Section */}
      <div className="bg-muted py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold mb-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            What Musicians Are Saying
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Alex Johnson",
                role: "Professional Guitarist",
                quote: "SoundBoard has completely changed how I collaborate with other musicians across the globe. The real-time jam sessions feel like we're in the same room.",
              },
              {
                name: "Samantha Lee",
                role: "Music Producer",
                quote: "As a producer, I love how easy it is to collect ideas and loops from different artists. The interface is intuitive and the sound quality is excellent.",
              },
              {
                name: "Marcus Davis",
                role: "Bedroom Beatmaker",
                quote: "I've gone from making beats alone in my room to collaborating with artists worldwide. This platform has opened so many doors for my music career.",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-background p-6 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-soundboard-accent flex items-center justify-center text-white font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                  </div>
                  <div className="ml-3">
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-soundboard-primary/20 to-soundboard-accent/20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-6">Ready to Make Music Together?</h2>
            <p className="text-xl text-muted-foreground mb-10">
              Join thousands of musicians creating, collaborating, and sharing their music with the world.
            </p>
            <Button
              className="bg-soundboard-accent hover:bg-soundboard-secondary text-white text-lg px-10 py-6"
              asChild
            >
              <Link to="/auth?tab=signup">Start Creating Now</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Index;
