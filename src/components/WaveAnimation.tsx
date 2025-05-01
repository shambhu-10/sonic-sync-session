
import React from "react";

interface WaveAnimationProps {
  isActive?: boolean;
  className?: string;
}

const WaveAnimation: React.FC<WaveAnimationProps> = ({ 
  isActive = true,
  className = ""
}) => {
  return (
    <div className={`flex items-end h-12 space-x-1 ${className} ${isActive ? 'opacity-100' : 'opacity-40'}`}>
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          style={{
            animationDelay: `${i * 0.1}s`,
            height: `${Math.random() * 100}%`,
            animationDuration: `${0.6 + Math.random() * 0.7}s`
          }}
          className={`w-1 bg-soundboard-accent rounded-full transform transition-all ${
            isActive ? 'animate-pulse-recording' : ''
          }`}
        />
      ))}
    </div>
  );
};

export default WaveAnimation;
