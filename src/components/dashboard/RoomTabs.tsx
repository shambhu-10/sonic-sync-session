
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import RoomsList from "@/components/dashboard/RoomsList";
import { Room } from "@/types";

interface RoomTabsProps {
  myRooms: Room[];
  recentRooms: Room[];
  isLoadingMyRooms: boolean;
  isLoadingRecentRooms: boolean;
  setDialogOpen: (open: boolean) => void;
  refreshRooms?: () => void;
}

const RoomTabs = ({
  myRooms,
  recentRooms,
  isLoadingMyRooms,
  isLoadingRecentRooms,
  setDialogOpen,
  refreshRooms
}: RoomTabsProps) => {
  return (
    <motion.div 
      className="animate-fade-in"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <Tabs defaultValue="my-rooms">
        <div className="flex items-center justify-between mb-6">
          <TabsList>
            <TabsTrigger value="my-rooms">My Jam Rooms</TabsTrigger>
            <TabsTrigger value="recent-rooms">Recent Rooms</TabsTrigger>
          </TabsList>
          
          {refreshRooms && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={refreshRooms}
              className="flex items-center gap-1"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Refresh</span>
            </Button>
          )}
        </div>
        
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
