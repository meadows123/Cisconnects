import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedHeroBackground from './AnimatedHeroBackground';
import FounderNightScene from './FounderNightScene';
import { Send, AlertCircle, ChevronLeft, ChevronRight, Check, Shield, Clock, Gift } from 'lucide-react';
import SEO from './SEO';
import emailjs from '@emailjs/browser';
import { saveLead } from '@/lib/saveLead';

// Offer deadline. Update this date to roll the promotion forward
const OFFER_DEADLINE = new Date('2026-09-30T23:59:59');
const OFFER_DEADLINE_LABEL = '30 September';

const scrollToForm = () =>
  document.getElementById('assessment-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });

const ScrollCta = ({ label = 'Get my free IT assessment', sub, variant = 'solid' }) => (
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

const FreeITAssessment = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', description: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  const daysLeft = Math.max(0, Math.ceil((OFFER_DEADLINE.getTime() - Date.now()) / 86400000));

  const testimonials = [
    { name: 'Priya N.', initials: 'PN', role: 'COO, fintech (grew 14 to 65 staff)', result: 'Rebuilt our entire IT in a quarter. Identity, devices, access, the lot', review: '"We grew faster than anyone planned for. Nobody owned IT. It was just me, badly, between everything else. Conxiea rebuilt the whole thing from the ground up and now runs it. I stopped thinking about it."' },
    { name: 'Daniel K.', initials: 'DK', role: 'Founder, B2B SaaS', result: 'Passed the security review that was blocking a £400k contract', review: '"A customer sent us a 90-question security questionnaire and we froze. Conxiea had the foundations in place in three weeks. SSO, MFA, device policy, tested backups. We won the deal and the next two."' },
    { name: 'Hannah B.', initials: 'HB', role: 'Head of Ops, agency', result: 'Went from no device records to a fully managed fleet', review: '"We had no idea how many laptops were out there or who had them. Now it is one managed fleet, all encrypted, patched, wipeable. A lost laptop is an annoyance instead of a disclosure."' },
    { name: 'Marcus L.', initials: 'ML', role: 'CTO, marketplace startup', result: 'Got my engineers out of the accidental IT business for good', review: '"My senior devs were spending half a day a week fixing other people\'s accounts and Wi-Fi. Conxiea took the whole domain off us properly, not just triage. Straight back to shipping."' },
    { name: 'Sofia R.', initials: 'SR', role: 'Founder, health tech', result: 'Investor due diligence took an afternoon, not a fortnight', review: '"When we raised, the DD list had a whole IT and infosec section. Because the rebuild was already done, we handed over the evidence and moved on. No scramble."' },
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
        service_interest: 'Free IT Assessment (Scaling Startups)',
        to_name: 'Conxiea Team',
        to_email: 'admin@conxiea.com',
        reply_to: formData.email,
      });

      await saveLead({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        source: 'free-it-assessment'
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
        title="Free IT Assessment for Fast-Growing Startups | Conxiea"
        description="Scaled from a handful of people to a full team and nobody owns IT? Book a free IT assessment: a written roadmap, your 5 biggest risks fixed for you, and a customer-ready security summary. Limited slots."
        url="/free-it-assessment"
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
                You Scaled Fast.{' '}
                <span className="border-b-2 border-blue-500">Your IT Didn't.</span>
              </h1>
              <p className="text-base xs:text-lg sm:text-xl md:text-2xl font-semibold text-gray-300 mb-5 xs:mb-7 sm:mb-10 md:mb-12">
                A whole team now runs on infrastructure that was never designed, just assembled one workaround at a time.{' '}
                <span className="border-b-2 border-blue-500 text-white">Book a free assessment and see exactly where it's exposed.</span>
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToForm}
                className="inline-block px-7 sm:px-10 py-3.5 sm:py-4 bg-amber-400 hover:bg-amber-500 active:bg-amber-600 text-slate-900 font-bold text-base sm:text-lg rounded-lg shadow-lg border-2 border-amber-500 min-h-[44px]"
              >
                Get my free IT assessment
              </motion.button>
              <div className="mt-3">
                <span className="block text-amber-400 font-semibold text-base sm:text-lg">One call. You leave with a current-state map and a plan. No pitch.</span>
              </div>
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-amber-400/10 border border-amber-400/40 rounded-full">
                <Gift className="w-4 h-4 text-amber-300 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-amber-200 font-semibold">Book before {OFFER_DEADLINE_LABEL}: roadmap + your 5 biggest risks fixed, on us</span>
              </div>
            </motion.div>

            {/* Night scene */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="mb-8 sm:mb-12"
            >
              <FounderNightScene />
              <p className="mt-2.5 text-center text-xs sm:text-sm text-gray-500">
                11:47pm. Everyone's gone home. The only person who knows how any of this fits together is you.
              </p>
            </motion.div>

            {/* Form — sits directly under the picture so hot traffic can book straight away */}
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
              id="assessment-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              onSubmit={handleSubmit}
              className="bg-[#0A0A24] border border-indigo-900/60 rounded-xl p-4 sm:p-8 shadow-2xl space-y-5 sm:space-y-6 mb-8 sm:mb-12 scroll-mt-4"
            >
              <div className="text-center mb-1">
                <h2 className="text-xl sm:text-2xl font-bold text-white">Book your free IT assessment</h2>
                <p className="text-sm text-gray-400 mt-1">Takes a minute. We come back within one business day.</p>
              </div>
              <div>
                <label className="block text-white font-medium text-xs sm:text-sm mb-2.5">Your First Name <span className="text-red-500">*</span></label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your First Name" className="w-full px-4 py-3.5 text-base bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition touch-manipulation" required />
              </div>
              <div>
                <label className="block text-white font-medium text-xs sm:text-sm mb-2.5">Work Email <span className="text-red-500">*</span></label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@yourcompany.com" className="w-full px-4 py-3.5 text-base bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition touch-manipulation" required />
              </div>
              <div>
                <label className="block text-white font-medium text-xs sm:text-sm mb-2.5">Phone Number <span className="text-red-500">*</span></label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Your Phone Number" className="w-full px-4 py-3.5 text-base bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition touch-manipulation" required />
              </div>
              <div>
                <label className="block text-white font-medium text-xs sm:text-sm mb-2.5">Where does it hurt most right now? <span className="text-red-500">*</span></label>
                <textarea name="description" value={formData.description} onChange={handleChange} placeholder="e.g. no one owns IT, chaotic onboarding/offboarding, no idea where our devices or data are, a security review is blocking a deal, engineers stuck being the accidental IT team, headcount about to double..." rows={4} className="w-full px-4 py-3.5 text-base bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition touch-manipulation resize-none" required />
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
                  <><Send className="w-4 h-4 sm:w-5 sm:h-5" /><span>Get my free assessment</span></>
                )}
              </motion.button>
              <p className="text-center text-xs text-gray-400">Book before {OFFER_DEADLINE_LABEL} to lock in the roadmap, the 5 fixes and the security summary.</p>
            </motion.form>

            {/* Pain */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-gradient-to-r from-red-900/30 to-slate-900/30 border border-red-500/40 rounded-lg p-5 sm:p-6 mb-5 sm:mb-6"
            >
              <p className="text-sm sm:text-base text-gray-300 mb-3">Right now, be honest. Can you answer these?</p>
              <ul className="text-base sm:text-lg font-bold text-white leading-relaxed mb-3 space-y-2 list-none">
                <li>Who has admin on your Google Workspace or Microsoft 365? Everyone? No one?</li>
                <li>The contractor who left months ago. Is their access actually revoked, everywhere?</li>
                <li>When did anyone last test that your backups restore? Not run. Restore.</li>
                <li>How many laptops are out there, who has them, and how many are encrypted?</li>
                <li>The security questionnaire from your biggest prospect. Who's filling it in?</li>
              </ul>
              <p className="text-sm sm:text-base text-red-400 font-semibold">Each unanswered question is a lost deal, a breach, or a very bad Monday waiting to happen.</p>
            </motion.div>

            <ScrollCta label="Find out where you stand" sub="Free. One call. No pitch." />

            {/* Shift */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.125 }}
              className="bg-gradient-to-r from-orange-900/30 to-slate-900/30 border border-orange-500/40 rounded-lg p-5 sm:p-6 mb-5 sm:mb-6"
            >
              <p className="text-base sm:text-lg font-bold text-white leading-relaxed mb-3">
                This isn't a mistake you made. It's what growth does to IT.
              </p>
              <p className="text-sm sm:text-base text-orange-300">
                Nobody sat down and decided to run the company on a shared password vault and whoever's free. It accreted while you were hitting targets. Patching it further won't help. The foundation needs rebuilding, deliberately, by people who've done it before.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="bg-gradient-to-r from-blue-900/30 to-slate-900/30 border border-blue-500/40 rounded-lg p-5 sm:p-6 mb-5 sm:mb-6"
            >
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-3">
                Two options most companies reach for don't work here. Hiring an internal IT team this early is slow and expensive. Leaving it as-is is a liability your customers and investors will keep asking about.
              </p>
              <p className="text-white font-semibold">
                The third option: a rebuild that turns your IT into real infrastructure, then keeps it that way, for less than the cost of one hire.
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
                { step: '01', title: 'Assess', body: 'Two weeks to a full picture. Every account, device, app, gap and risk, written down.' },
                { step: '02', title: 'Rebuild', body: 'A sequenced programme: identity, devices, access, backups and security, done in the right order.' },
                { step: '03', title: 'Operate', body: 'We run the platform we built and evolve it as you grow. No ticket queue, no drift.' },
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
                We don't patch what you have. We rebuild it into something deliberate, then keep it there.
              </p>
              <p className="text-sm sm:text-base text-gray-300 mb-4">
                What you end up with:
              </p>
              <div className="flex flex-col gap-3">
                {[
                  'Every account, device and app inventoried, so you finally know what you own and who can touch it',
                  'New hires fully set up on day one; leavers cut off within the hour, with a log to prove it',
                  'Laptops encrypted, patched and remotely wipeable, so a lost device is an inconvenience, not an incident',
                  'Backups tested on a schedule, with a restore you have actually watched work',
                  'SSO and MFA across your core stack, so security questionnaires become a form you fill in, not a project',
                  'A single front door for anything IT, so it stops landing in your engineers\' DMs',
                  'A clear path to SOC 2 / ISO 27001 readiness, in place before it blocks the next big contract',
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

            <ScrollCta variant="outline" label="I want this for my company" />

            {/* Reality Line */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.22 }}
              className="border border-slate-600 rounded-lg p-4 sm:p-5 mb-5 sm:mb-6 text-center"
            >
              <p className="text-base sm:text-lg font-bold text-white">Fast-growing companies rarely get breached because they're targeted. They get breached because nobody was watching the joins.</p>
            </motion.div>

            {/* Scenario */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.26 }}
              className="bg-gradient-to-r from-green-900/30 to-slate-900/30 border border-green-500/40 rounded-lg p-5 sm:p-6 mb-8 sm:mb-12"
            >
              <p className="text-base sm:text-lg font-bold text-white leading-relaxed mb-3">
                The day it actually matters. A laptop left in a taxi, a customer demanding proof of your controls, a key hire leaving on bad terms:<br />
                <span className="text-red-400">on today's setup, that's a week, a lawyer, and an awkward all-hands.</span>
              </p>
              <p className="text-sm sm:text-base text-green-400 font-semibold">Once the rebuild's done, each one is a 20-minute task.</p>
            </motion.div>

            <ScrollCta label="Book my free IT assessment" />

            {/* Testimonials */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-8 sm:mb-12"
            >
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { number: 'Day 1', label: 'New hires productive' },
                  { number: '< 1 hr', label: 'To fully offboard a leaver' },
                  { number: '2 wks', label: 'To a full current-state map' },
                  { number: '0', label: 'Full-time IT hires needed' },
                ].map((stat, i) => (
                  <div key={i} className="bg-slate-800/60 border border-slate-700/80 rounded-lg p-3 sm:p-4 text-center">
                    <p className="text-xl sm:text-2xl font-bold text-white">{stat.number}</p>
                    <p className="text-xs sm:text-sm text-gray-300 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center gap-3 mb-5 sm:mb-7">
                <div className="h-px flex-1 bg-slate-700" />
                <h2 className="text-center text-lg sm:text-xl font-bold text-white whitespace-nowrap">Founders who've been here</h2>
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

            <ScrollCta variant="outline" label="Start with a free assessment" />

            {/* The Offer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.45 }}
              className="bg-gradient-to-br from-amber-500/10 to-slate-900/40 border-2 border-amber-500/50 rounded-xl p-5 sm:p-7 mb-8 sm:mb-12"
            >
              <div className="text-center mb-5">
                <span className="inline-block px-3 py-1 bg-amber-400 text-slate-900 text-xs font-bold rounded-full uppercase tracking-wide">Limited offer</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white mt-3">Book your assessment before {OFFER_DEADLINE_LABEL} and this comes with it, free</h2>
              </div>
              <div className="flex flex-col gap-2.5 mb-5">
                {[
                  { item: 'A written IT & security roadmap covering current state, target state and prioritised fixes', value: '£1,500' },
                  { item: 'Your 5 highest-risk issues fixed for you, before you pay us anything', value: '£2,000' },
                  { item: 'A customer-ready security summary you can send to any prospect asking about your controls', value: '£750' },
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
              <div className="flex items-center justify-between gap-3 border-t border-amber-500/30 pt-4 mb-5">
                <div>
                  <p className="text-xs text-gray-400">Total value <span className="line-through">£4,250</span></p>
                  <p className="text-2xl font-bold text-amber-400">Your price: £0</p>
                </div>
                <p className="text-xs text-gray-300 text-right max-w-[45%]">No card, no lock-in. The assessment stands on its own.</p>
              </div>
              <div className="bg-slate-900/50 border border-blue-500/30 rounded-lg p-4 mb-4">
                <p className="text-sm text-blue-300 font-semibold mb-1">Then, if you start a full rebuild within 30 days:</p>
                <p className="text-sm text-white">We design and build your new marketing website, normally <span className="line-through text-gray-400">£4,000</span>, included at no extra cost.</p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-amber-300 text-sm font-semibold">
                <span className="inline-flex items-center gap-1.5"><Clock className="w-4 h-4" /> {daysLeft} {daysLeft === 1 ? 'day' : 'days'} left</span>
                <span className="text-amber-500/50">·</span>
                <span>Only 3 onboarding slots this quarter</span>
              </div>
            </motion.div>

            {/* Pre-form CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="text-center mb-6 sm:mb-8"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Claim Your Free IT Assessment</h2>
              <p className="text-sm sm:text-base text-gray-300 mb-6">One call. We map your current setup, show you the target state, and hand you the roadmap, plus the three bonuses above if you book before {OFFER_DEADLINE_LABEL}.</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToForm}
                className="inline-block px-7 sm:px-10 py-3.5 sm:py-4 bg-amber-400 hover:bg-amber-500 active:bg-amber-600 text-slate-900 font-bold text-base sm:text-lg rounded-lg shadow-lg border-2 border-amber-500 min-h-[44px]"
              >
                Claim my assessment + bonuses
              </motion.button>
            </motion.div>

            {/* Guarantee */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.55 }}
              className="mb-8 sm:mb-12"
            >
              <div className="bg-gradient-to-r from-green-900/40 to-emerald-900/40 border-2 border-green-500/60 rounded-xl p-5 sm:p-7 mb-6 text-center">
                <div className="flex justify-center mb-3">
                  <div className="w-14 h-14 rounded-full bg-green-500/20 border-2 border-green-500/50 flex items-center justify-center">
                    <Shield className="w-7 h-7 text-green-400" />
                  </div>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Our Guarantee</h2>
                <p className="text-base sm:text-lg text-green-300 font-semibold">"If the assessment doesn't hand you a roadmap with at least five changes that measurably reduce risk or unblock growth, we'll fix the five ourselves anyway. You lose nothing by looking."</p>
              </div>
            </motion.div>

            {/* Final CTA */}
            <ScrollCta
              label="Get my free IT assessment"
              sub={`Book before ${OFFER_DEADLINE_LABEL}. Only ${daysLeft} ${daysLeft === 1 ? 'day' : 'days'} left.`}
            />

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

export default FreeITAssessment;
