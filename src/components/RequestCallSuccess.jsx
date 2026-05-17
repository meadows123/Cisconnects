import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const RequestCallSuccess = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#0f0f3d] flex flex-col">
      {/* No Navigation - Funnel locked */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8 sm:py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center w-full"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
            className="mb-6 sm:mb-8"
          >
            <div className="flex justify-center">
              <CheckCircle className="w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 text-green-500" />
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight"
          >
            Call Request Received!
          </motion.h1>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8 sm:mb-10"
          >
            <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-3 sm:mb-4 leading-relaxed">
              Thank you for requesting a call with us.
            </p>
            <p className="text-xs sm:text-sm md:text-base text-gray-400 mb-4 sm:mb-6 leading-relaxed">
              Our team will be in contact with you shortly to confirm your call time.
            </p>
            <div className="inline-block bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 sm:p-5">
              <p className="text-xs sm:text-sm md:text-base text-gray-300">
                We'll reach out to you at the phone number you provided right away.
              </p>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
          >
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold text-sm sm:text-base rounded-lg transition transform hover:scale-105 min-h-12 sm:min-h-14 touch-manipulation"
            >
              Back to Home
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-10 sm:mt-14 pt-6 sm:pt-10 border-t border-slate-700"
          >
            <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white mb-4 sm:mb-6">What happens next?</h3>
            <div className="grid sm:grid-cols-3 gap-3 sm:gap-6">
              <div className="p-3 sm:p-4">
                <div className="text-2xl sm:text-3xl font-bold text-blue-500 mb-2 sm:mb-3">1</div>
                <p className="text-xs sm:text-sm md:text-base text-gray-300 leading-snug">Our team reviews your call request</p>
              </div>
              <div className="p-3 sm:p-4">
                <div className="text-2xl sm:text-3xl font-bold text-blue-500 mb-2 sm:mb-3">2</div>
                <p className="text-xs sm:text-sm md:text-base text-gray-300 leading-snug">We confirm the call details with you</p>
              </div>
              <div className="p-3 sm:p-4">
                <div className="text-2xl sm:text-3xl font-bold text-blue-500 mb-2 sm:mb-3">3</div>
                <p className="text-xs sm:text-sm md:text-base text-gray-300 leading-snug">We call you at the agreed time</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default RequestCallSuccess;
