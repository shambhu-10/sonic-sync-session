
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Repeat, Mic, Layers, Sliders, BarChart2, Save, FileAudio, Cpu } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import useAnimatedVariants from "@/hooks/useAnimatedVariants";
import { Link } from "react-router-dom";

const LoopRecording = () => {
  const { containerVariants, itemVariants } = useAnimatedVariants();
  const [activeLoop, setActiveLoop] = useState(1);
  
  // Automatic loop animation
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveLoop((prev) => (prev % 4) + 1);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  // Features section with intersection observer for fade-in effect
  const [featuresRef, featuresInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const loopAnimationVariants = {
    inactive: { scale: 0.95, opacity: 0.7 },
    active: { 
      scale: 1, 
      opacity: 1,
      boxShadow: "0 0 0 2px rgba(233, 69, 96, 0.8)",
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-soundboard-primary to-soundboard-accent bg-clip-text text-transparent">
          Loop Recording
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Create perfect repeating sections with precise timing control. Layer multiple tracks to build complex arrangements from simple parts.
        </p>
      </motion.div>

      {/* Loop Visualization */}
      <motion.div
        className="mb-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-2xl font-semibold text-center mb-8">How Loop Recording Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="space-y-6">
              {[
                {
                  title: "Define Your Loop",
                  description: "Set the length of your loop in bars and select the tempo and time signature."
                },
                {
                  title: "Record First Track",
                  description: "Record your first part while following the built-in metronome for perfect timing."
                },
                {
                  title: "Layer Additional Tracks",
                  description: "Add new layers while hearing your previous recordings in real-time."
                },
                {
                  title: "Adjust and Perfect",
                  description: "Fine-tune your recordings with timing correction and volume balancing tools."
                }
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + (i * 0.2) }}
                  className={`p-4 border-l-4 ${
                    i + 1 === activeLoop 
                      ? "border-soundboard-accent bg-soundboard-accent/5" 
                      : "border-muted"
                  } transition-colors duration-300`}
                >
                  <h3 className="font-medium mb-1 flex items-center">
                    <span className="flex items-center justify-center bg-soundboard-accent text-white rounded-full h-6 w-6 text-sm mr-2">
                      {i + 1}
                    </span>
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="order-1 md:order-2">
            <div className="relative h-64 md:h-80">
              {[1, 2, 3, 4].map((loop) => (
                <motion.div
                  key={loop}
                  className="absolute inset-0 border rounded-lg overflow-hidden"
                  style={{
                    zIndex: loop === activeLoop ? 10 : 5 - loop,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23e94560' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                  }}
                  variants={loopAnimationVariants}
                  animate={loop === activeLoop ? "active" : "inactive"}
                >
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-soundboard-accent" 
                       style={{
                         width: loop === activeLoop ? "100%" : "0%",
                         transition: loop === activeLoop ? "width 2s linear" : "none"
                       }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-soundboard-accent opacity-20">
                    Loop {loop}
                  </div>
                  
                  {/* Loop waveform visualization */}
                  <div className="absolute bottom-8 left-4 right-4 h-24">
                    <svg width="100%" height="100%" viewBox="0 0 100 30" preserveAspectRatio="none">
                      {loop === 1 && (
                        <path
                          d="M0,15 Q10,10 20,15 T40,15 T60,15 T80,15 T100,15"
                          fill="none"
                          stroke="rgba(233,69,96,0.5)"
                          strokeWidth="0.5"
                        />
                      )}
                      {loop === 2 && (
                        <>
                          <path
                            d="M0,15 Q10,10 20,15 T40,15 T60,15 T80,15 T100,15"
                            fill="none"
                            stroke="rgba(233,69,96,0.3)"
                            strokeWidth="0.5"
                          />
                          <path
                            d="M0,15 Q10,5 15,10 T30,20 T45,10 T60,15 T80,20 T100,15"
                            fill="none"
                            stroke="rgba(233,69,96,0.5)"
                            strokeWidth="0.5"
                          />
                        </>
                      )}
                      {loop === 3 && (
                        <>
                          <path
                            d="M0,15 Q10,10 20,15 T40,15 T60,15 T80,15 T100,15"
                            fill="none"
                            stroke="rgba(233,69,96,0.2)"
                            strokeWidth="0.5"
                          />
                          <path
                            d="M0,15 Q10,5 15,10 T30,20 T45,10 T60,15 T80,20 T100,15"
                            fill="none"
                            stroke="rgba(233,69,96,0.2)"
                            strokeWidth="0.5"
                          />
                          <path
                            d="M0,20 Q10,25 20,15 T40,5 T60,15 T80,25 T100,20"
                            fill="none"
                            stroke="rgba(233,69,96,0.5)"
                            strokeWidth="0.5"
                          />
                        </>
                      )}
                      {loop === 4 && (
                        <>
                          <path
                            d="M0,15 Q10,10 20,15 T40,15 T60,15 T80,15 T100,15"
                            fill="none"
                            stroke="rgba(233,69,96,0.2)"
                            strokeWidth="0.5"
                          />
                          <path
                            d="M0,15 Q10,5 15,10 T30,20 T45,10 T60,15 T80,20 T100,15"
                            fill="none"
                            stroke="rgba(233,69,96,0.2)"
                            strokeWidth="0.5"
                          />
                          <path
                            d="M0,20 Q10,25 20,15 T40,5 T60,15 T80,25 T100,20"
                            fill="none"
                            stroke="rgba(233,69,96,0.2)"
                            strokeWidth="0.5"
                          />
                          <path
                            d="M0,5 Q20,25 40,5 T80,25 T100,15"
                            fill="none"
                            stroke="rgba(233,69,96,0.5)"
                            strokeWidth="0.5"
                          />
                        </>
                      )}
                    </svg>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Features */}
      <motion.div 
        ref={featuresRef}
        className="mb-16"
        variants={containerVariants}
        initial="hidden"
        animate={featuresInView ? "visible" : "hidden"}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-semibold text-center mb-8">Advanced Looping Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Unlimited Loop Layers",
              description: "Add as many overlapping tracks as you need to build complex arrangements.",
              icon: Layers,
            },
            {
              title: "Beat-Perfect Timing",
              description: "Automatic quantization ensures your recordings snap perfectly to the beat.",
              icon: BarChart2,
            },
            {
              title: "Loop Parameter Control",
              description: "Adjust tempo, length, and time signature of your loops at any time.",
              icon: Sliders,
            },
            {
              title: "High-Quality Recording",
              description: "Capture audio at pristine quality with our optimized recording engine.",
              icon: Mic,
            },
            {
              title: "Save Loop States",
              description: "Bookmark different stages of your loop creation to revisit later.",
              icon: Save,
            },
            {
              title: "Export Individual Loops",
              description: "Export single loops or complete arrangements for use in your DAW.",
              icon: FileAudio,
            },
            {
              title: "Low Latency Monitoring",
              description: "Hear yourself in real-time without distracting delay.",
              icon: Cpu,
            },
            {
              title: "Infinite Loop Mode",
              description: "Enable seamless looping for continuous practice or performance.",
              icon: Repeat,
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-soundboard-accent/10 p-3 rounded-full">
                      <feature.icon className="h-5 w-5 text-soundboard-accent" />
                    </div>
                    <h3 className="font-semibold ml-3">{feature.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
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
          <Link to="/dashboard">Try Loop Recording Now</Link>
        </Button>
      </motion.div>
    </div>
  );
};

export default LoopRecording;
