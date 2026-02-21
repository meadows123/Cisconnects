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
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID_CONSULTATION,
          {
            to_email: 'admin@cisconnects.com',
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
        <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
          <div className="max-w-4xl mx-auto">
            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white text-center mb-4 leading-tight"
            >
              How Many Emergency Jobs Are You Missing After 10PM?
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-300 text-center mb-10 sm:mb-12"
            >
              If you miss just 3 calls a week, that's £1,000+ lost revenue. 📥
            </motion.p>

            {/* Blue Benefits Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 sm:p-8 mb-10 sm:mb-12 text-center shadow-lg"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Download the free guide and see how to capture every emergency job — automatically.
              </h2>
            </motion.div>

            {/* Yellow CTA Button - Top */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center mb-12 sm:mb-16"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('lead-form').scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-block px-8 sm:px-12 py-4 sm:py-5 bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold text-lg sm:text-xl rounded-lg shadow-lg border-2 border-yellow-500 min-h-14"
              >
                ✅ Add Your Call To Action Here
              </motion.button>
            </motion.div>

            {/* Image Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="rounded-lg overflow-hidden shadow-2xl bg-gradient-to-br from-slate-800 to-slate-700 aspect-video flex items-center justify-center border-4 border-slate-700 mb-12 sm:mb-16"
            >
              <p className="text-gray-400 text-3xl sm:text-5xl font-bold">[Insert Image Here]</p>
            </motion.div>

            {/* Lead Capture Form */}
            <motion.div
              id="lead-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="max-w-2xl mx-auto bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-10 shadow-lg mb-12"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8">
                Get Your Free Guide
              </h2>

              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 sm:p-5 bg-green-500/10 border border-green-500/50 rounded-lg flex items-start gap-3"
                >
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-green-400">Success!</h3>
                    <p className="text-xs sm:text-sm text-green-300">Guide on its way to your inbox.</p>
                  </div>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 sm:p-5 bg-red-500/10 border border-red-500/50 rounded-lg flex items-start gap-3"
                >
                  <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-red-400">Error</h3>
                    <p className="text-xs sm:text-sm text-red-300">Try again please.</p>
                  </div>
                </motion.div>
              )}

              {submitStatus === 'error_validation' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 sm:p-5 bg-yellow-500/10 border border-yellow-500/50 rounded-lg flex items-start gap-3"
                >
                  <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-yellow-400">Missing Info</h3>
                    <p className="text-xs sm:text-sm text-yellow-300">Fill all fields please.</p>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                <div>
                  <label className="block text-white font-semibold text-sm sm:text-base mb-2">
                    Your First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John"
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition text-sm sm:text-base"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold text-sm sm:text-base mb-2">
                    Your Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition text-sm sm:text-base"
                    required
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 bg-yellow-400 hover:bg-yellow-500 disabled:opacity-50 text-slate-900 font-bold text-base sm:text-lg rounded-lg flex items-center justify-center gap-2 transition shadow-lg min-h-14 border-2 border-yellow-500"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Mail className="w-5 h-5" />
                      Send Me The Free Guide
                    </>
                  )}
                </motion.button>

                <p className="text-xs sm:text-sm text-gray-400 text-center">
                  We respect your privacy. Your information will never be shared.
                </p>
              </form>
            </motion.div>

            {/* Footer */}
            <div className="text-center pt-8 sm:pt-12 border-t border-slate-700 text-gray-500 text-xs sm:text-sm">
              <p className="mb-2">© 2026 Cisconnects. All rights reserved.</p>
              <p className="text-xs text-gray-600">
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
