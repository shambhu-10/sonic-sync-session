
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  PlusIcon, 
  UsersIcon, 
  Disc3Icon, 
  ArrowDownIcon,
  BarChart3Icon,
  LinkIcon,
  MusicIcon
} from "lucide-react";
import RoomCard from "@/components/RoomCard";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { getRooms, getMyRooms, createRoom, joinRoom } from "@/services/api";
import { Room } from "@/types";
import { Spinner } from "@/components/ui/spinner";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [myRooms, setMyRooms] = useState<Room[]>([]);
  const [recentRooms, setRecentRooms] = useState<Room[]>([]);
  const [isLoadingMyRooms, setIsLoadingMyRooms] = useState(true);
  const [isLoadingRecentRooms, setIsLoadingRecentRooms] = useState(true);
  
  const [newRoomTitle, setNewRoomTitle] = useState("");
  const [newRoomDescription, setNewRoomDescription] = useState("");
  const [newRoomBpm, setNewRoomBpm] = useState("120");
  const [newRoomKey, setNewRoomKey] = useState("C");
  const [newRoomVisibility, setNewRoomVisibility] = useState("public");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [roomCode, setRoomCode] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  
  useEffect(() => {
    if (!user) return;
    
    const fetchRooms = async () => {
      try {
        setIsLoadingMyRooms(true);
        setIsLoadingRecentRooms(true);
        
        // Fetch user's rooms
        const userRooms = await getMyRooms(user.id);
        setMyRooms(userRooms);
        
        // Fetch recent public rooms
        const publicRooms = await getRooms(true);
        setRecentRooms(publicRooms);
      } catch (error) {
        console.error("Error fetching rooms:", error);
        toast.error("Failed to load rooms", {
          description: "Please try again later."
        });
      } finally {
        setIsLoadingMyRooms(false);
        setIsLoadingRecentRooms(false);
      }
    };
    
    fetchRooms();
  }, [user]);
  
  // Create new room handler
  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsSubmitting(true);
    
    try {
      const newRoom = await createRoom({
        title: newRoomTitle,
        description: newRoomDescription,
        bpm: parseInt(newRoomBpm),
        key_signature: newRoomKey,
        host_id: user.id,
        is_public: newRoomVisibility === "public"
      });
      
      toast.success("Jam room created successfully!");
      setDialogOpen(false);
      navigate(`/jam/${newRoom.id}`);
    } catch (error) {
      console.error("Error creating room:", error);
      toast.error("Failed to create room", {
        description: "Please try again later."
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Join room handler
  const handleJoinRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !roomCode) return;
    
    try {
      // Extract room ID from code or link
      let roomId = roomCode;
      
      // Check if it's a URL and extract the ID
      if (roomCode.includes("/jam/")) {
        const parts = roomCode.split("/jam/");
        roomId = parts[parts.length - 1];
      }
      
      // Attempt to join the room
      await joinRoom(roomId, user.id);
      
      // Redirect to the room
      navigate(`/jam/${roomId}`);
    } catch (error) {
      console.error("Error joining room:", error);
      toast.error("Failed to join room", {
        description: "Invalid room code or the room does not exist."
      });
    }
  };

  // Copy room link handler
  const copyRoomLink = (roomId: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/jam/${roomId}`);
    toast("Link copied to clipboard", {
      description: "Share this link with your collaborators."
    });
  };

  // User stats
  const userStats = {
    roomsHosted: user?.rooms_hosted || 0,
    loopsRecorded: user?.loops_recorded || 0,
    mixdownsExported: user?.mixdowns_exported || 0,
    avgLoopsPerSession: user?.loops_recorded && user.rooms_hosted 
      ? (user.loops_recorded / user.rooms_hosted).toFixed(1) 
      : "0.0"
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome to your Dashboard</h1>
          <p className="text-muted-foreground">Create, join, and manage your jam sessions</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-soundboard-accent hover:bg-soundboard-secondary transition-all">
                <PlusIcon className="mr-2 h-4 w-4" />
                Create New Jam Room
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Jam Room</DialogTitle>
                <DialogDescription>
                  Set up your jam session room and invite collaborators.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateRoom}>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="room-name">Room Name</Label>
                    <Input
                      id="room-name"
                      placeholder="My Awesome Jam Session"
                      value={newRoomTitle}
                      onChange={(e) => setNewRoomTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="room-description">Description (Optional)</Label>
                    <Input
                      id="room-description"
                      placeholder="What kind of music are you creating?"
                      value={newRoomDescription}
                      onChange={(e) => setNewRoomDescription(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bpm">BPM</Label>
                      <Input
                        id="bpm"
                        type="number"
                        placeholder="120"
                        min="40"
                        max="280"
                        value={newRoomBpm}
                        onChange={(e) => setNewRoomBpm(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="key">Key Signature</Label>
                      <Select value={newRoomKey} onValueChange={setNewRoomKey}>
                        <SelectTrigger id="key">
                          <SelectValue placeholder="Select key" />
                        </SelectTrigger>
                        <SelectContent>
                          {["C", "C#/Db", "D", "D#/Eb", "E", "F", "F#/Gb", "G", "G#/Ab", "A", "A#/Bb", "B",
                            "Cm", "C#m/Dbm", "Dm", "D#m/Ebm", "Em", "Fm", "F#m/Gbm", "Gm", "G#m/Abm", "Am", "A#m/Bbm", "Bm"].map((key) => (
                            <SelectItem key={key} value={key}>
                              {key}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="visibility">Room Visibility</Label>
                    <Select 
                      value={newRoomVisibility} 
                      onValueChange={setNewRoomVisibility}
                    >
                      <SelectTrigger id="visibility">
                        <SelectValue placeholder="Select visibility" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public (Anyone can join)</SelectItem>
                        <SelectItem value="private">Private (Invite only)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button 
                    type="submit" 
                    className="bg-soundboard-accent hover:bg-soundboard-secondary transition-all"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Creating..." : "Create Room"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          
          <Button variant="outline" asChild>
            <Link to="#join-form" onClick={() => document.getElementById("join-form")?.scrollIntoView({ behavior: "smooth" })}>
              <UsersIcon className="mr-2 h-4 w-4" />
              Join Jam Room
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <motion.div 
          className="animate-fade-in"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card>
            <CardContent className="flex flex-row items-center p-6">
              <div className="bg-soundboard-primary/10 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                <MusicIcon className="text-soundboard-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Rooms Hosted</p>
                <h3 className="text-2xl font-bold">{userStats.roomsHosted}</h3>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div 
          className="animate-fade-in"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card>
            <CardContent className="flex flex-row items-center p-6">
              <div className="bg-soundboard-primary/10 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                <Disc3Icon className="text-soundboard-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Loops Recorded</p>
                <h3 className="text-2xl font-bold">{userStats.loopsRecorded}</h3>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div 
          className="animate-fade-in"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card>
            <CardContent className="flex flex-row items-center p-6">
              <div className="bg-soundboard-primary/10 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                <ArrowDownIcon className="text-soundboard-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Mixdowns Exported</p>
                <h3 className="text-2xl font-bold">{userStats.mixdownsExported}</h3>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div 
          className="animate-fade-in"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Card>
            <CardContent className="flex flex-row items-center p-6">
              <div className="bg-soundboard-primary/10 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                <BarChart3Icon className="text-soundboard-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Loops/Session</p>
                <h3 className="text-2xl font-bold">{userStats.avgLoopsPerSession}</h3>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Main Content Tabs */}
      <motion.div 
        className="animate-fade-in"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Tabs defaultValue="my-rooms">
          <TabsList className="mb-6">
            <TabsTrigger value="my-rooms">My Jam Rooms</TabsTrigger>
            <TabsTrigger value="recent-rooms">Recent Rooms</TabsTrigger>
          </TabsList>
          
          {/* My Rooms Tab */}
          <TabsContent value="my-rooms" className="space-y-6">
            {isLoadingMyRooms ? (
              <div className="flex justify-center py-12">
                <Spinner size="lg" />
              </div>
            ) : myRooms.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No rooms yet</h3>
                <p className="text-muted-foreground mb-4">
                  Create your first jam room and invite collaborators!
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-soundboard-accent hover:bg-soundboard-secondary transition-all">
                      <PlusIcon className="mr-2 h-4 w-4" />
                      Create New Jam Room
                    </Button>
                  </DialogTrigger>
                  <DialogContent>{/* Same dialog content as above */}</DialogContent>
                </Dialog>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myRooms.map((room) => (
                  <motion.div 
                    key={room.id} 
                    className="group"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <RoomCard room={room} />
                    <div className="mt-2 flex justify-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyRoomLink(room.id)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <LinkIcon className="mr-1 h-4 w-4" />
                        Share Link
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>
          
          {/* Recent Rooms Tab */}
          <TabsContent value="recent-rooms">
            {isLoadingRecentRooms ? (
              <div className="flex justify-center py-12">
                <Spinner size="lg" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentRooms.map((room) => (
                  <motion.div 
                    key={room.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <RoomCard room={room} />
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Join Room Form */}
      <motion.div 
        className="mt-12 animate-fade-in"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card id="join-form">
          <CardHeader>
            <CardTitle>Join a Jam Room</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleJoinRoom} className="flex items-center space-x-2">
              <Input
                placeholder="Enter room code or paste link"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value)}
                className="flex-1"
                required
              />
              <Button 
                type="submit"
                className="bg-soundboard-accent hover:bg-soundboard-secondary transition-all"
              >
                Join Room
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Dashboard;
