
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { getRooms, getMyRooms } from "@/services/api";
import { Room } from "@/types";

export function useRoomsFetch() {
  const { user } = useAuth();
  const [myRooms, setMyRooms] = useState<Room[]>([]);
  const [recentRooms, setRecentRooms] = useState<Room[]>([]);
  const [isLoadingMyRooms, setIsLoadingMyRooms] = useState(true);
  const [isLoadingRecentRooms, setIsLoadingRecentRooms] = useState(true);
  
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

  return {
    myRooms,
    recentRooms,
    isLoadingMyRooms,
    isLoadingRecentRooms
  };
}
