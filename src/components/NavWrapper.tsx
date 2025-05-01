
import { ReactNode, useEffect } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

interface NavWrapperProps {
  children: ReactNode;
}

const NavWrapper = ({ children }: NavWrapperProps) => {
  // This function finds and enhances the nav element by adding the theme toggle
  const enhanceNav = () => {
    // Add theme toggle to header nav
    const navRightSection = document.querySelector('.navbar-right-section');
    if (navRightSection && !document.querySelector('#theme-toggle-wrapper')) {
      const themeToggleWrapper = document.createElement('div');
      themeToggleWrapper.id = 'theme-toggle-wrapper';
      themeToggleWrapper.className = 'mx-2';
      
      // Create a container for React to render into
      const reactContainer = document.createElement('div');
      themeToggleWrapper.appendChild(reactContainer);
      
      // Insert before the first child of navRightSection
      navRightSection.insertBefore(themeToggleWrapper, navRightSection.firstChild);
      
      // Render the ThemeToggle component into the container
      import('react-dom/client').then(({ createRoot }) => {
        const root = createRoot(reactContainer);
        root.render(<ThemeToggle />);
      });
    }
  };

  // Use useEffect to run enhanceNav after render and on updates
  useEffect(() => {
    // Run on initial render
    enhanceNav();
    
    // Set up a mutation observer to detect DOM changes and add the toggle if needed
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(() => {
        if (!document.querySelector('#theme-toggle-wrapper')) {
          enhanceNav();
        }
      });
    });
    
    // Start observing the document with the configured parameters
    observer.observe(document.body, { childList: true, subtree: true });
    
    // Clean up the observer on component unmount
    return () => {
      observer.disconnect();
    };
  }, []);

  return <>{children}</>;
};

export default NavWrapper;
