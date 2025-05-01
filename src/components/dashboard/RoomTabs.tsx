
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RoomsList from "@/components/dashboard/RoomsList";
import { Room } from "@/types";

interface RoomTabsProps {
  myRooms: Room[];
  recentRooms: Room[];
  isLoadingMyRooms: boolean;
  isLoadingRecentRooms: boolean;
  setDialogOpen: (open: boolean) => void;
}

const RoomTabs = ({
  myRooms,
  recentRooms,
  isLoadingMyRooms,
  isLoadingRecentRooms,
  setDialogOpen
}: RoomTabsProps) => {
  return (
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
  );
};

export default RoomTabs;
