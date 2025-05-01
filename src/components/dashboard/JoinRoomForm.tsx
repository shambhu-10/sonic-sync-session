
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

interface JoinRoomFormProps {
  roomCode: string;
  setRoomCode: (code: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const JoinRoomForm = ({ roomCode, setRoomCode, onSubmit }: JoinRoomFormProps) => {
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
          <form onSubmit={onSubmit} className="flex items-center space-x-2">
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
            >
              Join Room
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default JoinRoomForm;
