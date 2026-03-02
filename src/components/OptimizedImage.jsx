import React, { useState, useEffect } from 'react';

/**
 * Optimized image component for mobile performance
 * - Uses native lazy loading
 * - Provides placeholder during load
 * - Responsive sizing
 */
const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  loading = 'lazy',
  priority = false 
}) => {
  const [isLoaded, setIsLoaded] = useState(priority);

  return (
    <img
      src={src}
      alt={alt}
      className={`${className} ${!isLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
      loading={priority ? 'eager' : loading}
      onLoad={() => setIsLoaded(true)}
      fetchpriority={priority ? 'high' : 'auto'}
      style={{
        display: 'block',
        willChange: 'opacity'
      }}
    />
  );
};

export default OptimizedImage;
