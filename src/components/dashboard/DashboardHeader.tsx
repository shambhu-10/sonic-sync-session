
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { PlusIcon, UsersIcon } from "lucide-react";
import { motion } from "framer-motion";

interface DashboardHeaderProps {
  setDialogOpen: (open: boolean) => void;
}

const DashboardHeader = ({ setDialogOpen }: DashboardHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-2">Welcome to your Dashboard</h1>
        <p className="text-muted-foreground">Create, join, and manage your jam sessions</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
        <Dialog onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-soundboard-accent hover:bg-soundboard-secondary transition-all">
              <PlusIcon className="mr-2 h-4 w-4" />
              Create New Jam Room
            </Button>
          </DialogTrigger>
        </Dialog>
        
        <Button variant="outline" asChild>
          <Link to="#join-form" onClick={() => document.getElementById("join-form")?.scrollIntoView({ behavior: "smooth" })}>
            <UsersIcon className="mr-2 h-4 w-4" />
            Join Jam Room
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
