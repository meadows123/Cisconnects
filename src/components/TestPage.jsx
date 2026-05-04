import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' },
  }),
};

const services = [
  {
    num: '01',
    title: 'WiFi Optimisation',
    description:
      'Fast broadband but dead zones? We survey, redesign and optimise your WiFi coverage so every corner of your space performs.',
  },
  {
    num: '02',
    title: 'Network Troubleshooting',
    description:
      'Intermittent dropouts, slow speeds, or devices that won\'t connect. We diagnose the root cause and fix it properly — not temporarily.',
  },
  {
    num: '03',
    title: 'Managed Connectivity',
    description:
      'Ongoing network management for offices and multi-site businesses. We monitor, maintain and respond — so you don\'t have to.',
  },
  {
    num: '04',
    title: 'Emergency Response',
    description:
      'Network down? We offer same-day emergency call-outs for businesses that can\'t afford to be offline.',
  },
];

const stats = [
  { value: '50+', label: 'Sites Optimised' },
  { value: '4.9★', label: 'Google Rating' },
  { value: '100%', label: 'Coverage Guaranteed' },
  { value: '< 4hr', label: 'Emergency Response' },
];

const TestPage = () => {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans">

      {/* Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 bg-stone-50/90 backdrop-blur-sm border-b border-stone-200">
        <Link to="/" className="text-sm font-semibold tracking-widest uppercase text-stone-900">
          Conxiea
        </Link>
        <nav className="hidden md:flex gap-10 text-sm text-stone-500">
          <Link to="/wifi-optimisation" className="hover:text-stone-900 transition">WiFi</Link>
          <Link to="/office-connectivity" className="hover:text-stone-900 transition">Office</Link>
          <Link to="/contact" className="hover:text-stone-900 transition">Contact</Link>
        </nav>
        <Link
          to="/contact"
          className="text-sm font-semibold tracking-wide underline underline-offset-4 hover:text-blue-600 transition"
        >
          Get in touch
        </Link>
      </header>

      {/* Hero */}
      <section className="pt-40 pb-24 px-8 max-w-5xl mx-auto">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-xs font-semibold tracking-[0.25em] uppercase text-stone-400 mb-6"
        >
          Network & Connectivity Specialists
        </motion.p>
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="text-6xl md:text-8xl font-bold leading-none tracking-tight text-stone-900 mb-10"
        >
          Your network,<br />
          <span className="italic font-light">finally reliable.</span>
        </motion.h1>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="text-lg md:text-xl text-stone-500 max-w-xl leading-relaxed mb-10"
        >
          We fix WiFi dead zones, slow connections and network failures for homes,
          cafés and offices across the UK.
        </motion.p>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
          className="flex flex-wrap gap-6 items-center"
        >
          <Link
            to="/wifi-optimisation"
            className="inline-block px-8 py-4 bg-stone-900 text-white text-sm font-semibold tracking-wide hover:bg-stone-700 transition"
          >
            Fix My WiFi
          </Link>
          <Link
            to="/contact"
            className="text-sm font-semibold tracking-wide underline underline-offset-4 text-stone-500 hover:text-stone-900 transition"
          >
            Talk to an engineer
          </Link>
        </motion.div>
      </section>

      {/* Divider */}
      <div className="border-t border-stone-200 mx-8" />

      {/* Stats */}
      <section className="py-20 px-8 max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
            >
              <p className="text-4xl md:text-5xl font-bold text-stone-900 mb-2">{s.value}</p>
              <p className="text-sm text-stone-400 tracking-wide uppercase">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-stone-200 mx-8" />

      {/* Services */}
      <section className="py-24 px-8 max-w-5xl mx-auto">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-xs font-semibold tracking-[0.25em] uppercase text-stone-400 mb-16"
        >
          What we do
        </motion.p>
        <div className="space-y-0">
          {services.map((s, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i * 0.5}
              className="group flex flex-col md:flex-row md:items-start gap-6 md:gap-16 py-10 border-t border-stone-200 last:border-b cursor-default"
            >
              <span className="text-xs font-semibold text-stone-300 tracking-widest pt-1 w-8 shrink-0">
                {s.num}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-stone-900 w-64 shrink-0 group-hover:text-blue-600 transition">
                {s.title}
              </h2>
              <p className="text-base text-stone-500 leading-relaxed max-w-md">
                {s.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-stone-200 mx-8" />

      {/* Process */}
      <section className="py-24 px-8 max-w-5xl mx-auto">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-xs font-semibold tracking-[0.25em] uppercase text-stone-400 mb-16"
        >
          How it works
        </motion.p>
        <div className="grid md:grid-cols-3 gap-16">
          {[
            { num: '01', title: 'You get in touch', body: 'Tell us what\'s going wrong. We\'ll ask a few quick questions to understand your setup.' },
            { num: '02', title: 'We come to you', body: 'One of our engineers visits, surveys your space, and diagnoses the problem properly.' },
            { num: '03', title: 'Problem solved', body: 'We fix it, verify performance with real speed tests, and leave you with a network that works.' },
          ].map((step, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i * 0.5}
            >
              <p className="text-6xl font-bold text-stone-100 mb-6">{step.num}</p>
              <h3 className="text-xl font-bold text-stone-900 mb-3">{step.title}</h3>
              <p className="text-base text-stone-500 leading-relaxed">{step.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-8">
        <div className="max-w-5xl mx-auto bg-stone-900 text-white px-12 py-20 flex flex-col md:flex-row md:items-center md:justify-between gap-10">
          <div>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold leading-tight mb-4"
            >
              Ready to fix your<br />network for good?
            </motion.h2>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              className="text-stone-400 text-base max-w-sm leading-relaxed"
            >
              No commitment. No hidden costs. Just honest advice from an engineer who knows networks.
            </motion.p>
          </div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            className="shrink-0"
          >
            <Link
              to="/wifi-optimisation"
              className="inline-block px-10 py-5 bg-white text-stone-900 text-sm font-semibold tracking-wide hover:bg-stone-100 transition"
            >
              Book a Visit Today
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-200 px-8 py-10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-stone-400">
          <p>© 2026 Conxiea. All rights reserved.</p>
          <div className="flex gap-8">
            <Link to="/privacy-policy" className="hover:text-stone-900 transition">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-stone-900 transition">Terms</Link>
            <Link to="/" className="hover:text-stone-900 transition">Home</Link>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default TestPage;
