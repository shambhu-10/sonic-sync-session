
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { LogOut, Settings, Mic, MicOff, Play, Pause, Volume2, VolumeX } from "lucide-react";
import { toast } from "sonner";
import { getRoom } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";
import { Room, Loop } from "@/types";
import RoomVisibilityToggle from "@/components/room/RoomVisibilityToggle";
import { useAudioRecorder } from "@/hooks/useAudioRecorder";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

const JamRoom = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [loops, setLoops] = useState<Loop[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingName, setRecordingName] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Audio recording state
  const { 
    isRecording, 
    startRecording, 
    stopRecording, 
    recordingTime, 
    resetRecording 
  } = useAudioRecorder(30); // 30 second max recording time
  
  const audioElements = useRef<{ [key: string]: HTMLAudioElement }>({});
  
  useEffect(() => {
    const fetchRoom = async () => {
      if (!roomId) return;
      
      try {
        setLoading(true);
        const roomData = await getRoom(roomId);
        setRoom(roomData);
      } catch (error) {
        console.error("Error fetching room:", error);
        setError("Failed to load jam room");
        toast.error("Failed to load jam room", {
          description: "The room may not exist or you don't have access."
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchRoom();
    
    // Refresh the room data periodically
    const intervalId = setInterval(() => {
      if (document.visibilityState === 'visible' && roomId) {
        fetchRoom();
      }
    }, 30000);
    
    return () => clearInterval(intervalId);
  }, [roomId]);

  // Fetch all loops for this room
  useEffect(() => {
    const fetchLoops = async () => {
      if (!roomId) return;
      
      try {
        // This would typically be a call to your API
        // In a real implementation, replace with actual API call
        const mockLoops: Loop[] = [
          {
            id: "1",
            room_id: roomId,
            user_id: "user1",
            name: "Bass line",
            file_url: "https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3",
            order_index: 0,
            is_active: true,
            volume: 75,
            created_at: new Date().toISOString(),
            username: "John"
          },
          {
            id: "2",
            room_id: roomId,
            user_id: "user2",
            name: "Guitar riff",
            file_url: "https://assets.mixkit.co/music/preview/mixkit-hazy-after-hours-132.mp3",
            order_index: 1,
            is_active: true,
            volume: 65,
            created_at: new Date().toISOString(),
            username: "Sarah"
          }
        ];
        
        setLoops(mockLoops);
        
        // Initialize audio elements for each loop
        mockLoops.forEach(loop => {
          if (!audioElements.current[loop.id]) {
            const audio = new Audio(loop.file_url);
            audio.loop = true;
            audio.volume = loop.volume / 100;
            audioElements.current[loop.id] = audio;
          }
        });
      } catch (error) {
        console.error("Error fetching loops:", error);
        toast.error("Failed to load audio loops");
      }
    };
    
    fetchLoops();
    
    return () => {
      // Cleanup audio elements when unmounting
      Object.values(audioElements.current).forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
      });
    };
  }, [roomId]);

  const handleExitRoom = () => {
    // Stop all audio before exiting
    Object.values(audioElements.current).forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });
    
    toast.success("Exited jam room");
    navigate('/dashboard');
  };

  const handlePlayPause = () => {
    const newPlayingState = !isPlaying;
    setIsPlaying(newPlayingState);
    
    loops.forEach(loop => {
      const audio = audioElements.current[loop.id];
      if (audio && loop.is_active) {
        if (newPlayingState) {
          // Start all active loops from the beginning
          audio.currentTime = 0;
          audio.play().catch(err => {
            console.error("Error playing audio:", err);
            toast.error("Error playing audio. Try clicking on the page first.");
          });
        } else {
          audio.pause();
        }
      }
    });
  };

  const handleToggleLoop = (loopId: string) => {
    setLoops(loops.map(loop => {
      if (loop.id === loopId) {
        // Toggle the active state
        const newActiveState = !loop.is_active;
        
        // Update the audio element's state
        const audio = audioElements.current[loop.id];
        if (audio) {
          if (newActiveState && isPlaying) {
            audio.play().catch(console.error);
          } else {
            audio.pause();
          }
        }
        
        return { ...loop, is_active: newActiveState };
      }
      return loop;
    }));
  };

  const handleVolumeChange = (loopId: string, newVolume: number) => {
    setLoops(loops.map(loop => {
      if (loop.id === loopId) {
        // Update the audio element's volume
        const audio = audioElements.current[loop.id];
        if (audio) {
          audio.volume = newVolume / 100;
        }
        
        return { ...loop, volume: newVolume };
      }
      return loop;
    }));
  };

  const handleStartRecording = () => {
    if (recordingName.trim() === "") {
      toast.error("Please enter a name for your recording");
      return;
    }
    
    // Start recording
    startRecording();
    toast.info("Recording started", { 
      description: "Recording will automatically stop after 30 seconds." 
    });
  };

  const handleStopRecording = async () => {
    const audioBlob = await stopRecording();
    
    if (!audioBlob) {
      toast.error("Failed to capture recording");
      return;
    }
    
    // In a real implementation, you would upload the blob to your storage
    // and add the loop to the database
    
    const newLoop: Loop = {
      id: `new-${Date.now()}`,
      room_id: roomId || "",
      user_id: user?.id || "",
      name: recordingName,
      file_url: URL.createObjectURL(audioBlob), // This is temporary, would be an actual URL in production
      order_index: loops.length,
      is_active: true,
      volume: 75,
      created_at: new Date().toISOString(),
      username: user?.username || "You"
    };
    
    // Add new loop to the list
    setLoops([...loops, newLoop]);
    
    // Create audio element for new loop
    const audio = new Audio(newLoop.file_url);
    audio.loop = true;
    audio.volume = newLoop.volume / 100;
    audioElements.current[newLoop.id] = audio;
    
    // Reset recording state
    resetRecording();
    setRecordingName("");
    
    toast.success("Recording saved");
  };

  const isRoomHost = room && user && room.host_id === user.id;

  if (loading) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center">
        <Spinner size="lg" />
        <p className="mt-4 text-muted-foreground">Loading jam room...</p>
      </div>
    );
  }
  
  if (error || !room || !roomId) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4 text-red-500">Error</h1>
        <p className="mb-8">{error || "Room not found"}</p>
        <Button onClick={() => navigate('/dashboard')}>
          Return to Dashboard
        </Button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header section with room title and action buttons */}
      <div className="flex justify-between items-center mb-8 border-b pb-4">
        <div>
          <h1 className="text-3xl font-bold">{room.title}</h1>
          <p className="text-muted-foreground">{room.description || "No description"}</p>
          <div className="flex items-center gap-4 mt-2">
            <span className="text-sm font-medium">BPM: {room.bpm}</span>
            <span className="text-sm font-medium">Key: {room.key_signature}</span>
            <span className="text-sm font-medium">
              Visibility: {room.is_public ? "Public" : "Private"}
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Room settings (for room host only) */}
          {isRoomHost && (
            <Button variant="outline" onClick={() => setSettingsOpen(true)}>
              <Settings className="mr-2 h-4 w-4" />
              Room Settings
            </Button>
          )}
          
          {/* Exit room button */}
          <Button 
            variant="destructive" 
            onClick={handleExitRoom}
            className="flex items-center"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Exit Room
          </Button>
        </div>
      </div>
      
      {/* Main jam room content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recorder section */}
        <div className="bg-card rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4">Record a Loop</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="recordingName" className="block text-sm font-medium mb-2">
                Recording Name
              </label>
              <input
                id="recordingName"
                type="text"
                value={recordingName}
                onChange={(e) => setRecordingName(e.target.value)}
                disabled={isRecording}
                placeholder="Enter a name for your recording"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            {/* Recording timer */}
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">
                {isRecording ? (
                  <span className="text-red-500 animate-pulse">Recording: {recordingTime}s</span>
                ) : (
                  "Ready to record"
                )}
              </span>
              <span className="text-sm text-muted-foreground">Max: 30s</span>
            </div>
            
            <div className="flex space-x-3">
              {!isRecording ? (
                <Button 
                  onClick={handleStartRecording} 
                  disabled={recordingName.trim() === ""}
                  className="w-full bg-red-500 hover:bg-red-600 text-white"
                >
                  <Mic className="mr-2 h-4 w-4" />
                  Start Recording
                </Button>
              ) : (
                <Button 
                  onClick={handleStopRecording} 
                  variant="destructive"
                  className="w-full"
                >
                  <MicOff className="mr-2 h-4 w-4" />
                  Stop Recording
                </Button>
              )}
            </div>
          </div>
        </div>
        
        {/* Mixer section */}
        <div className="lg:col-span-2 bg-card rounded-lg p-6 shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Loops Mixer</h2>
            
            <Button
              onClick={handlePlayPause}
              variant={isPlaying ? "destructive" : "default"}
              className="flex items-center"
            >
              {isPlaying ? (
                <>
                  <Pause className="mr-2 h-4 w-4" />
                  Stop All
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  Play All
                </>
              )}
            </Button>
          </div>
          
          {loops.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>No loops have been recorded yet.</p>
              <p>Be the first to add a loop!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {loops.map((loop) => (
                <div 
                  key={loop.id} 
                  className={cn(
                    "border rounded-md p-4 transition-all",
                    loop.is_active ? "bg-background" : "bg-muted opacity-70"
                  )}
                >
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <h3 className="font-medium">{loop.name}</h3>
                      <p className="text-sm text-muted-foreground">By {loop.username}</p>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggleLoop(loop.id)}
                    >
                      {loop.is_active ? (
                        <Volume2 className="h-4 w-4" />
                      ) : (
                        <VolumeX className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  
                  <div className="pl-2 pr-4">
                    <Slider
                      disabled={!loop.is_active}
                      min={0}
                      max={100}
                      step={1}
                      value={[loop.volume]}
                      onValueChange={(values) => handleVolumeChange(loop.id, values[0])}
                      className={cn(
                        loop.is_active ? "" : "opacity-50"
                      )}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Room settings dialog */}
      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Room Settings</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Room Visibility</h3>
              <RoomVisibilityToggle
                roomId={roomId}
                initialVisibility={room.is_public}
                isHost={!!isRoomHost}
              />
              <p className="text-xs text-muted-foreground mt-1">
                {room.is_public 
                  ? "Public rooms are visible to all users and can be accessed by anyone." 
                  : "Private rooms are only accessible via direct link or invitation."}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default JamRoom;
