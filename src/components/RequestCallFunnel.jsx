import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Mail, Phone as PhoneIcon } from 'lucide-react';
import emailjs from '@emailjs/browser';

const RequestCallFunnel = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setSubmitStatus('error_validation');
      setTimeout(() => setSubmitStatus(null), 5000);
      return;
    }

    setIsSubmitting(true);

    try {
      // Save to backend
      const response = await fetch('/api/calls', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          timestamp: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error('Failed to save call request');
      }

      // Send email notification
      try {
        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        if (!serviceId || !publicKey) {
          throw new Error('EmailJS configuration is missing');
        }

        emailjs.init(publicKey);

        await emailjs.send(
          serviceId,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          {
            to_email: 'admin@cisconnects.com',
            from_name: formData.name,
            from_email: formData.email,
            phone_number: formData.phone,
            message: `New call request from ${formData.name}`,
            reply_to: formData.email
          }
        );
      } catch (emailError) {
        console.error('Email sending failed (non-blocking):', emailError);
        // Continue regardless of email failure
      }

      // Show success
      setSubmitStatus('success');
      
      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/request-call-success');
      }, 2000);

    } catch (error) {
      console.error('Error submitting call request:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* No Navigation - Funnel locked */}
      <div className="flex-1 flex items-center justify-center px-3 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="w-full max-w-2xl">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 sm:mb-12"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-transparent max-w-sm sm:max-w-md mx-auto">
              <img 
                src="/phone-contractors.png" 
                alt="Request a Call" 
                className="w-full h-auto object-contain rounded-3xl"
                loading="eager"
              />
            </div>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8 sm:mb-12"
          >
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-3 xs:mb-4 sm:mb-5 leading-snug xs:leading-tight">
              How Many Emergency Jobs Are You Missing After 10PM?
            </h1>
            <p className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-300 mb-6 xs:mb-8 sm:mb-10 md:mb-12">
              If you miss just 3 calls a week, that's £1,000+ lost revenue. 📥
            </p>
          </motion.div>

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 sm:mb-8 p-4 sm:p-6 bg-green-500/10 border border-green-500/50 rounded-lg flex items-start gap-3 sm:gap-4"
            >
              <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-green-400 mb-1 sm:mb-2">
                  Call Request Received!
                </h3>
                <p className="text-sm sm:text-base text-green-300">
                  Thank you! Our team will call you soon.
                </p>
              </div>
            </motion.div>
          )}

          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 sm:mb-8 p-4 sm:p-6 bg-red-500/10 border border-red-500/50 rounded-lg flex items-start gap-3 sm:gap-4"
            >
              <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-red-400 mb-1 sm:mb-2">
                  Request Failed
                </h3>
                <p className="text-sm sm:text-base text-red-300">
                  An error occurred. Please try again.
                </p>
              </div>
            </motion.div>
          )}

          {submitStatus === 'error_validation' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 sm:mb-8 p-4 sm:p-6 bg-yellow-500/10 border border-yellow-500/50 rounded-lg flex items-start gap-3 sm:gap-4"
            >
              <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-yellow-400 mb-1 sm:mb-2">
                  Missing Information
                </h3>
                <p className="text-sm sm:text-base text-yellow-300">
                  Please fill in all fields to request a call.
                </p>
              </div>
            </motion.div>
          )}

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-8 shadow-2xl space-y-5 sm:space-y-6"
          >
            {/* Name Field */}
            <div>
              <label className="block text-white font-medium text-xs sm:text-sm mb-2.5">
                Your First Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your First Name"
                  className="w-full px-3.5 sm:px-4 py-3 sm:py-3.5 text-sm sm:text-base bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition touch-manipulation"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-white font-medium text-xs sm:text-sm mb-2.5">
                Enter Your Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Your Email Address"
                  className="w-full px-3.5 sm:px-4 py-3 sm:py-3.5 text-sm sm:text-base bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition touch-manipulation"
                  required
                />
              </div>
            </div>

            {/* Phone Field */}
            <div>
              <label className="block text-white font-medium text-xs sm:text-sm mb-2.5">
                Your Phone Number Here <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your Phone Number Here..."
                  className="w-full px-3.5 sm:px-4 py-3 sm:py-3.5 text-sm sm:text-base bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition touch-manipulation"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full px-4 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 disabled:opacity-50 text-white font-bold text-sm sm:text-base rounded-lg flex items-center justify-center gap-2 transition shadow-lg min-h-12 sm:min-h-14"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span className="text-sm sm:text-base">Processing...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base">Request a Call</span>
                </>
              )}
            </motion.button>
          </motion.form>

          {/* Footer */}
          <div className="text-center mt-10 sm:mt-12 text-gray-500 text-xs sm:text-sm">
            <p className="mb-3 sm:mb-4 text-xs sm:text-sm">© 2026 Cisconnects. All rights reserved.</p>
            <div className="flex justify-center gap-3 sm:gap-6 flex-wrap">
              <Link to="/privacy-policy" className="hover:text-blue-400 transition text-xs sm:text-sm">
                Privacy Policy
              </Link>
              <span className="text-gray-600 text-xs sm:text-sm">|</span>
              <Link to="/terms-of-service" className="hover:text-blue-400 transition text-xs sm:text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestCallFunnel;
