
import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UsersIcon } from "lucide-react";
import WaveAnimation from "./WaveAnimation";
import { Link } from "react-router-dom";

interface RoomCardProps {
  id: string;
  title: string;
  bpm: number;
  keySignature: string;
  trackCount: number;
  activeUsers?: number;
  isPublic?: boolean;
}

const RoomCard = ({
  id,
  title,
  bpm,
  keySignature,
  trackCount,
  activeUsers = 0,
  isPublic = true,
}: RoomCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="overflow-hidden border-border hover:border-soundboard-accent transition-all duration-300 hover:shadow-md hover:shadow-soundboard-primary/20"
    >
      <CardContent className="p-0">
        <div className="bg-gradient-to-r from-soundboard-primary/20 to-soundboard-accent/20 p-6 relative">
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <WaveAnimation isActive={false} />
          </div>
          <h3 className="text-lg font-medium line-clamp-1">{title}</h3>
          <div className="flex items-center justify-between mt-2 text-sm text-muted-foreground">
            <div className="flex items-center space-x-4">
              <span>{bpm} BPM</span>
              <span>Key: {keySignature}</span>
            </div>
            <div className="flex items-center">
              <UsersIcon size={14} className="mr-1" />
              <span>{activeUsers} active</span>
            </div>
          </div>
          <div className="mt-4">
            <WaveAnimation isActive={isHovered} className="h-8" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4 bg-card">
        <div className="text-sm text-muted-foreground">{trackCount} tracks</div>
        <Button 
          size="sm"
          variant="secondary"
          className="bg-soundboard-accent text-white hover:bg-soundboard-secondary transition-all"
          asChild
        >
          <Link to={`/jam/${id}`}>Join Session</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RoomCard;
