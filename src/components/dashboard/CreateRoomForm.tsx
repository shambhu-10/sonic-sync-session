
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DialogFooter } from "@/components/ui/dialog";

interface CreateRoomFormProps {
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  newRoomTitle: string;
  setNewRoomTitle: (title: string) => void;
  newRoomDescription: string;
  setNewRoomDescription: (description: string) => void;
  newRoomBpm: string;
  setNewRoomBpm: (bpm: string) => void;
  newRoomKey: string;
  setNewRoomKey: (key: string) => void;
  newRoomVisibility: string;
  setNewRoomVisibility: (visibility: string) => void;
}

const CreateRoomForm = ({
  onSubmit,
  isSubmitting,
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
}: CreateRoomFormProps) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="grid gap-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="room-name">Room Name</Label>
          <Input
            id="room-name"
            placeholder="My Awesome Jam Session"
            value={newRoomTitle}
            onChange={(e) => setNewRoomTitle(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="room-description">Description (Optional)</Label>
          <Input
            id="room-description"
            placeholder="What kind of music are you creating?"
            value={newRoomDescription}
            onChange={(e) => setNewRoomDescription(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="bpm">BPM</Label>
            <Input
              id="bpm"
              type="number"
              placeholder="120"
              min="40"
              max="280"
              value={newRoomBpm}
              onChange={(e) => setNewRoomBpm(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="key">Key Signature</Label>
            <Select value={newRoomKey} onValueChange={setNewRoomKey}>
              <SelectTrigger id="key">
                <SelectValue placeholder="Select key" />
              </SelectTrigger>
              <SelectContent>
                {["C", "C#/Db", "D", "D#/Eb", "E", "F", "F#/Gb", "G", "G#/Ab", "A", "A#/Bb", "B",
                  "Cm", "C#m/Dbm", "Dm", "D#m/Ebm", "Em", "Fm", "F#m/Gbm", "Gm", "G#m/Abm", "Am", "A#m/Bbm", "Bm"].map((key) => (
                  <SelectItem key={key} value={key}>
                    {key}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="visibility">Room Visibility</Label>
          <Select 
            value={newRoomVisibility} 
            onValueChange={setNewRoomVisibility}
          >
            <SelectTrigger id="visibility">
              <SelectValue placeholder="Select visibility" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="public">Public (Anyone can join)</SelectItem>
              <SelectItem value="private">Private (Invite only)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <DialogFooter>
        <Button 
          type="submit" 
          className="bg-soundboard-accent hover:bg-soundboard-secondary transition-all"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating..." : "Create Room"}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default CreateRoomForm;
