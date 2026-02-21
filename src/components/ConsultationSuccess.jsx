import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ConsultationSuccess = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* No Navigation - Funnel locked */}
      
      <div className="flex-1 flex items-center justify-center px-3 sm:px-4 py-12 sm:py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
            className="mb-6 sm:mb-8"
          >
            <div className="flex justify-center">
              <CheckCircle className="w-16 h-16 sm:w-24 sm:h-24 text-green-500" />
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6"
          >
            Consultation Booked!
          </motion.h1>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8 sm:mb-12"
          >
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-3 sm:mb-4 leading-relaxed">
              Thank you for booking a consultation with us.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-gray-400 mb-4 sm:mb-6">
              Our team will be in contact with you shortly to confirm your appointment.
            </p>
            <div className="inline-block bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 sm:p-6">
              <p className="text-xs sm:text-sm md:text-base text-gray-300">
                We'll call you at your selected time. Make sure you're available during the time slot you chose.
              </p>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
          >
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-2.5 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold text-sm sm:text-base rounded-lg transition transform hover:scale-105"
            >
              Back to Home
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-2.5 sm:py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm sm:text-base rounded-lg transition"
            >
              Contact Us
            </Link>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-slate-700"
          >
            <h3 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6">What happens next?</h3>
            <div className="grid sm:grid-cols-3 gap-4 sm:gap-8">
              <div className="p-3 sm:p-4">
                <div className="text-2xl sm:text-3xl font-bold text-blue-500 mb-2 sm:mb-3">1</div>
                <p className="text-xs sm:text-sm md:text-base text-gray-300">Our team reviews your consultation request</p>
              </div>
              <div className="p-3 sm:p-4">
                <div className="text-2xl sm:text-3xl font-bold text-blue-500 mb-2 sm:mb-3">2</div>
                <p className="text-xs sm:text-sm md:text-base text-gray-300">We confirm your appointment details</p>
              </div>
              <div className="p-3 sm:p-4">
                <div className="text-2xl sm:text-3xl font-bold text-blue-500 mb-2 sm:mb-3">3</div>
                <p className="text-xs sm:text-sm md:text-base text-gray-300">We call you at your selected time</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ConsultationSuccess;
