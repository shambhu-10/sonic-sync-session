
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
  delay?: number;
}

const StatCard = ({ icon: Icon, title, value, delay = 0.1 }: StatCardProps) => {
  return (
    <motion.div 
      className="animate-fade-in"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
    >
      <Card>
        <CardContent className="flex flex-row items-center p-6">
          <div className="bg-soundboard-primary/10 w-12 h-12 rounded-full flex items-center justify-center mr-4">
            <Icon className="text-soundboard-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold">{value}</h3>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatCard;
