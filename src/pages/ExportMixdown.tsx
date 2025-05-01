
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Download, Share2, FileAudio } from "lucide-react";

const ExportMixdown = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-soundboard-primary to-soundboard-accent bg-clip-text text-transparent">
          Export Mixdown
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Export high-quality audio of your complete mix to share with the world or use in your productions.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold mb-6">Professional Audio Export</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Get studio-quality audio exports of your jam sessions and collaborations with just a few clicks.
          </p>
          <ul className="space-y-4 mb-8">
            <li className="flex items-start">
              <span className="bg-soundboard-accent/10 p-1 rounded-full mr-3 mt-1">
                <FileAudio className="h-4 w-4 text-soundboard-accent" />
              </span>
              <span>High-quality WAV, MP3, and FLAC formats</span>
            </li>
            <li className="flex items-start">
              <span className="bg-soundboard-accent/10 p-1 rounded-full mr-3 mt-1">
                <Download className="h-4 w-4 text-soundboard-accent" />
              </span>
              <span>Export individual tracks or the complete mix</span>
            </li>
            <li className="flex items-start">
              <span className="bg-soundboard-accent/10 p-1 rounded-full mr-3 mt-1">
                <Share2 className="h-4 w-4 text-soundboard-accent" />
              </span>
              <span>Share directly to social platforms or download to your device</span>
            </li>
          </ul>
          <Button
            className="bg-soundboard-accent hover:bg-soundboard-secondary hover:scale-105 transition-transform"
            asChild
          >
            <Link to="/dashboard">Create & Export</Link>
          </Button>
        </motion.div>
        
        <motion.div
          className="relative h-80 rounded-xl overflow-hidden border border-border bg-gradient-to-br from-background to-soundboard-accent/5"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Export mockup UI */}
          <div className="absolute inset-0 flex flex-col p-6">
            <div className="mb-8">
              <h3 className="font-semibold mb-2">Export Settings</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-background/80 p-3 rounded-md">
                  <div className="text-xs text-muted-foreground">Format</div>
                  <div className="font-medium">WAV (Lossless)</div>
                </div>
                <div className="bg-background/80 p-3 rounded-md">
                  <div className="text-xs text-muted-foreground">Quality</div>
                  <div className="font-medium">24-bit / 48kHz</div>
                </div>
                <div className="bg-background/80 p-3 rounded-md">
                  <div className="text-xs text-muted-foreground">Channels</div>
                  <div className="font-medium">Stereo</div>
                </div>
                <div className="bg-background/80 p-3 rounded-md">
                  <div className="text-xs text-muted-foreground">Duration</div>
                  <div className="font-medium">3:42</div>
                </div>
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-end">
              <div className="bg-background/80 p-4 rounded-md mb-4">
                <div className="mb-2">
                  <div className="text-xs text-muted-foreground">File Name</div>
                  <div className="font-medium">My_Awesome_Jam_Final_Mix.wav</div>
                </div>
                <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                  <motion.div 
                    className="bg-soundboard-accent h-full" 
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs">Processing...</span>
                  <span className="text-xs">65%</span>
                </div>
              </div>
              
              <div className="flex justify-center">
                <Button 
                  className="bg-soundboard-accent hover:bg-soundboard-secondary"
                  size="lg"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Mix
                </Button>
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
        <h2 className="text-3xl font-bold mb-8">Export Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px]">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Multiple Formats</h3>
              <p className="text-muted-foreground">
                Choose from WAV for maximum quality, MP3 for smaller file sizes, or FLAC for the best of both worlds.
              </p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px]">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Batch Export</h3>
              <p className="text-muted-foreground">
                Export multiple jams or individual tracks simultaneously to save time.
              </p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px]">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Direct Sharing</h3>
              <p className="text-muted-foreground">
                Share your exports directly to social media or cloud storage without downloading first.
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
        <h2 className="text-3xl font-bold mb-6">Ready to Export Your Mix?</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Join thousands of musicians already sharing their collaborative creations with the world.
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

export default ExportMixdown;
