import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Wifi,
  Radio,
  CheckCircle,
  ArrowRight,
  Phone,
  ShieldCheck,
  MapPin,
  XCircle,
  Zap,
  BarChart3,
  Gauge
} from 'lucide-react';
import Navigation from './Navigation';
import Footer from './Footer';
import SEO from './SEO';
import emailjs from '@emailjs/browser';

const WifiOptimisation = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const pains = [
    { text: 'Weak WiFi in parts of the building — some rooms get nothing' },
    { text: 'Slow speeds even though your broadband package is fast' },
    { text: 'Router placed in completely the wrong location' },
    { text: 'Interference from neighbouring networks causing drops' },
  ];

  const gains = [
    { text: 'Better coverage across every room of your building' },
    { text: 'Faster speeds — getting the performance you\'re paying for' },
    { text: 'Reliable connectivity with no random drops' },
    { text: 'Dead zones eliminated for good' },
  ];

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
        message: formData.message || 'Enquiry from WiFi Optimisation landing page',
        service_interest: 'WiFi Optimisation (£300)',
        to_name: 'Cisconnects Team',
        reply_to: formData.email,
      });
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
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
      <div className="min-h-screen bg-slate-950 overflow-hidden">
        <Navigation />

        {/* Hero */}
        <section className="relative min-h-screen flex items-center justify-center px-4 py-24 pt-40 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-950 via-slate-950 to-blue-950" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyMCwxODQsMTY2LDAuMDgpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />

          <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 backdrop-blur-sm"
            >
              <Radio className="w-4 h-4 text-teal-400" />
              <span className="text-sm text-teal-300">Fixed Price · £300 · WiFi Optimisation</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight"
            >
              <span className="text-white">Turn Weak WiFi Into</span>
              <br />
              <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
                Reliable Coverage Everywhere.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
            >
              You're paying for fast broadband. You shouldn't be putting up with terrible WiFi. We fix that — in one visit.
            </motion.p>

            {/* Price badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="inline-flex flex-col items-center gap-1 px-8 py-4 rounded-2xl bg-teal-500/10 border border-teal-500/30"
            >
              <span className="text-5xl font-bold text-white">£300</span>
              <span className="text-teal-300 text-sm">Fixed-price WiFi optimisation</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-semibold text-lg shadow-lg shadow-teal-500/30 transition-all hover:shadow-xl hover:shadow-teal-500/50"
              >
                Optimise My WiFi <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="tel:+441234567890"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border-2 border-teal-500/40 text-teal-300 hover:bg-teal-500/10 font-semibold text-lg transition-all"
              >
                <Phone className="w-5 h-5" /> Call Us Now
              </a>
            </motion.div>
          </div>
        </section>

        {/* Pain Section */}
        <section className="py-20 px-4 bg-slate-900/50">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium mb-4">The problem</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Fast Internet. Terrible WiFi.</h2>
              <p className="text-slate-400 mt-4 text-lg">Your broadband isn't the issue — your WiFi setup is.</p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-5">
              {pains.map(({ text }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4 p-5 rounded-2xl bg-red-950/20 border border-red-500/15 backdrop-blur-sm"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                    <XCircle className="w-5 h-5 text-red-400" />
                  </div>
                  <p className="text-slate-300 leading-relaxed">{text}</p>
                </motion.div>
              ))}
            </div>

            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-12 p-8 rounded-2xl bg-red-950/30 border border-red-500/20 text-center"
            >
              <p className="text-xl md:text-2xl text-red-300 italic font-medium">
                "My internet is fast but the WiFi is terrible."
              </p>
              <p className="text-slate-500 mt-3 text-sm">— More common than you'd think. Completely fixable.</p>
            </motion.blockquote>
          </div>
        </section>

        {/* Gains Section */}
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-sm font-medium mb-4">After we're done</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Full Coverage. No Compromises.</h2>
              <p className="text-slate-400 mt-4 text-lg max-w-2xl mx-auto">You'll finally get the speeds you're paying for — everywhere in your building.</p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-5">
              {gains.map(({ text }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4 p-5 rounded-2xl bg-teal-950/20 border border-teal-500/15 backdrop-blur-sm"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-teal-400" />
                  </div>
                  <p className="text-slate-300 leading-relaxed">{text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-20 px-4 bg-slate-900/50">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white">How It Works</h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8 text-center"
            >
              {[
                { icon: MapPin, step: '01', title: 'We Survey Your Space', desc: 'We assess your building layout, existing equipment, and signal coverage to find the weak spots.' },
                { icon: BarChart3, step: '02', title: 'We Find the Cause', desc: 'Poor placement, interference, outdated hardware — we identify exactly what\'s throttling your WiFi.' },
                { icon: Gauge, step: '03', title: 'We Optimise', desc: 'We reposition, reconfigure, and upgrade where needed. You get reliable coverage across the whole building.' },
              ].map(({ icon: Icon, step, title, desc }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="p-8 rounded-2xl bg-slate-800/50 border border-white/5 relative"
                >
                  <span className="absolute top-5 right-5 text-5xl font-black text-teal-500/10">{step}</span>
                  <div className="w-14 h-14 rounded-2xl bg-teal-500/10 flex items-center justify-center mx-auto mb-5">
                    <Icon className="w-7 h-7 text-teal-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
                  <p className="text-slate-400 leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Contact Form */}
        <section id="contact" className="py-20 px-4">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Book Your WiFi Optimisation
              </h2>
              <p className="text-slate-400 text-lg">Tell us about your setup and we'll be in touch quickly.</p>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              onSubmit={handleSubmit}
              className="space-y-5 p-8 rounded-2xl bg-slate-800/50 border border-white/10 backdrop-blur-sm"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Smith"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/30 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="07700 000000"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/30 transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@yourbusiness.com"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/30 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Describe your WiFi issues (optional)</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="E.g. building size, affected areas, type of property (office, cafe, home)..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/30 transition-all resize-none"
                />
              </div>

              {submitStatus === 'error_validation' && (
                <p className="text-red-400 text-sm">Please fill in all required fields.</p>
              )}
              {submitStatus === 'error' && (
                <p className="text-red-400 text-sm">Something went wrong. Please try calling us instead.</p>
              )}
              {submitStatus === 'success' && (
                <div className="flex items-center gap-2 p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <p className="text-green-300 font-medium">Message sent! We'll be in touch very soon.</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-lg transition-all shadow-lg shadow-teal-500/20 hover:shadow-xl hover:shadow-teal-500/40 flex items-center justify-center gap-2"
              >
                {isSubmitting ? 'Sending...' : <>Book WiFi Optimisation — £300 <ArrowRight className="w-5 h-5" /></>}
              </button>

              <p className="text-center text-slate-500 text-sm">Fixed price. No hidden costs. Honest advice guaranteed.</p>
            </motion.form>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default WifiOptimisation;
