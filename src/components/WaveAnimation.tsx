
import { useRef, useEffect } from "react";

const WaveAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Initial sizing
    resizeCanvas();

    // Resize on window change
    window.addEventListener("resize", resizeCanvas);

    // Wave parameters
    const waves = [
      {
        y: canvas.height * 0.5,
        length: 0.01,
        amplitude: 70,
        frequency: 0.005,
        color: "rgba(233, 69, 96, 0.05)" // soundboard-accent with low opacity
      },
      {
        y: canvas.height * 0.5,
        length: 0.02,
        amplitude: 50,
        frequency: 0.007,
        color: "rgba(233, 69, 96, 0.07)"
      },
      {
        y: canvas.height * 0.5,
        length: 0.03,
        amplitude: 40,
        frequency: 0.01,
        color: "rgba(233, 69, 96, 0.09)"
      }
    ];

    let increment = 0;

    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // For each wave
      waves.forEach(wave => {
        ctx.beginPath();
        ctx.moveTo(0, wave.y);
        
        // Draw wave path
        for (let x = 0; x < canvas.width; x++) {
          // Wave calculation
          const y = wave.y + Math.sin(x * wave.length + increment) * wave.amplitude * Math.sin(increment * wave.frequency);
          ctx.lineTo(x, y);
        }
        
        // Complete the wave to fill the bottom part
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        
        // Fill with gradient
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0, wave.color);
        gradient.addColorStop(0.5, "rgba(233, 69, 96, 0.2)");
        gradient.addColorStop(1, wave.color);
        
        ctx.fillStyle = gradient;
        ctx.fill();
      });
      
      // Increase the increment for movement
      increment += 0.01;
      
      // Continue animation
      requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 -z-10"
    />
  );
};

export default WaveAnimation;
