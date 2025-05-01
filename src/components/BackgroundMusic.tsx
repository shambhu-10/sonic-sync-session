
import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useLocation } from "react-router-dom";

// We'll use a free ambient music track URL - replace with your own track
const BACKGROUND_MUSIC_URL = "https://assets.mixkit.co/music/preview/mixkit-dreaming-big-31.mp3";
const DEFAULT_VOLUME = 0.25; // 25% volume by default

const BackgroundMusic = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const location = useLocation();
  
  const isHomePage = location.pathname === "/";
  
  useEffect(() => {
    // Only initialize audio on the home page
    if (!isHomePage) return;
    
    // Create the audio element
    const audio = new Audio(BACKGROUND_MUSIC_URL);
    audioRef.current = audio;
    
    // Configure audio settings
    audio.loop = true;
    audio.volume = DEFAULT_VOLUME;
    audio.preload = "auto";
    
    // Add event listeners
    audio.addEventListener("canplaythrough", () => {
      setIsLoaded(true);
    });
    
    // Auto-play is often blocked by browsers, so we start muted
    audio.muted = true;
    
    // Try to play - this will likely be blocked by browsers without user interaction
    const playPromise = audio.play().catch(() => {
      console.log("Auto-play was prevented. User must interact first.");
    });
    
    return () => {
      // Clean up when component unmounts
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, [isHomePage]);
  
  // When route changes away from homepage, pause audio
  useEffect(() => {
    if (!isHomePage && audioRef.current) {
      audioRef.current.pause();
    }
  }, [isHomePage]);
  
  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.muted = false;
        audioRef.current.play().catch(() => {
          console.log("Play was prevented. User must interact first.");
        });
      } else {
        audioRef.current.muted = true;
      }
      setIsMuted(!isMuted);
    }
  };
  
  if (!isHomePage) return null;
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMute} 
            className="fixed bottom-5 right-5 z-50 rounded-full bg-soundboard-accent/80 backdrop-blur-sm text-white hover:bg-soundboard-accent shadow-lg transition-all duration-300 hover:scale-110"
            disabled={!isLoaded}
          >
            {isMuted ? (
              <VolumeX className="h-5 w-5" />
            ) : (
              <Volume2 className="h-5 w-5 animate-pulse" />
            )}
            <span className="sr-only">{isMuted ? "Unmute music" : "Mute music"}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>{isMuted ? "Unmute background music" : "Mute background music"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default BackgroundMusic;
