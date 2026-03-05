import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PixelTracker = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Track page view whenever route changes
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'PageView');
    }
  }, [pathname]);

  return null;
};

export default PixelTracker;
