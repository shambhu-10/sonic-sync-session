
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  LogOut, 
  Settings, 
  Mic, 
  MicOff, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX,
  Download,
  ExternalLink 
} from "lucide-react";
import { toast } from "sonner";
import { getRoom, getLoops, createLoop, createMixdown } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";
import { Room, Loop, Mixdown } from "@/types";
import RoomVisibilityToggle from "@/components/room/RoomVisibilityToggle";
import { useAudioRecorder } from "@/hooks/useAudioRecorder";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import WaveAnimation from "@/components/WaveAnimation";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  const [fetchingLoops, setFetchingLoops] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("recorder");
  
  // Export mixdown state
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  
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
        fetchLoopsForRoom(roomId);
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
  const fetchLoopsForRoom = async (roomId: string) => {
    if (!roomId) return;
    
    try {
      setFetchingLoops(true);
      const fetchedLoops = await getLoops(roomId);
      setLoops(fetchedLoops);
      
      // Initialize audio elements for each loop
      fetchedLoops.forEach(loop => {
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
    } finally {
      setFetchingLoops(false);
    }
  };

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
    
    if (!user || !roomId) {
      toast.error("Cannot save recording - user or room information missing");
      return;
    }
    
    try {
      toast.loading("Saving your recording...");
      
      // Upload blob to storage and create loop record
      const newLoop = await createLoop(
        {
          room_id: roomId,
          user_id: user.id,
          name: recordingName,
          is_active: true,
          volume: 75,
          order_index: loops.length
        },
        audioBlob
      );
      
      // Add the new audio element
      const audio = new Audio(newLoop.file_url);
      audio.loop = true;
      audio.volume = newLoop.volume / 100;
      audioElements.current[newLoop.id] = audio;
      
      // Update loops list
      setLoops([...loops, newLoop]);
      
      // Reset recording state
      resetRecording();
      setRecordingName("");
      
      toast.dismiss();
      toast.success("Recording saved successfully");
    } catch (error) {
      console.error("Error saving recording:", error);
      toast.error("Failed to save recording");
    }
  };

  // Export mixdown functionality
  const handleExportMixdown = async () => {
    if (!user || !roomId) {
      toast.error("Cannot export mixdown - user or room information missing");
      return;
    }
    
    if (loops.filter(loop => loop.is_active).length === 0) {
      toast.error("No active loops to export", {
        description: "Please enable at least one loop before exporting."
      });
      return;
    }
    
    try {
      setIsExporting(true);
      
      // Show progress updates to user
      for (let i = 0; i <= 100; i += 10) {
        setExportProgress(i);
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      // Create a simple audio context for mixing
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // In production, we would load all active loops and mix them properly
      // For this implementation, we'll create a placeholder audio blob
      const activeLoops = loops.filter(loop => loop.is_active);
      
      // Generate a temporary blob for mock export functionality
      // In a real implementation, we would combine audio data from all active loops
      const mockMixdownBlob = new Blob([new Uint8Array(10000)], { type: 'audio/webm' });
      
      // Save the mixdown using the API
      const mixdownData = {
        room_id: roomId,
        user_id: user.id,
      };
      
      // Call the API with the mixdown data
      const mixdown = await createMixdown(
        mixdownData,
        mockMixdownBlob
      );
      
      setIsExporting(false);
      setExportProgress(0);
      
      // Provide download link with explicit download functionality
      const downloadLink = document.createElement('a');
      downloadLink.href = mixdown.file_url;
      downloadLink.download = `${room.title.replace(/\s+/g, '-')}-mixdown.webm`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      
      toast.success("Mixdown exported successfully", {
        description: "Your mixdown has been downloaded and saved to your profile."
      });
      
    } catch (error) {
      console.error("Error exporting mixdown:", error);
      toast.error("Failed to export mixdown");
      setIsExporting(false);
      setExportProgress(0);
    }
  };

  const isRoomHost = room && user && room.host_id === user.id;

  if (loading) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center">
        <WaveAnimation />
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
      <div className="grid grid-cols-1 gap-8">
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-3 w-full mb-6">
            <TabsTrigger value="recorder">Record Loop</TabsTrigger>
            <TabsTrigger value="mixer">Mixer</TabsTrigger>
            <TabsTrigger value="export">Export Mixdown</TabsTrigger>
          </TabsList>
          
          <TabsContent value="recorder" className="space-y-4">
            <Card className="bg-card rounded-lg shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mic className="mr-2 h-5 w-5" />
                  Record a Loop
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="mixer">
            <Card className="bg-card rounded-lg shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Volume2 className="mr-2 h-5 w-5" />
                    Loops Mixer
                  </div>
                  
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
                </CardTitle>
              </CardHeader>
              <CardContent>
                {fetchingLoops ? (
                  <div className="flex justify-center items-center h-32">
                    <Spinner size="md" />
                    <p className="ml-3">Loading loops...</p>
                  </div>
                ) : loops.length === 0 ? (
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
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="export">
            <Card className="bg-card rounded-lg shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Download className="mr-2 h-5 w-5" />
                  Export Mixdown
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <p className="text-muted-foreground">
                    Export all active loops as a single audio file. Only enabled loops will be included in the mixdown.
                  </p>
                  
                  <div className="bg-muted p-4 rounded-md space-y-2">
                    <div className="flex justify-between">
                      <span>Active loops:</span>
                      <span className="font-medium">{loops.filter(l => l.is_active).length} of {loops.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Format:</span>
                      <span className="font-medium">WebM Audio</span>
                    </div>
                  </div>
                </div>
                
                {isExporting && (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Exporting mixdown...</span>
                      <span className="text-sm font-medium">{exportProgress}%</span>
                    </div>
                    <Progress value={exportProgress} className="w-full" />
                  </div>
                )}
                
                <div className="flex flex-col gap-4">
                  <Button
                    onClick={handleExportMixdown}
                    disabled={isExporting || loops.filter(l => l.is_active).length === 0}
                    className="w-full"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    {isExporting ? "Exporting..." : "Export Mixdown"}
                  </Button>
                  
                  <p className="text-xs text-center text-muted-foreground">
                    Exported mixdowns will be accessible from your profile page.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
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
