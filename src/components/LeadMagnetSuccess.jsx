import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

const LeadMagnetSuccess = () => {
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
            Your Free Guide Is On The Way!
          </motion.h1>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8 sm:mb-10"
          >
            <div className="inline-block bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
              <Download className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400 mx-auto mb-3 sm:mb-4" />
              <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-2">
                Check your email (including spam folder) for your instant download
              </p>
              <p className="text-xs sm:text-sm text-gray-400">
                The complete guide to AI network automation is being sent to your inbox right now
              </p>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">What's Next?</h3>
              <ol className="text-left space-y-2 sm:space-y-3 text-xs sm:text-sm md:text-base text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="font-bold text-blue-400 flex-shrink-0">1.</span>
                  <span>Check your email and download the guide</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-blue-400 flex-shrink-0">2.</span>
                  <span>Review the case studies and implement the strategies</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-blue-400 flex-shrink-0">3.</span>
                  <span>Ready to get started? Schedule a consultation with our team</span>
                </li>
              </ol>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-10"
          >
            <Link
              to="/book-consultation"
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold text-sm sm:text-base rounded-lg transition transform hover:scale-105 min-h-12 sm:min-h-14 touch-manipulation"
            >
              Book A Consultation
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-8 py-3 sm:py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm sm:text-base rounded-lg transition min-h-12 sm:min-h-14 touch-manipulation"
            >
              Back to Home
            </Link>
          </motion.div>

          {/* Bonus Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-lg p-4 sm:p-6"
          >
            <p className="text-sm sm:text-base font-semibold text-yellow-300 mb-2">🎁 Bonus Inside</p>
            <p className="text-xs sm:text-sm text-gray-300">
              Your guide includes exclusive interview transcripts with 3 Fortune 500 CIOs sharing their real-world AI automation wins.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default LeadMagnetSuccess;
