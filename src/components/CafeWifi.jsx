import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedHeroBackground from './AnimatedHeroBackground';
import { Send, CheckCircle, AlertCircle, ChevronLeft, ChevronRight, Check, Shield } from 'lucide-react';
import SEO from './SEO';
import emailjs from '@emailjs/browser';

const CafeWifi = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  const testimonials = [
    { name: 'Sarah T.', initials: 'ST', role: 'Café Owner', result: 'Zero card machine failures since install', review: '"Our card machines used to drop at least once a day. Since Conxiea sorted our network we haven\'t had a single issue. Absolute lifesavers."' },
    { name: 'Mark B.', initials: 'MB', role: 'Coffee Shop Owner', result: 'POS rock solid, dead zones gone — one visit', review: '"Fast, professional, and they actually knew what they were doing. Dead zones gone, POS rock solid. Couldn\'t recommend them more."' },
    { name: 'Priya K.', initials: 'PK', role: 'Café Manager', result: 'Staff and guests noticed the improvement same day', review: '"They came in, assessed the whole café, and had everything fixed the same day. Staff and customers noticed the difference immediately."' },
    { name: 'James R.', initials: 'JR', role: 'Bistro Owner', result: 'WiFi ready for opening day — completely stress-free', review: '"We opened a new café and the WiFi on opening day was a disaster. Conxiea came the next day and transformed the whole setup. Absolute lifesavers."' },
    { name: 'Priya S.', initials: 'PS', role: 'Food & Drink Owner', result: 'EPOS, card readers, and guest WiFi all connected reliably', review: '"I didn\'t realise how much bad WiFi was costing me in lost customers until it was fixed. They set up separate networks for staff and guests too. Perfect."' },
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
      const serviceId = 'service_gdbt262';
      const publicKey = 'SMrLGbwIaaYgnRi2o';
      const templateId = 'template_q298neg';
      emailjs.init(publicKey);
      await emailjs.send(serviceId, templateId, {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        message: 'New hospitality WiFi installation enquiry',
        service_interest: 'Hospitality WiFi Installation',
        to_name: 'Conxiea Team',
        reply_to: formData.email,
      });

      // Save lead to server (non-blocking on failure)
      fetch('/api/calls', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          source: 'hospitality-wifi-installation',
        }),
      }).catch(err => console.error('Lead save error:', err));

      navigate('/thank-you');
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
        title="Reliable Café Connectivity | Conxiea"
        description="Nothing breaks a busy café faster than bad internet. We install reliable café connectivity so payments go through, POS stays online, and everything works when it matters most."
        url="/hospitality-wifi-installation"
      />
      <div className="min-h-screen bg-[#0f0f3d] flex flex-col relative">
        <AnimatedHeroBackground />
        <main className="flex-1 flex items-center justify-center px-3 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="w-full max-w-2xl">

            {/* Header */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-center mb-8 sm:mb-12"
            >
              <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-3 xs:mb-4 sm:mb-5 leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)]">
                Most Venues Don't Realise Their{' '}
                <span className="border-b-2 border-blue-500 text-white">WiFi Is Costing Them Customers</span>
              </h1>
              <p className="text-base xs:text-lg sm:text-xl md:text-2xl font-semibold text-gray-300 mb-5 xs:mb-7 sm:mb-10 md:mb-12">
                Slow, unreliable connections affect how long customers stay,{' '}
                <span className="border-b-2 border-blue-500 text-white">how much they spend, and whether they come back.</span>
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('cafe-form').scrollIntoView({ behavior: 'smooth' })}
                className="inline-block px-7 sm:px-10 py-3.5 sm:py-4 bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 text-slate-900 font-bold text-base sm:text-lg rounded-lg shadow-lg border-2 border-yellow-500 min-h-[44px]"
              >
                Find Out More
              </motion.button>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="mt-4 -mx-3 sm:mx-0"
              >
                <img
                  src="/Wifi-Install-Pic.png"
                  alt="WiFi installation service"
                  className="w-full h-auto sm:rounded-xl"
                />
              </motion.div>
            </motion.div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex flex-col gap-4 sm:gap-5 mb-8 sm:mb-12"
            >
              {[
                'WiFi Designed To Handle A Full House',
                'POS That Never Drops Mid-Order',
                'No More Bad Reviews Over Poor WiFi',
                'Guest WiFi That Keeps Customers Spending',
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
              transition={{ duration: 0.4, delay: 0.15 }}
              className="mb-4 sm:mb-5 text-center"
            >
              <p className="text-sm sm:text-base text-gray-300 font-semibold">Slow, unreliable connections affect how long customers stay, how much they spend, and whether they come back.</p>
            </motion.div>

            {/* Feature Boxes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="space-y-4 sm:space-y-5 mb-12 sm:mb-16"
            >
              <div className="bg-gradient-to-r from-blue-900/30 to-slate-900/30 border border-blue-500/40 rounded-lg p-5 sm:p-6">
                <p className="text-sm sm:text-base text-red-400 mb-3">"I'll just plug in a router from Currys — how hard can it be?"</p>
                <p className="text-sm sm:text-base text-white font-semibold mb-3">Most business owners try plug-and-play kit first. It works at home, so it should work here. Then the dropouts start, the dead zones appear, and the card machine goes offline at the worst possible moment.</p>
                <p className="text-xs sm:text-sm text-gray-300 mb-4">Consumer routers aren't built for 30+ devices, thick walls, busy kitchens, or the demands of a working venue. A professional setup isn't more complicated — it just actually works.</p>
                <div className="flex justify-center">
                  <button onClick={() => document.getElementById('cafe-form').scrollIntoView({ behavior: 'smooth' })} className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold px-6 sm:px-8 py-3 rounded transition cursor-pointer min-h-[44px]">Get It Done Right</button>
                </div>
              </div>
              <div className="bg-gradient-to-r from-blue-900/30 to-slate-900/30 border border-blue-500/40 rounded-lg p-5 sm:p-6">
                <p className="text-sm sm:text-base text-red-400 mb-3">When your POS disconnects mid-order, staff can't take payments, orders get lost, and the whole service grinds to a halt.</p>
                <p className="text-sm sm:text-base text-white font-semibold mb-3">We design the network around how your café actually operates — separating critical systems so a busy guest network never impacts your POS.</p>
                <p className="text-xs sm:text-sm text-gray-300 mb-4">Scenario: Your POS works fine in the morning but slows down when customers connect to guest WiFi. We fix the network architecture so they never compete.</p>
                <div className="flex justify-center">
                  <button onClick={() => document.getElementById('cafe-form').scrollIntoView({ behavior: 'smooth' })} className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold px-6 sm:px-8 py-3 rounded transition cursor-pointer min-h-[44px]">Keep My POS Rock Solid</button>
                </div>
              </div>
              <div className="bg-gradient-to-r from-blue-900/30 to-slate-900/30 border border-blue-500/40 rounded-lg p-5 sm:p-6">
                <p className="text-sm sm:text-base text-red-400 mb-3">"WiFi kept dropping." — Every bad review like this is a customer choosing somewhere else next time.</p>
                <p className="text-sm sm:text-base text-white font-semibold mb-3">One bad experience gets shared. A Google review mentioning poor WiFi puts off dozens of potential customers before they've even walked through the door.</p>
                <p className="text-xs sm:text-sm text-gray-300 mb-4">You can't afford bad reviews over something fixable. A properly installed network costs far less than the customers you're quietly losing to it.</p>
                <div className="flex justify-center">
                  <button onClick={() => document.getElementById('cafe-form').scrollIntoView({ behavior: 'smooth' })} className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold px-6 sm:px-8 py-3 rounded transition cursor-pointer min-h-[44px]">Stop Losing Customers</button>
                </div>
              </div>
              <div className="bg-gradient-to-r from-blue-900/30 to-slate-900/30 border border-blue-500/40 rounded-lg p-5 sm:p-6">
                <p className="text-sm sm:text-base text-red-400 mb-3">A customer who can't connect to your WiFi leaves sooner, spends less, and doesn't come back.</p>
                <p className="text-sm sm:text-base text-white font-semibold mb-3">Guest WiFi isn't a nice-to-have — it directly affects how long people stay and how much they spend. Longer dwell time means more orders, more return visits, more revenue.</p>
                <p className="text-xs sm:text-sm text-gray-300 mb-4">Cafés with fast, reliable guest WiFi see customers stay longer and order more. If yours is slow, broken, or non-existent, that money is walking out the door to somewhere that has it.</p>
                <div className="flex justify-center">
                  <button onClick={() => document.getElementById('cafe-form').scrollIntoView({ behavior: 'smooth' })} className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold px-6 sm:px-8 py-3 rounded transition cursor-pointer min-h-[44px]">Stop Losing Revenue</button>
                </div>
              </div>
            </motion.div>

            {/* Chat Reviews */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="mb-8 sm:mb-12"
            >
              <div className="flex flex-col sm:flex-row items-start gap-3">
                <img src="/RoshanReview.png" alt="Customer review" className="w-full sm:w-1/2 rounded-xl border border-slate-700" />
                <img src="/2.png" alt="Customer review" className="w-full sm:w-1/2 rounded-xl border border-slate-700" />
              </div>
            </motion.div>

            {/* Status Messages */}
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
              id="cafe-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit}
              className="bg-[#0A0A24] border border-indigo-900/60 rounded-xl p-4 sm:p-8 shadow-2xl space-y-5 sm:space-y-6 mb-8 sm:mb-12"
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
                className="w-full px-4 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 disabled:opacity-50 text-slate-900 font-bold text-sm sm:text-base rounded-lg flex items-center justify-center gap-2 transition shadow-lg min-h-12 sm:min-h-14"
              >
                {isSubmitting ? (
                  <><div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" /><span>Processing...</span></>
                ) : (
                  <><Send className="w-4 h-4 sm:w-5 sm:h-5" /><span>Get Your Free Survey</span></>
                )}
              </motion.button>
            </motion.form>
            <p className="text-center text-sm text-gray-400 mt-3 mb-6">No obligation — it's just a quick call to assess the issues you're having.</p>

            {/* Guarantee */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mb-8 sm:mb-12"
            >
              <div className="bg-gradient-to-r from-green-900/40 to-emerald-900/40 border-2 border-green-500/60 rounded-xl p-5 sm:p-7 text-center">
                <div className="flex justify-center mb-3">
                  <div className="w-14 h-14 rounded-full bg-green-500/20 border-2 border-green-500/50 flex items-center justify-center">
                    <Shield className="w-7 h-7 text-green-400" />
                  </div>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Our Guarantee</h2>
                <p className="text-base sm:text-lg text-green-300 font-semibold mb-3">"If your connectivity isn't noticeably better after we leave, you don't pay."</p>
                <p className="text-sm text-gray-400">We only take on jobs we're confident we can solve. No improvement means no charge — simple as that.</p>
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
                  { number: '100+', label: 'Hospitality Businesses Helped' },
                  { number: '4.9★', label: 'Google Rating' },
                  { number: '0', label: 'Payment Failures After Fix' },
                  { number: '100%', label: 'Fixed Price Guarantee' },
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

            {/* Pricing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 border border-purple-500/50 rounded-lg p-5 sm:p-7 mt-8 sm:mt-12"
            >
              <p className="text-xs sm:text-sm font-semibold text-yellow-300 mb-3">📢 WHAT'S INCLUDED</p>
              <p className="text-sm sm:text-base text-white mb-3"><span className="font-bold">Site Assessment &amp; Survey:</span> <span className="text-green-400 font-bold">Included</span></p>
              <p className="text-sm sm:text-base text-white mb-3"><span className="font-bold">Business-Grade Equipment Installation:</span> <span className="text-green-400 font-bold">Included</span></p>
              <p className="text-xs sm:text-sm text-gray-300 mt-3">✨ Covers payment systems, staff WiFi &amp; guest network setup</p>
              <p className="text-xs sm:text-sm text-yellow-300 mt-2">📢 Get in touch for a fixed-price quote tailored to your café</p>
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

export default CafeWifi;
