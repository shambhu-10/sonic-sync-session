
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: LucideIcon;
  title: string;
  value: number | string;
  delay?: number;
  highlight?: boolean;
}

const StatCard = ({ icon: Icon, title, value, delay = 0, highlight = false }: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: delay,
        duration: 0.5,
      }}
      className="relative"
    >
      <Card 
        className={cn(
          "overflow-hidden transition-all duration-300 transform hover:scale-[1.03] hover:shadow-md",
          highlight && "ring-2 ring-soundboard-accent"
        )}
      >
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div
              className={cn(
                "p-2 rounded-full bg-soundboard-accent/10 text-soundboard-accent",
                highlight && "animate-pulse"
              )}
            >
              <Icon size={20} />
            </div>
            <motion.div 
              key={String(value)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className={cn(
                "text-2xl font-bold",
                highlight && "text-soundboard-accent"
              )}
            >
              {value}
            </motion.div>
          </div>
          <div className="mt-4 text-sm text-muted-foreground">{title}</div>
        </CardContent>
        
        {highlight && (
          <motion.div 
            className="absolute inset-0 bg-soundboard-accent/5 pointer-events-none"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 2 }}
          />
        )}
      </Card>
    </motion.div>
  );
};

export default StatCard;
