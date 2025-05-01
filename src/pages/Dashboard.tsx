
import { useState } from "react";
import { Link } from "react-router-dom";
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

// Mock room data
const myRooms = [
  {
    id: "room5",
    title: "Acoustic Guitar Session",
    bpm: 110,
    keySignature: "D",
    trackCount: 4,
    activeUsers: 1,
    isPublic: true,
  },
  {
    id: "room6",
    title: "Piano Improvisation",
    bpm: 95,
    keySignature: "Eb",
    trackCount: 3,
    activeUsers: 0,
    isPublic: false,
  },
];

const recentRooms = [
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
    id: "room3",
    title: "Rock Jam",
    bpm: 140,
    keySignature: "Em",
    trackCount: 6,
    activeUsers: 1,
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
    id: "room4",
    title: "Electronic Dance Session",
    bpm: 128,
    keySignature: "F",
    trackCount: 10,
    activeUsers: 4,
    isPublic: true,
  },
];

// Stats data
const userStats = {
  roomsHosted: 12,
  loopsRecorded: 47,
  mixdownsExported: 8,
  avgLoopsPerSession: 3.9,
};

const Dashboard = () => {
  const [newRoomTitle, setNewRoomTitle] = useState("");
  const [newRoomBpm, setNewRoomBpm] = useState("120");
  const [newRoomKey, setNewRoomKey] = useState("C");
  const [newRoomVisibility, setNewRoomVisibility] = useState("public");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [roomCode, setRoomCode] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Create new room handler
  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate room creation
    setTimeout(() => {
      toast("Please connect Supabase", {
        description: "Room creation requires connecting to Supabase first."
      });
      setIsSubmitting(false);
      setDialogOpen(false);
    }, 1500);
  };
  
  // Join room handler
  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomCode) return;
    
    toast("Please connect Supabase", {
      description: "Joining rooms requires connecting to Supabase first."
    });
  };

  // Copy room link handler
  const copyRoomLink = (roomId: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/jam/${roomId}`);
    toast("Link copied to clipboard", {
      description: "Share this link with your collaborators."
    });
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
            <Link to="#join-modal" onClick={() => document.getElementById("join-form")?.scrollIntoView({ behavior: "smooth" })}>
              <UsersIcon className="mr-2 h-4 w-4" />
              Join Jam Room
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="animate-fade-in">
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
        
        <Card className="animate-fade-in">
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
        
        <Card className="animate-fade-in">
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
        
        <Card className="animate-fade-in">
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
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="my-rooms" className="animate-fade-in">
        <TabsList className="mb-6">
          <TabsTrigger value="my-rooms">My Jam Rooms</TabsTrigger>
          <TabsTrigger value="recent-rooms">Recent Rooms</TabsTrigger>
        </TabsList>
        
        {/* My Rooms Tab */}
        <TabsContent value="my-rooms" className="space-y-6">
          {myRooms.length === 0 ? (
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
                <div key={room.id} className="group">
                  <RoomCard {...room} />
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
                </div>
              ))}
            </div>
          )}
        </TabsContent>
        
        {/* Recent Rooms Tab */}
        <TabsContent value="recent-rooms">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentRooms.map((room) => (
              <RoomCard key={room.id} {...room} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Join Room Form */}
      <Card className="mt-12 animate-fade-in" id="join-form">
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
    </div>
  );
};

export default Dashboard;
