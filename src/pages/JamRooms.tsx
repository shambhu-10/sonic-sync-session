
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Headphones, Users, Music } from "lucide-react";

const JamRooms = () => {
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
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-soundboard-primary to-soundboard-accent bg-clip-text text-transparent">
          Jam Rooms
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Create or join virtual spaces where musicians come together to collaborate in real-time, regardless of physical location.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
      >
        <motion.div variants={itemVariants}>
          <Card className="h-full hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-soundboard-accent/10 p-4 rounded-full">
                  <Music className="h-8 w-8 text-soundboard-accent" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">Create Private Sessions</h3>
              <p className="text-muted-foreground text-center">
                Host invite-only jam sessions with your band members or collaborators for focused practice and recording.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="h-full hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-soundboard-accent/10 p-4 rounded-full">
                  <Users className="h-8 w-8 text-soundboard-accent" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">Join Public Rooms</h3>
              <p className="text-muted-foreground text-center">
                Discover and join public jam sessions with musicians from around the world to expand your network.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="h-full hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-soundboard-accent/10 p-4 rounded-full">
                  <Headphones className="h-8 w-8 text-soundboard-accent" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">Real-time Audio</h3>
              <p className="text-muted-foreground text-center">
                Experience low-latency audio streaming that makes remote collaboration feel like being in the same studio.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-center"
      >
        <Button
          className="bg-soundboard-accent hover:bg-soundboard-secondary text-white px-8 py-6 text-lg hover:scale-105 transition-transform"
          asChild
        >
          <Link to="/dashboard">Start Jamming Now</Link>
        </Button>
      </motion.div>
    </div>
  );
};

export default JamRooms;
