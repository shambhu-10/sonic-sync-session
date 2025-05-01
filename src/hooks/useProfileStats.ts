
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { User } from "@/types";

export interface UserStats {
  roomsHosted: number;
  loopsRecorded: number;
  mixdownsExported: number;
  avgLoopsPerSession: string;
}

export function useProfileStats(user: User | null) {
  const [stats, setStats] = useState<UserStats>({
    roomsHosted: 0,
    loopsRecorded: 0,
    mixdownsExported: 0,
    avgLoopsPerSession: "0.0"
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    const calculateUserStats = async () => {
      try {
        setIsLoading(true);
        
        // Fetch the user profile which contains our stats
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
          
        if (error) throw error;
        
        if (profile) {
          console.log("Profile stats fetched:", profile);
          
          // Calculate average loops per session
          const avgLoops = profile.rooms_hosted > 0 
            ? (profile.loops_recorded / profile.rooms_hosted).toFixed(1) 
            : "0.0";
            
          setStats({
            roomsHosted: profile.rooms_hosted || 0,
            loopsRecorded: profile.loops_recorded || 0,
            mixdownsExported: profile.mixdowns_exported || 0,
            avgLoopsPerSession: avgLoops
          });
        }
      } catch (error) {
        console.error("Error calculating user stats:", error);
        toast.error("Failed to load profile statistics");
      } finally {
        setIsLoading(false);
      }
    };
    
    calculateUserStats();
    
    // Set up a real-time subscription to profile changes
    const channel = supabase
      .channel(`profile_changes_${user.id}`)
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'profiles',
          filter: `id=eq.${user.id}`
        },
        (payload) => {
          console.log("Profile updated in real-time:", payload);
          const updatedProfile = payload.new as any;
          
          // Calculate average loops per session
          const avgLoops = updatedProfile.rooms_hosted > 0 
            ? (updatedProfile.loops_recorded / updatedProfile.rooms_hosted).toFixed(1) 
            : "0.0";
            
          setStats({
            roomsHosted: updatedProfile.rooms_hosted || 0,
            loopsRecorded: updatedProfile.loops_recorded || 0,
            mixdownsExported: updatedProfile.mixdowns_exported || 0,
            avgLoopsPerSession: avgLoops
          });
        }
      )
      .subscribe();
      
    // Clean up subscription
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);
  
  return { stats, isLoading };
}
