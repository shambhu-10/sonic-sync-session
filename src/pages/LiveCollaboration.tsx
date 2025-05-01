
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Users, Zap, Clock, Globe, Headphones, MessageSquare, Music, Video } from "lucide-react";
import useAnimatedVariants from "@/hooks/useAnimatedVariants";
import { Link } from "react-router-dom";

const LiveCollaboration = () => {
  const { containerVariants, itemVariants, scaleVariants } = useAnimatedVariants();

  // Animation for the flow illustration
  const flowItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (custom: number) => ({
      opacity: 1,
      x: 0,
      transition: { 
        delay: custom * 0.2,
        duration: 0.5
      }
    })
  };
  
  // Steps in the collaboration process
  const collaborationSteps = [
    {
      icon: Users,
      title: "Connect",
      description: "Invite musicians to join your session with a simple shareable link."
    },
    {
      icon: Headphones,
      title: "Listen",
      description: "Hear everyone in real-time with minimal latency audio streaming."
    },
    {
      icon: Music,
      title: "Create",
      description: "Record your part while listening to what others are playing."
    },
    {
      icon: MessageSquare,
      title: "Communicate",
      description: "Use built-in chat or video to discuss ideas and give feedback."
    },
    {
      icon: Zap,
      title: "Iterate",
      description: "Make changes on the fly and hear updates instantly."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-soundboard-primary to-soundboard-accent bg-clip-text text-transparent">
          Live Collaboration
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Make music together in real-time, no matter where you are in the world. Our innovative technology brings musicians together virtually.
        </p>
      </motion.div>

      {/* Collaboration Flow */}
      <motion.div
        className="mb-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-2xl font-semibold text-center mb-12">How Live Collaboration Works</h2>
        
        <div className="relative">
          {/* Connection line */}
          <div className="absolute top-16 left-0 right-0 h-1 bg-gradient-to-r from-soundboard-primary to-soundboard-accent hidden md:block" />
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {collaborationSteps.map((step, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center z-10"
                variants={flowItemVariants}
                custom={index}
                whileHover={scaleVariants.hover}
              >
                <div className="bg-background p-4 rounded-full border-2 border-soundboard-accent mb-4 w-16 h-16 flex items-center justify-center">
                  <step.icon className="h-7 w-7 text-soundboard-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mb-16"
      >
        <h2 className="text-2xl font-semibold text-center mb-8">Features That Make Collaboration Seamless</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Low Latency Audio",
              description: "Our optimized streaming technology minimizes lag for a natural jamming experience.",
              icon: Zap,
              color: "bg-blue-100 dark:bg-blue-900/30"
            },
            {
              title: "Global Connectivity",
              description: "Connect with musicians from anywhere in the world with our global server network.",
              icon: Globe,
              color: "bg-green-100 dark:bg-green-900/30"
            },
            {
              title: "Real-time Sync",
              description: "Stay perfectly in time with synchronized metronome and visual cues.",
              icon: Clock,
              color: "bg-purple-100 dark:bg-purple-900/30"
            },
            {
              title: "Video Chat",
              description: "See your bandmates with integrated video chat that doesn't compromise audio quality.",
              icon: Video,
              color: "bg-pink-100 dark:bg-pink-900/30"
            },
            {
              title: "Instant Invites",
              description: "Bring in new collaborators with simple shareable links that work instantly.",
              icon: Users,
              color: "bg-orange-100 dark:bg-orange-900/30"
            },
            {
              title: "Simultaneous Recording",
              description: "Everyone can record their parts simultaneously while hearing the full mix.",
              icon: Music,
              color: "bg-red-100 dark:bg-red-900/30"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={scaleVariants.hover}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className={`p-3 rounded-full ${feature.color}`}>
                      <feature.icon className="h-6 w-6 text-soundboard-accent" />
                    </div>
                    <h3 className="text-lg font-semibold ml-3">{feature.title}</h3>
                  </div>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        className="text-center py-12 bg-gradient-to-r from-soundboard-primary/10 to-soundboard-accent/10 rounded-lg"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold mb-6">Ready to Collaborate?</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
          Start making music with collaborators from around the world today. No downloads required.
        </p>
        <Button
          className="bg-soundboard-accent hover:bg-soundboard-secondary text-white px-8 py-6 text-lg hover:scale-105 transition-transform"
          asChild
        >
          <Link to="/dashboard">Create a Jam Session</Link>
        </Button>
      </motion.div>
    </div>
  );
};

export default LiveCollaboration;
