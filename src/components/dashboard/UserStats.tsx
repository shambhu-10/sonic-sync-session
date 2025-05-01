
import { User } from "@/types";
import StatCard from "./StatCard";
import { MusicIcon, Disc3Icon, ArrowDownIcon, BarChart3Icon } from "lucide-react";
import { useProfileStats } from "@/hooks/useProfileStats";
import { Spinner } from "@/components/ui/spinner";
import { motion } from "framer-motion";

interface UserStatsProps {
  user: User | null;
}

const UserStats = ({ user }: UserStatsProps) => {
  const { stats, isLoading } = useProfileStats(user);
  
  if (isLoading) {
    return (
      <motion.div 
        className="flex justify-center items-center h-32 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Spinner size="md" className="text-soundboard-accent" />
        <span className="ml-2 text-muted-foreground">Loading your stats...</span>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <StatCard 
        icon={MusicIcon} 
        title="Rooms Hosted" 
        value={stats.roomsHosted} 
        delay={0.1} 
      />
      <StatCard 
        icon={Disc3Icon} 
        title="Loops Recorded" 
        value={stats.loopsRecorded} 
        delay={0.2} 
      />
      <StatCard 
        icon={ArrowDownIcon} 
        title="Mixdowns Exported" 
        value={stats.mixdownsExported} 
        delay={0.3} 
      />
      <StatCard 
        icon={BarChart3Icon} 
        title="Avg Loops/Session" 
        value={stats.avgLoopsPerSession} 
        delay={0.4} 
      />
    </motion.div>
  );
};

export default UserStats;
