
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Music2Icon, 
  HeadphonesIcon, 
  UsersIcon, 
  WaveformIcon, 
  DownloadIcon, 
  AudioLinesIcon 
} from "lucide-react";
import RoomCard from "@/components/RoomCard";

// Mock featured rooms data
const featuredRooms = [
  {
    id: "room1",
    title: "Funky Jazz Session",
    bpm: 120,
    keySignature: "Cm",
    trackCount: 8,
    activeUsers: 3,
    isPublic: true,
  },
  {
    id: "room2",
    title: "Lo-Fi Hip Hop Beats",
    bpm: 90,
    keySignature: "G",
    trackCount: 5,
    activeUsers: 2,
    isPublic: true,
  },
  {
    id: "room3",
    title: "Rock Jam",
    bpm: 140,
    keySignature: "Em",
    trackCount: 6,
    activeUsers: 1,
    isPublic: true,
  },
  {
    id: "room4",
    title: "Electronic Dance Session",
    bpm: 128,
    keySignature: "F",
    trackCount: 10,
    activeUsers: 4,
    isPublic: true,
  },
];

const Index = () => {
  const [animatedElements, setAnimatedElements] = useState<NodeListOf<Element> | null>(null);

  // Animation on scroll
  useEffect(() => {
    const elements = document.querySelectorAll('.animate-item');
    setAnimatedElements(elements);
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, {
      threshold: 0.1
    });
    
    elements.forEach(el => observer.observe(el));
    
    return () => {
      if (animatedElements) {
        Array.from(animatedElements).forEach(el => observer.unobserve(el));
      }
    };
  }, [animatedElements]);

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative bg-hero-pattern overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10 bg-gradient-radial"
          style={{
            backgroundSize: "20px 20px",
            backgroundImage: "radial-gradient(rgba(255,255,255,0.5) 1px, transparent 0)"
          }}
        ></div>
        <div className="container mx-auto px-4 py-20 md:py-32 flex flex-col items-center text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight animate-item">
            <span className="text-white">Jam Together</span>{" "}
            <span className="bg-gradient-to-r from-white to-soundboard-light bg-clip-text text-transparent">
              from Anywhere!
            </span>
          </h1>
          
          <p className="mt-6 text-lg md:text-xl max-w-3xl text-white/80 animate-item">
            Create collaborative music with friends in real-time. Record loops,
            mix tracks, and export your finished jams all in one place.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 animate-item">
            <Button
              size="lg"
              className="bg-white text-soundboard-dark hover:bg-soundboard-light transition-all"
              asChild
            >
              <Link to="/signup">Get Started</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-soundboard-dark transition-all"
              asChild
            >
              <Link to="/login">Log In</Link>
            </Button>
          </div>
          
          <div className="mt-16 w-full max-w-4xl relative animate-item">
            <div className="aspect-video rounded-xl overflow-hidden shadow-xl border border-white/20 bg-soundboard-dark/70 backdrop-blur-sm">
              <div className="flex items-center justify-center h-full">
                <WaveformIcon size={120} className="text-white/20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jam Rooms */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 animate-item">Featured Jam Rooms</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredRooms.map((room) => (
              <div key={room.id} className="animate-item">
                <RoomCard {...room} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4 animate-item">
              Everything You Need to Create Together
            </h2>
            <p className="text-muted-foreground animate-item">
              Our platform provides all the tools you need to collaborate on music projects remotely.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card rounded-lg p-6 shadow-sm border animate-item">
              <div className="bg-soundboard-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <AudioLinesIcon className="text-soundboard-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Audio Recording</h3>
              <p className="text-muted-foreground">
                Record high-quality audio loops directly in your browser. No extra software required.
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-sm border animate-item">
              <div className="bg-soundboard-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <UsersIcon className="text-soundboard-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Real-time Collaboration</h3>
              <p className="text-muted-foreground">
                Work together with musicians from around the world in real-time.
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-sm border animate-item">
              <div className="bg-soundboard-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <HeadphonesIcon className="text-soundboard-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Track Mixer</h3>
              <p className="text-muted-foreground">
                Adjust volume, enable/disable tracks, and preview your mix before exporting.
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-sm border animate-item">
              <div className="bg-soundboard-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Music2Icon className="text-soundboard-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">BPM & Key Sync</h3>
              <p className="text-muted-foreground">
                Keep everyone on beat with synchronized BPM and key signature information.
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-sm border animate-item">
              <div className="bg-soundboard-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <WaveformIcon className="text-soundboard-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Audio Visualizations</h3>
              <p className="text-muted-foreground">
                See your sound with beautiful waveform visualizations for all your tracks.
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-sm border animate-item">
              <div className="bg-soundboard-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <DownloadIcon className="text-soundboard-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Export Mixdowns</h3>
              <p className="text-muted-foreground">
                Download your finished jams as high-quality audio files to share or publish.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-soundboard-dark text-white">
        <div className="container mx-auto px-4 text-center max-w-3xl animate-item">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Make Music Together?</h2>
          <p className="text-lg text-white/80 mb-8">
            Join thousands of musicians creating amazing tracks together on SoundBoard.
          </p>
          <Button
            size="lg"
            className="bg-white text-soundboard-dark hover:bg-soundboard-light transition-all"
            asChild
          >
            <Link to="/signup">Get Started for Free</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
