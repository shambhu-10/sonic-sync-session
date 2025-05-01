
import { useEffect, useRef } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  threshold?: number; // Value between 0 and 1
  delay?: number; // Delay in ms
}

const ScrollReveal = ({ children, threshold = 0.1, delay = 0 }: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("revealed");
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, delay]);

  return (
    <div ref={ref} className="reveal-on-scroll">
      {children}
    </div>
  );
};

export default ScrollReveal;
