
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Room } from "@/types";
import { Music, Users, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface RoomCardProps {
  room: Room;
}

const RoomCard = ({ room }: RoomCardProps) => {
  const timeAgo = formatDistanceToNow(new Date(room.created_at), { addSuffix: true });
  
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="h-3 bg-soundboard-accent" />
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-bold mb-1">{room.title}</h3>
            {room.description && (
              <p className="text-sm text-muted-foreground mb-3">{room.description}</p>
            )}
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center">
                <Music className="h-4 w-4 mr-1 text-soundboard-accent" />
                <span>{room.bpm} BPM</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold">{room.key_signature}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="mb-1">
              {room.is_public ? (
                <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded-full">
                  Public
                </span>
              ) : (
                <span className="px-2 py-1 bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 text-xs rounded-full">
                  Private
                </span>
              )}
            </div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <Clock className="h-3 w-3 mr-1" />
              <span>{timeAgo}</span>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="h-4 w-4 mr-1" />
            <span>0 active</span>
          </div>
          <Button asChild className="bg-soundboard-accent hover:bg-soundboard-secondary transition-all">
            <Link to={`/jam/${room.id}`}>
              Join Session
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoomCard;
