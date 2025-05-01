
import { useEffect } from "react";

export const useScrollEffect = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const revealElements = document.querySelectorAll(".reveal-section");

      revealElements.forEach((element) => {
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const viewportHeight = window.innerHeight;
        
        if (scrollPosition > elementPosition - viewportHeight + 150) {
          element.classList.add("visible");
        }
      });
    };

    // Initial check
    handleScroll();
    
    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);
    
    // Clean up event listener
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
};

export default useScrollEffect;
