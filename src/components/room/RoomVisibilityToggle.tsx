
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { GlobeIcon, LockIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface RoomVisibilityToggleProps {
  roomId: string;
  initialVisibility: boolean;
  isHost: boolean;
}

export default function RoomVisibilityToggle({
  roomId,
  initialVisibility,
  isHost
}: RoomVisibilityToggleProps) {
  const [isPublic, setIsPublic] = useState(initialVisibility);
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();
  
  const handleToggleVisibility = async () => {
    if (!isHost) return;
    
    try {
      setIsUpdating(true);
      
      const newVisibility = !isPublic;
      
      const { error } = await supabase
        .from('rooms')
        .update({ is_public: newVisibility })
        .eq('id', roomId);
      
      if (error) throw error;
      
      setIsPublic(newVisibility);
      toast({
        title: "Room visibility updated",
        description: `Room is now ${newVisibility ? 'public' : 'private'}`,
      });
    } catch (error) {
      console.error('Failed to update room visibility:', error);
      toast({
        variant: "destructive",
        title: "Failed to update room visibility",
        description: "Please try again later.",
      });
    } finally {
      setIsUpdating(false);
    }
  };
  
  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="room-visibility"
        checked={isPublic}
        onCheckedChange={handleToggleVisibility}
        disabled={!isHost || isUpdating}
      />
      <Label htmlFor="room-visibility" className="cursor-pointer flex items-center">
        {isPublic ? (
          <>
            <GlobeIcon className="h-4 w-4 mr-1" />
            <span>Public</span>
          </>
        ) : (
          <>
            <LockIcon className="h-4 w-4 mr-1" />
            <span>Private</span>
          </>
        )}
      </Label>
    </div>
  );
}
