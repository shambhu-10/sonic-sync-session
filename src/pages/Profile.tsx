import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
  BarChart3Icon,
  FileAudio,
  Clock
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { getMixdowns, updateProfile } from "@/services/api";
import { Mixdown } from "@/types";
import { Spinner } from "@/components/ui/spinner";
import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mixdowns, setMixdowns] = useState<(Mixdown & { roomTitle?: string, username?: string })[]>([]);
  const [isLoadingMixdowns, setIsLoadingMixdowns] = useState(false);
  
  useEffect(() => {
    if (user) {
      setUsername(user.username || "");
      
      // Fetch user mixdowns
      const fetchMixdowns = async () => {
        try {
          setIsLoadingMixdowns(true);
          // Get all rooms where the user is a host
          const { data: rooms, error: roomsError } = await supabase
            .from("rooms")
            .select("id")
            .eq("host_id", user.id);
          
          if (roomsError) throw roomsError;
          
          // Get mixdowns for those rooms
          const roomIds = rooms.map(room => room.id);
          
          if (roomIds.length > 0) {
            const { data: mixdownData, error: mixdownsError } = await supabase
              .from("mixdowns")
              .select(`
                *,
                rooms:room_id (title),
                profiles:user_id (username)
              `)
              .in("room_id", roomIds)
              .order("created_at", { ascending: false })
              .limit(10);
            
            if (mixdownsError) throw mixdownsError;
            
            setMixdowns(mixdownData.map(mixdown => ({
              ...mixdown,
              roomTitle: mixdown.rooms?.title,
              username: mixdown.profiles?.username
            })));
          }
        } catch (error) {
          console.error("Error fetching mixdowns:", error);
          toast.error("Failed to load mixdown history");
        } finally {
          setIsLoadingMixdowns(false);
        }
      };
      
      fetchMixdowns();
    }
  }, [user]);
  
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsLoading(true);
    
    try {
      await updateProfile(user.id, {
        username
      });
      
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile", {
        description: "There was a problem saving your changes."
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const downloadMixdown = (fileUrl: string, title: string) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = title.replace(/\s+/g, '_') + '.wav';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1 
        className="text-3xl font-bold mb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        Your Profile
      </motion.h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Profile info */}
        <div className="lg:col-span-1 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={user.avatar_url} alt={user.username} />
                    <AvatarFallback className="bg-soundboard-accent text-white text-xl">
                      {user.username ? user.username[0].toUpperCase() : "U"}
                    </AvatarFallback>
                  </Avatar>
                  
                  {isEditing ? (
                    <form onSubmit={handleUpdate} className="w-full space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                          id="username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
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
                      <h2 className="text-2xl font-bold">{user.username || "Anonymous"}</h2>
                      <p className="text-muted-foreground mb-4">{user.email}</p>
                      <p className="text-sm text-muted-foreground">
                        Member since {new Date().toLocaleDateString()} {/* This would typically come from user.created_at */}
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
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Activity Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <MusicIcon className="h-4 w-4 text-soundboard-primary mr-2" />
                    <span className="text-sm">Rooms Hosted</span>
                  </div>
                  <span className="font-bold">{user.rooms_hosted}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Disc3Icon className="h-4 w-4 text-soundboard-primary mr-2" />
                    <span className="text-sm">Loops Recorded</span>
                  </div>
                  <span className="font-bold">{user.loops_recorded}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <DownloadIcon className="h-4 w-4 text-soundboard-primary mr-2" />
                    <span className="text-sm">Mixdowns Exported</span>
                  </div>
                  <span className="font-bold">{user.mixdowns_exported}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <BarChart3Icon className="h-4 w-4 text-soundboard-primary mr-2" />
                    <span className="text-sm">Avg Loops/Session</span>
                  </div>
                  <span className="font-bold">
                    {user.rooms_hosted > 0 
                      ? (user.loops_recorded / user.rooms_hosted).toFixed(1) 
                      : '0.0'}
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        
        {/* Right column - Session history */}
        <motion.div 
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Mixdown History</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingMixdowns ? (
                <div className="flex justify-center py-8">
                  <Spinner size="lg" />
                </div>
              ) : mixdowns.length === 0 ? (
                <div className="text-center py-8">
                  <FileAudio className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No mixdowns yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Create jam sessions and export mixdowns to see your history here.
                  </p>
                  <Button asChild className="bg-soundboard-accent hover:bg-soundboard-secondary transition-all">
                    <Link to="/dashboard">Create a Jam Room</Link>
                  </Button>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Session</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mixdowns.map((mixdown) => (
                      <TableRow key={mixdown.id}>
                        <TableCell className="font-medium">{mixdown.roomTitle || "Untitled Session"}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                            <span>{formatDistanceToNow(new Date(mixdown.created_at), { addSuffix: true })}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => downloadMixdown(mixdown.file_url, mixdown.roomTitle || "Mixdown")}
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
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
