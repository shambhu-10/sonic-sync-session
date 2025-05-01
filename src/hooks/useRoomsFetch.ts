
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
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // We need to have a user to fetch rooms
    if (!user) {
      setIsLoadingMyRooms(false);
      setIsLoadingRecentRooms(false);
      return;
    }
    
    const fetchRooms = async () => {
      try {
        setIsLoadingMyRooms(true);
        setIsLoadingRecentRooms(true);
        setError(null);
        
        // Fetch user's rooms
        const userRooms = await getMyRooms(user.id);
        setMyRooms(userRooms);
        
        // Fetch recent public rooms
        const publicRooms = await getRooms(true);
        setRecentRooms(publicRooms);
      } catch (error) {
        console.error("Error fetching rooms:", error);
        setError("Failed to load rooms");
        toast.error("Failed to load rooms", {
          description: "Please try again later."
        });
      } finally {
        setIsLoadingMyRooms(false);
        setIsLoadingRecentRooms(false);
      }
    };
    
    fetchRooms();
    
    // Removing the auto-refresh interval - this was causing the auto-reloading issue
    // No need for interval or cleanup
  }, [user]);

  // Function to refresh rooms manually
  const refreshRooms = async () => {
    if (!user) return;
    
    try {
      setIsLoadingMyRooms(true);
      setIsLoadingRecentRooms(true);
      setError(null);
      
      // Fetch user's rooms
      const userRooms = await getMyRooms(user.id);
      setMyRooms(userRooms);
      
      // Fetch recent public rooms
      const publicRooms = await getRooms(true);
      setRecentRooms(publicRooms);
      
      toast.success("Rooms refreshed successfully");
    } catch (error) {
      console.error("Error refreshing rooms:", error);
      setError("Failed to refresh rooms");
      toast.error("Failed to refresh rooms", {
        description: "Please try again later."
      });
    } finally {
      setIsLoadingMyRooms(false);
      setIsLoadingRecentRooms(false);
    }
  };

  return {
    myRooms,
    recentRooms,
    isLoadingMyRooms,
    isLoadingRecentRooms,
    error,
    refreshRooms
  };
}
