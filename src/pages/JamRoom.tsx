import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ExitIcon, Settings } from "lucide-react";
import { toast } from "sonner";
import { getRoomById } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";
import { Room } from "@/types";
import RoomVisibilityToggle from "@/components/room/RoomVisibilityToggle";

const JamRoom = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  
  useEffect(() => {
    const fetchRoom = async () => {
      if (!roomId) return;
      
      try {
        setLoading(true);
        const roomData = await getRoomById(roomId);
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

  const handleExitRoom = () => {
    toast.success("Exited jam room");
    navigate('/dashboard');
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
            <ExitIcon className="mr-2 h-4 w-4" />
            Exit Room
          </Button>
        </div>
      </div>
      
      {/* Main jam room content will go here */}
      <div>
        {/* Room content will be implemented as needed */}
        <p className="text-center text-muted-foreground py-12">
          The rest of the jam room interface will appear here...
        </p>
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
