
import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  originalColor: string;
  baseOpacity: number;
  opacity: number;
}

const InteractiveParticleBackground = () => {
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
    
    const colors = [
      'rgba(233, 69, 96, 0.8)', // soundboard-accent
      'rgba(233, 69, 96, 0.6)', // soundboard-accent variant
      'rgba(220, 38, 38, 0.7)', // red variant
      'rgba(244, 114, 182, 0.7)', // pink variant
    ];
    
    // Create particles
    for (let i = 0; i < 100; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      const baseOpacity = Math.random() * 0.5 + 0.2;
      
      const particle: Particle = {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        color: color,
        originalColor: color,
        baseOpacity: baseOpacity,
        opacity: baseOpacity
      };
      particles.push(particle);
    }
    
    particlesRef.current = particles;
  }, []);

  // Calculate distance between two points
  const getDistance = (x1: number, y1: number, x2: number, y2: number): number => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  };

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
      
      // Reset particle to original state before applying mouse effects
      particleA.opacity = particleA.baseOpacity;
      particleA.color = particleA.originalColor;
      particleA.size = Math.random() * 2 + 1;
      
      // Interact with mouse if mouse is in canvas
      if (mousePosition) {
        const distance = getDistance(mousePosition.x, mousePosition.y, particleA.x, particleA.y);
        
        // Particles close to mouse get highlighted
        if (distance < 150) {
          const intensity = 1 - (distance / 150);
          // Enhance the particle when near the mouse
          particleA.opacity = Math.min(1, particleA.baseOpacity + intensity * 0.7);
          particleA.size += intensity * 2;
          
          // Create a slight attraction to cursor
          const angle = Math.atan2(mousePosition.y - particleA.y, mousePosition.x - particleA.x);
          const force = 0.03 * intensity;
          particleA.vx += Math.cos(angle) * force;
          particleA.vy += Math.sin(angle) * force;
          
          // Draw connection to mouse
          ctx.beginPath();
          ctx.moveTo(particleA.x, particleA.y);
          ctx.lineTo(mousePosition.x, mousePosition.y);
          ctx.strokeStyle = `rgba(233, 69, 96, ${0.15 * intensity})`;
          ctx.lineWidth = 0.5 * intensity;
          ctx.stroke();
        }
      }
      
      // Draw connections between nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        const particleB = particles[j];
        const distance = getDistance(particleA.x, particleA.y, particleB.x, particleB.y);
        
        if (distance < 100) {
          const opacity = 0.15 * (1 - distance / 100);
          ctx.beginPath();
          ctx.moveTo(particleA.x, particleA.y);
          ctx.lineTo(particleB.x, particleB.y);
          ctx.strokeStyle = `rgba(233, 69, 96, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
      
      // Update particle position
      particleA.x += particleA.vx;
      particleA.y += particleA.vy;
      
      // Bounce off walls
      if (particleA.x < 0 || particleA.x > width) particleA.vx *= -1;
      if (particleA.y < 0 || particleA.y > height) particleA.vy *= -1;
      
      // Apply friction
      particleA.vx *= 0.99;
      particleA.vy *= 0.99;
      
      // Draw particle
      ctx.beginPath();
      ctx.arc(particleA.x, particleA.y, particleA.size, 0, Math.PI * 2);
      ctx.fillStyle = particleA.color.replace(/[\d.]+\)$/g, `${particleA.opacity})`);
      ctx.fill();
    }
    
    // Continue animation loop
    animationFrameRef.current = requestAnimationFrame(draw);
  }, [mousePosition]);

  // Handle resizing
  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current) return;
      
      const canvas = canvasRef.current;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
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
    
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        setMousePosition({ 
          x: e.touches[0].clientX, 
          y: e.touches[0].clientY 
        });
      }
    };
    
    const handleMouseLeave = () => {
      setMousePosition(null);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchend', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchend', handleMouseLeave);
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

export default InteractiveParticleBackground;
