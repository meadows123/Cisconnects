import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, ChevronLeft, ChevronRight, Check, Shield } from 'lucide-react';
import SEO from './SEO';
import emailjs from '@emailjs/browser';

const WifiOptimisation = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  const testimonials = [
    { name: 'Lisa W.', initials: 'LW', role: 'Property Manager', result: 'Full signal across all rooms — no more weak spots', review: '"My broadband was fast but WiFi in the back rooms was useless. Conxiea repositioned everything, added an access point, and now I have full signal everywhere. Simple fix, massive difference."' },
    { name: 'Ben C.', initials: 'BC', role: 'Small Business Owner', result: 'Speeds tripled after interference channels fixed', review: '"Loads of interference from the neighbours and my router was in completely the wrong place. They sorted it in one visit. Speeds are so much faster now."' },
    { name: 'Fatima A.', initials: 'FA', role: 'Office Manager', result: 'Fixed exactly what was needed — no oversell', review: '"Really professional. They explained what was wrong, fixed it properly, and didn\'t try to oversell me anything I didn\'t need. Exactly what you want."' },
    { name: 'Sam L.', initials: 'SL', role: 'Home Office User', result: 'Getting 200Mbps on WiFi vs 18Mbps before', review: '"I was getting 18Mbps on WiFi when my broadband was 200Mbps. Turns out the router was in the wrong place. One session with Conxiea and it\'s transformed."' },
    { name: 'Anna T.', initials: 'AT', role: 'Retail Store Owner', result: 'Dead zone in stockroom completely eliminated', review: '"Half my shop had no WiFi — couldn\'t process card payments from the floor. They added an access point and configured everything properly. All working now."' },
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
        service_interest: 'WiFi Optimisation',
        to_name: 'Conxiea Team',
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
        title="WiFi Optimisation | Turn Weak WiFi Into Reliable Coverage | Conxiea"
        description="Fast broadband but terrible WiFi? Conxiea optimises your WiFi coverage — better signal, faster speeds, and no more dead zones. Tell us your problem and we'll get back to you the same day."
        url="/wifi-optimisation"
      />
      <div className="min-h-screen bg-slate-950 flex flex-col">
        <main className="flex-1 flex items-center justify-center px-3 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="w-full max-w-2xl">

            {/* Header */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-center mb-8 sm:mb-12"
            >
              <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-3 xs:mb-4 sm:mb-5 leading-tight">
                Your Internet Isn't the Problem{' '}
                <span className="border-b-2 border-blue-500">— Your WiFi Is</span>
              </h1>
              <p className="text-base xs:text-lg sm:text-xl md:text-2xl font-semibold text-gray-300 mb-5 xs:mb-7 sm:mb-10 md:mb-12">
                You're paying for fast internet, but{' '}
                <span className="border-b-2 border-blue-500 text-white">poor coverage, interference, and bad design stop it performing where it matters.</span>
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('optimisation-form').scrollIntoView({ behavior: 'smooth' })}
                className="inline-block px-7 sm:px-10 py-3.5 sm:py-4 bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 text-slate-900 font-bold text-base sm:text-lg rounded-lg shadow-lg border-2 border-yellow-500 min-h-[44px]"
              >
                Fix My WiFi Performance
              </motion.button>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="mt-6"
              >
                <img
                  src="/BeforeAfter Wifi Cafe.png"
                  alt="Before and after WiFi coverage improvement"
                  className="w-full rounded-xl"
                />
              </motion.div>
            </motion.div>

            {/* Scenarios */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.08 }}
              className="mb-6 sm:mb-8"
            >
              <div className="bg-red-950/40 border border-red-500/50 rounded-xl p-5 sm:p-7 space-y-3">
                <p className="text-base sm:text-lg text-red-300 font-semibold leading-relaxed">
                  You've upgraded your internet. But some rooms are still slow.
                </p>
                <p className="text-base sm:text-lg text-red-400 font-bold">
                  Dead zones. Weak signal. Frustration.
                </p>
                <p className="text-base sm:text-lg text-red-300 font-semibold leading-relaxed">
                  It works fine near the router… but drops off elsewhere.
                </p>
                <p className="text-base sm:text-lg text-red-300 font-semibold leading-relaxed">
                  Everything is connected — but it still feels slow.
                </p>
              </div>
            </motion.div>

            {/* Problem + Solution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="mb-8 sm:mb-12 rounded-xl overflow-hidden border border-slate-700"
            >
              <div className="bg-slate-800/60 px-5 sm:px-7 py-4 sm:py-5 border-b border-slate-700">
                <p className="text-xs sm:text-sm font-bold text-red-400 uppercase tracking-wide mb-1">The Problem</p>
                <p className="text-base sm:text-lg text-white font-semibold leading-relaxed">
                  That usually means the WiFi setup, not the internet, is the real problem.
                </p>
              </div>
              <div className="bg-slate-900/60 px-5 sm:px-7 py-4 sm:py-5">
                <p className="text-xs sm:text-sm font-bold text-green-400 uppercase tracking-wide mb-1">The Solution</p>
                <p className="text-base sm:text-lg text-white font-semibold leading-relaxed">
                  We redesign and optimise your WiFi so your connection performs properly across your entire space{' '}
                  <span className="text-green-400">— not just near the router.</span>
                </p>
              </div>
            </motion.div>

            {/* Guarantee */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.14 }}
              className="mb-8 sm:mb-12"
            >
              <div className="bg-gradient-to-r from-green-900/40 to-emerald-900/40 border-2 border-green-500/60 rounded-xl p-5 sm:p-7 text-center">
                <div className="flex justify-center mb-3">
                  <div className="w-14 h-14 rounded-full bg-green-500/20 border-2 border-green-500/50 flex items-center justify-center">
                    <Shield className="w-7 h-7 text-green-400" />
                  </div>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Our Guarantee</h2>
                <p className="text-base sm:text-lg text-green-300 font-semibold mb-3">"If your WiFi coverage doesn't improve after our visit, you don't pay a penny."</p>
                <p className="text-sm text-gray-400">We assess, we optimise, we verify. If there's no measurable improvement, there's no invoice.</p>
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

            {/* Form */}
            <motion.form
              id="optimisation-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit}
              className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-8 shadow-2xl space-y-5 sm:space-y-6 mb-8 sm:mb-12"
            >
              <div>
                <label className="block text-white font-medium text-xs sm:text-sm mb-2.5">Your First Name <span className="text-red-500">*</span></label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your First Name" className="w-full px-4 py-3.5 text-base bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition touch-manipulation" required />
              </div>
              <div>
                <label className="block text-white font-medium text-xs sm:text-sm mb-2.5">Email Address <span className="text-red-500">*</span></label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter Your Email Address" className="w-full px-4 py-3.5 text-base bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition touch-manipulation" required />
              </div>
              <div>
                <label className="block text-white font-medium text-xs sm:text-sm mb-2.5">Phone Number <span className="text-red-500">*</span></label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Your Phone Number" className="w-full px-4 py-3.5 text-base bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition touch-manipulation" required />
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
                  <><Send className="w-4 h-4 sm:w-5 sm:h-5" /><span>Fix My WiFi Performance</span></>
                )}
              </motion.button>
            </motion.form>

            {/* Chat Reviews */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="mb-8 sm:mb-12"
            >
              <div className="flex flex-row items-start gap-3">
                <img src="/2.png" alt="Customer review" className="w-1/2 rounded-xl border border-slate-700" />
                <img src="/JessReview.png" alt="Customer review" className="w-1/2 rounded-xl border border-slate-700" />
              </div>
            </motion.div>

            {/* Testimonials */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-8 sm:mb-12"
            >
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { number: '50+', label: 'Homes & Offices Optimised' },
                  { number: '4.9★', label: 'Google Rating' },
                  { number: '100%', label: 'Coverage Guaranteed' },
                  { number: '100%', label: 'Transparent Pricing — Quoted Before We Start' },
                ].map((stat, i) => (
                  <div key={i} className="bg-slate-800/60 border border-slate-700/80 rounded-lg p-3 sm:p-4 text-center">
                    <p className="text-xl sm:text-2xl font-bold text-white">{stat.number}</p>
                    <p className="text-xs sm:text-sm text-gray-300 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center gap-3 mb-5 sm:mb-7">
                <div className="h-px flex-1 bg-slate-700" />
                <h2 className="text-center text-lg sm:text-xl font-bold text-white whitespace-nowrap">What our customers say</h2>
                <div className="h-px flex-1 bg-slate-700" />
              </div>
              <div className="flex items-center justify-center gap-2 mb-5 bg-slate-800/40 border border-slate-700/50 rounded-lg py-3 px-4">
                <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                <span className="text-sm font-semibold text-white">4.9</span>
                <span className="text-yellow-400 text-sm">★★★★★</span>
                <span className="text-gray-300 text-xs">· 30+ Google Reviews</span>
              </div>
              <div className="flex items-center justify-between gap-3 sm:gap-4">
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={prevTestimonial} aria-label="Previous testimonial" className="flex-shrink-0 p-3 min-w-[44px] min-h-[44px] flex items-center justify-center bg-blue-600/20 border border-blue-500/30 rounded-lg hover:bg-blue-600/40 active:bg-blue-600/60 transition text-white">
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.button>
                <motion.div key={currentTestimonialIndex} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="flex-1 bg-slate-800/50 border border-slate-700 rounded-lg p-4 sm:p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold">
                      {testimonials[currentTestimonialIndex].initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <p className="text-sm font-semibold text-white">{testimonials[currentTestimonialIndex].name}</p>
                          <p className="text-xs text-gray-300">{testimonials[currentTestimonialIndex].role}</p>
                        </div>
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                          <span className="text-xs text-gray-300">Google</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span className="text-yellow-400 text-sm mb-2 block">★★★★★</span>
                  <p className="text-sm text-gray-300 mb-3">{testimonials[currentTestimonialIndex].review}</p>
                  <div className="bg-green-500/10 border border-green-500/30 rounded px-3 py-2">
                    <p className="text-xs text-green-400 font-semibold">✓ {testimonials[currentTestimonialIndex].result}</p>
                  </div>
                  <div className="flex justify-center gap-2 mt-3">
                    {testimonials.map((_, index) => (
                      <div key={index} role="img" aria-label={`Review ${index + 1} of ${testimonials.length}`} className={`w-2 h-2 rounded-full transition ${index === currentTestimonialIndex ? 'bg-blue-400' : 'bg-slate-600'}`} />
                    ))}
                  </div>
                </motion.div>
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={nextTestimonial} aria-label="Next testimonial" className="flex-shrink-0 p-3 min-w-[44px] min-h-[44px] flex items-center justify-center bg-blue-600/20 border border-blue-500/30 rounded-lg hover:bg-blue-600/40 active:bg-blue-600/60 transition text-white">
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.button>
              </div>
            </motion.div>

            {/* What Happens Next */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 border border-purple-500/50 rounded-lg p-5 sm:p-7 mt-8 sm:mt-12"
            >
              <p className="text-xs sm:text-sm font-semibold text-yellow-300 mb-4">📋 WHAT HAPPENS NEXT</p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-blue-400 font-bold text-sm flex-shrink-0 mt-0.5">1.</span>
                  <p className="text-sm sm:text-base text-white"><span className="font-semibold">You send your enquiry</span> — describe what's happening with your WiFi.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-400 font-bold text-sm flex-shrink-0 mt-0.5">2.</span>
                  <p className="text-sm sm:text-base text-white"><span className="font-semibold">We call you back the same day</span> — a real engineer who'll understand your space and the problem.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-400 font-bold text-sm flex-shrink-0 mt-0.5">3.</span>
                  <p className="text-sm sm:text-base text-white"><span className="font-semibold">We give you a clear quote</span> — based on your actual setup, before any work starts.</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-gray-400 mt-4">✨ No commitment. No surprise invoices. Honest advice — if you don't need us, we'll tell you.</p>
            </motion.div>

            {/* Footer */}
            <div className="text-center mt-10 sm:mt-12 text-gray-400 text-xs sm:text-sm">
              <p className="mb-3 sm:mb-4 text-xs sm:text-sm">© 2026 Conxiea. All rights reserved.</p>
              <div className="flex justify-center gap-3 sm:gap-6 flex-wrap">
                <Link to="/privacy-policy" className="hover:text-blue-400 transition text-xs sm:text-sm">Privacy Policy</Link>
                <Link to="/terms-of-service" className="hover:text-blue-400 transition text-xs sm:text-sm">Terms of Service</Link>
                <Link to="/" className="hover:text-blue-400 transition text-xs sm:text-sm">Home</Link>
              </div>
            </div>

          </div>
        </main>
      </div>
    </>
  );
};

export default WifiOptimisation;
