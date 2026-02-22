import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Mail, Phone as PhoneIcon, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import emailjs from '@emailjs/browser';
import SEO from './SEO';

const RequestCallFunnel = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  const testimonials = [
    {
      name: 'Jack',
      review: '"Booked 2 emergency jobs this week and I had to do zero work. The AI assistant captured everything automatically. Truly awesome stuff!"'
    },
    {
      name: 'Jas',
      review: '"Such a great service, all the calls I used to miss. Now just automatically get booked, saving the business a lot of reveune and I couldn\'t recommend enough."'
    },
    {
      name: 'G Singh',
      review: '"Brilliant experience from beginning to end. The team kept me updated throughout and handled everything promptly with real care. I\'d definitely recommend their services."'
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

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
    <>
      <SEO
        title="24/7 Emergency Operator | Capture Every After-Hours Call"
        description="Get your 24/7 AI emergency booking assistant. Capture every after-hours call and book emergency jobs automatically."
        url="/24-7-emergency-operator"
      />
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
              How Many <span className="border-b-2 border-blue-500">Emergency</span> Jobs Are You Missing After 10PM?
            </h1>
            <p className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-300 mb-6 xs:mb-8 sm:mb-10 md:mb-12">
              Miss just <span className="border-b-2 border-blue-500 text-white">3</span> emergency calls a week? <br className="hidden sm:block" />
              That's £<span className="border-b-2 border-blue-500 text-white">1,000</span>+ lost revenue.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('request-call-form').scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-block px-6 xs:px-8 sm:px-10 py-2.5 xs:py-3 sm:py-3.5 bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 text-slate-900 font-bold text-sm xs:text-base sm:text-lg rounded-lg shadow-lg border-2 border-yellow-500"
            >
              See How It Works
            </motion.button>
          </motion.div>

          {/* Benefits Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-8 sm:mb-12"
          >
            <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-4 sm:p-5">
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm sm:text-base text-white font-semibold">Capture Every After-Hours Enquiry</p>
                  <p className="text-xs sm:text-sm text-gray-300 mt-1">Never lose a call after business hours</p>
                </div>
              </div>
            </div>
            <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-4 sm:p-5">
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm sm:text-base text-white font-semibold">Instant SMS Job Alerts</p>
                  <p className="text-xs sm:text-sm text-gray-300 mt-1">Get notified immediately by SMS</p>
                </div>
              </div>
            </div>
            <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-4 sm:p-5">
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm sm:text-base text-white font-semibold">Auto-Book Emergency Call-Outs</p>
                  <p className="text-xs sm:text-sm text-gray-300 mt-1">Automatically schedule and confirm appointments</p>
                </div>
              </div>
            </div>
            <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-4 sm:p-5">
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm sm:text-base text-white font-semibold">Works 24/7 While You're On-Site or Asleep</p>
                  <p className="text-xs sm:text-sm text-gray-300 mt-1">Your AI handles jobs round the clock</p>
                </div>
              </div>
            </div>
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

          {/* Limited Time Offer Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 border border-purple-500/50 rounded-lg p-5 sm:p-7 mb-8 sm:mb-12"
          >
            <p className="text-xs sm:text-sm font-semibold text-yellow-300 mb-3">📢 PRICING</p>
            <p className="text-sm sm:text-base text-white mb-3">
              <span className="font-bold">24/7 Emergency Booking Assistant:</span> <span className="text-green-400 font-bold">£97/month</span>
            </p>
            <p className="text-sm sm:text-base text-white">
              <span className="font-bold">Website & Calendar Add-on:</span> <span className="text-green-400 font-bold">£25/month</span>
            </p>
            <p className="text-xs sm:text-sm text-gray-300 mt-3">
              Add the website & calendar if you don't have one yet!
            </p>
          </motion.div>

          {/* Testimonials Section - Slider */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8 sm:mb-12"
          >
            <h3 className="text-center text-lg sm:text-xl font-bold text-white mb-5 sm:mb-7">
              Trusted by <span className="text-blue-400">1,000+</span> businesses, like yours
            </h3>
            <div className="flex items-center justify-between gap-3 sm:gap-4">
              {/* Previous Arrow */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={prevTestimonial}
                className="flex-shrink-0 p-2 sm:p-3 bg-blue-600/20 border border-blue-500/30 rounded-lg hover:bg-blue-600/40 transition text-white"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.button>

              {/* Testimonial Card */}
              <motion.div
                key={currentTestimonialIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex-1 bg-slate-800/50 border border-slate-700 rounded-lg p-4 sm:p-5"
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white">{testimonials[currentTestimonialIndex].name}</span>
                    <span className="text-yellow-400">★★★★★</span>
                  </div>
                  <span className="text-lg">Google</span>
                </div>
                <p className="text-sm text-gray-300 mb-3">
                  {testimonials[currentTestimonialIndex].review}
                </p>
                <div className="flex justify-center gap-2">
                  {testimonials.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition ${
                        index === currentTestimonialIndex ? 'bg-blue-400' : 'bg-slate-600'
                      }`}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Next Arrow */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={nextTestimonial}
                className="flex-shrink-0 p-2 sm:p-3 bg-blue-600/20 border border-blue-500/30 rounded-lg hover:bg-blue-600/40 transition text-white"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.button>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            id="request-call-form"
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
              className="w-full px-4 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 disabled:opacity-50 text-slate-900 font-bold text-sm sm:text-base rounded-lg flex items-center justify-center gap-2 transition shadow-lg min-h-12 sm:min-h-14"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                  <span className="text-sm sm:text-base">Processing...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base">Get My 24/7 Assistant</span>
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
    </>
  );
};

export default RequestCallFunnel;
