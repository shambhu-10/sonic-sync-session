
import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  opacity: number;
}

const ParticleNetworkAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState<{ x: number, y: number } | null>(null);
  const animationFrameRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  // Initialize particles
  const initializeParticles = useCallback(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const width = canvas.width;
    const height = canvas.height;
    const particles: Particle[] = [];
    
    // Create particles
    for (let i = 0; i < 100; i++) {
      const particle: Particle = {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        color: `rgba(233, 69, 96, ${Math.random() * 0.5 + 0.2})`, // soundboard-accent color
        opacity: Math.random() * 0.5 + 0.2
      };
      particles.push(particle);
    }
    
    particlesRef.current = particles;
  }, []);

  // Draw particles and connections
  const draw = useCallback(() => {
    if (!canvasRef.current || !contextRef.current) return;
    
    const ctx = contextRef.current;
    const canvas = canvasRef.current;
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Update and draw particles
    const particles = particlesRef.current;
    
    // Draw connections between particles
    for (let i = 0; i < particles.length; i++) {
      const particleA = particles[i];
      
      // Draw connections to mouse if mouse is in canvas
      if (mousePosition) {
        const distance = Math.sqrt(
          Math.pow(mousePosition.x - particleA.x, 2) + 
          Math.pow(mousePosition.y - particleA.y, 2)
        );
        
        if (distance < 120) {
          ctx.beginPath();
          ctx.moveTo(particleA.x, particleA.y);
          ctx.lineTo(mousePosition.x, mousePosition.y);
          ctx.strokeStyle = `rgba(233, 69, 96, ${0.2 * (1 - distance / 120)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
          
          // Attract particles to mouse
          const angle = Math.atan2(mousePosition.y - particleA.y, mousePosition.x - particleA.x);
          particleA.vx += Math.cos(angle) * 0.02;
          particleA.vy += Math.sin(angle) * 0.02;
        }
      }
      
      // Draw connections between particles
      for (let j = i + 1; j < particles.length; j++) {
        const particleB = particles[j];
        const distance = Math.sqrt(
          Math.pow(particleB.x - particleA.x, 2) + 
          Math.pow(particleB.y - particleA.y, 2)
        );
        
        if (distance < 100) {
          ctx.beginPath();
          ctx.moveTo(particleA.x, particleA.y);
          ctx.lineTo(particleB.x, particleB.y);
          ctx.strokeStyle = `rgba(233, 69, 96, ${0.1 * (1 - distance / 100)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
    
    // Draw particles
    particles.forEach(particle => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Bounce off walls
      if (particle.x < 0 || particle.x > width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > height) particle.vy *= -1;
      
      // Apply friction
      particle.vx *= 0.99;
      particle.vy *= 0.99;
      
      // Draw particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();
    });
    
    // Continue animation loop
    animationFrameRef.current = requestAnimationFrame(draw);
  }, [mousePosition]);

  // Handle resizing
  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current) return;
      
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
      
      initializeParticles();
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [initializeParticles]);
  
  // Setup animation
  useEffect(() => {
    if (!canvasRef.current) return;
    
    contextRef.current = canvasRef.current.getContext('2d');
    initializeParticles();
    
    animationFrameRef.current = requestAnimationFrame(draw);
    
    return () => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [draw, initializeParticles]);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleMouseLeave = () => {
      setMousePosition(null);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <motion.canvas
      ref={canvasRef}
      className="absolute inset-0 -z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
  );
};

export default ParticleNetworkAnimation;
