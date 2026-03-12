import React, { createContext, useContext, useState } from 'react';

const BookingContext = createContext(null);

export const BookingProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <BookingContext.Provider value={{ isOpen, openBooking: () => setIsOpen(true), closeBooking: () => setIsOpen(false) }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);
