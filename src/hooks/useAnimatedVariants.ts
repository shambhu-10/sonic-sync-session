
// Reusable animation variants for consistency across components

export const useAnimatedVariants = () => {
  // Variants for container with staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };
  
  // Variants for items that slide in from bottom
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100,
        damping: 10
      }
    }
  };
  
  // Variants for items that fade in
  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };
  
  // Variants for items that slide in from left
  const slideFromLeftVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100,
        damping: 10
      }
    }
  };
  
  // Variants for items that slide in from right
  const slideFromRightVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100,
        damping: 10
      }
    }
  };
  
  // Scale animation for cards and buttons
  const scaleVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    hover: { 
      scale: 1.03,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  };

  // Glow effect for buttons
  const glowVariants = {
    hover: { 
      boxShadow: "0 0 15px rgba(233, 69, 96, 0.6)",
      transition: { duration: 0.2 }
    }
  };

  return {
    containerVariants,
    itemVariants,
    fadeInVariants,
    slideFromLeftVariants,
    slideFromRightVariants,
    scaleVariants,
    glowVariants
  };
};

export default useAnimatedVariants;
