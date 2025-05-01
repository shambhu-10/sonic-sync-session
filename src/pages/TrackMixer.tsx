
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sliders, Volume2, Music } from "lucide-react";

const TrackMixer = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-soundboard-primary to-soundboard-accent bg-clip-text text-transparent">
          Track Mixer
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Mix and balance your tracks in real-time with our intuitive browser-based mixing tools.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold mb-6">Pro-Level Mixing</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Our intuitive mixing interface gives you all the controls you need to create the perfect balance in your tracks.
          </p>
          <ul className="space-y-4 mb-8">
            <li className="flex items-start">
              <span className="bg-soundboard-accent/10 p-1 rounded-full mr-3 mt-1">
                <Sliders className="h-4 w-4 text-soundboard-accent" />
              </span>
              <span>Individual volume controls for each track</span>
            </li>
            <li className="flex items-start">
              <span className="bg-soundboard-accent/10 p-1 rounded-full mr-3 mt-1">
                <Volume2 className="h-4 w-4 text-soundboard-accent" />
              </span>
              <span>Pan controls to position sounds in the stereo field</span>
            </li>
            <li className="flex items-start">
              <span className="bg-soundboard-accent/10 p-1 rounded-full mr-3 mt-1">
                <Music className="h-4 w-4 text-soundboard-accent" />
              </span>
              <span>Solo and mute buttons for isolating and silencing tracks</span>
            </li>
          </ul>
          <Button
            className="bg-soundboard-accent hover:bg-soundboard-secondary hover:scale-105 transition-transform"
            asChild
          >
            <Link to="/dashboard">Try the Mixer</Link>
          </Button>
        </motion.div>
        
        <motion.div
          className="relative h-80 md:h-96 rounded-xl overflow-hidden border border-border bg-background"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Mixer UI visualization */}
          <div className="absolute inset-0 p-4 flex flex-col">
            <div className="flex-1 grid grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-full h-full bg-soundboard-accent/5 rounded-md relative">
                    <motion.div
                      className="absolute bottom-0 w-full bg-soundboard-accent/30 rounded-b-md"
                      style={{ height: `${20 + i * 15}%` }}
                      animate={{
                        height: [
                          `${20 + i * 15}%`,
                          `${40 + i * 10}%`,
                          `${30 + i * 15}%`,
                          `${20 + i * 15}%`,
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "loop",
                        delay: i * 0.5,
                      }}
                    />
                  </div>
                  <div className="mt-2 h-10 w-full flex flex-col items-center">
                    <div className="h-6 w-6 rounded-full bg-soundboard-accent/20"></div>
                    <div className="mt-1 w-16 h-1 rounded-full bg-muted"></div>
                  </div>
                  <span className="text-xs text-muted-foreground mt-1">Track {i + 1}</span>
                </div>
              ))}
            </div>
            <div className="h-20 mt-4 border-t border-border pt-4">
              <div className="flex justify-between items-center">
                <div className="w-16 h-6 rounded bg-muted"></div>
                <div className="flex space-x-2">
                  <div className="w-8 h-8 rounded-full bg-soundboard-accent/20"></div>
                  <div className="w-8 h-8 rounded-full bg-soundboard-accent/20"></div>
                  <div className="w-8 h-8 rounded-full bg-soundboard-accent/20"></div>
                </div>
                <div className="w-16 h-6 rounded bg-muted"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl font-bold mb-8">Mixing Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px]">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Real-Time Adjustments</h3>
              <p className="text-muted-foreground">
                Make mix changes on the fly and hear them instantly as your tracks play.
              </p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px]">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Collaborative Mixing</h3>
              <p className="text-muted-foreground">
                Work with other musicians to find the perfect balance for your collaborative tracks.
              </p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px]">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Mix Presets</h3>
              <p className="text-muted-foreground">
                Save and recall your favorite mix settings for different sections of your music.
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
        <h2 className="text-3xl font-bold mb-6">Ready to Mix Your Tracks?</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Join thousands of musicians already mixing and perfecting their sound on our platform.
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

export default TrackMixer;
