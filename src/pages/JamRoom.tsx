import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
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
  ExternalLink,
  Trash,
  PlayCircle,
  AlertCircle
} from "lucide-react";
import { toast } from "sonner";
import { getRoom, getLoops, createLoop, createMixdown, joinRoom, deleteRoom, deleteLoop } from "@/services/api";
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
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

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
  
  // Delete room dialog state
  const [deleteRoomDialogOpen, setDeleteRoomDialogOpen] = useState(false);
  const [isDeletingRoom, setIsDeletingRoom] = useState(false);
  
  // Delete loop dialog state
  const [deleteLoopDialogOpen, setDeleteLoopDialogOpen] = useState(false);
  const [selectedLoopToDelete, setSelectedLoopToDelete] = useState<Loop | null>(null);
  const [isDeletingLoop, setIsDeletingLoop] = useState(false);
  
  // Single loop playback state
  const [currentlyPlayingLoopId, setCurrentlyPlayingLoopId] = useState<string | null>(null);
  
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
  const audioContextRef = useRef<AudioContext | null>(null);
  
  // FIX 3: Prevent unwanted refreshes by ensuring effects don't run unnecessarily
  // Added ref to track if initial data was loaded to prevent repeated fetches
  const initialLoadRef = useRef(false);
  
  // FIX 2: Add a state to track if already attempted to join room
  const [joinAttempted, setJoinAttempted] = useState(false);

  useEffect(() => {
    const fetchRoom = async () => {
      if (!roomId || !user) return;
      
      try {
        setLoading(true);
        let roomData = null;
        
        try {
          // FIX 2: First try to get room directly
          roomData = await getRoom(roomId);
        } catch (e) {
          console.log("Error getting room directly, trying to join:", e);
          
          // If initial fetch fails and we haven't attempted joining yet, try joining the room
          if (!joinAttempted) {
            setJoinAttempted(true);
            try {
              // Try to join the room (will work for both public and private rooms with proper invite)
              roomData = await joinRoom(roomId, user.id);
              toast.success("Successfully joined the room!");
            } catch (joinError) {
              console.error("Failed to join room:", joinError);
              throw new Error("Could not access this room. You may not have permission.");
            }
          } else {
            throw e;
          }
        }
        
        if (roomData) {
          setRoom(roomData);
          await fetchLoopsForRoom(roomId);
        }
      } catch (error) {
        console.error("Error fetching room:", error);
        setError("Failed to load jam room");
        toast.error("Failed to load jam room", {
          description: "The room may not exist or you don't have access."
        });
      } finally {
        setLoading(false);
        // Mark initial load as complete
        initialLoadRef.current = true;
      }
    };
    
    fetchRoom();
    
    // FIX 3: Less frequent polling and prevent multiple active intervals
    // Only refresh when visible and with longer interval
    const intervalId = setInterval(() => {
      if (document.visibilityState === 'visible' && roomId && user && initialLoadRef.current) {
        // Only refresh loops, not the entire room to minimize database calls
        fetchLoopsForRoom(roomId);
      }
    }, 60000); // Reduced from 30s to 60s to reduce refresh frequency
    
    return () => {
      clearInterval(intervalId);
      // Clean up all audio elements when component unmounts
      Object.values(audioElements.current).forEach(audio => {
        audio.pause();
        audio.src = "";
      });
      
      // Clean up audio context
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
    };
  }, [roomId, user, joinAttempted]); // Only re-run if these change

  // Fetch all loops for this room
  const fetchLoopsForRoom = async (roomId: string) => {
    if (!roomId) return;
    
    try {
      setFetchingLoops(true);
      const fetchedLoops = await getLoops(roomId);
      
      // FIX 3: Compare loops before setting state to prevent unnecessary re-renders
      const loopsChanged = JSON.stringify(fetchedLoops) !== JSON.stringify(loops);
      
      if (loopsChanged) {
        setLoops(fetchedLoops);
        
        // Initialize audio elements for each loop
        fetchedLoops.forEach(loop => {
          if (!audioElements.current[loop.id]) {
            const audio = new Audio(loop.file_url);
            audio.loop = true;
            audio.volume = loop.volume / 100;
            
            // Ensure audio element is correctly configured
            audio.crossOrigin = "anonymous";
            audioElements.current[loop.id] = audio;
          }
        });
      }
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

  // New function for handling room deletion
  const handleDeleteRoom = async () => {
    if (!roomId || !user || !room) return;
    
    // Only allow the host to delete the room
    if (room.host_id !== user.id) {
      toast.error("Only the room host can delete this room.");
      return;
    }
    
    try {
      setIsDeletingRoom(true);
      await deleteRoom(roomId);
      toast.success("Room deleted successfully");
      navigate('/dashboard');
    } catch (error) {
      console.error("Error deleting room:", error);
      toast.error("Failed to delete room", {
        description: error instanceof Error ? error.message : "Please try again later."
      });
    } finally {
      setIsDeletingRoom(false);
      setDeleteRoomDialogOpen(false);
    }
  };

  // New function for handling loop deletion
  const handleDeleteLoop = async (loopId: string) => {
    if (!room || !user) return;
    
    // Only allow the host to delete loops
    if (room.host_id !== user.id) {
      toast.error("Only the room host can delete loops.");
      return;
    }
    
    // Find the loop to delete
    const loopToDelete = loops.find(loop => loop.id === loopId);
    if (!loopToDelete) return;
    
    setSelectedLoopToDelete(loopToDelete);
    setDeleteLoopDialogOpen(true);
  };

  const confirmDeleteLoop = async () => {
    if (!selectedLoopToDelete) return;
    
    try {
      setIsDeletingLoop(true);
      
      // If the loop is currently playing, stop it
      if (audioElements.current[selectedLoopToDelete.id]) {
        audioElements.current[selectedLoopToDelete.id].pause();
      }
      
      // Delete the loop
      await deleteLoop(selectedLoopToDelete.id);
      
      // Remove from local state
      setLoops(prevLoops => prevLoops.filter(loop => loop.id !== selectedLoopToDelete.id));
      
      // Clean up audio element
      if (audioElements.current[selectedLoopToDelete.id]) {
        delete audioElements.current[selectedLoopToDelete.id];
      }
      
      toast.success("Loop deleted successfully");
    } catch (error) {
      console.error("Error deleting loop:", error);
      toast.error("Failed to delete loop", {
        description: error instanceof Error ? error.message : "Please try again later."
      });
    } finally {
      setIsDeletingLoop(false);
      setDeleteLoopDialogOpen(false);
      setSelectedLoopToDelete(null);
    }
  };
  
  // New function for playing a single loop
  const handlePlaySingleLoop = (loopId: string) => {
    // Get all audio elements
    const audioArr = Object.entries(audioElements.current);
    
    // Stop all currently playing audio
    audioArr.forEach(([id, audio]) => {
      if (id !== loopId) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
    
    const audio = audioElements.current[loopId];
    
    if (audio) {
      // If already playing this loop, pause it
      if (currentlyPlayingLoopId === loopId && !audio.paused) {
        audio.pause();
        setCurrentlyPlayingLoopId(null);
      } else {
        // Otherwise play this loop
        audio.currentTime = 0;
        audio.play().catch(err => {
          console.error("Error playing audio:", err);
          toast.error("Error playing audio. Try clicking on the page first.");
        });
        setCurrentlyPlayingLoopId(loopId);
        
        // Set up ended event to reset button state
        audio.onended = () => {
          if (currentlyPlayingLoopId === loopId) {
            setCurrentlyPlayingLoopId(null);
          }
        };
      }
    }
    
    // If we're in global playing mode, turn it off
    if (isPlaying) {
      setIsPlaying(false);
    }
  };

  // FIX 1: Improved mixdown export functionality
  const handleExportMixdown = async () => {
    if (!user || !roomId) {
      toast.error("Cannot export mixdown - user or room information missing");
      return;
    }
    
    const activeLoops = loops.filter(loop => loop.is_active);
    
    if (activeLoops.length === 0) {
      toast.error("No active loops to export", {
        description: "Please enable at least one loop before exporting."
      });
      return;
    }
    
    try {
      setIsExporting(true);
      setExportProgress(5);
      
      // Initialize audio context if not already done
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      const audioContext = audioContextRef.current;
      const offlineCtx = new OfflineAudioContext({
        numberOfChannels: 2,
        length: 44100 * 30, // 30 seconds at 44.1kHz
        sampleRate: 44100,
      });
      
      setExportProgress(15);
      
      // Fetch all active audio files and decode them
      const decodingPromises = activeLoops.map(async (loop) => {
        try {
          // Fetch the audio file
          const response = await fetch(loop.file_url);
          if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
          
          const arrayBuffer = await response.arrayBuffer();
          const audioBuffer = await offlineCtx.decodeAudioData(arrayBuffer);
          
          return {
            buffer: audioBuffer,
            volume: loop.volume / 100
          };
        } catch (err) {
          console.error(`Error loading audio for loop ${loop.name}:`, err);
          return null;
        }
      });
      
      setExportProgress(35);
      
      const decodedAudios = (await Promise.all(decodingPromises)).filter(a => a !== null);
      
      if (decodedAudios.length === 0) {
        throw new Error("Failed to load any audio files for mixing");
      }
      
      setExportProgress(50);
      
      // Mix all audio sources together
      decodedAudios.forEach(audio => {
        if (!audio) return;
        
        const source = offlineCtx.createBufferSource();
        source.buffer = audio.buffer;
        
        // Apply volume
        const gainNode = offlineCtx.createGain();
        gainNode.gain.value = audio.volume;
        
        // Connect nodes
        source.connect(gainNode);
        gainNode.connect(offlineCtx.destination);
        
        // Start playback (at time 0)
        source.start();
      });
      
      setExportProgress(65);
      
      // Render the audio
      const renderedBuffer = await offlineCtx.startRendering();
      
      setExportProgress(80);
      
      // Convert the rendered buffer to a WAV file
      const channelData = [];
      for (let i = 0; i < renderedBuffer.numberOfChannels; i++) {
        channelData.push(renderedBuffer.getChannelData(i));
      }
      
      // Create WAV file
      const wavData = createWavFile(channelData, renderedBuffer.sampleRate);
      const mixdownBlob = new Blob([wavData], { type: 'audio/wav' });
      
      setExportProgress(90);
      
      // Generate filename
      const timestamp = new Date().getTime();
      const filename = `${room?.title.replace(/\s+/g, '-') || 'mixdown'}-${timestamp}.wav`;
      
      // Save the mixdown using the API
      const mixdownData: Partial<Mixdown> = {
        room_id: roomId,
        user_id: user.id,
      };
      
      // Call the API with the mixdown data
      await createMixdown(
        mixdownData,
        mixdownBlob
      );
      
      setExportProgress(100);
      
      // Short pause at 100% before resetting
      setTimeout(() => {
        setIsExporting(false);
        setExportProgress(0);
        
        // Create direct browser download
        const downloadUrl = URL.createObjectURL(mixdownBlob);
        const downloadLink = document.createElement('a');
        downloadLink.href = downloadUrl;
        downloadLink.download = filename;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(downloadUrl); // Clean up URL object
        
        toast.success("Mixdown exported successfully", {
          description: "Your mixdown has been downloaded and saved to your profile."
        });
      }, 500);
      
    } catch (error) {
      console.error("Error exporting mixdown:", error);
      toast.error("Failed to export mixdown", {
        description: error instanceof Error ? error.message : "Unknown error"
      });
      setIsExporting(false);
      setExportProgress(0);
    }
  };
  
  // Helper function to create WAV file from PCM data
  const createWavFile = (channelData: Float32Array[], sampleRate: number): ArrayBuffer => {
    // Function to convert float audio data to 16-bit PCM
    const floatTo16BitPCM = (output: DataView, offset: number, input: Float32Array): number => {
      for (let i = 0; i < input.length; i++, offset += 2) {
        const s = Math.max(-1, Math.min(1, input[i]));
        output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
      }
      return offset;
    };

    const numOfChan = channelData.length;
    const length = channelData[0].length * numOfChan * 2; // 16-bit = 2 bytes
    const buffer = new ArrayBuffer(44 + length);
    const view = new DataView(buffer);

    // RIFF chunk descriptor
    writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + length, true);
    writeString(view, 8, 'WAVE');

    // FMT sub-chunk
    writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true); // subchunk size
    view.setUint16(20, 1, true); // PCM format
    view.setUint16(22, numOfChan, true); // channels
    view.setUint32(24, sampleRate, true); // sample rate
    view.setUint32(28, sampleRate * numOfChan * 2, true); // byte rate
    view.setUint16(32, numOfChan * 2, true); // block align
    view.setUint16(34, 16, true); // bits per sample

    // Data sub-chunk
    writeString(view, 36, 'data');
    view.setUint32(40, length, true);

    // Interleave channel data
    const interleaved = new Float32Array(channelData[0].length * numOfChan);
    let offset = 0;
    
    for (let i = 0; i < channelData[0].length; i++) {
      for (let j = 0; j < numOfChan; j++) {
        interleaved[offset++] = channelData[j][i];
      }
    }
    
    // Write PCM data
    floatTo16BitPCM(view, 44, interleaved);

    return buffer;
  };

  // Helper function to write string to DataView
  const writeString = (view: DataView, offset: number, string: string): void => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
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
          <h1 className="text-3xl font-bold">{room?.title}</h1>
          <p className="text-muted-foreground">{room?.description || "No description"}</p>
          <div className="flex items-center gap-4 mt-2">
            <span className="text-sm font-medium">BPM: {room?.bpm}</span>
            <span className="text-sm font-medium">Key: {room?.key_signature}</span>
            <span className="text-sm font-medium">
              Visibility: {room?.is_public ? "Public" : "Private"}
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Delete Room Button (for host only) */}
          {isRoomHost && (
            <Button 
              variant="outline" 
              onClick={() => setDeleteRoomDialogOpen(true)}
              className="flex items-center border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
            >
              <Trash className="mr-2 h-4 w-4" />
              Delete Room
            </Button>
          )}
          
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
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary recording-name-input"
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
                          
                          <div className="flex items-center space-x-2">
                            {/* Play Single Loop Button */}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handlePlaySingleLoop(loop.id)}
                              className={currentlyPlayingLoopId === loop.id ? "text-green-500" : ""}
                            >
                              <PlayCircle className="h-4 w-4" />
                            </Button>
                            
                            {/* Toggle Loop Button */}
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
                            
                            {/* Delete Loop Button (visible only to host) */}
                            {isRoomHost && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteLoop(loop.id)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
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
                      <span className="font-medium">WAV Audio</span>
                    </div>
                  </div>
                </div>
                
                {isExporting && (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">{exportProgress < 100 ? "Exporting mixdown..." : "Export complete!"}</span>
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
                    {isExporting ? "Exporting..." : "Export & Download Mixdown"}
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
                roomId={roomId || ""}
                initialVisibility={room?.is_public || false}
                isHost={!!isRoomHost}
              />
              <p className="text-xs text-muted-foreground mt-1">
                {room?.is_public 
                  ? "Public rooms are visible to all users and can be accessed by anyone." 
                  : "Private rooms are only accessible via direct link or invitation."}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Delete Room Confirmation Dialog */}
      <AlertDialog 
        open={deleteRoomDialogOpen} 
        onOpenChange={setDeleteRoomDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center text-red-500">
              <AlertCircle className="mr-2 h-5 w-5" /> Delete Room
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this room? This action cannot be undone.
              All loops, recordings, and mixdowns associated with this room will be permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeletingRoom}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleDeleteRoom();
              }}
              className="bg-red-500 hover:bg-red-600"
              disabled={isDeletingRoom}
            >
              {isDeletingRoom ? "Deleting..." : "Delete Room"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* Delete Loop Confirmation Dialog */}
      <AlertDialog 
        open={deleteLoopDialogOpen} 
        onOpenChange={setDeleteLoopDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center text-red-500">
              <AlertCircle className="mr-2 h-5 w-5" /> Delete Loop
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this loop? This action cannot be undone.
              {selectedLoopToDelete && (
                <div className="mt-2 p-2 bg-muted rounded-md">
                  <p className="font-medium">{selectedLoopToDelete.name}</p>
                  <p className="text-sm">By {selectedLoopToDelete.username}</p>
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeletingLoop}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                confirmDeleteLoop();
              }}
              className="bg-red-500 hover:bg-red-600"
              disabled={isDeletingLoop}
            >
              {isDeletingLoop ? "Deleting..." : "Delete Loop"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default JamRoom;
