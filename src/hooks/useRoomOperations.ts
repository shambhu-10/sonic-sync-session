
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { createRoom, joinRoom } from "@/services/api";
import { Room } from "@/types";

export function useRoomOperations() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Create room state
  const [newRoomTitle, setNewRoomTitle] = useState("");
  const [newRoomDescription, setNewRoomDescription] = useState("");
  const [newRoomBpm, setNewRoomBpm] = useState("120");
  const [newRoomKey, setNewRoomKey] = useState("C");
  const [newRoomVisibility, setNewRoomVisibility] = useState("public");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Join room state
  const [roomCode, setRoomCode] = useState("");

  // Create new room handler
  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("You must be logged in to create a room");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      console.log("Creating room with params:", {
        title: newRoomTitle,
        description: newRoomDescription,
        bpm: parseInt(newRoomBpm),
        key_signature: newRoomKey,
        host_id: user.id,
        is_public: newRoomVisibility === "public"
      });
      
      const newRoom = await createRoom({
        title: newRoomTitle,
        description: newRoomDescription,
        bpm: parseInt(newRoomBpm),
        key_signature: newRoomKey,
        host_id: user.id,
        is_public: newRoomVisibility === "public"
      });
      
      toast.success("Jam room created successfully!");
      
      // Reset form fields
      setNewRoomTitle("");
      setNewRoomDescription("");
      setNewRoomBpm("120");
      setNewRoomKey("C");
      setNewRoomVisibility("public");
      
      // Navigate to the new room
      navigate(`/room/${newRoom.id}`);
    } catch (error: any) {
      console.error("Error creating room:", error);
      toast.error("Failed to create room", {
        description: error.message || "Please try again later."
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Join room handler - Fixed to properly extract room ID from various formats
  const handleJoinRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !roomCode) {
      toast.error("Please enter a room code and ensure you're logged in");
      return;
    }
    
    try {
      // Extract room ID from code or link
      let roomId = roomCode.trim();
      
      // Check if it's a URL and extract the ID
      if (roomId.includes("/room/")) {
        const parts = roomId.split("/room/");
        if (parts.length > 1) {
          roomId = parts[1].split(/[/?#]/)[0];
        }
      }
      
      console.log("Attempting to join room with ID:", roomId);
      
      // Attempt to join the room
      const roomData = await joinRoom(roomId, user.id);
      
      toast.success("Successfully joined the jam room!");
      
      // Reset form field
      setRoomCode("");
      
      // Redirect to the room
      navigate(`/room/${roomId}`);
    } catch (error: any) {
      console.error("Error joining room:", error);
      toast.error("Failed to join room", {
        description: error.message || "Invalid room code or the room does not exist."
      });
    }
  };

  return {
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
  };
}
