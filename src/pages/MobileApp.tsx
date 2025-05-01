
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const MobileApp = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    
    toast.success("Thank you for your interest!", {
      description: "We'll notify you when the mobile app launches."
    });
    setEmail("");
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <motion.div
          className="inline-block mb-6"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
        >
          <div className="bg-gradient-to-br from-soundboard-primary to-soundboard-accent p-4 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
              <line x1="12" y1="18" x2="12" y2="18" />
            </svg>
          </div>
        </motion.div>
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-soundboard-primary to-soundboard-accent bg-clip-text text-transparent">
          Mobile App (Coming Soon)
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Take your music collaboration on the go with our upcoming mobile app for iOS and Android.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="order-2 md:order-1"
        >
          <h2 className="text-3xl font-bold mb-6">Music Creation Anywhere</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Our upcoming mobile app will bring the power of SoundBoard to your phone, allowing you to create, collaborate, and share music from anywhere, anytime.
          </p>
          
          <div className="space-y-6 mb-8">
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Mobile Recording Studio</h3>
              <p className="text-muted-foreground">
                Turn your phone into a portable recording studio with professional-grade audio tools.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Real-time Collaboration</h3>
              <p className="text-muted-foreground">
                Join jam sessions and collaborate with musicians worldwide, right from your mobile device.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Offline Access</h3>
              <p className="text-muted-foreground">
                Download your projects for offline editing when you're on the go.
              </p>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="font-semibold">Get Notified on Launch</h3>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-l-md border focus:outline-none focus:ring-2 focus:ring-soundboard-accent"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button 
                type="submit"
                className="bg-soundboard-accent hover:bg-soundboard-secondary rounded-l-none"
              >
                Notify Me
              </Button>
            </div>
          </form>
        </motion.div>
        
        <motion.div
          className="relative h-[600px] order-1 md:order-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* Phone mockup */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[280px] h-[550px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-[36px] overflow-hidden border-[8px] border-gray-800 shadow-xl relative">
              {/* Screen */}
              <div className="absolute inset-0 bg-gradient-to-br from-soundboard-primary/5 to-soundboard-accent/10">
                {/* Status bar */}
                <div className="h-6 w-full bg-black/20 flex items-center justify-between px-4">
                  <div className="text-[10px] text-white">9:41</div>
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 rounded-full bg-white/70"></div>
                    <div className="w-3 h-3 rounded-full bg-white/70"></div>
                    <div className="w-3 h-3 rounded-full bg-white/70"></div>
                  </div>
                </div>
                
                {/* App interface mockup */}
                <div className="p-4 h-full">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <div className="text-sm font-bold">SoundBoard</div>
                      <div className="text-[10px] opacity-70">Mobile</div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-soundboard-accent flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-white"
                      >
                        <path d="M9 18V5l12-2v13"></path>
                        <circle cx="6" cy="18" r="3"></circle>
                        <circle cx="18" cy="16" r="3"></circle>
                      </svg>
                    </div>
                  </div>
                  
                  {/* Waveform visualization */}
                  <div className="h-40 bg-black/20 rounded-lg mb-4 flex items-center justify-center p-2">
                    <div className="w-full flex items-end justify-between gap-0.5">
                      {Array.from({ length: 40 }).map((_, i) => (
                        <motion.div
                          key={i}
                          className="bg-soundboard-accent flex-1"
                          style={{ 
                            height: `${Math.random() * 100}%`,
                            maxHeight: "90%",
                            minHeight: "10%"
                          }}
                          animate={{
                            height: [
                              `${Math.random() * 30 + 10}%`,
                              `${Math.random() * 80 + 20}%`,
                              `${Math.random() * 30 + 10}%`,
                            ]
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            repeatType: "reverse",
                            delay: i * 0.05,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Transport controls */}
                  <div className="flex justify-center space-x-4 mb-6">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                      <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[10px] border-white ml-[-2px]"></div>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-soundboard-accent flex items-center justify-center">
                      <div className="w-4 h-4 bg-white"></div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                      <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[10px] border-white mr-[-2px]"></div>
                    </div>
                  </div>
                  
                  {/* Track list */}
                  <div className="space-y-2">
                    {[
                      "Vocal Track",
                      "Guitar Loop",
                      "Bass Line", 
                      "Drum Beat"
                    ].map((track, i) => (
                      <div key={i} className="bg-white/10 p-2 rounded flex justify-between items-center">
                        <div className="text-xs">{track}</div>
                        <div className="w-12 h-1 bg-white/20 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-soundboard-accent"
                            animate={{ width: ["30%", "80%", "50%", "30%"] }}
                            transition={{ 
                              duration: 2, 
                              repeat: Infinity,
                              delay: i * 0.5
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Navigation bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-black/30 flex justify-around items-center">
                    {["Home", "Record", "Projects", "Profile"].map((item, i) => (
                      <div key={i} className="flex flex-col items-center">
                        <div className="w-6 h-6 rounded-full bg-white/10"></div>
                        <div className="text-[10px] mt-1">{item}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Notch */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-5 bg-gray-900 rounded-b-2xl"></div>
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
        <h2 className="text-3xl font-bold mb-8">Mobile App Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px]">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Field Recording</h3>
              <p className="text-muted-foreground">
                Capture inspiration wherever you are with high-quality mobile recording capabilities.
              </p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px]">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Mobile Mixing</h3>
              <p className="text-muted-foreground">
                Mix your tracks on the go with intuitive touch controls optimized for mobile devices.
              </p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px]">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Push Notifications</h3>
              <p className="text-muted-foreground">
                Get notified when collaborators add new tracks or invite you to jam sessions.
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
        <h2 className="text-3xl font-bold mb-6">Join the Beta Program</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Be among the first to try our mobile app by joining our beta testing program.
        </p>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-l-md border focus:outline-none focus:ring-2 focus:ring-soundboard-accent"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button 
              type="submit"
              size="lg"
              className="bg-soundboard-accent hover:bg-soundboard-secondary rounded-l-none"
            >
              <Mail className="mr-2 h-4 w-4" />
              Join Beta
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default MobileApp;
