
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Check, Headphones, Sliders, Music, Volume2, Save } from "lucide-react";
import useAnimatedVariants from "@/hooks/useAnimatedVariants";
import { useState } from "react";

const TrackMixer = () => {
  const { containerVariants, itemVariants, slideFromRightVariants, scaleVariants } = useAnimatedVariants();
  
  // Demo tracks for illustration
  const [tracks, setTracks] = useState([
    { id: 1, name: "Vocals", volume: 80, pan: 0, muted: false, soloed: false, color: "#e94560" },
    { id: 2, name: "Guitar", volume: 70, pan: -20, muted: false, soloed: false, color: "#0ead69" },
    { id: 3, name: "Drums", volume: 75, pan: 10, muted: false, soloed: false, color: "#4361ee" },
    { id: 4, name: "Bass", volume: 85, pan: 0, muted: false, soloed: false, color: "#ff9e00" },
  ]);
  
  const updateTrackVolume = (id: number, value: number) => {
    setTracks(tracks.map(track => 
      track.id === id ? { ...track, volume: value } : track
    ));
  };
  
  const updateTrackPan = (id: number, value: number) => {
    setTracks(tracks.map(track => 
      track.id === id ? { ...track, pan: value } : track
    ));
  };
  
  const toggleTrackMute = (id: number) => {
    setTracks(tracks.map(track => 
      track.id === id ? { ...track, muted: !track.muted } : track
    ));
  };
  
  const toggleTrackSolo = (id: number) => {
    setTracks(tracks.map(track => 
      track.id === id ? { ...track, soloed: !track.soloed } : track
    ));
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
          Track Mixer
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Mix and balance your tracks with precision using our intuitive mixer interface. Adjust volumes, panning, and effects for the perfect sound.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        <motion.div
          className="col-span-1 lg:col-span-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Card className="shadow-lg">
            <CardHeader className="border-b pb-3">
              <h2 className="text-2xl font-semibold">Mixer Console</h2>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tracks.map((track, index) => (
                  <motion.div
                    key={track.id}
                    variants={itemVariants}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                    style={{ borderLeft: `4px solid ${track.color}` }}
                    whileHover={scaleVariants.hover}
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-semibold text-lg">{track.name}</h3>
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant={track.muted ? "destructive" : "outline"} 
                          onClick={() => toggleTrackMute(track.id)}
                        >
                          {track.muted ? "Muted" : "Mute"}
                        </Button>
                        <Button 
                          size="sm" 
                          variant={track.soloed ? "default" : "outline"}
                          className={track.soloed ? "bg-soundboard-accent hover:bg-soundboard-accent/90" : ""}
                          onClick={() => toggleTrackSolo(track.id)}
                        >
                          {track.soloed ? "Soloed" : "Solo"}
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label className="text-sm font-medium flex items-center">
                            <Volume2 className="h-4 w-4 mr-1" /> Volume
                          </label>
                          <span className="text-xs">{track.volume}%</span>
                        </div>
                        <Slider
                          value={[track.volume]}
                          min={0}
                          max={100}
                          step={1}
                          onValueChange={(value) => updateTrackVolume(track.id, value[0])}
                          className="z-10"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label className="text-sm font-medium flex items-center">
                            <Sliders className="h-4 w-4 mr-1" /> Pan
                          </label>
                          <span className="text-xs">
                            {track.pan === 0 ? 'Center' : 
                             track.pan > 0 ? `${track.pan}% R` : `${Math.abs(track.pan)}% L`}
                          </span>
                        </div>
                        <Slider
                          value={[track.pan + 50]}
                          min={0}
                          max={100}
                          step={1}
                          onValueChange={(value) => updateTrackPan(track.id, value[0] - 50)}
                          className="z-10"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          className="col-span-1"
          variants={slideFromRightVariants}
          initial="hidden"
          animate="visible"
        >
          <Card className="shadow-lg h-full">
            <CardHeader className="border-b pb-3">
              <h2 className="text-2xl font-semibold">Mixer Features</h2>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-4">
                {[
                  { text: "Real-time volume adjustment", icon: Volume2 },
                  { text: "Stereo panning controls", icon: Sliders },
                  { text: "Solo & mute functionality", icon: Headphones },
                  { text: "Live track visualization", icon: Music },
                  { text: "Save mixer presets", icon: Save },
                  { text: "Apply audio effects", icon: Check }
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + (i * 0.1) }}
                  >
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-soundboard-accent/10 flex items-center justify-center mr-3">
                      <item.icon className="h-3 w-3 text-soundboard-accent" />
                    </div>
                    <span>{item.text}</span>
                  </motion.li>
                ))}
              </ul>
              
              <motion.div 
                className="mt-8"
                whileHover={scaleVariants.hover}
              >
                <Button className="w-full bg-soundboard-accent hover:bg-soundboard-secondary">
                  Try the Mixer
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default TrackMixer;
