import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import SEO from './SEO';

const LeadMagnet = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    const backhandler = () => {
      window.history.pushState(null, null, window.location.href);
    };
    
    window.history.pushState(null, null, window.location.href);
    window.addEventListener('popstate', backhandler);
    
    return () => {
      window.removeEventListener('popstate', backhandler);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim()) {
      setSubmitStatus('error_validation');
      setTimeout(() => setSubmitStatus(null), 5000);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          source: 'lead-magnet',
          timestamp: new Date().toISOString()
        })
      });

      if (!response.ok) throw new Error('Failed to save lead');

      try {
        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        if (!serviceId || !publicKey) throw new Error('EmailJS configuration missing');

        emailjs.init(publicKey);

        await emailjs.send(
          serviceId,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          {
            to_email: 'admin@conxiea.com',
            from_name: formData.name,
            from_email: formData.email,
            message: `New lead magnet download request from ${formData.name}`,
            reply_to: formData.email
          }
        );
      } catch (emailError) {
        console.error('Email sending failed (non-blocking):', emailError);
      }

      setSubmitStatus('success');
      setTimeout(() => navigate('/lead-magnet-success'), 2000);
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="Free Guide: AI Network Automation | Download Now"
        description="Get your free guide on how AI can revolutionize your network infrastructure."
        url="/lead-magnet"
      />
      <div className="min-h-screen bg-slate-950">
        <div className="px-3 xs:px-4 sm:px-6 lg:px-8 py-6 xs:py-8 sm:py-12 md:py-16">
          <div className="max-w-3xl mx-auto">
            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold text-white text-center mb-3 xs:mb-4 sm:mb-5 leading-snug xs:leading-tight"
            >
              How Many Emergency Jobs Are You Missing After 10PM?
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-300 text-center mb-6 xs:mb-8 sm:mb-10 md:mb-12"
            >
              If you miss just <span className="border-b-2 border-blue-500 text-white">3</span> calls a week, that's £<span className="border-b-2 border-blue-500 text-white">1,000</span>+ lost revenue. 📥
            </motion.p>

            {/* AI Benefits Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-8 sm:mb-12"
            >
              <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-4 sm:p-5">
                <p className="text-sm sm:text-base text-white font-semibold">🤖 Never Miss An Emergency Call Again</p>
                <p className="text-xs sm:text-sm text-gray-300 mt-1">Capture emergency jobs and book meetings into calendar</p>
              </div>
              <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-4 sm:p-5">
                <p className="text-sm sm:text-base text-white font-semibold"> Instant SMS Notifications</p>
                <p className="text-xs sm:text-sm text-gray-300 mt-1">Get notified immediately by SMS the moment jobs come in</p>
              </div>
              <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-4 sm:p-5">
                <p className="text-sm sm:text-base text-white font-semibold"> 100% Business Retention</p>
                <p className="text-xs sm:text-sm text-gray-300 mt-1">Never let another emergency job slip away</p>
              </div>
              <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-4 sm:p-5">
                <p className="text-sm sm:text-base text-white font-semibold"> Always Working For You</p>
                <p className="text-xs sm:text-sm text-gray-300 mt-1">Your AI works 24/7 while you focus on delivery</p>
              </div>
            </motion.div>

            {/* Blue Benefits Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg xs:rounded-xl p-4 xs:p-5 sm:p-7 md:p-8 mb-6 xs:mb-8 sm:mb-10 md:mb-12 text-center shadow-lg"
            >
              <h2 className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white leading-relaxed">
                Download the free guide and see how to capture every emergency job — automatically.
              </h2>
            </motion.div>

            {/* Yellow CTA Button - Top */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center mb-8 xs:mb-10 sm:mb-12 md:mb-16"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('lead-form').scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-block px-6 xs:px-8 sm:px-10 md:px-12 py-3 xs:py-4 sm:py-5 bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 text-slate-900 font-bold text-base xs:text-lg sm:text-xl rounded-lg shadow-lg border-2 border-yellow-500 min-h-12 xs:min-h-13 sm:min-h-14 w-full xs:w-auto"
              >
                ✅ Get The Free Guide
              </motion.button>
            </motion.div>

            {/* Image Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="rounded-lg overflow-hidden shadow-2xl bg-gradient-to-br from-slate-800 to-slate-700 aspect-video flex items-center justify-center border-2 xs:border-3 sm:border-4 border-slate-700 mb-8 xs:mb-10 sm:mb-12 md:mb-16"
            >
              <p className="text-gray-400 text-xl xs:text-2xl sm:text-4xl md:text-5xl font-bold px-4">📷 [Insert Image Here]</p>
            </motion.div>

            {/* Lead Capture Form */}
            <motion.div
              id="lead-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="max-w-2xl mx-auto bg-slate-900 border border-slate-800 rounded-lg xs:rounded-xl p-4 xs:p-6 sm:p-8 md:p-10 shadow-lg mb-8 xs:mb-10 sm:mb-12"
            >
              <h2 className="text-xl xs:text-2xl sm:text-3xl font-bold text-white text-center mb-6 xs:mb-7 sm:mb-8">
                Get Your Free Guide
              </h2>

              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 xs:mb-5 sm:mb-6 p-3 xs:p-4 sm:p-5 bg-green-500/10 border border-green-500/50 rounded-lg flex items-start gap-2 xs:gap-3"
                >
                  <CheckCircle className="w-4 xs:w-5 sm:w-6 h-4 xs:h-5 sm:h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm xs:text-base font-semibold text-green-400">Success!</h3>
                    <p className="text-xs xs:text-sm text-green-300 leading-tight">Guide on its way to your inbox.</p>
                  </div>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 xs:mb-5 sm:mb-6 p-3 xs:p-4 sm:p-5 bg-red-500/10 border border-red-500/50 rounded-lg flex items-start gap-2 xs:gap-3"
                >
                  <AlertCircle className="w-4 xs:w-5 sm:w-6 h-4 xs:h-5 sm:h-6 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm xs:text-base font-semibold text-red-400">Error</h3>
                    <p className="text-xs xs:text-sm text-red-300 leading-tight">Try again please.</p>
                  </div>
                </motion.div>
              )}

              {submitStatus === 'error_validation' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 xs:mb-5 sm:mb-6 p-3 xs:p-4 sm:p-5 bg-yellow-500/10 border border-yellow-500/50 rounded-lg flex items-start gap-2 xs:gap-3"
                >
                  <AlertCircle className="w-4 xs:w-5 sm:w-6 h-4 xs:h-5 sm:h-6 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm xs:text-base font-semibold text-yellow-400">Missing Info</h3>
                    <p className="text-xs xs:text-sm text-yellow-300 leading-tight">Fill all fields please.</p>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 xs:space-y-5 sm:space-y-6">
                <div>
                  <label className="block text-white font-semibold text-xs xs:text-sm sm:text-base mb-2 xs:mb-2.5">
                    Your First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John"
                    className="w-full px-3 xs:px-4 py-3 xs:py-3.5 sm:py-4 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition text-sm xs:text-base sm:text-base min-h-12 xs:min-h-13 text-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold text-xs xs:text-sm sm:text-base mb-2 xs:mb-2.5">
                    Your Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full px-3 xs:px-4 py-3 xs:py-3.5 sm:py-4 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition text-sm xs:text-base sm:text-base min-h-12 xs:min-h-13 text-lg"
                    required
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-4 xs:px-6 py-3 xs:py-4 sm:py-5 bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 disabled:opacity-50 text-slate-900 font-bold text-base xs:text-lg sm:text-lg rounded-lg flex items-center justify-center gap-2 transition shadow-lg min-h-12 xs:min-h-13 sm:min-h-14 border-2 border-yellow-500"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 xs:w-5 h-4 xs:h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                      <span className="text-xs xs:text-sm">Processing...</span>
                    </>
                  ) : (
                    <>
                      <Mail className="w-4 xs:w-5 h-4 xs:h-5 flex-shrink-0" />
                      <span className="text-xs xs:text-sm sm:text-base">Send Guide</span>
                    </>
                  )}
                </motion.button>

                <p className="text-xs xs:text-sm text-gray-400 text-center px-2 leading-relaxed">
                  We respect your privacy. Your information will never be shared.
                </p>
              </form>
            </motion.div>

            {/* Footer */}
            <div className="text-center pt-6 xs:pt-8 sm:pt-10 md:pt-12 border-t border-slate-700 text-gray-500 text-xs xs:text-sm px-2">
              <p className="mb-2">© 2026 Conxiea. All rights reserved.</p>
              <p className="text-xs xs:text-sm text-gray-600 leading-relaxed">
                This is 100% free. No credit card required. Takes 2-3 minutes to read.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeadMagnet;
