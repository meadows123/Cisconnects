import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedHeroBackground from './AnimatedHeroBackground';
import {
  CheckCircle,
  ArrowRight,
  Calendar,
  Clock,
  Award,
  Star,
  Crown,
  AlertCircle,
  Shield
} from 'lucide-react';
import Navigation from './Navigation';
import Footer from './Footer';
import SEO from './SEO';
import emailjs from '@emailjs/browser';
import CalendarPicker from './CalendarPicker';

const scrollToPricing = () =>
  document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth', block: 'start' });



const plans = [
  {
    tier: 'Starter',
    oneOff: 599,
    monthly: 10,
    description: "For small businesses and sole traders getting online for the first time.",
    icon: Award,
    gradient: 'from-amber-500 to-orange-600',
    features: [
      'Up to 5 pages: Home, About, Services, Gallery, Contact',
      'Mobile-first, fast-loading design',
      'Click-to-call and a quote request form',
      'Your Google Business Profile set up for you',
      'Basic local SEO so you show up for your business and area',
      'Hosting, domain support, SSL and security included',
      'Live within 2 weeks',
    ],
    popular: false,
  },
  {
    tier: 'Professional',
    oneOff: 1150,
    monthly: 15,
    description: 'For growing businesses ready to look the part and win more enquiries.',
    icon: Star,
    gradient: 'from-blue-500 to-purple-600',
    features: [
      'Everything in Starter, plus:',
      'Up to 10 pages',
      'Full project gallery with before-and-after photos',
      'Google reviews displayed automatically',
      'Smarter quote form: job type, photos, urgency',
      'Enhanced local SEO across every area you cover',
      'A blog or news section so you get found for more searches',
      'Monthly uptime and security monitoring',
      'Priority support, same working day',
    ],
    popular: true,
  },
  {
    tier: 'Enterprise',
    oneOff: 2500,
    monthly: 25,
    description: 'For established businesses with multiple services or locations.',
    icon: Crown,
    gradient: 'from-yellow-400 to-amber-500',
    features: [
      'Everything in Professional, plus:',
      'Unlimited pages',
      'Multiple service areas or locations built in',
      'Online booking or job scheduling integration',
      'A custom quote calculator for your services',
      'Call tracking and advanced analytics',
      'A dedicated account manager',
      'Quarterly strategy review',
    ],
    popular: false,
  },
];

const faqs = [
  { q: 'Why pay once instead of a monthly subscription?', a: "Most website \"subscriptions\" are a rental. Stop paying and your site disappears, even though you paid for it for years. With us, you own the website outright after the one-off fee. The small monthly amount covers hosting, domain support, SSL and security, the actual running costs, not a licence fee to keep what's already yours." },
  { q: 'What does the monthly fee actually cover?', a: 'Hosting, domain support, SSL certificate renewal, security updates, and keeping the site online and fast. On Professional and Enterprise it also covers uptime monitoring and ongoing support.' },
  { q: 'How long does it take to build?', a: 'Starter sites are typically live within 2 weeks. Professional and Enterprise builds usually take 3 to 4 weeks depending on how much content and how many pages are involved.' },
  { q: 'Can I upgrade later?', a: "Yes. Plenty of businesses start on Starter and move up to Professional once the work starts coming in. You only pay the difference, we don't charge you to rebuild what's already there." },
  { q: 'Do I actually own the website?', a: "Yes, outright, after the one-off fee. It's your domain, your content, your site. We're not a landlord you have to keep paying to avoid losing it." },
  { q: "What if I'm not happy with it?", a: "If you're not happy with your new site, tell us within 30 days of it going live and we'll refund what you paid to build it. No quibbles." },
];

const WebsiteServices = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null

  const availableTimes = [
    '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00'
  ];

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setShowCalendar(true);
    setTimeout(() => {
      document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

      if (!serviceId || !publicKey || !templateId) {
        throw new Error('EmailJS configuration is missing. Please set up VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_PUBLIC_KEY, and VITE_EMAILJS_TEMPLATE_ID in your .env file.');
      }

      emailjs.init(publicKey);

      const formattedDate = selectedDate
        ? new Date(selectedDate).toLocaleDateString('en-GB', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })
        : 'Not specified';

      const templateParams = {
        from_name: bookingData.name,
        from_email: bookingData.email,
        phone: bookingData.phone || 'Not provided',
        selected_plan: selectedPlan
          ? `${selectedPlan.tier} Package (£${selectedPlan.oneOff} one-off + £${selectedPlan.monthly}/month)`
          : 'Not specified',
        preferred_date: formattedDate,
        preferred_time: selectedTime,
        message: bookingData.message || 'No additional message',
        service_interest: 'Website Design Services - Consultation Booking',
        to_name: 'Conxiea Team',
        reply_to: bookingData.email,
        to_email: 'admin@conxiea.com',
      };

      await emailjs.send(serviceId, templateId, templateParams);

      setSubmitStatus('success');

      setBookingData({ name: '', email: '', phone: '', message: '' });
      setSelectedDate('');
      setSelectedTime('');
    } catch (error) {
      console.error('Booking submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  return (
    <>
      <SEO
        title="Website Design Services | Professional Websites with Hosting | Conxiea"
        description="Professional website design with fixed one-off prices from £599 and low monthly hosting from £10. Pay once, own your website, and keep it running for less."
        url="/websites"
      />
      <div className="min-h-screen bg-[#0f0f3d] relative">
        <AnimatedHeroBackground />
        <Navigation />

        <div className="pt-40 pb-20 px-4">
          <div className="max-w-5xl mx-auto">

            {/* Hero */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <p className="text-sm font-semibold text-blue-300 uppercase tracking-wide mb-3">Website Design Services</p>
              <h1 className="text-4xl md:text-6xl font-bold mb-5 leading-tight">
                <span className="text-white">Your Website.</span>
                <br />
                <span className="text-gradient">Yours to Own.</span>
              </h1>

              <p className="text-lg md:text-xl text-slate-300 mb-4 max-w-2xl mx-auto">
                A professional website built to bring in enquiries. Pay once to own it outright, then a small monthly fee covers hosting, security and keeping it online.
              </p>

              <p className="text-base md:text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
                Most businesses rent their online presence through platforms that charge monthly and take the lot if you stop paying. A website you own is different: pay once, and it keeps working for you after that.
              </p>

              <motion.button
                onClick={scrollToPricing}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all"
              >
                View Packages <ArrowRight className="w-5 h-5" />
              </motion.button>
              <p className="text-slate-400 text-sm mt-3">Starter from £599 one-off. Professional and Enterprise also available.</p>

              <div className="flex items-center justify-center gap-2 mt-6 bg-slate-800/40 border border-slate-700/50 rounded-full py-2.5 px-5 w-fit mx-auto">
                <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                <span className="text-sm font-semibold text-white">4.9</span>
                <span className="text-yellow-400 text-sm">★★★★★</span>
                <span className="text-slate-300 text-xs">· 30+ Google Reviews</span>
              </div>
            </motion.div>

            {/* Pain */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-r from-red-900/25 to-slate-900/30 border border-red-500/30 rounded-2xl p-6 md:p-8 mb-8 max-w-3xl mx-auto"
            >
              <p className="text-slate-300 mb-4">Sound familiar?</p>
              <ul className="space-y-3 mb-5">
                {[
                  'No website, or one that is out of date and does not reflect the quality of your work.',
                  "Customers search for you on Google and find nothing, or find a competitor first.",
                  'Paying monthly platform fees that never end, and losing everything the moment you stop.',
                  'A site that gets visitors but never turns them into enquiries.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-1" />
                    <span className="text-slate-300 text-sm md:text-base">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-white font-semibold">
                A website you own is the opposite. It pays for itself over time, and every enquiry it brings in after that is yours.
              </p>
            </motion.div>


            {/* How it works */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid sm:grid-cols-3 gap-4 my-16"
            >
              {[
                { step: '01', title: 'Tell us about your business', body: 'A quick call. What you do, who your customers are, and what has and has not worked so far.' },
                { step: '02', title: 'We build it', body: 'Your photos, your reviews, your service area. Live within 2 to 4 weeks depending on package.' },
                { step: '03', title: 'You get found and get jobs', body: 'Google Business set up, local SEO done properly, hosting and support included every month.' },
              ].map((s) => (
                <div key={s.step} className="bg-slate-800/50 border border-white/10 rounded-2xl p-5">
                  <p className="text-xs font-mono text-blue-400 mb-1">{s.step}</p>
                  <p className="text-base font-bold text-white mb-1.5">{s.title}</p>
                  <p className="text-sm text-slate-300 leading-relaxed">{s.body}</p>
                </div>
              ))}
            </motion.div>

            {/* Pricing */}
            <section id="pricing" className="mb-20 scroll-mt-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-10"
              >
                <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
                  Pay Once. Own It Outright.
                </h2>
                <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-6">
                  No subscription pretending to be ownership. A one-off fee to build your site, then a small monthly amount that covers hosting, security and keeping it online, not a rental fee in disguise.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {plans.map((plan, index) => {
                  const Icon = plan.icon;
                  return (
                    <motion.div
                      key={plan.tier}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className={`relative bg-slate-800/50 backdrop-blur-sm border-2 rounded-3xl p-6 md:p-7 flex flex-col ${
                        plan.popular
                          ? 'border-blue-500/50 md:scale-105 shadow-2xl shadow-blue-500/20'
                          : 'border-white/10'
                      }`}
                    >
                      {plan.popular && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold whitespace-nowrap">
                          Most Popular
                        </div>
                      )}

                      <div className="text-center mb-5">
                        <div className={`w-14 h-14 bg-gradient-to-br ${plan.gradient} rounded-2xl flex items-center justify-center mx-auto mb-3`}>
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">{plan.tier}</h3>
                        <p className="text-slate-400 text-sm mb-4 min-h-[40px]">{plan.description}</p>
                        <div className="mb-1">
                          <span className="text-4xl font-bold text-white">£{plan.oneOff.toLocaleString("en-GB")}</span>
                          <span className="text-sm text-slate-300 ml-1">one-off</span>
                        </div>
                        <p className="text-sm text-amber-300 font-semibold">then £{plan.monthly}/month hosting</p>
                      </div>

                      <ul className="space-y-2.5 mb-6 flex-1">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                            <span className="text-slate-300 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <motion.button
                        onClick={() => handlePlanSelect(plan)}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className={`w-full py-3.5 rounded-xl font-semibold transition-all ${
                          plan.popular
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-xl hover:shadow-blue-500/50'
                            : 'bg-slate-700/50 text-white hover:bg-slate-700 border border-white/10'
                        }`}
                      >
                        Choose {plan.tier}
                      </motion.button>
                    </motion.div>
                  );
                })}
              </div>
            </section>

            {/* Guarantee */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-20"
            >
              <div className="bg-gradient-to-r from-green-900/40 to-emerald-900/40 border-2 border-green-500/60 rounded-2xl p-6 md:p-8 text-center max-w-2xl mx-auto">
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 rounded-full bg-green-500/20 border-2 border-green-500/50 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-green-400" />
                  </div>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-white mb-2">30-Day Money-Back Guarantee</h2>
                <p className="text-base md:text-lg text-green-300 font-semibold">"If you're not happy with your new site, tell us within 30 days of it going live and we'll refund what you paid to build it. No quibbles."</p>
              </div>
            </motion.div>

            {/* FAQ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-20 max-w-3xl mx-auto"
            >
              <h2 className="text-center text-2xl md:text-3xl font-bold text-white mb-8">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((f) => (
                  <div key={f.q} className="bg-slate-800/40 border border-white/10 rounded-xl p-5">
                    <p className="text-white font-semibold mb-2">{f.q}</p>
                    <p className="text-slate-300 text-sm leading-relaxed">{f.a}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Booking Section */}
            <div id="booking" className="scroll-mt-6">
              {selectedPlan && showCalendar && (
                <motion.section
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mb-10"
                >
                  <div className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-3xl p-6 md:p-12 max-w-3xl mx-auto">
                    <div className="text-center mb-8">
                      <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
                        Book Your Consultation
                      </h2>
                      <p className="text-base md:text-lg text-slate-300">
                        You've selected the <span className="text-gradient font-semibold">{selectedPlan.tier}</span> package
                        (£{selectedPlan.oneOff} one-off + £{selectedPlan.monthly}/month)
                      </p>
                      <p className="text-slate-400 mt-2">
                        Choose a date and time that works for you
                      </p>
                    </div>

                    <form onSubmit={handleBookingSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="booking-name" className="block text-sm font-semibold text-slate-300 mb-2">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            id="booking-name"
                            name="name"
                            required
                            value={bookingData.name}
                            onChange={handleBookingChange}
                            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            placeholder="John Smith"
                          />
                        </div>

                        <div>
                          <label htmlFor="booking-email" className="block text-sm font-semibold text-slate-300 mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            id="booking-email"
                            name="email"
                            required
                            value={bookingData.email}
                            onChange={handleBookingChange}
                            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            placeholder="you@yourbusiness.co.uk"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="booking-phone" className="block text-sm font-semibold text-slate-300 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="booking-phone"
                          name="phone"
                          value={bookingData.phone}
                          onChange={handleBookingChange}
                          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          placeholder="07700 900000"
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="booking-date" className="block text-sm font-semibold text-slate-300 mb-2">
                            <Calendar className="w-4 h-4 inline mr-2" />
                            Select Date *
                          </label>
                          <CalendarPicker
                            selectedDate={selectedDate}
                            onDateSelect={handleDateSelect}
                          />
                          {!selectedDate && (
                            <p className="text-xs text-slate-500 mt-1">Please select a date</p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="booking-time" className="block text-sm font-semibold text-slate-300 mb-2">
                            <Clock className="w-4 h-4 inline mr-2" />
                            Select Time *
                          </label>
                          <select
                            id="booking-time"
                            required
                            value={selectedTime}
                            onChange={(e) => setSelectedTime(e.target.value)}
                            disabled={!selectedDate}
                            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <option value="">Choose a time</option>
                            {availableTimes.map((time) => (
                              <option key={time} value={time}>
                                {time}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="booking-message" className="block text-sm font-semibold text-slate-300 mb-2">
                          Tell us about your business
                        </label>
                        <textarea
                          id="booking-message"
                          name="message"
                          rows="4"
                          value={bookingData.message}
                          onChange={handleBookingChange}
                          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                          placeholder="e.g. what your business does, where you operate, and what you need from a website..."
                        />
                      </div>

                      {submitStatus === 'success' && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 flex items-center gap-3"
                        >
                          <CheckCircle className="w-5 h-5 text-green-400" />
                          <p className="text-green-400 text-sm">Booking request submitted successfully! We'll contact you soon to confirm your consultation.</p>
                        </motion.div>
                      )}

                      {submitStatus === 'error' && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 flex items-center gap-3"
                        >
                          <AlertCircle className="w-5 h-5 text-red-400" />
                          <div className="flex-1">
                            <p className="text-red-400 text-sm font-semibold mb-1">There was an error submitting your booking.</p>
                            <p className="text-red-300 text-xs">Please try again or contact us directly at <a href="mailto:admin@conxiea.com" className="underline">admin@conxiea.com</a></p>
                          </div>
                        </motion.div>
                      )}

                      <motion.button
                        type="submit"
                        disabled={!selectedDate || !selectedTime || isSubmitting}
                        whileHover={{ scale: selectedDate && selectedTime && !isSubmitting ? 1.05 : 1 }}
                        whileTap={{ scale: selectedDate && selectedTime && !isSubmitting ? 0.95 : 1 }}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl hover:shadow-blue-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? 'Submitting...' : 'Confirm Booking'}
                        {!isSubmitting && <ArrowRight className="w-5 h-5 inline ml-2" />}
                      </motion.button>
                    </form>
                  </div>
                </motion.section>
              )}
            </div>

            {!selectedPlan && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to Stop Being Invisible on Google?</h2>
                <p className="text-slate-300 mb-6">Pick a package above, or if you're not sure which one, book a call and we'll tell you straight.</p>
                <motion.button
                  onClick={scrollToPricing}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 font-bold px-8 py-4 rounded-xl shadow-lg"
                >
                  See Pricing <ArrowRight className="w-5 h-5" />
                </motion.button>
              </motion.div>
            )}

          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default WebsiteServices;
