import { useEffect, useState } from 'react';

/**
 * Hook to detect if running on mobile and adjust animation settings
 * Returns reduced animation parameters for better mobile performance
 */
export const useMobileAnimations = () => {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    isMobile,
    // Reduce animation duration on mobile
    duration: isMobile ? 0.3 : 0.6,
    // Disable opacity animations on mobile for better performance
    skipOpacity: isMobile,
    // Reduce stagger delay on mobile
    staggerDelay: isMobile ? 0.05 : 0.1,
    // Disable complex animations on mobile
    enableComplex: !isMobile
  };
};
