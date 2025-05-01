
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Music, Mic, ArrowRight } from "lucide-react";

const LoopRecording = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-soundboard-primary to-soundboard-accent bg-clip-text text-transparent">
          Loop Recording
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Create perfect loops for your jams with our professional-grade browser-based recording tools.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold mb-6">Professional-Grade Recording</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Our browser-based recording tools provide studio-quality audio capture without the need for expensive equipment.
          </p>
          <ul className="space-y-4 mb-8">
            <li className="flex items-start">
              <span className="bg-soundboard-accent/10 p-1 rounded-full mr-3 mt-1">
                <Music className="h-4 w-4 text-soundboard-accent" />
              </span>
              <span>Metronome-guided recording ensures perfect timing</span>
            </li>
            <li className="flex items-start">
              <span className="bg-soundboard-accent/10 p-1 rounded-full mr-3 mt-1">
                <Mic className="h-4 w-4 text-soundboard-accent" />
              </span>
              <span>High-fidelity audio capture preserves the nuances of your sound</span>
            </li>
            <li className="flex items-start">
              <span className="bg-soundboard-accent/10 p-1 rounded-full mr-3 mt-1">
                <ArrowRight className="h-4 w-4 text-soundboard-accent" />
              </span>
              <span>Seamless loop points for perfect continuous playback</span>
            </li>
          </ul>
          <Button
            className="bg-soundboard-accent hover:bg-soundboard-secondary hover:scale-105 transition-transform"
            asChild
          >
            <Link to="/dashboard">Start Recording</Link>
          </Button>
        </motion.div>
        
        <motion.div
          className="relative h-64 md:h-96 rounded-xl overflow-hidden border border-border"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Audio waveform visualization */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full flex items-center justify-center gap-1 px-4">
              {Array.from({ length: 40 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="bg-soundboard-accent w-1 rounded-full"
                  style={{ height: `${Math.random() * 50 + 5}%` }}
                  animate={{
                    height: [
                      `${Math.random() * 10 + 5}%`,
                      `${Math.random() * 90 + 10}%`,
                      `${Math.random() * 30 + 5}%`,
                      `${Math.random() * 70 + 30}%`,
                      `${Math.random() * 10 + 5}%`,
                    ],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: i * 0.05,
                  }}
                />
              ))}
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl font-bold mb-8">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px]">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Quantized Recording</h3>
              <p className="text-muted-foreground">
                Perfect timing with beat-synchronized recording that snaps to the grid.
              </p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px]">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Loop Length Options</h3>
              <p className="text-muted-foreground">
                Set custom loop lengths from 1 bar to 16 bars for different musical phrases.
              </p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px]">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Count-In Feature</h3>
              <p className="text-muted-foreground">
                Never miss your cue with adjustable count-in bars before recording starts.
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
        <h2 className="text-3xl font-bold mb-6">Ready to Start Recording?</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Join thousands of musicians already creating amazing loops and tracks on our platform.
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

export default LoopRecording;
