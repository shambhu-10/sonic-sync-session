
import { User } from "@/types";
import StatCard from "./StatCard";
import { MusicIcon, Disc3Icon, ArrowDownIcon, BarChart3Icon } from "lucide-react";

interface UserStatsProps {
  user: User | null;
}

const UserStats = ({ user }: UserStatsProps) => {
  const userStats = {
    roomsHosted: user?.rooms_hosted || 0,
    loopsRecorded: user?.loops_recorded || 0,
    mixdownsExported: user?.mixdowns_exported || 0,
    avgLoopsPerSession: user?.loops_recorded && user.rooms_hosted 
      ? (user.loops_recorded / user.rooms_hosted).toFixed(1) 
      : "0.0"
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatCard 
        icon={MusicIcon} 
        title="Rooms Hosted" 
        value={userStats.roomsHosted} 
        delay={0.1} 
      />
      <StatCard 
        icon={Disc3Icon} 
        title="Loops Recorded" 
        value={userStats.loopsRecorded} 
        delay={0.2} 
      />
      <StatCard 
        icon={ArrowDownIcon} 
        title="Mixdowns Exported" 
        value={userStats.mixdownsExported} 
        delay={0.3} 
      />
      <StatCard 
        icon={BarChart3Icon} 
        title="Avg Loops/Session" 
        value={userStats.avgLoopsPerSession} 
        delay={0.4} 
      />
    </div>
  );
};

export default UserStats;
