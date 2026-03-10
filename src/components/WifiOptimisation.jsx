import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import SEO from './SEO';
import emailjs from '@emailjs/browser';

const WifiOptimisation = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  const testimonials = [
    { name: 'Lisa W.', review: '"My broadband was fast but WiFi in the back rooms was useless. Cisconnects repositioned everything, added an access point, and now I have full signal everywhere. Simple fix, massive difference."' },
    { name: 'Ben C.', review: '"Loads of interference from the neighbours and my router was in completely the wrong place. They sorted it in one visit. Speeds are so much faster now."' },
    { name: 'Fatima A.', review: '"Really professional. They explained what was wrong, fixed it properly, and didn\'t try to oversell me anything I didn\'t need. Exactly what you want."' },
  ];

  const nextTestimonial = () => setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setCurrentTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setSubmitStatus('error_validation');
      setTimeout(() => setSubmitStatus(null), 5000);
      return;
    }
    setIsSubmitting(true);
    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      if (!serviceId || !publicKey || !templateId) throw new Error('EmailJS config missing');
      emailjs.init(publicKey);
      await emailjs.send(serviceId, templateId, {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        message: 'Enquiry from WiFi Optimisation landing page',
        service_interest: 'WiFi Optimisation (£300)',
        to_name: 'Cisconnects Team',
        reply_to: formData.email,
      });
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '' });
    } catch (err) {
      console.error(err);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="WiFi Optimisation £300 | Turn Weak WiFi Into Reliable Coverage | Cisconnects"
        description="Fast broadband but terrible WiFi? Cisconnects delivers fixed-price WiFi optimisation from £300 — better coverage, faster speeds, and no more dead zones across your building."
        url="/wifi-optimisation"
      />
      <div className="min-h-screen bg-slate-950 flex flex-col">
        <div className="flex-1 flex items-center justify-center px-3 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="w-full max-w-2xl">

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8 sm:mb-12"
            >
              <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-3 xs:mb-4 sm:mb-5 leading-snug xs:leading-tight">
                Your Internet Is Fast. So Why Is Your{' '}
                <span className="border-b-2 border-blue-500">WiFi Terrible?</span>
              </h1>
              <p className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-semibold text-gray-300 mb-6 xs:mb-8 sm:mb-10 md:mb-12">
                Turn weak WiFi into{' '}
                <span className="border-b-2 border-blue-500 text-white">reliable coverage across your building.</span>
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('optimisation-form').scrollIntoView({ behavior: 'smooth' })}
                className="inline-block px-6 xs:px-8 sm:px-10 py-2.5 xs:py-3 sm:py-3.5 bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 text-slate-900 font-bold text-sm xs:text-base sm:text-lg rounded-lg shadow-lg border-2 border-yellow-500"
              >
                Optimise My WiFi — £300
              </motion.button>
            </motion.div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col gap-4 sm:gap-5 mb-8 sm:mb-12"
            >
              {[
                'Better Coverage Across Every Room',
                'Faster Speeds — Get What You\'re Paying For',
                'Reliable Connectivity With No Random Drops',
                'Dead Zones Eliminated for Good',
              ].map((benefit, i) => (
                <div key={i} className="border-l-4 border-blue-500 pl-4 sm:pl-5 py-2">
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm sm:text-base text-white font-semibold">{benefit}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Feature Boxes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-4 sm:space-y-5 mb-12 sm:mb-16"
            >
              <div className="bg-gradient-to-r from-blue-900/30 to-slate-900/30 border border-blue-500/40 rounded-lg p-5 sm:p-6">
                <p className="text-sm sm:text-base text-red-400 mb-3">Weak WiFi in parts of the building means some rooms are effectively useless for work.</p>
                <p className="text-sm sm:text-base text-white font-semibold mb-3">We survey your space and install access points exactly where they're needed for full, even coverage.</p>
                <p className="text-xs sm:text-sm text-gray-300 mb-4">Scenario: Back office or upstairs rooms barely get signal. We map coverage and add hardware in the right spots to eliminate those weak areas completely.</p>
                <div className="flex justify-center">
                  <button onClick={() => document.getElementById('optimisation-form').scrollIntoView({ behavior: 'smooth' })} className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded transition cursor-pointer">Fix My Coverage</button>
                </div>
              </div>
              <div className="bg-gradient-to-r from-blue-900/30 to-slate-900/30 border border-blue-500/40 rounded-lg p-5 sm:p-6">
                <p className="text-sm sm:text-base text-red-400 mb-3">You're paying for a fast broadband package but getting a fraction of the speed on WiFi.</p>
                <p className="text-sm sm:text-base text-white font-semibold mb-3">We optimise your router placement, channels, and configuration so you actually get the speeds you're paying for.</p>
                <p className="text-xs sm:text-sm text-gray-300 mb-4">Scenario: Speed test on a cable gets 150Mbps. On WiFi it's 20Mbps. We find the bottleneck — interference, wrong channel, poor placement — and fix it.</p>
                <div className="flex justify-center">
                  <button onClick={() => document.getElementById('optimisation-form').scrollIntoView({ behavior: 'smooth' })} className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded transition cursor-pointer">Get Faster WiFi</button>
                </div>
              </div>
              <div className="bg-gradient-to-r from-blue-900/30 to-slate-900/30 border border-blue-500/40 rounded-lg p-5 sm:p-6">
                <p className="text-sm sm:text-base text-red-400 mb-3">Interference from neighbouring networks causes random disconnections and slow speeds that are hard to diagnose.</p>
                <p className="text-sm sm:text-base text-white font-semibold mb-3">We analyse the WiFi environment and configure your network to avoid interference channels entirely.</p>
                <p className="text-xs sm:text-sm text-gray-300 mb-4">Scenario: WiFi works fine in the morning but degrades during the day as nearby businesses start up. We switch channels and adjust power settings to prevent it.</p>
                <div className="flex justify-center">
                  <button onClick={() => document.getElementById('optimisation-form').scrollIntoView({ behavior: 'smooth' })} className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded transition cursor-pointer">Stop the Interference</button>
                </div>
              </div>
              <div className="bg-gradient-to-r from-blue-900/30 to-slate-900/30 border border-blue-500/40 rounded-lg p-5 sm:p-6">
                <p className="text-sm sm:text-base text-red-400 mb-3">A router in the wrong place is one of the most common causes of terrible WiFi — and the easiest to fix.</p>
                <p className="text-sm sm:text-base text-white font-semibold mb-3">We assess your layout and reposition or extend your network so signal reaches where you actually need it.</p>
                <p className="text-xs sm:text-sm text-gray-300 mb-4">Scenario: Router is tucked away in a cabinet at one end of the building. Half the space gets no signal. We redesign the layout for £300 fixed price.</p>
                <div className="flex justify-center">
                  <button onClick={() => document.getElementById('optimisation-form').scrollIntoView({ behavior: 'smooth' })} className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded transition cursor-pointer">Book My Optimisation</button>
                </div>
              </div>
            </motion.div>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 sm:mb-8 p-4 sm:p-6 bg-green-500/10 border border-green-500/50 rounded-lg flex items-start gap-3 sm:gap-4">
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-green-400 mb-1 sm:mb-2">Booking Request Received!</h3>
                  <p className="text-sm sm:text-base text-green-300">Thank you! Our team will be in touch shortly.</p>
                </div>
              </motion.div>
            )}
            {submitStatus === 'error' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 sm:mb-8 p-4 sm:p-6 bg-red-500/10 border border-red-500/50 rounded-lg flex items-start gap-3 sm:gap-4">
                <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-red-400 mb-1 sm:mb-2">Submission Failed</h3>
                  <p className="text-sm sm:text-base text-red-300">An error occurred. Please try again.</p>
                </div>
              </motion.div>
            )}
            {submitStatus === 'error_validation' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 sm:mb-8 p-4 sm:p-6 bg-yellow-500/10 border border-yellow-500/50 rounded-lg flex items-start gap-3 sm:gap-4">
                <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-yellow-400 mb-1 sm:mb-2">Missing Information</h3>
                  <p className="text-sm sm:text-base text-yellow-300">Please fill in all fields to continue.</p>
                </div>
              </motion.div>
            )}

            {/* Testimonials */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-8 sm:mb-12"
            >
              <h3 className="text-center text-lg sm:text-xl font-bold text-white mb-5 sm:mb-7">
                Trusted by businesses across the UK
              </h3>
              <div className="flex items-center justify-between gap-3 sm:gap-4">
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={prevTestimonial} className="flex-shrink-0 p-2 sm:p-3 bg-blue-600/20 border border-blue-500/30 rounded-lg hover:bg-blue-600/40 transition text-white">
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.button>
                <motion.div key={currentTestimonialIndex} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="flex-1 bg-slate-800/50 border border-slate-700 rounded-lg p-4 sm:p-5">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white">{testimonials[currentTestimonialIndex].name}</span>
                      <span className="text-yellow-400">★★★★★</span>
                    </div>
                    <span className="text-lg">Google</span>
                  </div>
                  <p className="text-sm text-gray-300 mb-3">{testimonials[currentTestimonialIndex].review}</p>
                  <div className="flex justify-center gap-2">
                    {testimonials.map((_, index) => (
                      <div key={index} className={`w-2 h-2 rounded-full transition ${index === currentTestimonialIndex ? 'bg-blue-400' : 'bg-slate-600'}`} />
                    ))}
                  </div>
                </motion.div>
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={nextTestimonial} className="flex-shrink-0 p-2 sm:p-3 bg-blue-600/20 border border-blue-500/30 rounded-lg hover:bg-blue-600/40 transition text-white">
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.button>
              </div>
            </motion.div>

            {/* Form */}
            <motion.form
              id="optimisation-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit}
              className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-8 shadow-2xl space-y-5 sm:space-y-6"
            >
              <div>
                <label className="block text-white font-medium text-xs sm:text-sm mb-2.5">Your First Name <span className="text-red-500">*</span></label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your First Name" className="w-full px-3.5 sm:px-4 py-3 sm:py-3.5 text-sm sm:text-base bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition touch-manipulation" required />
              </div>
              <div>
                <label className="block text-white font-medium text-xs sm:text-sm mb-2.5">Email Address <span className="text-red-500">*</span></label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter Your Email Address" className="w-full px-3.5 sm:px-4 py-3 sm:py-3.5 text-sm sm:text-base bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition touch-manipulation" required />
              </div>
              <div>
                <label className="block text-white font-medium text-xs sm:text-sm mb-2.5">Phone Number <span className="text-red-500">*</span></label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Your Phone Number" className="w-full px-3.5 sm:px-4 py-3 sm:py-3.5 text-sm sm:text-base bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition touch-manipulation" required />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full px-4 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 disabled:opacity-50 text-slate-900 font-bold text-sm sm:text-base rounded-lg flex items-center justify-center gap-2 transition shadow-lg min-h-12 sm:min-h-14"
              >
                {isSubmitting ? (
                  <><div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" /><span>Processing...</span></>
                ) : (
                  <><Send className="w-4 h-4 sm:w-5 sm:h-5" /><span>Book WiFi Optimisation — £300</span></>
                )}
              </motion.button>
            </motion.form>

            {/* Pricing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 border border-purple-500/50 rounded-lg p-5 sm:p-7 mt-8 sm:mt-12"
            >
              <p className="text-xs sm:text-sm font-semibold text-yellow-300 mb-3">📢 PRICING</p>
              <p className="text-sm sm:text-base text-white mb-3"><span className="font-bold">WiFi Optimisation Session:</span> <span className="text-green-400 font-bold">£300 fixed price</span></p>
              <p className="text-xs sm:text-sm text-gray-300 mt-3">✨ Includes survey, diagnosis, repositioning & configuration</p>
              <p className="text-xs sm:text-sm text-yellow-300 mt-2">📢 Fixed price — no hidden extras. Honest advice guaranteed.</p>
            </motion.div>

            {/* Footer */}
            <div className="text-center mt-10 sm:mt-12 text-gray-500 text-xs sm:text-sm">
              <p className="mb-3 sm:mb-4 text-xs sm:text-sm">© 2026 Cisconnects. All rights reserved.</p>
              <div className="flex justify-center gap-3 sm:gap-6 flex-wrap">
                <Link to="/privacy-policy" className="hover:text-blue-400 transition text-xs sm:text-sm">Privacy Policy</Link>
                <Link to="/terms-of-service" className="hover:text-blue-400 transition text-xs sm:text-sm">Terms of Service</Link>
                <Link to="/" className="hover:text-blue-400 transition text-xs sm:text-sm">Home</Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default WifiOptimisation;
