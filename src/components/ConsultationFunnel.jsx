import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedHeroBackground from './AnimatedHeroBackground';
import { Send, CheckCircle, AlertCircle, BookOpen, ArrowRight } from 'lucide-react';
import SEO from './SEO';
import emailjs from '@emailjs/browser';

const ConsultationFunnel = () => {
  const navigate = useNavigate();
  
  // Prevent back navigation until form is submitted
  useEffect(() => {
    // Push a state so browser back button takes user back to one more state
    window.history.pushState(null, null, window.location.href);
    
    const handlePopState = (e) => {
      // Prevent going back - push the state again
      window.history.pushState(null, null, window.location.href);
    };
    
    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const [consultationData, setConsultationData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    currentStatus: '',
    reason: '',
    comments: '',
    confirmAvailability: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const statusOptions = ['Business Owner'];

  // Load GHL booking widget script
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setConsultationData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Validation
    if (!consultationData.currentStatus || !consultationData.reason) {
      setSubmitStatus('error_validation');
      setIsSubmitting(false);
      return;
    }

    if (!consultationData.confirmAvailability) {
      setSubmitStatus('error_confirm');
      setIsSubmitting(false);
      return;
    }

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_CONSULTATION;

      if (!serviceId || !publicKey) {
        throw new Error('EmailJS configuration is missing.');
      }

      emailjs.init(publicKey);

      const formatDate = (dateString) => {
        if (!dateString) return 'Not selected';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      };

      // Save appointment to backend
      const appointmentData = {
        name: consultationData.name,
        email: consultationData.email,
        phone: consultationData.phone,
        company: consultationData.company,
        date: new Date().toISOString().split('T')[0],
        time: 'Via GHL Calendar',
        currentStatus: consultationData.currentStatus,
        reason: consultationData.reason,
        comments: consultationData.comments,
        bookedAt: new Date().toISOString(),
        status: 'pending'
      };

      // Save to database
      const response = await fetch('/api/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appointmentData)
      });

      if (!response.ok) {
        throw new Error('Failed to save consultation');
      }

      // Send notification email to admin (optional - don't fail if email fails)
      const adminEmailParams = {
        from_name: consultationData.name,
        from_email: consultationData.email,
        appointment_date: formatDate(consultationData.date),
        appointment_time: consultationData.time,
        company: consultationData.company || 'Not provided',
        phone: consultationData.phone,
        status: consultationData.currentStatus,
        reason: consultationData.reason,
        comments: consultationData.comments || 'None',
        to_name: 'Admin',
        to_email: 'admin@conxiea.com',
        website: 'https://www.conxiea.com',
        current_date: new Date().toLocaleDateString(),
        current_time: new Date().toLocaleTimeString()
      };

      try {
        await emailjs.send(serviceId, import.meta.env.VITE_EMAILJS_TEMPLATE_ID, adminEmailParams);
      } catch (emailError) {
        console.warn('Email notification failed:', emailError);
        // Don't throw - booking is still successful even if email fails
      }

      setSubmitStatus('success');
      window.gtag?.('event', 'conversion_event_submit_lead_form', {});

      // Navigate to success page after 2 seconds
      setTimeout(() => {
        navigate('/consultation-success');
      }, 2000);
      
      setConsultationData({
        name: '',
        email: '',
        phone: '',
        company: '',
        currentStatus: '',
        reason: '',
        comments: '',
        confirmAvailability: false
      });

      // Scroll to success message
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="Book Your Consultation | AI Network Automation | Conxiea"
        description="Book a consultation call with our experts. Learn how AI-powered network automation can transform your infrastructure."
        url="/book-consultation"
      />
      <div className="min-h-screen bg-[#0f0f3d] relative">
      <AnimatedHeroBackground />
        {/* No Navigation - Funnel locked */}

        <div className="pt-12 pb-8 px-3 sm:px-6 lg:px-8 md:pt-24 md:pb-16">
          <div className="max-w-6xl mx-auto">
            {/* Image and Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative mb-12"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-transparent max-w-md mx-auto">
                  <img 
                    src="/phone-contractors.png" 
                    alt="Book Your Consultation" 
                    className="w-full h-auto object-contain rounded-3xl"
                    loading="eager"
                  />
                </div>
              </motion.div>

              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <BookOpen className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 text-blue-500" />
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-8">
                  Book Your Consultation Call
                </h1>
                <div className="space-y-4 mb-12 max-w-2xl mx-auto text-center">
                  <div className="flex items-center justify-center gap-4">
                    <ArrowRight className="w-6 h-6 text-blue-500 flex-shrink-0" />
                    <div>
                      <p className="text-lg text-gray-300">
                        <strong>Step 1</strong> - Select your preferred call time below
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-4">
                    <ArrowRight className="w-6 h-6 text-blue-500 flex-shrink-0" />
                    <div>
                      <p className="text-lg text-gray-300 m-0">
                        <strong>Step 2</strong> - Answer every question for the best consultation
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 p-6 bg-green-500/10 border border-green-500/50 rounded-lg flex items-start gap-4"
              >
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-lg font-semibold text-green-400 mb-2">
                    Consultation Booked Successfully!
                  </h3>
                  <p className="text-green-300">
                    Your consultation has been booked successfully! Our team will call you at the selected time.
                  </p>
                </div>
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 p-6 bg-red-500/10 border border-red-500/50 rounded-lg flex items-start gap-4"
              >
                <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-lg font-semibold text-red-400 mb-2">
                    Booking Failed
                  </h3>
                  <p className="text-red-300">
                    An error occurred while booking your consultation. Please try again.
                  </p>
                </div>
              </motion.div>
            )}

            {submitStatus === 'error_validation' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 p-6 bg-yellow-500/10 border border-yellow-500/50 rounded-lg flex items-start gap-4"
              >
                <AlertCircle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-lg font-semibold text-yellow-400 mb-2">
                    Missing Information
                  </h3>
                  <p className="text-yellow-300">
                    Please fill in all required fields to book your consultation.
                  </p>
                </div>
              </motion.div>
            )}

            {submitStatus === 'error_confirm' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 p-6 bg-yellow-500/10 border border-yellow-500/50 rounded-lg flex items-start gap-4"
              >
                <AlertCircle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-lg font-semibold text-yellow-400 mb-2">
                    Please Confirm
                  </h3>
                  <p className="text-yellow-300">
                    Please confirm that you're available during the selected time period.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Form */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit}
              className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-6 md:p-8 shadow-2xl"
            >
              {/* Contact Details Section */}
              <div className="mb-6 sm:mb-10">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 pb-4 border-b border-slate-700">
                  Your Contact Details
                </h2>

                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-white font-medium text-sm sm:text-base mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={consultationData.name}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-800 border border-slate-700 rounded-lg text-sm sm:text-base text-white focus:outline-none focus:border-blue-500 transition"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={consultationData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={consultationData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      Company Name <span className="text-gray-400">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={consultationData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition"
                    />
                  </div>
                </div>
              </div>

              {/* Calendar Section — GHL Booking Widget */}
              <div className="mb-6 sm:mb-10">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 pb-4 border-b border-slate-700">
                  Select Your Consultation Time
                </h2>
                <div className="rounded-xl overflow-hidden">
                  <iframe
                    src="https://api.leadconnectorhq.com/widget/booking/hTCZBgEPd1IaJvptd6JY"
                    style={{ width: '100%', border: 'none', overflow: 'hidden', minHeight: '700px' }}
                    scrolling="no"
                    id="hTCZBgEPd1IaJvptd6JY_1773347360886"
                    title="Book Your Consultation"
                  />
                </div>
              </div>

              {/* Consultation Details Section */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-white mb-6 pb-4 border-b border-slate-700">
                  Consultation Details
                </h2>

                <div className="mb-6">
                  <label className="block text-white font-medium mb-3">
                    Are you currently a: <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="currentStatus"
                    value={consultationData.currentStatus}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition"
                    required
                  >
                    <option value="">Select an option</option>
                    {statusOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block text-white font-medium mb-3">
                    What is the main reason you would like a consultation call? <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="reason"
                    value={consultationData.reason}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition resize-none"
                    placeholder="Please describe your main interest or challenge..."
                    required
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-white font-medium mb-3">
                    Any additional comments? <span className="text-gray-400">(Optional)</span>
                  </label>
                  <textarea
                    name="comments"
                    value={consultationData.comments}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition resize-none"
                    placeholder="Any additional information you'd like to share..."
                  />
                </div>
              </div>

              {/* Confirmation Section */}
              <div className={`mb-8 p-6 rounded-lg border-2 transition ${
                consultationData.confirmAvailability 
                  ? 'bg-white border-green-500' 
                  : 'bg-white border-blue-500'
              }`}>
                <label className="flex items-center gap-4 cursor-pointer">
                  <div className={`w-8 h-8 border-2 rounded flex items-center justify-center flex-shrink-0 transition ${
                    consultationData.confirmAvailability
                      ? 'bg-green-500 border-green-500'
                      : 'bg-white border-blue-600'
                  }`}>
                    {consultationData.confirmAvailability && (
                      <CheckCircle className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <input
                    type="checkbox"
                    name="confirmAvailability"
                    checked={consultationData.confirmAvailability}
                    onChange={handleChange}
                    className="hidden"
                    required
                  />
                  <div className="flex-1">
                    <span className="text-slate-900 text-base font-medium leading-relaxed block">
                      I confirm that I have selected my preferred time in the calendar above and I will be available <span className="text-red-500">*</span>
                    </span>
                    {consultationData.confirmAvailability && (
                      <div className="flex items-center gap-2 mt-3 text-green-600 font-medium">
                        <span>Confirmed</span>
                      </div>
                    )}
                  </div>
                </label>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 disabled:opacity-50 text-white font-bold text-sm sm:text-base rounded-lg flex items-center justify-center gap-2 transition shadow-lg"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Booking...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Book Consultation
                  </>
                )}
              </motion.button>
            </motion.form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConsultationFunnel;
