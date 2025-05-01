
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion, useAnimation, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { 
  Music, 
  Mic,
  Headphones, 
  Download, 
  Users, 
  Wand2, 
  AudioWaveform,
  ChevronRight,
  ArrowRight
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

// Featured rooms data
const featuredRooms = [
  {
    id: "room1",
    title: "Funky Jazz Session",
    description: "Join our weekly jazz jam with musicians from around the world.",
    participants: 8,
    genre: "Jazz / Funk",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "room2",
    title: "Lo-Fi Hip Hop Beats",
    description: "Chill beats to study/relax to. All skill levels welcome!",
    participants: 12,
    genre: "Hip-Hop / Lo-Fi",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "room3",
    title: "Rock Guitar Jam",
    description: "Riff out with fellow guitarists and create epic rock tracks.",
    participants: 6,
    genre: "Rock / Metal",
    image: "https://images.unsplash.com/photo-1565104781149-1572f9beef4d?q=80&w=800&auto=format&fit=crop"
  }
];

// FAQs data
const faqs = [
  {
    question: "How does collaborative jamming work?",
    answer: "Once you join a jam room, you can record audio loops up to 30 seconds long. These loops automatically sync with other participants' recordings in real-time, allowing seamless collaboration regardless of location."
  },
  {
    question: "What equipment do I need?",
    answer: "Just a computer or mobile device with a microphone and internet connection. For best results, we recommend using headphones and an external microphone if available."
  },
  {
    question: "Can I export my collaborations?",
    answer: "Yes! After you've created a jam session, you can export the combined audio as a high-quality audio file to use in your projects or share with others."
  }
];

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5 }
  }
};

const Index = () => {
  const { user } = useAuth();
  
  // Animation controls
  const controlFeatures = useAnimation();
  const controlRooms = useAnimation();
  const controlFaqs = useAnimation();
  
  const [featuresRef, featuresInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [roomsRef, roomsInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [faqsRef, faqsInView] = useInView({ threshold: 0.2, triggerOnce: true });
  
  // Trigger animations when sections come into view
  useEffect(() => {
    if (featuresInView) controlFeatures.start("visible");
    if (roomsInView) controlRooms.start("visible");
    if (faqsInView) controlFaqs.start("visible");
  }, [featuresInView, roomsInView, faqsInView, controlFeatures, controlRooms, controlFaqs]);

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-soundboard-primary/10 to-background pt-20 pb-40">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(#e94560_1px,transparent_1px)] [background-size:20px_20px]"></div>
        </div>
        
        <motion.div 
          className="container mx-auto px-4 relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-soundboard-accent">Jam Together,</span> Anywhere
            </motion.h1>
            
            <motion.p 
              className="text-xl lg:text-2xl mb-8 text-muted-foreground"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Collaborate with musicians worldwide in real-time. Record, mix, and create music together from anywhere, no matter your time zone.
            </motion.p>
            
            <motion.div 
              className="space-y-3 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Button 
                className="bg-soundboard-accent hover:bg-soundboard-secondary transition-all text-lg px-8 py-6"
                asChild
              >
                <Link to={user ? "/dashboard" : "/auth"}>
                  Get Started <ArrowRight className="ml-2" />
                </Link>
              </Button>
              
              <Button 
                variant="outline"
                className="text-lg px-8 py-6"
              >
                <Link to="#how-it-works">
                  How It Works
                </Link>
              </Button>
            </motion.div>
            
            <motion.div 
              className="mt-12 relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="relative mx-auto max-w-4xl overflow-hidden rounded-xl shadow-2xl">
                <div className="aspect-video w-full bg-gradient-to-br from-soundboard-primary to-soundboard-accent p-1">
                  <div className="h-full w-full bg-black rounded-lg overflow-hidden flex items-center justify-center">
                    <div className="text-center text-white">
                      <AudioWaveform className="h-16 w-16 mx-auto mb-4 text-soundboard-accent animate-pulse" />
                      <p className="text-lg">Interactive Audio Demo</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-background/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg flex items-center">
                <span className="text-soundboard-accent font-semibold">1,000+ musicians</span>
                <span className="mx-2">already jamming on SoundBoard</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="how-it-works" className="py-24 bg-muted/30 overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Create music together in three simple steps, no matter where you are in the world.
            </p>
          </motion.div>
          
          <motion.div 
            ref={featuresRef}
            variants={staggerContainer}
            initial="hidden"
            animate={controlFeatures}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div variants={fadeInUp} className="relative">
              <Card className="h-full hover-scale relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-soundboard-accent text-white p-2 rounded-bl-lg">
                  <span className="font-bold">STEP 1</span>
                </div>
                <CardContent className="pt-8 pb-6 px-5 flex flex-col items-center text-center">
                  <div className="h-20 w-20 rounded-full bg-soundboard-accent/20 flex items-center justify-center mb-6">
                    <Music className="h-10 w-10 text-soundboard-accent" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Create a Jam Room</h3>
                  <p className="text-muted-foreground">
                    Set up your virtual studio by creating a room with your preferred BPM and key signature. Invite friends or collaborate with musicians worldwide.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="relative">
              <Card className="h-full hover-scale relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-soundboard-accent text-white p-2 rounded-bl-lg">
                  <span className="font-bold">STEP 2</span>
                </div>
                <CardContent className="pt-8 pb-6 px-5 flex flex-col items-center text-center">
                  <div className="h-20 w-20 rounded-full bg-soundboard-accent/20 flex items-center justify-center mb-6">
                    <Mic className="h-10 w-10 text-soundboard-accent" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Record Audio Loops</h3>
                  <p className="text-muted-foreground">
                    Record high-quality audio loops up to 30 seconds long directly in your browser. Layer different instruments and vocals to build your track.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="relative">
              <Card className="h-full hover-scale relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-soundboard-accent text-white p-2 rounded-bl-lg">
                  <span className="font-bold">STEP 3</span>
                </div>
                <CardContent className="pt-8 pb-6 px-5 flex flex-col items-center text-center">
                  <div className="h-20 w-20 rounded-full bg-soundboard-accent/20 flex items-center justify-center mb-6">
                    <Headphones className="h-10 w-10 text-soundboard-accent" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Mix & Export</h3>
                  <p className="text-muted-foreground">
                    Fine-tune your collaboration with our mixer. Adjust volume and enable/disable tracks before exporting your finished project.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="mt-12 text-center"
            variants={fadeInUp}
            initial="hidden"
            animate={controlFeatures}
            transition={{ delay: 0.6 }}
          >
            <Button 
              className="bg-soundboard-accent hover:bg-soundboard-secondary transition-all"
              size="lg"
              asChild
            >
              <Link to={user ? "/dashboard" : "/auth"}>
                Start Creating Now <ChevronRight className="ml-1" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
      
      {/* Featured Rooms Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold mb-4">Featured Jam Rooms</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join active music collaboration sessions or get inspired by what others are creating.
            </p>
          </motion.div>
          
          <motion.div 
            ref={roomsRef}
            variants={staggerContainer}
            initial="hidden"
            animate={controlRooms}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {featuredRooms.map((room) => (
              <motion.div 
                key={room.id} 
                variants={scaleUp}
                className="group"
              >
                <Link to={user ? `/jam/${room.id}` : "/auth"}>
                  <div className="relative overflow-hidden rounded-lg shadow-md hover-scale">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/0 z-10"></div>
                    <img 
                      src={room.image} 
                      alt={room.title} 
                      className="w-full aspect-video object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                      <div className="flex items-center mb-2">
                        <span className="bg-soundboard-accent text-white text-xs px-2 py-1 rounded-full">
                          {room.genre}
                        </span>
                        <span className="ml-2 text-white text-sm flex items-center">
                          <Users className="h-3 w-3 mr-1" /> {room.participants} jamming
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-1">{room.title}</h3>
                      <p className="text-sm text-gray-300">{room.description}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="mt-12 text-center"
            variants={fadeInUp}
            initial="hidden"
            animate={controlRooms}
            transition={{ delay: 0.6 }}
          >
            <Button 
              variant="outline" 
              size="lg"
              asChild
            >
              <Link to={user ? "/dashboard" : "/auth"}>
                Explore All Rooms <ChevronRight className="ml-1" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
      
      {/* Features Highlight */}
      <section className="py-24 bg-soundboard-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <h2 className="text-4xl font-bold mb-6">Making music collaboration <span className="text-soundboard-accent">effortless</span></h2>
                <p className="text-lg mb-8 text-muted-foreground">
                  SoundBoard removes the barriers to creating music with others. No complicated software to install, no sending files back and forth, just real-time audio collaboration right in your browser.
                </p>
                
                <ul className="space-y-4">
                  <li className="flex">
                    <div className="mr-4 h-8 w-8 rounded-full bg-soundboard-accent flex items-center justify-center">
                      <Wand2 className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold">Real-time Collaboration</h4>
                      <p className="text-muted-foreground">See and hear updates as collaborators add new loops to the session.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="mr-4 h-8 w-8 rounded-full bg-soundboard-accent flex items-center justify-center">
                      <Download className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold">Export Ready Mixes</h4>
                      <p className="text-muted-foreground">Download high-quality audio files of your collaborative creations.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="mr-4 h-8 w-8 rounded-full bg-soundboard-accent flex items-center justify-center">
                      <Users className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold">Built for Musicians</h4>
                      <p className="text-muted-foreground">Music-focused features like BPM synchronization and key matching help you create better music.</p>
                    </div>
                  </li>
                </ul>
              </motion.div>
              
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="rounded-lg overflow-hidden shadow-2xl relative z-10">
                  <div className="bg-gradient-to-br from-soundboard-primary to-soundboard-accent p-1">
                    <div className="bg-black rounded-md overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800&auto=format&fit=crop" 
                        alt="Collaborative Music Session" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
                <div className="absolute -z-10 -bottom-10 -right-10 h-64 w-64 rounded-full bg-soundboard-primary/10"></div>
                <div className="absolute -z-10 -top-10 -left-10 h-40 w-40 rounded-full bg-soundboard-accent/10"></div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* FAQs Section */}
      <section className="py-24" id="faqs">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Got questions about SoundBoard? We've got answers.
            </p>
          </motion.div>
          
          <motion.div 
            ref={faqsRef}
            variants={staggerContainer}
            initial="hidden"
            animate={controlFaqs}
            className="max-w-4xl mx-auto space-y-8"
          >
            {faqs.map((faq, index) => (
              <motion.div 
                key={index} 
                variants={fadeInUp}
                className="group"
              >
                <Card className="hover-scale overflow-hidden">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-soundboard-primary group-hover:text-soundboard-accent transition-colors">
                      {faq.question}
                    </h3>
                    <p className="text-muted-foreground">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-soundboard-primary to-soundboard-accent text-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Start Jamming?</h2>
            <p className="text-xl mb-8">
              Join thousands of musicians already creating and collaborating on SoundBoard. Free to get started!
            </p>
            <Button 
              size="lg" 
              className="bg-white text-soundboard-accent hover:bg-gray-100 hover:text-soundboard-primary transition-all"
              asChild
            >
              <Link to={user ? "/dashboard" : "/auth"}>
                Create Your First Jam Room <ChevronRight className="ml-1" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
