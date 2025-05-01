
import { Room } from "@/types";
import RoomCard from "@/components/RoomCard";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { LinkIcon } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";

interface RoomsListProps {
  rooms: Room[];
  isLoading: boolean;
  emptyMessage: string;
  emptyActionLabel?: string;
  showShareButton?: boolean;
  setDialogOpen?: (open: boolean) => void;
}

const RoomsList = ({ 
  rooms, 
  isLoading, 
  emptyMessage, 
  emptyActionLabel,
  showShareButton = false,
  setDialogOpen
}: RoomsListProps) => {
  // Copy room link handler
  const copyRoomLink = (roomId: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/jam/${roomId}`);
    toast("Link copied to clipboard", {
      description: "Share this link with your collaborators."
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  if (rooms.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium mb-2">No rooms yet</h3>
        <p className="text-muted-foreground mb-4">
          {emptyMessage}
        </p>
        {emptyActionLabel && setDialogOpen && (
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-soundboard-accent hover:bg-soundboard-secondary transition-all">
                <PlusIcon className="mr-2 h-4 w-4" />
                {emptyActionLabel}
              </Button>
            </DialogTrigger>
            <DialogContent>{/* Dialog content will be rendered from parent */}</DialogContent>
          </Dialog>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {rooms.map((room) => (
        <motion.div 
          key={room.id} 
          className="group"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <RoomCard room={room} />
          {showShareButton && (
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
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default RoomsList;
