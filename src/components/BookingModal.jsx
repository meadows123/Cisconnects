import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

const BookingModal = () => {
  const { isOpen, closeBooking } = useBooking();

  // Load GHL script once
  useEffect(() => {
    const scriptId = 'ghl-form-embed';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://api.leadconnectorhq.com/js/form_embed.js';
      script.type = 'text/javascript';
      document.body.appendChild(script);
    }
  }, []);

  // Prevent background scroll when open — iOS-safe approach
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      if (scrollY) window.scrollTo(0, parseInt(scrollY, 10) * -1);
    }
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') closeBooking(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [closeBooking]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-0 sm:p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeBooking}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full sm:max-w-2xl bg-slate-900 sm:rounded-2xl shadow-2xl border-0 sm:border border-white/10 overflow-hidden"
            style={{ height: '100dvh', maxHeight: '90vh' }}
            onTouchStart={() => {}}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <h2 className="text-lg font-semibold text-white">Book Your Demo</h2>
              <button
                onClick={closeBooking}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* GHL Widget */}
            <div
              className="overflow-y-auto"
              style={{ height: 'calc(100dvh - 64px)', WebkitOverflowScrolling: 'touch' }}
            >
              <iframe
                src="https://api.leadconnectorhq.com/widget/booking/hTCZBgEPd1IaJvptd6JY"
                style={{ width: '100%', border: 'none', minHeight: '700px', display: 'block' }}
                scrolling="yes"
                id="hTCZBgEPd1IaJvptd6JY_modal"
                title="Book Your Demo"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
