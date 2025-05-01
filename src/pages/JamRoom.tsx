
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Mic, 
  Square, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Download, 
  Share2, 
  Users, 
  Trash2, 
  MessageCircle,
  PlusIcon,
  Music,
  X,
  Send
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { getRoom, getLoops, createLoop, updateLoop, deleteLoop, getRoomParticipants, joinRoom, leaveRoom, getMessages, sendMessage, createMixdown } from "@/services/api";
import { Room, Loop, Participant, ChatMessage, AudioRecorder } from "@/types";
import { useAudioRecorder } from "@/hooks/useAudioRecorder";
import { Spinner } from "@/components/ui/spinner";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

const JamRoom = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Room data
  const [room, setRoom] = useState<Room | null>(null);
  const [loops, setLoops] = useState<Loop[]>([]);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [chatMessage, setChatMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  
  // Audio recording
  const [recordingName, setRecordingName] = useState("");
  const [isNaming, setIsNaming] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const recorder = useAudioRecorder();
  const { isRecording, startRecording, stopRecording, recordingTime, resetRecording } = recorder;
  
  // Playback state
  const [isPlaying, setIsPlaying] = useState(false);
  const [masterVolume, setMasterVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);
  
  // UI state
  const [activeTab, setActiveTab] = useState<"mixer" | "participants" | "chat">("mixer");
  const [isExporting, setIsExporting] = useState(false);
  
  // Initialize room and set up listeners
  useEffect(() => {
    if (!roomId || !user) return;
    
    const initializeRoom = async () => {
      try {
        setLoading(true);
        
        // Join the room as a participant
        await joinRoom(roomId, user.id);
        
        // Fetch room data
        const roomData = await getRoom(roomId);
        setRoom(roomData);
        
        // Fetch room loops
        const loopData = await getLoops(roomId);
        setLoops(loopData);
        
        // Fetch room participants
        const participantData = await getRoomParticipants(roomId);
        setParticipants(participantData);
        
        // Fetch chat messages
        const messageData = await getMessages(roomId);
        setMessages(messageData.reverse()); // Newest last
        
      } catch (error) {
        console.error("Error initializing room:", error);
        toast.error("Failed to load jam room", {
          description: "The room may not exist or you don't have permission to access it."
        });
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    };
    
    initializeRoom();
    
    // Set up real-time subscriptions
    const loopsChannel = supabase
      .channel('room_loops')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'loops', filter: `room_id=eq.${roomId}` },
        (payload) => {
          console.log('New loop:', payload);
          // Fetch the new loop's details with username
          const fetchNewLoop = async () => {
            try {
              const { data, error } = await supabase
                .from('loops')
                .select(`
                  *,
                  profiles:user_id (username)
                `)
                .eq('id', payload.new.id)
                .single();
                
              if (!error && data) {
                const newLoop = {
                  ...data,
                  username: data.profiles?.username
                };
                
                setLoops((current) => [...current, newLoop]);
                
                toast(`New loop added: ${newLoop.name}`, {
                  description: `by ${newLoop.username || 'another user'}`
                });
              }
            } catch (error) {
              console.error('Error fetching new loop:', error);
            }
          };
          
          fetchNewLoop();
        }
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'loops', filter: `room_id=eq.${roomId}` },
        (payload) => {
          console.log('Loop updated:', payload);
          setLoops((current) => 
            current.map((loop) => 
              loop.id === payload.new.id ? { ...loop, ...payload.new } : loop
            )
          );
        }
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'loops', filter: `room_id=eq.${roomId}` },
        (payload) => {
          console.log('Loop deleted:', payload);
          setLoops((current) => 
            current.filter((loop) => loop.id !== payload.old.id)
          );
        }
      )
      .subscribe();
      
    const participantsChannel = supabase
      .channel('room_participants')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'room_participants', filter: `room_id=eq.${roomId}` },
        (payload) => {
          console.log('New participant:', payload);
          // Fetch the new participant's details
          const fetchNewParticipant = async () => {
            try {
              const { data, error } = await supabase
                .from('room_participants')
                .select(`
                  *,
                  profiles:user_id (username, avatar_url)
                `)
                .eq('room_id', roomId)
                .eq('user_id', payload.new.user_id)
                .single();
                
              if (!error && data) {
                const newParticipant = {
                  ...data,
                  username: data.profiles?.username,
                  avatar_url: data.profiles?.avatar_url
                };
                
                setParticipants((current) => [...current, newParticipant]);
                
                if (data.user_id !== user.id) {
                  toast(`New user joined: ${newParticipant.username || 'Anonymous'}`, {
                    description: `There are now ${participants.length + 1} people in the room`
                  });
                }
              }
            } catch (error) {
              console.error('Error fetching new participant:', error);
            }
          };
          
          fetchNewParticipant();
        }
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'room_participants', filter: `room_id=eq.${roomId}` },
        (payload) => {
          console.log('Participant left:', payload);
          const leftParticipant = participants.find(p => p.user_id === payload.old.user_id);
          
          setParticipants((current) => 
            current.filter((p) => p.user_id !== payload.old.user_id)
          );
          
          if (leftParticipant && leftParticipant.user_id !== user.id) {
            toast(`${leftParticipant.username || 'A user'} left the room`, {
              description: `There are now ${participants.length - 1} people in the room`
            });
          }
        }
      )
      .subscribe();
      
    const messagesChannel = supabase
      .channel('room_messages')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'chat_messages', filter: `room_id=eq.${roomId}` },
        (payload) => {
          console.log('New message:', payload);
          // Fetch the new message's details with username
          const fetchNewMessage = async () => {
            try {
              const { data, error } = await supabase
                .from('chat_messages')
                .select(`
                  *,
                  profiles:user_id (username)
                `)
                .eq('id', payload.new.id)
                .single();
                
              if (!error && data) {
                const newMessage = {
                  ...data,
                  username: data.profiles?.username
                };
                
                setMessages((current) => [...current, newMessage]);
                scrollToBottom();
                
                // Only show toast notifications if not from current user and not active chat tab
                if (data.user_id !== user.id && activeTab !== "chat") {
                  toast(`New message from ${newMessage.username || 'Anonymous'}`, {
                    description: newMessage.content.length > 40 
                      ? `${newMessage.content.substring(0, 40)}...` 
                      : newMessage.content
                  });
                }
              }
            } catch (error) {
              console.error('Error fetching new message:', error);
            }
          };
          
          fetchNewMessage();
        }
      )
      .subscribe();
    
    // Clean up on component unmount
    return () => {
      // Leave the room
      const leaveCurrentRoom = async () => {
        try {
          if (roomId && user) {
            await leaveRoom(roomId, user.id);
          }
        } catch (error) {
          console.error("Error leaving room:", error);
        }
      };
      
      leaveCurrentRoom();
      
      // Clean up subscriptions
      supabase.removeChannel(loopsChannel);
      supabase.removeChannel(participantsChannel);
      supabase.removeChannel(messagesChannel);
      
      // Clean up audio context
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
      
      // Stop any playing audio
      loops.forEach((loop) => {
        if (loop.audio) {
          loop.audio.pause();
          loop.audio.currentTime = 0;
        }
      });
    };
  }, [roomId, user, navigate]);
  
  // Preload audio files when loops change
  useEffect(() => {
    const preloadAudio = async () => {
      for (const loop of loops) {
        if (!loop.audio && loop.file_url) {
          const audio = new Audio(loop.file_url);
          audio.preload = "auto";
          audio.loop = true;
          
          // Wait for audio to load
          await new Promise((resolve) => {
            audio.addEventListener("canplaythrough", resolve, { once: true });
            audio.addEventListener("error", resolve, { once: true });
          });
          
          setLoops((current) => 
            current.map((l) => 
              l.id === loop.id ? { ...l, audio } : l
            )
          );
        }
      }
    };
    
    preloadAudio();
  }, [loops]);
  
  // Update audio volumes when masterVolume or loop volumes change
  useEffect(() => {
    loops.forEach((loop) => {
      if (loop.audio) {
        loop.audio.volume = isMuted ? 0 : (loop.volume / 100) * (masterVolume / 100);
      }
    });
  }, [loops, masterVolume, isMuted]);
  
  // Handle recording completion
  const handleStopRecording = async () => {
    const blob = await stopRecording();
    if (blob) {
      setRecordedBlob(blob);
      setIsNaming(true);
    }
  };
  
  // Cancel recording
  const handleCancelRecording = () => {
    setIsNaming(false);
    setRecordedBlob(null);
    setRecordingName("");
    resetRecording();
  };
  
  // Save recording
  const handleSaveRecording = async () => {
    if (!recordedBlob || !roomId || !user) return;
    
    try {
      toast.loading("Saving your loop...");
      
      // Create the loop
      await createLoop({
        room_id: roomId,
        user_id: user.id,
        name: recordingName || `Loop ${new Date().toLocaleTimeString()}`,
        order_index: loops.length,
        is_active: true,
        volume: 75
      }, recordedBlob);
      
      // Reset recording state
      setIsNaming(false);
      setRecordedBlob(null);
      setRecordingName("");
      resetRecording();
      
      toast.dismiss();
      toast.success("Loop saved successfully!");
    } catch (error) {
      console.error("Error saving loop:", error);
      toast.dismiss();
      toast.error("Failed to save loop", {
        description: "There was a problem uploading your recording."
      });
    }
  };
  
  // Toggle playback of all active loops
  const togglePlayback = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    const activeLoops = loops.filter(loop => loop.is_active && loop.audio);
    
    if (isPlaying) {
      // Stop all active loops
      activeLoops.forEach(loop => {
        if (loop.audio) {
          loop.audio.pause();
          loop.audio.currentTime = 0;
        }
      });
    } else {
      // Start all active loops
      activeLoops.forEach(loop => {
        if (loop.audio) {
          loop.audio.currentTime = 0;
          loop.audio.play().catch(err => {
            console.error("Error playing audio:", err);
            toast.error("Playback error", {
              description: "There was a problem playing one or more audio files."
            });
          });
        }
      });
    }
    
    setIsPlaying(!isPlaying);
  };
  
  // Toggle active state of a loop
  const toggleLoopActive = async (loopId: string, isActive: boolean) => {
    try {
      // Update local state first for responsiveness
      setLoops(loops.map(loop => 
        loop.id === loopId ? { ...loop, is_active: isActive } : loop
      ));
      
      // Update in database
      await updateLoop(loopId, { is_active: isActive });
      
      // Handle playback changes
      const loop = loops.find(l => l.id === loopId);
      if (loop && loop.audio) {
        if (!isActive && isPlaying) {
          loop.audio.pause();
          loop.audio.currentTime = 0;
        } else if (isActive && isPlaying) {
          loop.audio.currentTime = 0;
          loop.audio.play().catch(console.error);
        }
      }
    } catch (error) {
      console.error("Error toggling loop active state:", error);
      // Revert local state on error
      setLoops(loops.map(loop => 
        loop.id === loopId ? { ...loop, is_active: !isActive } : loop
      ));
      toast.error("Failed to update loop", {
        description: "The changes couldn't be saved."
      });
    }
  };
  
  // Update loop volume
  const handleVolumeChange = async (loopId: string, volume: number) => {
    try {
      // Update local state first for responsiveness
      setLoops(loops.map(loop => {
        if (loop.id === loopId) {
          // Update audio volume
          if (loop.audio) {
            loop.audio.volume = isMuted ? 0 : (volume / 100) * (masterVolume / 100);
          }
          return { ...loop, volume };
        }
        return loop;
      }));
      
      // Update in database (debounced)
      const debounceTimeout = setTimeout(async () => {
        await updateLoop(loopId, { volume });
      }, 500);
      
      return () => clearTimeout(debounceTimeout);
    } catch (error) {
      console.error("Error updating loop volume:", error);
    }
  };
  
  // Delete a loop
  const handleDeleteLoop = async (loopId: string) => {
    try {
      // Find the loop to be deleted
      const loop = loops.find(l => l.id === loopId);
      if (!loop) return;
      
      // Stop audio if playing
      if (loop.audio && isPlaying) {
        loop.audio.pause();
      }
      
      // Update local state first for responsiveness
      setLoops(loops.filter(l => l.id !== loopId));
      
      // Delete from database
      await deleteLoop(loopId);
      
      toast.success("Loop deleted", {
        description: `"${loop.name}" has been removed.`
      });
    } catch (error) {
      console.error("Error deleting loop:", error);
      toast.error("Failed to delete loop", {
        description: "The loop couldn't be removed."
      });
    }
  };
  
  // Export mixdown
  const handleExportMixdown = async () => {
    if (!room || !user) return;
    
    try {
      setIsExporting(true);
      toast.loading("Creating mixdown...");
      
      // Get all active loops
      const activeLoops = loops.filter(loop => loop.is_active && loop.audio);
      
      if (activeLoops.length === 0) {
        toast.dismiss();
        toast.error("Cannot export mixdown", {
          description: "There are no active loops in this session."
        });
        setIsExporting(false);
        return;
      }
      
      // Create a new audio context for offline rendering
      const offlineCtx = new OfflineAudioContext({
        numberOfChannels: 2,
        sampleRate: 44100,
        length: 44100 * 30 // 30 seconds at 44.1kHz
      });
      
      // Load all audio files and connect them to the offline context
      const audioBuffers = await Promise.all(
        activeLoops.map(async (loop) => {
          const response = await fetch(loop.file_url);
          const arrayBuffer = await response.arrayBuffer();
          return offlineCtx.decodeAudioData(arrayBuffer);
        })
      );
      
      // Create sources for each audio buffer
      audioBuffers.forEach((buffer, i) => {
        const source = offlineCtx.createBufferSource();
        source.buffer = buffer;
        
        // Create a gain node for volume control
        const gainNode = offlineCtx.createGain();
        gainNode.gain.value = activeLoops[i].volume / 100 * masterVolume / 100;
        
        // Connect audio graph
        source.connect(gainNode);
        gainNode.connect(offlineCtx.destination);
        
        // Start playback at the beginning
        source.start(0);
      });
      
      // Render the audio
      const renderedBuffer = await offlineCtx.startRendering();
      
      // Convert to WAV
      const wavBuffer = audioBufferToWav(renderedBuffer);
      const blob = new Blob([wavBuffer], { type: 'audio/wav' });
      
      // Save to Supabase
      await createMixdown({
        room_id: roomId as string,
        user_id: user.id
      }, blob);
      
      // Create a temporary download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${room.title.replace(/\s+/g, '_')}_mixdown_${new Date().toISOString().slice(0, 10)}.wav`;
      link.click();
      URL.revokeObjectURL(url);
      
      toast.dismiss();
      toast.success("Mixdown exported successfully!", {
        description: "Your audio file is being downloaded now."
      });
    } catch (error) {
      console.error("Error exporting mixdown:", error);
      toast.dismiss();
      toast.error("Failed to export mixdown", {
        description: "There was a problem processing your audio files."
      });
    } finally {
      setIsExporting(false);
    }
  };
  
  // Helper function to convert AudioBuffer to WAV format
  const audioBufferToWav = (buffer: AudioBuffer): ArrayBuffer => {
    const numOfChan = buffer.numberOfChannels;
    const length = buffer.length * numOfChan * 2;
    const result = new ArrayBuffer(44 + length);
    const view = new DataView(result);
    
    // RIFF chunk descriptor
    writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + length, true);
    writeString(view, 8, 'WAVE');
    
    // fmt sub-chunk
    writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true); // PCM format
    view.setUint16(22, numOfChan, true);
    view.setUint32(24, buffer.sampleRate, true);
    view.setUint32(28, buffer.sampleRate * numOfChan * 2, true); // byte rate
    view.setUint16(32, numOfChan * 2, true); // block align
    view.setUint16(34, 16, true); // bits per sample
    
    // data sub-chunk
    writeString(view, 36, 'data');
    view.setUint32(40, length, true);
    
    // Write the PCM samples
    const offset = 44;
    const channels = [];
    for (let i = 0; i < buffer.numberOfChannels; i++) {
      channels.push(buffer.getChannelData(i));
    }
    
    let pos = 44;
    for (let i = 0; i < buffer.length; i++) {
      for (let ch = 0; ch < numOfChan; ch++) {
        // Clamp the value between -1 and 1
        const sample = Math.max(-1, Math.min(1, channels[ch][i]));
        // Convert to 16-bit signed integer
        const val = sample < 0 ? sample * 32768 : sample * 32767;
        view.setInt16(pos, val, true);
        pos += 2;
      }
    }
    
    return result;
  };
  
  // Helper function to write strings to a DataView
  const writeString = (view: DataView, offset: number, string: string): void => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };
  
  // Handle chat message submission
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim() || !roomId || !user) return;
    
    try {
      await sendMessage({
        room_id: roomId,
        user_id: user.id,
        content: chatMessage.trim()
      });
      
      // Clear input
      setChatMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message", {
        description: "Your message couldn't be delivered."
      });
    }
  };
  
  // Scroll to bottom of chat messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    if (activeTab === "chat") {
      scrollToBottom();
    }
  }, [messages, activeTab]);
  
  // Share room link
  const shareRoomLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast("Room link copied to clipboard", {
      description: "Share this link with others to invite them to your jam session."
    });
  };
  
  if (loading) {
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }
  
  if (!room) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Room not found</h2>
          <p className="text-muted-foreground mb-6">
            This jam room doesn't exist or you don't have permission to access it.
          </p>
          <Button asChild className="bg-soundboard-accent hover:bg-soundboard-secondary transition-all">
            <Link to="/dashboard">Return to Dashboard</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 lg:py-8">
      {/* Room Header */}
      <div className="mb-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold">{room.title}</h1>
            {!room.is_public && (
              <span className="px-2 py-1 bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 text-xs rounded-full">
                Private
              </span>
            )}
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
            <div className="flex items-center gap-1">
              <Music className="h-4 w-4" />
              <span>{room.bpm} BPM</span>
            </div>
            <div>
              <span>Key: {room.key_signature}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{participants.length} {participants.length === 1 ? 'person' : 'people'}</span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button 
            onClick={shareRoomLink} 
            variant="outline" 
            className="gap-2"
          >
            <Share2 className="h-4 w-4" /> Share
          </Button>
          <Button
            onClick={handleExportMixdown}
            disabled={isExporting || loops.filter(l => l.is_active).length === 0}
            className="gap-2 bg-soundboard-accent hover:bg-soundboard-secondary transition-all"
          >
            <Download className="h-4 w-4" /> Export Mixdown
          </Button>
        </div>
      </div>
      
      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar - Mobile */}
        <div className="lg:hidden bg-muted/30 rounded-lg p-4">
          <div className="flex border-b">
            <Button
              variant={activeTab === "mixer" ? "default" : "ghost"}
              onClick={() => setActiveTab("mixer")}
              className={`flex-1 ${activeTab === "mixer" ? "bg-soundboard-accent hover:bg-soundboard-secondary" : ""}`}
            >
              Mixer
            </Button>
            <Button
              variant={activeTab === "participants" ? "default" : "ghost"}
              onClick={() => setActiveTab("participants")}
              className={`flex-1 ${activeTab === "participants" ? "bg-soundboard-accent hover:bg-soundboard-secondary" : ""}`}
            >
              Users
            </Button>
            <Button
              variant={activeTab === "chat" ? "default" : "ghost"}
              onClick={() => setActiveTab("chat")}
              className={`flex-1 ${activeTab === "chat" ? "bg-soundboard-accent hover:bg-soundboard-secondary" : ""}`}
            >
              Chat
            </Button>
          </div>
          
          {activeTab === "mixer" && (
            <div className="mt-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Track Mixer</h3>
                <div className="flex gap-2">
                  <Button
                    onClick={() => setIsMuted(!isMuted)}
                    size="icon"
                    variant="ghost"
                  >
                    {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                  </Button>
                  <Button
                    onClick={togglePlayback}
                    size="icon"
                    variant="default"
                    className="bg-soundboard-accent hover:bg-soundboard-secondary"
                    disabled={loops.filter(l => l.is_active).length === 0}
                  >
                    {isPlaying ? <Square className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm font-medium">Master Volume</span>
                <div className="w-40">
                  <Slider
                    value={[masterVolume]}
                    max={100}
                    step={1}
                    onValueChange={(values) => setMasterVolume(values[0])}
                  />
                </div>
              </div>
              
              {loops.length === 0 ? (
                <div className="text-center py-6 text-muted-foreground">
                  <p>No loops recorded yet.</p>
                  <p>Start recording to create your first loop!</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                  {loops.map((loop) => (
                    <Card key={loop.id} className="overflow-hidden">
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <Button
                              size="sm"
                              variant={loop.is_active ? "default" : "outline"}
                              className={`h-7 px-2 mr-2 ${loop.is_active ? "bg-soundboard-accent hover:bg-soundboard-secondary" : ""}`}
                              onClick={() => toggleLoopActive(loop.id, !loop.is_active)}
                            >
                              {loop.is_active ? "Active" : "Muted"}
                            </Button>
                            <div>
                              <p className="font-medium text-sm">{loop.name}</p>
                              <p className="text-xs text-muted-foreground">by {loop.username || "Anonymous"}</p>
                            </div>
                          </div>
                          {/* Only show delete button for user's own loops */}
                          {user && loop.user_id === user.id && (
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-7 w-7 text-muted-foreground hover:text-destructive"
                              onClick={() => handleDeleteLoop(loop.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                        <div className="flex items-center">
                          <Volume2 className="h-4 w-4 text-muted-foreground mr-2" />
                          <Slider
                            value={[loop.volume]}
                            max={100}
                            step={1}
                            className="flex-1"
                            onValueChange={(values) => handleVolumeChange(loop.id, values[0])}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {activeTab === "participants" && (
            <div className="mt-4">
              <h3 className="text-lg font-bold mb-4">Participants</h3>
              <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                {participants.map((participant) => (
                  <div key={participant.user_id} className="flex items-center p-2 rounded-lg border">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={participant.avatar_url || ""} alt={participant.username} />
                      <AvatarFallback className="bg-soundboard-accent text-white">
                        {participant.username ? participant.username[0].toUpperCase() : "?"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{participant.username || "Anonymous"}</span>
                    {participant.user_id === room.host_id && (
                      <span className="ml-2 px-2 py-0.5 bg-soundboard-accent/20 text-soundboard-accent text-xs rounded-full">
                        Host
                      </span>
                    )}
                  </div>
                ))}
                {participants.length === 0 && (
                  <p className="text-center py-4 text-muted-foreground">No participants in this room.</p>
                )}
              </div>
            </div>
          )}
          
          {activeTab === "chat" && (
            <div className="mt-4 flex flex-col h-80">
              <div className="flex-1 overflow-y-auto pr-2 mb-4">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                    <MessageCircle className="h-8 w-8 mb-2" />
                    <p>No messages yet</p>
                    <p className="text-sm">Start the conversation!</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.user_id === user?.id ? "justify-end" : ""}`}
                      >
                        <div
                          className={`rounded-lg p-3 max-w-[80%] ${
                            message.user_id === user?.id
                              ? "bg-soundboard-accent text-white"
                              : "bg-muted"
                          }`}
                        >
                          {message.user_id !== user?.id && (
                            <p className="font-semibold text-xs mb-1">
                              {message.username || "Anonymous"}
                            </p>
                          )}
                          <p>{message.content}</p>
                          <p className="text-xs opacity-70 mt-1 text-right">
                            {new Date(message.created_at).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit"
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </div>
              <form onSubmit={handleSendMessage} className="mt-auto">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    type="submit"
                    disabled={!chatMessage.trim()}
                    className="bg-soundboard-accent hover:bg-soundboard-secondary transition-all"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
        
        {/* Main Content - Loop Recorder and Waveform */}
        <div className="lg:col-span-2">
          <Card className="overflow-hidden">
            <CardContent className="p-6">
              <div className="mb-6 text-center">
                <h2 className="text-xl font-bold">Audio Recorder</h2>
                <p className="text-muted-foreground">Record a loop up to 30 seconds long</p>
              </div>
              
              {/* Waveform visualization placeholder */}
              <div className="relative h-32 mb-8 flex items-center justify-center bg-muted/30 rounded-lg">
                {isRecording ? (
                  <div className="w-full h-full flex items-center justify-center">
                    {/* Audio waveform visualization would go here */}
                    <div className="flex items-center gap-1">
                      {[...Array(10)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-1.5 bg-soundboard-accent"
                          animate={{
                            height: [
                              Math.random() * 20 + 10,
                              Math.random() * 60 + 20,
                              Math.random() * 20 + 10
                            ]
                          }}
                          transition={{
                            duration: 0.5,
                            repeat: Infinity,
                            repeatType: "reverse",
                            delay: i * 0.1
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ) : recordedBlob ? (
                  <div className="flex flex-col items-center">
                    <p>Recording ready!</p>
                    <audio className="mt-2" src={URL.createObjectURL(recordedBlob)} controls />
                  </div>
                ) : (
                  <div className="text-muted-foreground flex flex-col items-center">
                    <Mic className="h-8 w-8 mb-2" />
                    <span>Ready to record</span>
                  </div>
                )}
                
                {/* Recording timer */}
                {isRecording && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold flex items-center">
                    <span className="animate-pulse mr-1">●</span>
                    {Math.floor(recordingTime / 60)
                      .toString()
                      .padStart(2, "0")}
                    :
                    {(recordingTime % 60).toString().padStart(2, "0")}
                  </div>
                )}
              </div>
              
              {/* Recording controls */}
              {isNaming ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Label htmlFor="loop-name" className="min-w-20">Loop Name:</Label>
                    <Input
                      id="loop-name"
                      placeholder="Enter a name for your loop"
                      value={recordingName}
                      onChange={(e) => setRecordingName(e.target.value)}
                      className="flex-1"
                      autoFocus
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCancelRecording}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="button"
                      className="bg-soundboard-accent hover:bg-soundboard-secondary transition-all"
                      onClick={handleSaveRecording}
                    >
                      Save Loop
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-center">
                  {isRecording ? (
                    <Button
                      className="gap-2 bg-soundboard-secondary hover:bg-soundboard-secondary/80 transition-all"
                      onClick={handleStopRecording}
                    >
                      <Square className="h-5 w-5" /> Stop Recording
                    </Button>
                  ) : (
                    <Button
                      className="gap-2 bg-red-500 hover:bg-red-600 transition-all"
                      onClick={startRecording}
                      disabled={!!recordedBlob}
                    >
                      <Mic className="h-5 w-5" /> Start Recording
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Sidebar - Desktop */}
        <div className="hidden lg:block space-y-6">
          {/* Mixer Panel */}
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Track Mixer</h3>
                <div className="flex gap-2">
                  <Button
                    onClick={() => setIsMuted(!isMuted)}
                    size="icon"
                    variant="ghost"
                  >
                    {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                  </Button>
                  <Button
                    onClick={togglePlayback}
                    size="icon"
                    variant="default"
                    className="bg-soundboard-accent hover:bg-soundboard-secondary"
                    disabled={loops.filter(l => l.is_active).length === 0}
                  >
                    {isPlaying ? <Square className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm font-medium">Master Volume</span>
                <div className="w-40">
                  <Slider
                    value={[masterVolume]}
                    max={100}
                    step={1}
                    onValueChange={(values) => setMasterVolume(values[0])}
                  />
                </div>
              </div>
              
              {loops.length === 0 ? (
                <div className="text-center py-6 text-muted-foreground">
                  <p>No loops recorded yet.</p>
                  <p>Start recording to create your first loop!</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                  {loops.map((loop) => (
                    <Card key={loop.id} className="overflow-hidden">
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <Button
                              size="sm"
                              variant={loop.is_active ? "default" : "outline"}
                              className={`h-7 px-2 mr-2 ${loop.is_active ? "bg-soundboard-accent hover:bg-soundboard-secondary" : ""}`}
                              onClick={() => toggleLoopActive(loop.id, !loop.is_active)}
                            >
                              {loop.is_active ? "Active" : "Muted"}
                            </Button>
                            <div>
                              <p className="font-medium text-sm">{loop.name}</p>
                              <p className="text-xs text-muted-foreground">by {loop.username || "Anonymous"}</p>
                            </div>
                          </div>
                          {/* Only show delete button for user's own loops */}
                          {user && loop.user_id === user.id && (
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-7 w-7 text-muted-foreground hover:text-destructive"
                              onClick={() => handleDeleteLoop(loop.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                        <div className="flex items-center">
                          <Volume2 className="h-4 w-4 text-muted-foreground mr-2" />
                          <Slider
                            value={[loop.volume]}
                            max={100}
                            step={1}
                            className="flex-1"
                            onValueChange={(values) => handleVolumeChange(loop.id, values[0])}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Participants Panel */}
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-bold mb-4">Participants</h3>
              <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                {participants.map((participant) => (
                  <div key={participant.user_id} className="flex items-center p-2 rounded-lg border">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={participant.avatar_url || ""} alt={participant.username} />
                      <AvatarFallback className="bg-soundboard-accent text-white">
                        {participant.username ? participant.username[0].toUpperCase() : "?"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{participant.username || "Anonymous"}</span>
                    {participant.user_id === room.host_id && (
                      <span className="ml-2 px-2 py-0.5 bg-soundboard-accent/20 text-soundboard-accent text-xs rounded-full">
                        Host
                      </span>
                    )}
                  </div>
                ))}
                {participants.length === 0 && (
                  <p className="text-center py-4 text-muted-foreground">No participants in this room.</p>
                )}
              </div>
            </CardContent>
          </Card>
          
          {/* Chat Panel */}
          <Card className="flex flex-col h-96">
            <CardContent className="p-4 flex flex-col h-full">
              <h3 className="text-lg font-bold mb-4">Chat</h3>
              <div className="flex-1 overflow-y-auto pr-2 mb-4">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                    <MessageCircle className="h-8 w-8 mb-2" />
                    <p>No messages yet</p>
                    <p className="text-sm">Start the conversation!</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.user_id === user?.id ? "justify-end" : ""}`}
                      >
                        <div
                          className={`rounded-lg p-3 max-w-[80%] ${
                            message.user_id === user?.id
                              ? "bg-soundboard-accent text-white"
                              : "bg-muted"
                          }`}
                        >
                          {message.user_id !== user?.id && (
                            <p className="font-semibold text-xs mb-1">
                              {message.username || "Anonymous"}
                            </p>
                          )}
                          <p>{message.content}</p>
                          <p className="text-xs opacity-70 mt-1 text-right">
                            {new Date(message.created_at).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit"
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </div>
              <form onSubmit={handleSendMessage} className="mt-auto">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    type="submit"
                    disabled={!chatMessage.trim()}
                    className="bg-soundboard-accent hover:bg-soundboard-secondary transition-all"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default JamRoom;
