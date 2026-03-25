import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  AlertCircle,
  Zap,
  Globe,
  Search,
  TrendingUp,
  Phone,
  Star,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Shield,
  Clock,
  Users
} from 'lucide-react';
import SEO from './SEO';
import emailjs from '@emailjs/browser';

const ElectricianWebsiteServices = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', business: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  const testimonials = [
    {
      name: 'Dave H.',
      initials: 'DH',
      role: 'Sole Trader Electrician',
      result: 'Phone ringing every day within 3 weeks',
      review: '"I was relying on word of mouth for years. Conxiea built me a site and within three weeks my phone was ringing every single day from Google. Best money I\'ve ever spent."'
    },
    {
      name: 'Steve M.',
      initials: 'SM',
      role: 'Electrical Contractor',
      result: 'Booked out 6 weeks in advance',
      review: '"We went from chasing jobs to turning work away. The website pulls in leads on autopilot — I honestly wish I\'d done this years ago."'
    },
    {
      name: 'Chris T.',
      initials: 'CT',
      role: 'Domestic Electrician',
      result: '12 new enquiries in the first month',
      review: '"Professional site, shows up on Google, and the leads it brings in are serious customers. Worth every penny."'
    },
    {
      name: 'Paul W.',
      initials: 'PW',
      role: 'Electrical Business Owner',
      result: 'Stopped relying on third-party job sites',
      review: '"I was paying through the nose on lead sites and getting tyre-kickers. My own website brings in proper customers who are ready to book."'
    },
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
        message: `Business: ${formData.business || 'Not provided'}`,
        service_interest: 'Electrician Website Services',
        to_name: 'Conxiea Team',
        reply_to: formData.email,
      });
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', business: '' });
    } catch (err) {
      console.error(err);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const features = [
    {
      icon: Search,
      title: 'Found on Google',
      description: 'We build and optimise your site so local customers searching for electricians find you — not your competitors.'
    },
    {
      icon: Phone,
      title: 'Calls & Enquiries on Autopilot',
      description: 'Your website works 24/7 capturing leads while you\'re on the tools. Wake up to new enquiries every morning.'
    },
    {
      icon: Shield,
      title: 'Builds Trust Instantly',
      description: 'A professional website with your accreditations, reviews, and photos signals credibility before a customer even picks up the phone.'
    },
    {
      icon: Zap,
      title: 'Fast & Mobile-Ready',
      description: 'Most searches happen on mobile. Your site loads fast and looks perfect on every device.'
    },
    {
      icon: TrendingUp,
      title: 'Ongoing SEO Included',
      description: 'We keep your rankings climbing month after month — no extra agency fees, it\'s all part of your plan.'
    },
    {
      icon: Clock,
      title: 'Live in Days, Not Months',
      description: 'We\'ve done this for dozens of trades. We move fast, get it right, and get you live quickly.'
    },
  ];

  const painPoints = [
    'Your competitors are showing up on Google — you\'re not',
    'You\'re paying lead sites like Checkatrade and getting low-quality enquiries',
    'Customers can\'t find your number, reviews, or accreditations in one place',
    'You\'re relying solely on word of mouth with no way to scale',
    'You have no way to showcase your work or collect reviews online',
  ];

  const t = testimonials[currentTestimonialIndex];

  return (
    <>
      <SEO
        title="Website for Electricians That Brings You More Jobs | Conxiea"
        description="Need a website for electricians? Conxiea builds professional electrician websites that rank on Google, generate enquiries, and turn local searches into booked jobs — domain, hosting & SEO all included."
        keywords="website for electricians, electrician website, websites for electricians, electrician website design, electrician website UK, website for electrical contractor"
        url="/website-for-electricians"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Website for Electricians",
          "description": "Professional website design and SEO service for electricians. Get found on Google and turn local searches into booked jobs.",
          "provider": {
            "@type": "Organization",
            "name": "Conxiea",
            "url": "https://conxiea.com"
          },
          "areaServed": {
            "@type": "Country",
            "name": "United Kingdom"
          },
          "serviceType": "Website Design & SEO for Electricians"
        }}
      />
      <div className="min-h-screen bg-slate-950 flex flex-col">
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="w-full max-w-3xl mx-auto">

            {/* Hero */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-14"
            >
              <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-sm font-semibold px-4 py-2 rounded-full mb-8">
                <Zap className="w-4 h-4" />
                Website for Electricians
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
                Website for Electricians That
                <span className="block mt-3 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  Actually Gets You Work
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10">
                Every day without a proper website for electricians is a day your competitors are picking up jobs that should be yours. We build high-converting electrician websites that show up on Google and turn visitors into paying customers.
              </p>

              <motion.a
                href="#get-started"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-slate-950 font-bold px-8 py-4 rounded-xl text-lg hover:shadow-xl hover:shadow-yellow-500/30 transition-all"
              >
                Get My Website
                <ArrowRight className="w-5 h-5" />
              </motion.a>

              <p className="text-slate-500 text-sm mt-4">No obligation. We'll show you exactly what's possible for your area.</p>
            </motion.div>

            {/* Pain Points */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-slate-900/60 border border-white/10 rounded-2xl p-8 mb-12"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Sound familiar?</h2>
              <ul className="space-y-4">
                {painPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-red-400 text-xs font-bold">✕</span>
                    </div>
                    <span className="text-slate-300">{point}</span>
                  </li>
                ))}
              </ul>
              <p className="text-slate-400 mt-6 text-sm border-t border-white/10 pt-6">
                These are problems we fix every single day for electricians across the UK. A proper website changes everything.
              </p>
            </motion.div>

            {/* Stats Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-3 gap-4 mb-12"
            >
              {[
                { value: '1,000+', label: 'Weekly local searches for electricians' },
                { value: '97%', label: 'Of people click page 1 of Google' },
                { value: '3x', label: 'More calls with a professional website' },
              ].map((stat, i) => (
                <div key={i} className="bg-slate-900/60 border border-white/10 rounded-xl p-5 text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-1">{stat.value}</div>
                  <div className="text-xs text-slate-400 leading-snug">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-white text-center mb-10">What's in your website for electricians</h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {features.map((feature, i) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.07 }}
                      className="bg-slate-900/60 border border-white/10 rounded-xl p-6 flex items-start gap-4 hover:border-yellow-500/30 transition-colors"
                    >
                      <div className="w-11 h-11 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* What's Included */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-2xl p-8 mb-12"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Globe className="w-6 h-6 text-yellow-400" />
                Everything included in your electrician website
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  'Custom-designed website for electricians',
                  'Local SEO to rank in your area',
                  'Domain registration & hosting',
                  'Mobile-optimised & lightning fast',
                  'Showcase your accreditations (NICEIC, NAPIT, etc.)',
                  'Google Reviews integration',
                  'Click-to-call & contact form',
                  'Gallery to display your work',
                  'Services pages for all your offerings',
                  'Monthly performance updates',
                  'Ongoing support & changes included',
                  'No hidden fees — one simple monthly plan',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                    <span className="text-slate-300 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Testimonials */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-white text-center mb-8 flex items-center justify-center gap-2">
                <Users className="w-6 h-6 text-yellow-400" />
                What tradespeople say
              </h2>

              <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-8 relative">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-300 text-lg italic mb-6 leading-relaxed">{t.review}</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-slate-500 text-xs">{t.role}</p>
                  </div>
                  <div className="ml-auto bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-medium px-3 py-1 rounded-full">
                    {t.result}
                  </div>
                </div>

                {/* Nav */}
                <div className="flex gap-3 mt-6 justify-end">
                  <button
                    onClick={prevTestimonial}
                    className="w-9 h-9 bg-slate-800 hover:bg-slate-700 border border-white/10 rounded-full flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="w-9 h-9 bg-slate-800 hover:bg-slate-700 border border-white/10 rounded-full flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Lead Capture Form */}
            <motion.div
              id="get-started"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-slate-900/80 border border-yellow-500/20 rounded-2xl p-8"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-3">
                  Get your free electrician website consultation
                </h2>
                <p className="text-slate-400">
                  Tell us about your business and we'll show you exactly what a website for electricians in your area could do. No pushy sales — just a straight conversation.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1.5">Your Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Dave Smith"
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-1.5">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+44 7700 900000"
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1.5">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="dave@smithelectrical.co.uk"
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="business" className="block text-sm font-medium text-slate-300 mb-1.5">Business Name</label>
                  <input
                    type="text"
                    id="business"
                    name="business"
                    value={formData.business}
                    onChange={handleChange}
                    placeholder="Smith Electrical Services"
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
                  />
                </div>

                {submitStatus === 'error_validation' && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3"
                  >
                    <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                    <p className="text-red-400 text-sm">Please fill in your name, email, and phone number.</p>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3"
                  >
                    <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                    <div>
                      <p className="text-red-400 text-sm font-semibold">Something went wrong.</p>
                      <p className="text-red-300 text-xs mt-0.5">Please try again or email us at <a href="mailto:admin@conxiea.com" className="underline">admin@conxiea.com</a></p>
                    </div>
                  </motion.div>
                )}

                {submitStatus === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-3 bg-green-500/10 border border-green-500/30 rounded-lg px-4 py-4"
                  >
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <div>
                      <p className="text-green-400 font-semibold text-sm">You're on the list!</p>
                      <p className="text-green-300 text-xs mt-0.5">We'll be in touch within 24 hours to talk through your website.</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-slate-950 font-bold py-4 rounded-xl text-lg hover:shadow-xl hover:shadow-yellow-500/30 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? 'Sending...' : (
                      <>
                        Get My Free Consultation
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>
                )}
              </form>

              <p className="text-center text-slate-500 text-xs mt-4">
                No spam. No obligation. We'll contact you within 24 hours.
              </p>
            </motion.div>

          </div>
        </main>
      </div>
    </>
  );
};

export default ElectricianWebsiteServices;
