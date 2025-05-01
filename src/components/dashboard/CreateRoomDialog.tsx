
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import CreateRoomForm from "./CreateRoomForm";

interface CreateRoomDialogProps {
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

const CreateRoomDialog = ({
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
  setNewRoomVisibility
}: CreateRoomDialogProps) => {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Create New Jam Room</DialogTitle>
        <DialogDescription>
          Set up your jam session room and invite collaborators.
        </DialogDescription>
      </DialogHeader>
      <CreateRoomForm 
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
        newRoomTitle={newRoomTitle}
        setNewRoomTitle={setNewRoomTitle}
        newRoomDescription={newRoomDescription}
        setNewRoomDescription={setNewRoomDescription}
        newRoomBpm={newRoomBpm}
        setNewRoomBpm={setNewRoomBpm}
        newRoomKey={newRoomKey}
        setNewRoomKey={setNewRoomKey}
        newRoomVisibility={newRoomVisibility}
        setNewRoomVisibility={setNewRoomVisibility}
      />
    </DialogContent>
  );
};

export default CreateRoomDialog;
