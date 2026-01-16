/**
 * Currency utility for location-based currency display
 * Supports GBP (UK) and AUD (Australia)
 */

// Exchange rate: 1 GBP = 1.9 AUD (approximate, should be updated regularly)
const GBP_TO_AUD_RATE = 1.9;

/**
 * Detects user location based on timezone
 * Returns 'GB' for UK, 'AU' for Australia, or 'GB' as default
 */
export const detectUserLocation = () => {
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    // Australia timezones
    const australiaTimezones = [
      'Australia/Sydney',
      'Australia/Melbourne',
      'Australia/Brisbane',
      'Australia/Perth',
      'Australia/Adelaide',
      'Australia/Darwin',
      'Australia/Hobart',
      'Australia/Canberra',
      'Australia/Lord_Howe',
      'Australia/Eucla'
    ];
    
    // UK timezones
    const ukTimezones = [
      'Europe/London',
      'Europe/Belfast',
      'Europe/Jersey',
      'Europe/Guernsey',
      'Europe/Isle_of_Man'
    ];
    
    if (australiaTimezones.includes(timezone)) {
      return 'AU';
    }
    
    if (ukTimezones.includes(timezone)) {
      return 'GB';
    }
    
    // Default to GB if timezone detection doesn't match
    return 'GB';
  } catch (error) {
    console.warn('Error detecting location, defaulting to GB:', error);
    return 'GB';
  }
};

/**
 * Gets currency code based on location
 */
export const getCurrencyCode = (location) => {
  return location === 'AU' ? 'AUD' : 'GBP';
};

/**
 * Gets currency symbol based on location
 */
export const getCurrencySymbol = (location) => {
  return location === 'AU' ? 'A$' : '£';
};

/**
 * Converts GBP amount to AUD
 */
export const convertToAUD = (gbpAmount) => {
  return Math.round(gbpAmount * GBP_TO_AUD_RATE);
};

/**
 * Formats currency amount based on location
 */
export const formatCurrency = (gbpAmount, location) => {
  const symbol = getCurrencySymbol(location);
  const amount = location === 'AU' ? convertToAUD(gbpAmount) : gbpAmount;
  
  // Format with locale-appropriate number formatting
  const locale = location === 'AU' ? 'en-AU' : 'en-GB';
  return `${symbol}${amount.toLocaleString(locale)}`;
};

/**
 * Gets the numeric amount in the appropriate currency
 */
export const getCurrencyAmount = (gbpAmount, location) => {
  return location === 'AU' ? convertToAUD(gbpAmount) : gbpAmount;
};

