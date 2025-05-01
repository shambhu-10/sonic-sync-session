
import { User } from "@/types";
import StatCard from "./StatCard";
import { MusicIcon, Disc3Icon, ArrowDownIcon, BarChart3Icon } from "lucide-react";
import { useProfileStats } from "@/hooks/useProfileStats";
import { Spinner } from "@/components/ui/spinner";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface UserStatsProps {
  user: User | null;
}

const UserStats = ({ user }: UserStatsProps) => {
  const { stats, isLoading } = useProfileStats(user);
  const [animatedStats, setAnimatedStats] = useState(stats);
  const [hasUpdated, setHasUpdated] = useState(false);
  
  // When stats change, animate the values
  useEffect(() => {
    if (isLoading) return;
    
    // Check if stats have actually changed
    if (
      stats.roomsHosted !== animatedStats.roomsHosted ||
      stats.loopsRecorded !== animatedStats.loopsRecorded ||
      stats.mixdownsExported !== animatedStats.mixdownsExported ||
      stats.avgLoopsPerSession !== animatedStats.avgLoopsPerSession
    ) {
      setHasUpdated(true);
      
      // Set the new stats to trigger animation
      setAnimatedStats(stats);
      
      // Reset the update indicator after animation
      const timer = setTimeout(() => {
        setHasUpdated(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [stats, isLoading, animatedStats]);
  
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
    <AnimatePresence>
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <StatCard 
          icon={MusicIcon} 
          title="Rooms Hosted" 
          value={animatedStats.roomsHosted} 
          delay={0.1} 
          highlight={hasUpdated}
        />
        <StatCard 
          icon={Disc3Icon} 
          title="Loops Recorded" 
          value={animatedStats.loopsRecorded} 
          delay={0.2} 
          highlight={hasUpdated}
        />
        <StatCard 
          icon={ArrowDownIcon} 
          title="Mixdowns Exported" 
          value={animatedStats.mixdownsExported} 
          delay={0.3} 
          highlight={hasUpdated}
        />
        <StatCard 
          icon={BarChart3Icon} 
          title="Avg Loops/Session" 
          value={animatedStats.avgLoopsPerSession} 
          delay={0.4} 
          highlight={hasUpdated}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default UserStats;
