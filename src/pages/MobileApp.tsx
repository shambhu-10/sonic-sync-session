
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Smartphone, Tablet, Music, CloudLightning, 
  MessageCircle, Camera, Headphones, Wifi, Volume2, Clock
} from "lucide-react";
import useAnimatedVariants from "@/hooks/useAnimatedVariants";

const MobileApp = () => {
  const { containerVariants, itemVariants, scaleVariants } = useAnimatedVariants();

  // Mockup device frame animation variants
  const phoneFrameVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 10,
        delay: 0.3
      }
    }
  };

  // Features for the feature list
  const features = [
    {
      icon: Music,
      title: "Jam on the Go",
      description: "Join jam sessions from anywhere with just your phone and headphones."
    },
    {
      icon: CloudLightning,
      title: "Instant Cloud Sync",
      description: "All your recordings automatically sync across devices in real-time."
    },
    {
      icon: MessageCircle,
      title: "Mobile Chat",
      description: "Communicate with bandmates through built-in text and voice chat."
    },
    {
      icon: Headphones,
      title: "Low Latency Audio",
      description: "Optimized for mobile networks with adaptive quality settings."
    },
    {
      icon: Camera,
      title: "Video Collaboration",
      description: "Enable video chat to see your collaborators while jamming."
    },
    {
      icon: Volume2,
      title: "Input Enhancement",
      description: "Intelligent audio processing improves phone microphone quality."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-soundboard-primary to-soundboard-accent bg-clip-text text-transparent">
          Mobile App (Coming Soon)
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Take SoundBoard with you wherever you go. Our mobile app brings the full power of collaborative music making to your phone or tablet.
        </p>
      </motion.div>

      {/* Mobile App Preview Section */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-12 mb-20">
        <motion.div
          className="lg:w-1/2 order-2 lg:order-1"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="text-2xl font-semibold mb-6">Create Music Anywhere</h2>
          <div className="space-y-6">
            <motion.div
              className="flex items-start"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="mt-1 bg-soundboard-accent/10 p-2 rounded-full">
                <Smartphone className="h-4 w-4 text-soundboard-accent" />
              </div>
              <div className="ml-4">
                <h3 className="font-medium mb-1">Optimized for Phones</h3>
                <p className="text-sm text-muted-foreground">
                  Specially designed interface for smaller screens with intuitive touch controls.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              className="flex items-start"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="mt-1 bg-soundboard-accent/10 p-2 rounded-full">
                <Tablet className="h-4 w-4 text-soundboard-accent" />
              </div>
              <div className="ml-4">
                <h3 className="font-medium mb-1">Tablet Support</h3>
                <p className="text-sm text-muted-foreground">
                  Enhanced layout for tablets gives you more controls and visualization space.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              className="flex items-start"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <div className="mt-1 bg-soundboard-accent/10 p-2 rounded-full">
                <Wifi className="h-4 w-4 text-soundboard-accent" />
              </div>
              <div className="ml-4">
                <h3 className="font-medium mb-1">Offline Capabilities</h3>
                <p className="text-sm text-muted-foreground">
                  Record ideas even without internet and sync them later when connected.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              className="flex items-start"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <div className="mt-1 bg-soundboard-accent/10 p-2 rounded-full">
                <Clock className="h-4 w-4 text-soundboard-accent" />
              </div>
              <div className="ml-4">
                <h3 className="font-medium mb-1">Background Processing</h3>
                <p className="text-sm text-muted-foreground">
                  Continue listening to sessions even when using other apps.
                </p>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            <Button className="bg-soundboard-accent hover:bg-soundboard-secondary">
              Join Waitlist
            </Button>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="lg:w-1/2 order-1 lg:order-2 flex justify-center"
          variants={phoneFrameVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Phone mockup */}
          <div className="relative w-64 h-[500px] bg-gradient-to-br from-gray-800 to-black rounded-[40px] shadow-2xl p-3">
            <div className="absolute top-0 inset-x-0 h-7 flex justify-center items-center rounded-t-[40px]">
              <div className="w-20 h-5 bg-black rounded-b-xl"></div>
            </div>
            <div className="w-full h-full bg-gradient-to-br from-soundboard-primary/20 to-soundboard-accent/50 rounded-[32px] overflow-hidden">
              {/* App content mockup */}
              <div className="h-full flex flex-col">
                {/* Status bar */}
                <div className="flex justify-between items-center p-2 text-white text-xs bg-black/30 backdrop-blur-sm">
                  <span>9:41</span>
                  <div className="flex space-x-1">
                    <Wifi className="h-3 w-3" />
                    <Battery className="h-3 w-3" />
                  </div>
                </div>
                
                {/* App header */}
                <div className="bg-soundboard-accent/80 backdrop-blur-sm p-3 flex justify-between items-center">
                  <div className="flex items-center">
                    <Music className="h-4 w-4 text-white" />
                    <span className="text-white ml-2 font-bold">SoundBoard</span>
                  </div>
                  <span className="text-white text-xs">Live Session</span>
                </div>
                
                {/* App content */}
                <div className="flex-1 bg-black/20 p-3 space-y-3">
                  {/* Tracks visualization */}
                  {[1, 2, 3].map((track) => (
                    <div key={track} className="h-14 bg-white/10 rounded-lg p-2 flex items-center">
                      <div className="w-8 h-8 rounded-full bg-soundboard-accent/30 flex items-center justify-center">
                        <Music className="h-4 w-4 text-white" />
                      </div>
                      <div className="ml-2 flex-1">
                        <div className="text-white text-xs">Track {track}</div>
                        <div className="h-2 mt-1 bg-white/20 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-soundboard-accent" 
                            style={{ width: `${30 + Math.random() * 50}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Waveform */}
                  <div className="h-24 bg-white/5 rounded-lg mt-4 flex items-center justify-center">
                    <svg width="90%" height="60%" viewBox="0 0 100 20">
                      <path
                        d="M0,10 Q5,5 10,10 T20,10 T30,10 T40,10 T50,15 T60,5 T70,10 T80,15 T90,5 T100,10"
                        fill="none"
                        stroke="rgba(233,69,96,0.8)"
                        strokeWidth="0.5"
                      />
                    </svg>
                  </div>
                  
                  {/* Controls */}
                  <div className="mt-4 flex justify-around">
                    {['⏮', '⏯', '⏭', '⏹'].map((control, i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-soundboard-accent/30 flex items-center justify-center text-white">
                        {control}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Bottom tab bar */}
                <div className="bg-black/50 backdrop-blur-sm p-2 flex justify-around">
                  {[Music, Headphones, MessageCircle, Settings].map((Icon, i) => (
                    <div key={i} className={`rounded p-1 ${i === 0 ? 'bg-soundboard-accent/30' : ''}`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Features */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mb-16"
      >
        <h2 className="text-2xl font-semibold text-center mb-8">Mobile App Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={scaleVariants.hover}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-soundboard-accent/10 p-3 rounded-full">
                      <feature.icon className="h-6 w-6 text-soundboard-accent" />
                    </div>
                    <h3 className="text-lg font-semibold ml-3">{feature.title}</h3>
                  </div>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Release information section */}
      <motion.div 
        className="bg-gradient-to-r from-soundboard-primary/5 to-soundboard-accent/5 rounded-lg p-8 text-center mb-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-semibold mb-4">Coming Soon to iOS and Android</h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-6">
          We're working hard to bring the SoundBoard experience to mobile devices. Sign up to be notified when our app launches.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Button className="bg-soundboard-accent hover:bg-soundboard-secondary">
            Join iOS Beta
          </Button>
          <Button className="bg-soundboard-accent hover:bg-soundboard-secondary">
            Join Android Beta
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

// Small Battery icon component for the phone mockup
const Battery = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="7" width="16" height="10" rx="2" ry="2" />
    <line x1="22" y1="11" x2="22" y2="13" />
  </svg>
);

const Settings = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

export default MobileApp;
