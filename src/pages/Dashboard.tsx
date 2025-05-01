
import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { useRoomOperations } from "@/hooks/useRoomOperations";
import { useRoomsFetch } from "@/hooks/useRoomsFetch";

// Import dashboard components
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import UserStats from "@/components/dashboard/UserStats";
import JoinRoomForm from "@/components/dashboard/JoinRoomForm";
import RoomTabs from "@/components/dashboard/RoomTabs";
import CreateRoomDialog from "@/components/dashboard/CreateRoomDialog";

const Dashboard = () => {
  const { user } = useAuth();
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Custom hooks for room operations
  const {
    // Create room
    newRoomTitle,
    setNewRoomTitle,
    newRoomDescription,
    setNewRoomDescription,
    newRoomBpm,
    setNewRoomBpm,
    newRoomKey,
    setNewRoomKey,
    newRoomVisibility,
    setNewRoomVisibility,
    isSubmitting,
    handleCreateRoom,
    
    // Join room
    roomCode,
    setRoomCode,
    handleJoinRoom
  } = useRoomOperations();
  
  // Custom hook for fetching rooms
  const {
    myRooms,
    recentRooms,
    isLoadingMyRooms,
    isLoadingRecentRooms
  } = useRoomsFetch();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Dashboard Header */}
      <DashboardHeader setDialogOpen={setDialogOpen} />

      {/* Stats Section */}
      <UserStats user={user} />

      {/* Main Content Tabs */}
      <RoomTabs 
        myRooms={myRooms}
        recentRooms={recentRooms}
        isLoadingMyRooms={isLoadingMyRooms}
        isLoadingRecentRooms={isLoadingRecentRooms}
        setDialogOpen={setDialogOpen}
      />

      {/* Join Room Form */}
      <JoinRoomForm 
        roomCode={roomCode}
        setRoomCode={setRoomCode}
        onSubmit={handleJoinRoom}
      />

      {/* Create Room Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <CreateRoomDialog
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
      </Dialog>
    </div>
  );
};

export default Dashboard;
