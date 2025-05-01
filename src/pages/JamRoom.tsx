
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  RecordIcon, 
  StopCircleIcon, 
  Play, 
  DownloadIcon,
  LinkIcon,
  UsersIcon,
  MessagesSquareIcon,
  Mic
} from "lucide-react";
import WaveAnimation from "@/components/WaveAnimation";
import { toast } from "sonner";

// Mock data for the room
const mockRoom = {
  id: "room1",
  title: "Funky Jazz Session",
  bpm: 120,
  keySignature: "Cm",
  visibility: "public",
  host: "John Doe",
  createdAt: new Date().toISOString(),
};

// Mock data for tracks
const mockTracks = [
  {
    id: "track1",
    name: "Bass Line",
    userId: "user1",
    userName: "John",
    order: 1,
    fileUrl: "#",
    createdAt: new Date().toISOString(),
  },
  {
    id: "track2",
    name: "Drums",
    userId: "user2",
    userName: "Sarah",
    order: 2,
    fileUrl: "#",
    createdAt: new Date().toISOString(),
  },
  {
    id: "track3",
    name: "Piano Chord Progression",
    userId: "user3",
    userName: "Mike",
    order: 3,
    fileUrl: "#",
    createdAt: new Date().toISOString(),
  },
];

// Mock data for active users
const mockActiveUsers = [
  { id: "user1", name: "John" },
  { id: "user2", name: "Sarah" },
  { id: "user3", name: "Mike" },
];

// Mock chat messages
const mockChatMessages = [
  { id: "msg1", userId: "user1", userName: "John", text: "Hey everyone! Ready to jam?", timestamp: new Date().toISOString() },
  { id: "msg2", userId: "user2", userName: "Sarah", text: "Let's do this! I'll record drums first.", timestamp: new Date().toISOString() },
  { id: "msg3", userId: "user3", userName: "Mike", text: "Sounds great, I'll add piano after.", timestamp: new Date().toISOString() },
];

const JamRoom = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [trackName, setTrackName] = useState("");
  const [activeTab, setActiveTab] = useState("mixer");
  const [tracks, setTracks] = useState(mockTracks);
  const [trackVolumes, setTrackVolumes] = useState<Record<string, number>>({});
  const [trackEnabled, setTrackEnabled] = useState<Record<string, boolean>>({});
  const [chatMessage, setChatMessage] = useState("");
  const [exportProgress, setExportProgress] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
  
  // Init track controls
  useEffect(() => {
    const volumes: Record<string, number> = {};
    const enabled: Record<string, boolean> = {};
    
    tracks.forEach(track => {
      volumes[track.id] = 75; // Default to 75%
      enabled[track.id] = true; // Default to enabled
    });
    
    setTrackVolumes(volumes);
    setTrackEnabled(enabled);
  }, [tracks]);
  
  // Recording timer
  useEffect(() => {
    let interval: number | undefined;
    
    if (isRecording) {
      interval = window.setInterval(() => {
        setRecordingTime(prev => {
          // Max 30 seconds
          if (prev >= 30) {
            setIsRecording(false);
            return 30;
          }
          return prev + 1;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording]);
  
  // Toggle recording
  const toggleRecording = () => {
    if (!isRecording) {
      // Start recording
      toast("Please connect Supabase", {
        description: "Recording requires connecting to Supabase first."
      });
      setRecordingTime(0);
      setIsRecording(true);
    } else {
      // Stop recording
      setIsRecording(false);
    }
  };
  
  // Save recording
  const saveRecording = () => {
    if (trackName.trim() === "") {
      toast.error("Please enter a track name");
      return;
    }
    
    toast("Track saved", {
      description: "Your loop was saved successfully."
    });
    
    setTrackName("");
    setRecordingTime(0);
  };
  
  // Handle volume change
  const handleVolumeChange = (trackId: string, values: number[]) => {
    setTrackVolumes(prev => ({
      ...prev,
      [trackId]: values[0]
    }));
  };
  
  // Toggle track enabled
  const toggleTrackEnabled = (trackId: string) => {
    setTrackEnabled(prev => ({
      ...prev,
      [trackId]: !prev[trackId]
    }));
  };
  
  // Copy room link
  const copyRoomLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/jam/${roomId}`);
    toast("Link copied to clipboard", {
      description: "Share this link with your collaborators."
    });
  };
  
  // Send chat message
  const sendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatMessage.trim() === "") return;
    
    toast("Please connect Supabase", {
      description: "Chat requires connecting to Supabase first."
    });
    
    setChatMessage("");
  };
  
  // Export mixdown
  const exportMixdown = () => {
    setIsExporting(true);
    setExportProgress(0);
    
    // Simulate export process
    const interval = setInterval(() => {
      setExportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsExporting(false);
          toast("Mixdown complete", {
            description: "Your mixdown has been exported and is ready to download."
          });
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold mb-2">{mockRoom.title}</h1>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="flex items-center">
              <span className="font-medium mr-1">BPM:</span> {mockRoom.bpm}
            </span>
            <span className="flex items-center">
              <span className="font-medium mr-1">Key:</span> {mockRoom.keySignature}
            </span>
            <span className="flex items-center">
              <UsersIcon className="mr-1 h-4 w-4" />
              {mockActiveUsers.length} active users
            </span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
          <Button variant="outline" onClick={copyRoomLink}>
            <LinkIcon className="mr-2 h-4 w-4" />
            Copy Room Link
          </Button>
          <Button 
            onClick={exportMixdown} 
            disabled={isExporting}
            className="bg-soundboard-accent hover:bg-soundboard-secondary transition-all"
          >
            <DownloadIcon className="mr-2 h-4 w-4" />
            {isExporting ? `Exporting (${exportProgress}%)` : "Export Mixdown"}
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Recording and tracks */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recording section */}
          <Card className="animate-fade-in">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Record a Loop</h2>
              
              <div className="flex flex-col space-y-4">
                <div className="flex items-center">
                  <Input
                    placeholder="Track name"
                    value={trackName}
                    onChange={(e) => setTrackName(e.target.value)}
                    className="mr-4"
                    disabled={isRecording}
                  />
                  <Button 
                    onClick={toggleRecording}
                    variant={isRecording ? "destructive" : "secondary"}
                    className={`${isRecording ? "" : "bg-soundboard-primary hover:bg-soundboard-accent text-white"}`}
                  >
                    {isRecording ? (
                      <>
                        <StopCircleIcon className="mr-2 h-4 w-4" /> 
                        Stop ({recordingTime}s)
                      </>
                    ) : (
                      <>
                        <RecordIcon className="mr-2 h-4 w-4" />
                        Record
                      </>
                    )}
                  </Button>
                </div>
                
                {isRecording && (
                  <div className="py-4 flex justify-center">
                    <WaveAnimation isActive={true} className="w-full justify-center" />
                  </div>
                )}
                
                {recordingTime > 0 && !isRecording && (
                  <div className="flex justify-end">
                    <Button onClick={saveRecording} className="bg-soundboard-accent hover:bg-soundboard-secondary transition-all">
                      Save Loop
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          {/* Tracks and mixer */}
          <div className="animate-fade-in">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="mixer">Track Mixer</TabsTrigger>
                <TabsTrigger value="chat">Chat</TabsTrigger>
              </TabsList>
              
              <TabsContent value="mixer" className="space-y-4">
                <h2 className="text-xl font-bold mb-4">Track Mixer</h2>
                
                {tracks.length === 0 ? (
                  <div className="text-center py-12 border rounded-lg">
                    <Mic className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No tracks recorded yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Record your first loop to start mixing!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {tracks.map((track) => (
                      <div key={track.id} className="border rounded-lg p-4">
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                          <div className="flex-1">
                            <div className="flex justify-between items-center mb-2">
                              <div>
                                <h4 className="font-medium">{track.name}</h4>
                                <p className="text-sm text-muted-foreground">by {track.userName}</p>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="flex items-center">
                                  <Switch
                                    checked={trackEnabled[track.id] || false}
                                    onCheckedChange={() => toggleTrackEnabled(track.id)}
                                    id={`enable-${track.id}`}
                                  />
                                  <Label htmlFor={`enable-${track.id}`} className="ml-2">
                                    {trackEnabled[track.id] ? "Enabled" : "Muted"}
                                  </Label>
                                </div>
                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                  <Play className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-4">
                              <span className="text-xs text-muted-foreground">0%</span>
                              <Slider
                                disabled={!trackEnabled[track.id]}
                                value={[trackVolumes[track.id] || 75]}
                                min={0}
                                max={100}
                                step={1}
                                onValueChange={(values) => handleVolumeChange(track.id, values)}
                                className="flex-1"
                              />
                              <span className="text-xs text-muted-foreground">100%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="chat">
                <div className="flex flex-col h-[400px]">
                  <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-4 border rounded-lg">
                    {mockChatMessages.map((message) => (
                      <div key={message.id} className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{message.userName}</span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(message.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="text-sm">{message.text}</p>
                      </div>
                    ))}
                  </div>
                  
                  <form onSubmit={sendChatMessage} className="flex gap-2">
                    <Input
                      placeholder="Type a message..."
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      className="flex-1"
                    />
                    <Button type="submit">Send</Button>
                  </form>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        {/* Right column - Active users */}
        <div className="space-y-6">
          <Card className="animate-fade-in">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Active Users</h2>
                <UsersIcon className="h-5 w-5 text-muted-foreground" />
              </div>
              
              <div className="space-y-3">
                {mockActiveUsers.map((user) => (
                  <div key={user.id} className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-soundboard-accent/20 flex items-center justify-center mr-3">
                      <span className="text-sm font-medium">{user.name.charAt(0)}</span>
                    </div>
                    <span>{user.name}</span>
                    <span className="ml-auto">
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="animate-fade-in">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Room Chat</h2>
              <div className="flex items-center mb-4">
                <MessagesSquareIcon className="h-5 w-5 text-muted-foreground mr-2" />
                <span className="text-sm text-muted-foreground">
                  {mockChatMessages.length} messages
                </span>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">
                Chat with other jammers in the room to coordinate your session.
              </p>
              
              <Button 
                onClick={() => setActiveTab("chat")} 
                className="w-full bg-soundboard-accent hover:bg-soundboard-secondary transition-all"
                variant="default"
              >
                Open Chat
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default JamRoom;
