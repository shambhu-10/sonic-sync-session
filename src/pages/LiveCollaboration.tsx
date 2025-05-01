
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users, Clock, Headphones } from "lucide-react";

const LiveCollaboration = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-soundboard-primary to-soundboard-accent bg-clip-text text-transparent">
          Live Collaboration
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Work with other musicians in real-time, as if you were all in the same recording studio, regardless of physical location.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold mb-6">Seamless Real-Time Audio</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Our cutting-edge technology minimizes latency to provide the smoothest real-time audio collaboration experience possible.
          </p>
          <ul className="space-y-4 mb-8">
            <li className="flex items-start">
              <span className="bg-soundboard-accent/10 p-1 rounded-full mr-3 mt-1">
                <Users className="h-4 w-4 text-soundboard-accent" />
              </span>
              <span>Connect with up to 8 musicians simultaneously in one session</span>
            </li>
            <li className="flex items-start">
              <span className="bg-soundboard-accent/10 p-1 rounded-full mr-3 mt-1">
                <Clock className="h-4 w-4 text-soundboard-accent" />
              </span>
              <span>Industry-leading low latency for real-time performance</span>
            </li>
            <li className="flex items-start">
              <span className="bg-soundboard-accent/10 p-1 rounded-full mr-3 mt-1">
                <Headphones className="h-4 w-4 text-soundboard-accent" />
              </span>
              <span>High-quality audio streaming that preserves your sound</span>
            </li>
          </ul>
          <Button
            className="bg-soundboard-accent hover:bg-soundboard-secondary hover:scale-105 transition-transform"
            asChild
          >
            <Link to="/dashboard">Start Collaborating</Link>
          </Button>
        </motion.div>
        
        <motion.div
          className="bg-gradient-to-br from-soundboard-primary/20 to-soundboard-accent/30 rounded-2xl p-8 aspect-square flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="relative w-full h-full">
            {/* Animated collaboration visualization */}
            <motion.div
              className="absolute w-20 h-20 rounded-full bg-soundboard-primary/40 top-1/4 left-1/4"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            <motion.div
              className="absolute w-16 h-16 rounded-full bg-soundboard-accent/40 bottom-1/4 right-1/4"
              animate={{
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 0.5,
              }}
            />
            <motion.div
              className="absolute w-12 h-12 rounded-full bg-soundboard-secondary/40 top-1/2 right-1/3"
              animate={{
                scale: [1, 1.4, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 1,
              }}
            />
            {/* Sound waves visualization */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
              <motion.path
                d="M 100,100 m -75,0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
                fill="none"
                stroke="rgba(233, 69, 96, 0.2)"
                strokeWidth="1"
                animate={{
                  pathLength: [0, 1, 0],
                }}
                transition={{
                  duration: 3,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 0.5,
                }}
              />
              <motion.path
                d="M 100,100 m -60,0 a 60,60 0 1,0 120,0 a 60,60 0 1,0 -120,0"
                fill="none"
                stroke="rgba(233, 69, 96, 0.3)"
                strokeWidth="1"
                animate={{
                  pathLength: [0, 1, 0],
                }}
                transition={{
                  duration: 3,
                  ease: "easeInOut",
                  repeat: Infinity,
                  delay: 0.5,
                  repeatDelay: 0.5,
                }}
              />
              <motion.path
                d="M 100,100 m -45,0 a 45,45 0 1,0 90,0 a 45,45 0 1,0 -90,0"
                fill="none"
                stroke="rgba(233, 69, 96, 0.4)"
                strokeWidth="1"
                animate={{
                  pathLength: [0, 1, 0],
                }}
                transition={{
                  duration: 3,
                  ease: "easeInOut",
                  repeat: Infinity,
                  delay: 1,
                  repeatDelay: 0.5,
                }}
              />
            </svg>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl font-bold mb-8">How Live Collaboration Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px]">
            <CardContent className="pt-6">
              <div className="text-4xl font-bold text-soundboard-accent mb-4">01</div>
              <h3 className="text-xl font-semibold mb-2">Create a Session</h3>
              <p className="text-muted-foreground">
                Start a new jam room and set your preferences like BPM and key signature.
              </p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px]">
            <CardContent className="pt-6">
              <div className="text-4xl font-bold text-soundboard-accent mb-4">02</div>
              <h3 className="text-xl font-semibold mb-2">Invite Musicians</h3>
              <p className="text-muted-foreground">
                Share your room code with collaborators or make it public for anyone to join.
              </p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px]">
            <CardContent className="pt-6">
              <div className="text-4xl font-bold text-soundboard-accent mb-4">03</div>
              <h3 className="text-xl font-semibold mb-2">Start Jamming</h3>
              <p className="text-muted-foreground">
                Record your parts, adjust volumes in real-time, and create amazing music together.
              </p>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="text-center bg-gradient-to-r from-soundboard-primary/10 to-soundboard-accent/10 py-16 px-4 rounded-lg"
      >
        <h2 className="text-3xl font-bold mb-6">Ready to Collaborate?</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Join thousands of musicians already creating amazing music together on our platform.
        </p>
        <Button
          size="lg"
          className="bg-soundboard-accent hover:bg-soundboard-secondary text-white px-8 py-6 text-lg hover:scale-105 transition-transform"
          asChild
        >
          <Link to="/auth?tab=signup">Sign Up Free</Link>
        </Button>
      </motion.div>
    </div>
  );
};

export default LiveCollaboration;
