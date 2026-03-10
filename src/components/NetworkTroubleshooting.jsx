import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Network,
  Cpu,
  VpnKey,
  CheckCircle,
  ArrowRight,
  Phone,
  ShieldCheck,
  Clock,
  XCircle,
  Zap,
  AlertTriangle,
  Wrench,
  Users
} from 'lucide-react';
import Navigation from './Navigation';
import Footer from './Footer';
import SEO from './SEO';
import emailjs from '@emailjs/browser';

const NetworkTroubleshooting = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const pains = [
    { text: 'Internet dropping randomly throughout the day' },
    { text: 'Devices disconnecting without explanation' },
    { text: 'VPN failing when staff need it most' },
    { text: 'Staff unable to work — productivity at a standstill' },
    { text: 'Your MSP takes days to even escalate the issue' },
  ];

  const gains = [
    { text: 'Problems diagnosed and solved quickly — not in days' },
    { text: 'Minimal downtime for your business and your team' },
    { text: 'Clear diagnosis — you understand exactly what went wrong' },
    { text: 'Network stability restored and maintained' },
    { text: 'Direct access to a network engineer, not a helpdesk script' },
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
        message: formData.message || 'Enquiry from Network Troubleshooting landing page',
        service_interest: 'Network Troubleshooting (£350)',
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
        title="Network Troubleshooting £350 | Network Problems Solved Fast | Conxiea"
        description="Network broken for weeks and nobody can fix it? Conxiea resolves your network issues fast — by a certified network engineer, not a helpdesk. Fixed-price network troubleshooting from £350."
        url="/network-troubleshooting"
      />
      <div className="min-h-screen bg-slate-950 overflow-hidden">
        <Navigation />

        {/* Hero */}
        <section className="relative min-h-screen flex items-center justify-center px-4 py-24 pt-40 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-slate-950 to-red-950" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgxNjgsODUsMjQ3LDAuMDgpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />

          <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 backdrop-blur-sm"
            >
              <Wrench className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-300">Fixed Price · £350 · Network Troubleshooting</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight"
            >
              <span className="text-white">Network Problems Solved</span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                by an Engineer — Not a Helpdesk.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
            >
              Most MSPs take days just to escalate. We pick it up and solve it. One fixed price. No surprises.
            </motion.p>

            {/* Price badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="inline-flex flex-col items-center gap-1 px-8 py-4 rounded-2xl bg-purple-500/10 border border-purple-500/30"
            >
              <span className="text-5xl font-bold text-white">£350</span>
              <span className="text-purple-300 text-sm">Fixed-price troubleshooting session</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold text-lg shadow-lg shadow-purple-500/30 transition-all hover:shadow-xl hover:shadow-purple-500/50"
              >
                Get My Network Fixed <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="tel:+441234567890"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border-2 border-purple-500/40 text-purple-300 hover:bg-purple-500/10 font-semibold text-lg transition-all"
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
              <span className="inline-block px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium mb-4">The frustration</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white">A Broken Network Nobody Can Fix</h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
                "Our network has been broken for weeks and nobody can fix it."
              </p>
              <p className="text-slate-500 mt-3 text-sm">— Many businesses stuck waiting on their MSP</p>
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
              <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-4">What we deliver</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Back Online. Back to Business.</h2>
              <p className="text-slate-400 mt-4 text-lg max-w-2xl mx-auto">One session. Real engineer. Real results.</p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {gains.map(({ text }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4 p-5 rounded-2xl bg-purple-950/20 border border-purple-500/15 backdrop-blur-sm"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-purple-400" />
                  </div>
                  <p className="text-slate-300 leading-relaxed">{text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why an Engineer Not Helpdesk */}
        <section className="py-20 px-4 bg-slate-900/50">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8 text-center"
            >
              {[
                { icon: Zap, title: 'Fast Response', desc: 'We don\'t wait days to act. We engage with your issue quickly and directly.' },
                { icon: ShieldCheck, title: 'Certified Engineers', desc: 'You\'re speaking to someone who actually understands networking — not reading from a script.' },
                { icon: Clock, title: 'Fixed Price', desc: '£350, no hidden extras. You know the cost before we start.' },
              ].map(({ icon: Icon, title, desc }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="p-8 rounded-2xl bg-slate-800/50 border border-white/5"
                >
                  <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center mx-auto mb-5">
                    <Icon className="w-7 h-7 text-purple-400" />
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
                Book Your Troubleshooting Session
              </h2>
              <p className="text-slate-400 text-lg">Tell us what's happening and we'll get to work.</p>
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
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all"
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
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all"
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
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Describe the network issue *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="E.g. internet keeps dropping, specific devices affected, how long it's been an issue..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all resize-none"
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
                className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-lg transition-all shadow-lg shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/40 flex items-center justify-center gap-2"
              >
                {isSubmitting ? 'Sending...' : <>Book Troubleshooting Session — £350 <ArrowRight className="w-5 h-5" /></>}
              </button>

              <p className="text-center text-slate-500 text-sm">Fixed price. No hidden costs. If we can't help, we'll be honest about it.</p>
            </motion.form>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default NetworkTroubleshooting;
