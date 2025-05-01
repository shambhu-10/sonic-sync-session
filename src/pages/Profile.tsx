
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  User, 
  MusicIcon, 
  Disc3Icon, 
  DownloadIcon, 
  BarChart3Icon 
} from "lucide-react";
import { toast } from "sonner";

// Mock user data
const mockUser = {
  id: "user1",
  name: "John Doe",
  email: "john.doe@example.com",
  avatarUrl: "",
  createdAt: new Date(2023, 5, 12).toISOString(),
};

// Mock session history
const mockSessionHistory = [
  {
    id: "session1",
    roomTitle: "Funky Jazz Session",
    date: new Date(2024, 4, 25).toISOString(),
    trackCount: 8,
    mixdownUrl: "#",
  },
  {
    id: "session2",
    roomTitle: "Lo-Fi Hip Hop Beats",
    date: new Date(2024, 4, 20).toISOString(),
    trackCount: 5,
    mixdownUrl: "#",
  },
  {
    id: "session3",
    roomTitle: "Rock Jam",
    date: new Date(2024, 4, 18).toISOString(),
    trackCount: 6,
    mixdownUrl: "#",
  },
  {
    id: "session4",
    roomTitle: "Electronic Dance Session",
    date: new Date(2024, 4, 15).toISOString(),
    trackCount: 10,
    mixdownUrl: "#",
  },
  {
    id: "session5",
    roomTitle: "Acoustic Guitar Session",
    date: new Date(2024, 4, 12).toISOString(),
    trackCount: 4,
    mixdownUrl: "#",
  },
];

// Stats data
const userStats = {
  roomsHosted: 12,
  loopsRecorded: 47,
  mixdownsExported: 8,
  avgLoopsPerSession: 3.9,
};

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(mockUser.name);
  const [email, setEmail] = useState(mockUser.email);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate update process
    setTimeout(() => {
      toast("Please connect Supabase", {
        description: "Profile updates require connecting to Supabase first."
      });
      setIsLoading(false);
      setIsEditing(false);
    }, 1500);
  };
  
  const downloadMixdown = (sessionId: string) => {
    toast("Please connect Supabase", {
      description: "Downloading mixdowns requires connecting to Supabase first."
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 animate-fade-in">Your Profile</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Profile info */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="animate-fade-in">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={mockUser.avatarUrl} alt={mockUser.name} />
                  <AvatarFallback className="bg-soundboard-accent text-white text-xl">
                    {mockUser.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                
                {isEditing ? (
                  <form onSubmit={handleUpdate} className="w-full space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                        disabled={isLoading}
                      >
                        Cancel
                      </Button>
                      <Button 
                        type="submit" 
                        className="bg-soundboard-accent hover:bg-soundboard-secondary transition-all"
                        disabled={isLoading}
                      >
                        {isLoading ? "Updating..." : "Save Changes"}
                      </Button>
                    </div>
                  </form>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold">{mockUser.name}</h2>
                    <p className="text-muted-foreground mb-4">{mockUser.email}</p>
                    <p className="text-sm text-muted-foreground">
                      Member since {new Date(mockUser.createdAt).toLocaleDateString()}
                    </p>
                    <Button
                      onClick={() => setIsEditing(true)}
                      variant="outline"
                      className="mt-4"
                    >
                      <User className="mr-2 h-4 w-4" />
                      Edit Profile
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>Activity Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <MusicIcon className="h-4 w-4 text-soundboard-primary mr-2" />
                  <span className="text-sm">Rooms Hosted</span>
                </div>
                <span className="font-bold">{userStats.roomsHosted}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Disc3Icon className="h-4 w-4 text-soundboard-primary mr-2" />
                  <span className="text-sm">Loops Recorded</span>
                </div>
                <span className="font-bold">{userStats.loopsRecorded}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <DownloadIcon className="h-4 w-4 text-soundboard-primary mr-2" />
                  <span className="text-sm">Mixdowns Exported</span>
                </div>
                <span className="font-bold">{userStats.mixdownsExported}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <BarChart3Icon className="h-4 w-4 text-soundboard-primary mr-2" />
                  <span className="text-sm">Avg Loops/Session</span>
                </div>
                <span className="font-bold">{userStats.avgLoopsPerSession}</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Right column - Session history */}
        <div className="lg:col-span-2 animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>Session History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Session</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Tracks</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockSessionHistory.map((session) => (
                    <TableRow key={session.id}>
                      <TableCell className="font-medium">{session.roomTitle}</TableCell>
                      <TableCell>{new Date(session.date).toLocaleDateString()}</TableCell>
                      <TableCell>{session.trackCount}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => downloadMixdown(session.id)}
                          className="h-8"
                        >
                          <DownloadIcon className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
