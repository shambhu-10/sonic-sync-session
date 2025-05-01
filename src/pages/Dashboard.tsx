
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { getRooms, getMyRooms, createRoom, joinRoom } from "@/services/api";
import { Room } from "@/types";
import { motion } from "framer-motion";

// Import dashboard components
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import UserStats from "@/components/dashboard/UserStats";
import RoomsList from "@/components/dashboard/RoomsList";
import CreateRoomForm from "@/components/dashboard/CreateRoomForm";
import JoinRoomForm from "@/components/dashboard/JoinRoomForm";

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

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Dashboard Header */}
      <DashboardHeader setDialogOpen={setDialogOpen} />

      {/* Stats Section */}
      <UserStats user={user} />

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
            <RoomsList 
              rooms={myRooms}
              isLoading={isLoadingMyRooms}
              emptyMessage="Create your first jam room and invite collaborators!"
              emptyActionLabel="Create New Jam Room"
              showShareButton={true}
              setDialogOpen={setDialogOpen}
            />
          </TabsContent>
          
          {/* Recent Rooms Tab */}
          <TabsContent value="recent-rooms">
            <RoomsList 
              rooms={recentRooms}
              isLoading={isLoadingRecentRooms}
              emptyMessage="No public rooms available at the moment."
            />
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Join Room Form */}
      <JoinRoomForm 
        roomCode={roomCode}
        setRoomCode={setRoomCode}
        onSubmit={handleJoinRoom}
      />

      {/* Create Room Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Jam Room</DialogTitle>
            <DialogDescription>
              Set up your jam session room and invite collaborators.
            </DialogDescription>
          </DialogHeader>
          <CreateRoomForm 
            onSubmit={handleCreateRoom}
            isSubmitting={isSubmitting}
            newRoomTitle={newRoomTitle}
            setNewRoomTitle={setNewRoomTitle}
            newRoomDescription={newRoomDescription}
            setNewRoomDescription={setNewRoomDescription}
            newRoomBpm={newRoomBpm}
            setNewRoomBpm={setNewRoomBpm}
            newRoomKey={newRoomKey}
            setNewRoomKey={setNewRoomKey}
            newRoomVisibility={newRoomVisibility}
            setNewRoomVisibility={setNewRoomVisibility}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
