import { useState, useEffect } from 'react';
import { detectUserLocation, getCurrencyCode, getCurrencySymbol, formatCurrency, getCurrencyAmount, convertToAUD } from '../lib/currency';

/**
 * React hook for currency management
 * Detects user location and provides currency utilities
 */
export const useCurrency = () => {
  const [location, setLocation] = useState('GB');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Detect location on mount
    const detectedLocation = detectUserLocation();
    setLocation(detectedLocation);
    setIsLoading(false);
  }, []);

  return {
    location,
    currencyCode: getCurrencyCode(location),
    currencySymbol: getCurrencySymbol(location),
    formatCurrency: (gbpAmount) => formatCurrency(gbpAmount, location),
    getAmount: (gbpAmount) => getCurrencyAmount(gbpAmount, location),
    convertToAUD,
    isLoading
  };
};

