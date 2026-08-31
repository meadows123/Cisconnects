import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedHeroBackground from './AnimatedHeroBackground';
import TradesBeforeAfter from './TradesBeforeAfter';
import TradesShowcase from './TradesShowcase';
import { Send, AlertCircle, ChevronLeft, ChevronRight, Check, Shield, Clock, Gift } from 'lucide-react';
import SEO from './SEO';
import emailjs from '@emailjs/browser';
import { saveLead } from '@/lib/saveLead';

// Offer deadline. Update this date to roll the promotion forward
const OFFER_DEADLINE = new Date('2026-09-30T23:59:59');
const OFFER_DEADLINE_LABEL = '30 September';

const scrollToForm = () =>
  document.getElementById('mockup-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });

const ScrollCta = ({ label = 'Get my free site mockup', sub, variant = 'solid' }) => (
  <div className="text-center my-7 sm:my-9">
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={scrollToForm}
      className={
        variant === 'outline'
          ? 'inline-block px-7 sm:px-10 py-3.5 sm:py-4 bg-transparent hover:bg-amber-400/10 text-amber-300 font-bold text-base sm:text-lg rounded-lg border-2 border-amber-400/70 min-h-[44px]'
          : 'inline-block px-7 sm:px-10 py-3.5 sm:py-4 bg-amber-400 hover:bg-amber-500 active:bg-amber-600 text-slate-900 font-bold text-base sm:text-lg rounded-lg shadow-lg border-2 border-amber-500 min-h-[44px]'
      }
    >
      {label}
    </motion.button>
    {sub && <p className="mt-2 text-xs sm:text-sm text-amber-400/90 font-semibold">{sub}</p>}
  </div>
);

const TradesWebsite = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', description: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  const daysLeft = Math.max(0, Math.ceil((OFFER_DEADLINE.getTime() - Date.now()) / 86400000));

  const testimonials = [
    { name: 'Gary T.', initials: 'GT', role: 'Electrician, Leeds', result: '8 to 10 quote requests a week, all mine', review: '"Used to live off word of mouth and Checkatrade leads I shared with five other sparkies. The site Conxiea built ranks for electrician near me round here. Now I get 8 to 10 quote requests a week and none of them are shared."' },
    { name: 'Dawn M.', initials: 'DM', role: 'Bathroom fitter, Bristol', result: 'Put prices up 25% and still booked out', review: '"The site makes us look like the outfit we actually are. People turn up to the quote already sold. I stopped apologising for my prices, put them up, and the work kept coming."' },
    { name: 'Wojciech K.', initials: 'WK', role: 'Builder, Manchester', result: 'Booked four months ahead, straight off the website', review: '"Photos of our extensions, proper reviews, and a form that lands in my email while I am on site. I have not paid a lead company a penny since it went live."' },
    { name: 'Sam R.', initials: 'SR', role: 'Plumber, Reading', result: 'Missed-call jobs stopped going to rivals', review: '"Before, if I could not answer the phone I lost the job. Now they fill in the form, I ring back that evening, and I still get it. That alone paid for the site in a fortnight."' },
    { name: 'Priya & Neil', initials: 'PN', role: 'Landscapers, Surrey', result: 'No dead patch over winter for the first time', review: '"We had a Facebook page and nothing else. First winter with the proper site we skipped the usual three weeks of silence. It just kept ticking over."' },
  ];

  const nextTestimonial = () => setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setCurrentTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.description.trim()) {
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
        message: formData.description,
        service_interest: 'Trades Website Build',
        to_name: 'Conxiea Team',
        to_email: 'admin@conxiea.com',
        reply_to: formData.email,
      });

      await saveLead({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        source: 'trades-website'
      });

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
        title="Websites for Trades That Actually Bring In Leads | Conxiea"
        description="Still paying for shared leads five other trades get too? Conxiea builds websites for trades that rank on Google and send quote requests straight to you. Free homepage mockup, no obligation."
        url="/trades-website"
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
              <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-3 xs:mb-4 sm:mb-5 leading-tight">
                Don't Pay for Another Shared Lead{' '}
                <span className="border-b-2 border-blue-500">Until You Read This.</span>
              </h1>
              <p className="text-base xs:text-lg sm:text-xl md:text-2xl font-semibold text-gray-300 mb-5 xs:mb-7 sm:mb-10 md:mb-12">
                A site that's yours, that brings the work straight to you,{' '}
                <span className="border-b-2 border-blue-500 text-white">for less than two months of lead fees.</span>
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToForm}
                className="inline-block px-7 sm:px-10 py-3.5 sm:py-4 bg-amber-400 hover:bg-amber-500 active:bg-amber-600 text-slate-900 font-bold text-base sm:text-lg rounded-lg shadow-lg border-2 border-amber-500 min-h-[44px]"
              >
                Get my free site mockup
              </motion.button>
              <div className="mt-3">
                <span className="block text-amber-400 font-semibold text-base sm:text-lg">One call. A free mockup of your new site. No obligation.</span>
              </div>
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-amber-400/10 border border-amber-400/40 rounded-full">
                <Gift className="w-4 h-4 text-amber-300 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-amber-200 font-semibold">Free mockup now. Go ahead and it's £295 to build (was £999), then £50/month, all in.</span>
              </div>
            </motion.div>

            {/* Before / after */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="mb-8 sm:mb-12"
            >
              <TradesBeforeAfter />
            </motion.div>

            {/* Form: sits directly under the picture so ready buyers can book straight away */}
            {submitStatus === 'error' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-4 p-4 sm:p-6 bg-red-500/10 border border-red-500/50 rounded-lg flex items-start gap-3 sm:gap-4">
                <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-red-400 mb-1 sm:mb-2">Submission Failed</h3>
                  <p className="text-sm sm:text-base text-red-300">An error occurred. Please try again.</p>
                </div>
              </motion.div>
            )}
            {submitStatus === 'error_validation' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-4 p-4 sm:p-6 bg-yellow-500/10 border border-yellow-500/50 rounded-lg flex items-start gap-3 sm:gap-4">
                <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-yellow-400 mb-1 sm:mb-2">Missing Information</h3>
                  <p className="text-sm sm:text-base text-yellow-300">Please fill in all fields to continue.</p>
                </div>
              </motion.div>
            )}

            <motion.form
              id="mockup-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              onSubmit={handleSubmit}
              className="bg-[#0A0A24] border border-indigo-900/60 rounded-xl p-4 sm:p-8 shadow-2xl space-y-5 sm:space-y-6 mb-8 sm:mb-12 scroll-mt-4"
            >
              <div className="text-center mb-1">
                <h2 className="text-xl sm:text-2xl font-bold text-white">See a free mockup of your new site</h2>
                <p className="text-sm text-gray-400 mt-1">Takes a minute. We come back within one working day.</p>
                <p className="text-xs text-amber-300/90 font-semibold mt-1.5">Mockup's free. If you go ahead: £295 to build (normally £999), then £50/month with everything in.</p>
              </div>
              <div>
                <label className="block text-white font-medium text-xs sm:text-sm mb-2.5">Your First Name <span className="text-red-500">*</span></label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your First Name" className="w-full px-4 py-3.5 text-base bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition touch-manipulation" required />
              </div>
              <div>
                <label className="block text-white font-medium text-xs sm:text-sm mb-2.5">Email <span className="text-red-500">*</span></label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@yourbusiness.co.uk" className="w-full px-4 py-3.5 text-base bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition touch-manipulation" required />
              </div>
              <div>
                <label className="block text-white font-medium text-xs sm:text-sm mb-2.5">Phone Number <span className="text-red-500">*</span></label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Your Phone Number" className="w-full px-4 py-3.5 text-base bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition touch-manipulation" required />
              </div>
              <div>
                <label className="block text-white font-medium text-xs sm:text-sm mb-2.5">What's your trade and where do you work? <span className="text-red-500">*</span></label>
                <textarea name="description" value={formData.description} onChange={handleChange} placeholder="e.g. kitchen fitter covering Nottingham and 20 miles around. Mostly word of mouth right now, want a steady flow of quote requests. No website, or a dead one..." rows={4} className="w-full px-4 py-3.5 text-base bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition touch-manipulation resize-none" required />
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
                  <><Send className="w-4 h-4 sm:w-5 sm:h-5" /><span>Get my free mockup</span></>
                )}
              </motion.button>
              <p className="text-center text-xs text-gray-400">Book before {OFFER_DEADLINE_LABEL} to lock in the mockup, Google Business setup and the reviews kit.</p>
            </motion.form>

            {/* Pain */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-gradient-to-r from-red-900/30 to-slate-900/30 border border-red-500/40 rounded-lg p-5 sm:p-6 mb-5 sm:mb-6"
            >
              <p className="text-sm sm:text-base text-gray-300 mb-3">Right now, be honest. Does any of this sound familiar?</p>
              <ul className="text-base sm:text-lg font-bold text-white leading-relaxed mb-3 space-y-2 list-none">
                <li>A brilliant month, then three weeks of silence. Feast or famine, every year.</li>
                <li>The work dried up the moment one big customer stopped calling.</li>
                <li>You're paying Checkatrade or MyBuilder for leads five other trades get the same second.</li>
                <li>Your "website" is a Facebook page, or something from 2015 you'd rather not send anyone.</li>
                <li>You're quoting the same price as three years ago because you look like every other white van.</li>
              </ul>
              <p className="text-sm sm:text-base text-red-400 font-semibold">Every one of those is work you could have won and didn't.</p>
            </motion.div>

            <ScrollCta label="Show me what my site could look like" sub="Free mockup. No obligation." />

            {/* Reframe */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="bg-gradient-to-r from-blue-900/30 to-slate-900/30 border border-blue-500/40 rounded-lg p-5 sm:p-6 mb-5 sm:mb-6"
            >
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-3">
                Renting leads from Checkatrade means you're one price cut from losing them, and you never own the customer. Doing nothing means another year of feast and famine.
              </p>
              <p className="text-white font-semibold">
                The third option is a website that's yours, that does the finding for you, and pays for itself inside a couple of jobs.
              </p>
            </motion.div>

            {/* How it works */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.18 }}
              className="grid sm:grid-cols-3 gap-3 mb-5 sm:mb-6"
            >
              {[
                { step: '01', title: 'Mockup', body: 'We build a free homepage mockup for your trade and your town. You see it before you decide anything.' },
                { step: '02', title: 'Build', body: 'Sign off and the full site is built in about a week. Your photos, your reviews, your service area.' },
                { step: '03', title: 'Get found', body: 'We set up Google so you show up when someone local searches your trade, and reviews start landing.' },
              ].map((p, i) => (
                <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                  <p className="text-xs font-mono text-blue-400 mb-1">{p.step}</p>
                  <p className="text-base font-bold text-white mb-1.5">{p.title}</p>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">{p.body}</p>
                </div>
              ))}
            </motion.div>

            {/* Outcome */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="mb-5 sm:mb-6"
            >
              <p className="text-base sm:text-lg font-bold text-white leading-relaxed mb-4">
                A website built to do one job: turn people searching for your trade into quote requests in your inbox.
              </p>
              <p className="text-sm sm:text-base text-gray-300 mb-4">
                What you end up with:
              </p>
              <div className="flex flex-col gap-3">
                {[
                  'You show up on Google when someone local searches for your trade, not buried on page 3',
                  'A site that looks sharper than your competition, so your quotes stop getting haggled down',
                  'Real photos of your work and real reviews doing the selling before anyone picks up the phone',
                  'A quote form that lands in your inbox and phone while you\'re on the tools, every enquiry logged',
                  'Click-to-call and fast loading, because people are finding you on a phone, on site',
                  'Google reviews set up to keep coming in, so you climb the local rankings over time',
                  'It\'s your website and your customer list. No lead company in the middle, no per-job fee',
                ].map((item, i) => (
                  <div key={i} className="border-l-4 border-blue-500 pl-4 sm:pl-5 py-2">
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm sm:text-base text-white font-semibold">{item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <ScrollCta label="Get my free site mockup" />

            {/* Recent builds */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="mb-8 sm:mb-12"
            >
              <TradesShowcase />
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
                  { number: '7 days', label: 'Live from sign-off' },
                  { number: '24/7', label: 'Quote form working' },
                  { number: '£0', label: 'Per-lead fees, ever' },
                  { number: '100%', label: 'Owned by you' },
                ].map((stat, i) => (
                  <div key={i} className="bg-slate-800/60 border border-slate-700/80 rounded-lg p-3 sm:p-4 text-center">
                    <p className="text-xl sm:text-2xl font-bold text-white">{stat.number}</p>
                    <p className="text-xs sm:text-sm text-gray-300 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center gap-3 mb-5 sm:mb-7">
                <div className="h-px flex-1 bg-slate-700" />
                <h2 className="text-center text-lg sm:text-xl font-bold text-white whitespace-nowrap">Trades who've been here</h2>
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

            <ScrollCta variant="outline" label="Start with a free mockup" />

            {/* The Offer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.45 }}
              className="bg-gradient-to-br from-amber-500/10 to-slate-900/40 border-2 border-amber-500/50 rounded-xl p-5 sm:p-7 mb-8 sm:mb-12"
            >
              <div className="text-center mb-5">
                <span className="inline-block px-3 py-1 bg-amber-400 text-slate-900 text-xs font-bold rounded-full uppercase tracking-wide">Winter deal</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white mt-3">Book before {OFFER_DEADLINE_LABEL} and lock in the winter price</h2>
              </div>

              {/* Price */}
              <div className="text-center border-2 border-amber-400/60 bg-amber-400/10 rounded-lg p-4 sm:p-5 mb-5">
                <p className="text-sm text-gray-300">Your website, built</p>
                <p className="text-3xl sm:text-4xl font-bold text-white mt-0.5">
                  <span className="text-gray-400 line-through text-xl sm:text-2xl mr-2">£999</span>£295
                </p>
                <p className="text-sm sm:text-base text-amber-300 font-semibold mt-1">then £50/month, everything loaded in</p>
                <p className="text-xs sm:text-sm text-gray-300 mt-2">Hosting, domain, edits, updates and support. No deposit, no obligation. If it's not for you, no hard feelings.</p>
              </div>

              <p className="text-sm text-gray-300 mb-3">Go ahead before {OFFER_DEADLINE_LABEL} and this is bundled in at no extra cost:</p>
              <div className="flex flex-col gap-2.5 mb-5">
                {[
                  { item: 'Your Google Business Profile set up and optimised so you show on the local map', value: '£400' },
                  { item: 'A "more reviews" kit: a printed QR card and a text message that actually gets replies', value: '£250' },
                  { item: 'A second page built around your highest-margin job, ready to point Google Ads at', value: '£700' },
                ].map((row, i) => (
                  <div key={i} className="flex items-start justify-between gap-3 bg-slate-900/40 border border-slate-700/60 rounded-lg px-3.5 py-3">
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-amber-300 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-white font-semibold">{row.item}</p>
                    </div>
                    <span className="text-xs text-gray-400 line-through flex-shrink-0 mt-0.5">{row.value}</span>
                  </div>
                ))}
              </div>
              <p className="text-center text-sm text-amber-300 font-semibold border-t border-amber-500/30 pt-4 mb-5">
                That's <span className="line-through text-gray-400">£1,350</span> of extras, in for nothing.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-amber-300 text-sm font-semibold">
                <span className="inline-flex items-center gap-1.5"><Clock className="w-4 h-4" /> {daysLeft} {daysLeft === 1 ? 'day' : 'days'} left</span>
                <span className="text-amber-500/50">·</span>
                <span>We take on 4 new build slots a month</span>
              </div>
            </motion.div>

            {/* Guarantee */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="mb-10 sm:mb-14"
            >
              <div className="bg-gradient-to-r from-green-900/40 to-emerald-900/40 border-2 border-green-500/60 rounded-xl p-5 sm:p-7 text-center">
                <div className="flex justify-center mb-3">
                  <div className="w-14 h-14 rounded-full bg-green-500/20 border-2 border-green-500/50 flex items-center justify-center">
                    <Shield className="w-7 h-7 text-green-400" />
                  </div>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">30-Day Money-Back Guarantee</h2>
                <p className="text-base sm:text-lg text-green-300 font-semibold">"If you're not happy with your new site, tell us within 30 days of it going live and we'll refund the build fee in full. No quibbles."</p>
              </div>
            </motion.div>

            {/* Closing CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.55 }}
              className="text-center mb-4"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Get Your Free Homepage Mockup</h2>
              <p className="text-sm sm:text-base text-gray-300 mb-6">One call. We build a mockup of your new site for your trade and your town, plus the extras above if you book before {OFFER_DEADLINE_LABEL}. No obligation to go ahead.</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToForm}
                className="inline-block px-7 sm:px-10 py-3.5 sm:py-4 bg-amber-400 hover:bg-amber-500 active:bg-amber-600 text-slate-900 font-bold text-base sm:text-lg rounded-lg shadow-lg border-2 border-amber-500 min-h-[44px]"
              >
                Get my free mockup
              </motion.button>
              <p className="mt-3 text-xs sm:text-sm text-amber-400/90 font-semibold">Book before {OFFER_DEADLINE_LABEL}. Only {daysLeft} {daysLeft === 1 ? 'day' : 'days'} left.</p>
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

export default TradesWebsite;
