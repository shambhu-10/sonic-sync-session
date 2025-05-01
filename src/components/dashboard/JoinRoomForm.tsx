
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";

interface JoinRoomFormProps {
  roomCode: string;
  setRoomCode: (code: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const JoinRoomForm = ({ roomCode, setRoomCode, onSubmit }: JoinRoomFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomCode.trim()) {
      toast.error("Please enter a room code");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await onSubmit(e);
    } catch (error) {
      console.error("Error joining room:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      className="mt-12 animate-fade-in"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <Card id="join-form">
        <CardHeader>
          <CardTitle>Join a Jam Room</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex items-center space-x-2">
            <Input
              placeholder="Enter room code or paste link"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
              className="flex-1"
              required
            />
            <Button 
              type="submit"
              className="bg-soundboard-accent hover:bg-soundboard-secondary transition-all"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Joining...' : 'Join Room'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default JoinRoomForm;
