
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Download, FileAudio, Settings, Music, Zap, 
  Link as LinkIcon, Share2, Check, File, FileJson 
} from "lucide-react";
import useAnimatedVariants from "@/hooks/useAnimatedVariants";
import { Link } from "react-router-dom";

const ExportMixdown = () => {
  const { containerVariants, itemVariants } = useAnimatedVariants();

  // File format options
  const fileFormats = [
    { 
      name: "WAV", 
      description: "Uncompressed high-quality audio",
      quality: "Lossless",
      size: "Large",
      compatibility: "DAWs, Professional Use"
    },
    { 
      name: "MP3", 
      description: "Compressed standard format",
      quality: "Good (Lossy)",
      size: "Small",
      compatibility: "Universal" 
    },
    { 
      name: "AAC", 
      description: "Advanced audio compression",
      quality: "Better than MP3 (Lossy)",
      size: "Small",
      compatibility: "Apple devices, Streaming" 
    },
    { 
      name: "FLAC", 
      description: "Lossless audio compression",
      quality: "Lossless",
      size: "Medium",
      compatibility: "Audiophile, Archiving" 
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
          Export Mixdown
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Convert your collaborative sessions into professional-quality audio files ready for sharing, mastering, or publishing.
        </p>
      </motion.div>

      {/* Export Options Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-16"
      >
        <h2 className="text-2xl font-semibold text-center mb-8">Export Options</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left side - File formats */}
          <div>
            <h3 className="text-xl font-medium mb-6 flex items-center">
              <FileAudio className="mr-2 h-5 w-5 text-soundboard-accent" />
              Available File Formats
            </h3>
            
            <div className="space-y-4">
              {fileFormats.map((format, index) => (
                <motion.div
                  key={index}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-lg">{format.name}</h4>
                    <span className="text-xs py-1 px-2.5 rounded-full bg-soundboard-accent/10 text-soundboard-accent font-medium">
                      {format.quality}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm mb-3">{format.description}</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="font-medium">File Size:</span> {format.size}
                    </div>
                    <div>
                      <span className="font-medium">Best for:</span> {format.compatibility}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Right side - Export Features */}
          <div>
            <h3 className="text-xl font-medium mb-6 flex items-center">
              <Settings className="mr-2 h-5 w-5 text-soundboard-accent" />
              Export Features
            </h3>
            
            <Card className="shadow-md">
              <CardContent className="pt-6">
                <ul className="space-y-4">
                  {[
                    {
                      title: "Export Individual Tracks",
                      description: "Export each instrument or vocal track separately for further mixing.",
                      icon: Music
                    },
                    {
                      title: "Export Full Mix",
                      description: "Generate a complete mixdown of all tracks combined.",
                      icon: File
                    },
                    {
                      title: "Quality Options",
                      description: "Choose from various bit depths and sample rates for optimal quality.",
                      icon: Settings
                    },
                    {
                      title: "Fast Processing",
                      description: "Our optimized export engine processes your audio quickly.",
                      icon: Zap
                    },
                    {
                      title: "Session Data Export",
                      description: "Export project data to continue working in other sessions.",
                      icon: FileJson
                    },
                    {
                      title: "Direct Sharing",
                      description: "Share your exports directly to social media or cloud storage.",
                      icon: Share2
                    },
                    {
                      title: "Shareable Links",
                      description: "Generate links for others to download your exported audio.",
                      icon: LinkIcon
                    }
                  ].map((feature, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start"
                      variants={itemVariants}
                      custom={index}
                    >
                      <div className="flex-shrink-0 mt-1">
                        <div className="bg-soundboard-accent/10 p-1.5 rounded-full">
                          <feature.icon className="h-3.5 w-3.5 text-soundboard-accent" />
                        </div>
                      </div>
                      <div className="ml-3">
                        <p className="font-medium text-sm">{feature.title}</p>
                        <p className="text-xs text-muted-foreground">{feature.description}</p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>

      {/* Export Process Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <h2 className="text-2xl font-semibold text-center mb-8">The Export Process</h2>
        
        <div className="relative py-12">
          {/* Process timeline */}
          <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-muted hidden md:block" />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: 1,
                title: "Finalize Your Mix",
                description: "Make final adjustments to levels, effects, and track balance."
              },
              {
                step: 2,
                title: "Choose Export Settings",
                description: "Select file format, quality, and which tracks to include."
              },
              {
                step: 3,
                title: "Process Audio",
                description: "Our system renders your audio at the highest quality possible."
              },
              {
                step: 4,
                title: "Download & Share",
                description: "Save to your device or share directly with collaborators."
              }
            ].map((phase, index) => (
              <motion.div 
                key={index}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.4 }}
              >
                <div className="relative z-10 bg-background p-4 rounded-full border border-soundboard-accent mb-4 w-16 h-16 flex items-center justify-center">
                  <span className="font-bold text-lg text-soundboard-accent">{phase.step}</span>
                </div>
                <h3 className="font-semibold mb-2">{phase.title}</h3>
                <p className="text-sm text-muted-foreground">{phase.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Benefits Section */}
      <motion.div 
        className="mb-16 bg-muted py-12 px-6 rounded-lg"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold text-center mb-8">Benefits of Our Export Technology</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            "Preserves all audio quality from your recordings",
            "Supports professional DAW integration",
            "Includes metadata for better organization",
            "Automatic backup of exported files",
            "Resume interrupted exports",
            "Batch export multiple projects"
          ].map((benefit, index) => (
            <motion.div
              key={index}
              className="flex items-center"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <Check className="h-5 w-5 text-soundboard-accent mr-3 flex-shrink-0" />
              <span>{benefit}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <Button
          className="bg-soundboard-accent hover:bg-soundboard-secondary text-white px-8 py-6 text-lg hover:scale-105 transition-transform"
          asChild
        >
          <Link to="/dashboard">
            <Download className="mr-2 h-5 w-5" />
            Try Exporting Now
          </Link>
        </Button>
      </motion.div>
    </div>
  );
};

export default ExportMixdown;
