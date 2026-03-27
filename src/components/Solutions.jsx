import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBooking } from '@/context/BookingContext';

const tabs = [
  {
    id: 'approval',
    label: 'Infrastructure Approval',
    headline: 'Approve Changes in Seconds, Not Hours.',
    description:
      'AI reviews every change request with automatic risk scoring and a generated rollback plan — so your team moves fast without breaking things. Full audit trail, zero manual effort.',
    features: [
      'Risk scoring on every change',
      'Auto-generated rollback plan',
      'Audit trail built-in',
      'Works with your existing ITSM',
    ],
  },
  {
    id: 'chat',
    label: 'Chat Window',
    headline: 'Ask Your Network Anything.',
    description:
      'Natural language queries, real-time answers. No CLI, no digging through dashboards — just type what you need and get the data instantly. Escalate to a ticket with one click.',
    features: [
      'Natural language interface',
      'Live network context',
      'Auto-escalate to ticket',
      'No training required',
    ],
  },
  {
    id: 'troubleshooting',
    label: 'Troubleshooting Pack',
    headline: 'Issues Resolved Before You Notice Them.',
    description:
      'AI monitors your infrastructure 24/7, detects anomalies, traces root causes, and runs remediation playbooks automatically. Your team stops firefighting and starts leading.',
    features: [
      'Anomaly detection',
      'Root cause analysis',
      'Auto-remediation playbooks',
      'Alert fatigue eliminated',
    ],
  },
  {
    id: 'config',
    label: 'Configuration Templates',
    headline: 'Standardised Configs. Deployed in Minutes.',
    description:
      'Pre-built and custom configuration templates for Cisco, Juniper, Fortinet and more — applied consistently across every device, every time. Compliance validated before deployment.',
    features: [
      'Multi-vendor support',
      'Version control built-in',
      'Compliance validation',
      'One-click bulk deploy',
    ],
  },
];

const VideoPlaceholder = ({ label }) => (
  <div
    style={{
      background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)',
      aspectRatio: '16/10',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '20px',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    {/* Subtle grid overlay */}
    <div style={{
      position: 'absolute', inset: 0,
      backgroundImage: 'linear-gradient(rgba(59,130,246,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.05) 1px, transparent 1px)',
      backgroundSize: '40px 40px',
    }} />

    {/* Fake UI bars at top */}
    <div style={{ position: 'absolute', top: 20, left: 20, right: 20, display: 'flex', gap: 8 }}>
      {[70, 120, 90, 140].map((w, i) => (
        <div key={i} style={{ height: 6, width: w, borderRadius: 4, background: 'rgba(99,102,241,0.25)' }} />
      ))}
    </div>

    {/* Fake chart lines */}
    <svg style={{ position: 'absolute', bottom: 40, left: 20, right: 20, opacity: 0.15 }} height="60" viewBox="0 0 400 60" preserveAspectRatio="none">
      <polyline points="0,50 60,30 120,40 180,10 240,25 300,15 360,30 400,20" fill="none" stroke="#6366f1" strokeWidth="2" />
      <polyline points="0,55 60,45 120,50 180,30 240,40 300,35 360,45 400,38" fill="none" stroke="#3b82f6" strokeWidth="2" />
    </svg>

    {/* Play button */}
    <motion.div
      animate={{ scale: [1, 1.08, 1] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        width: 72,
        height: 72,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #3b82f6, #7c3aed)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 0 40px rgba(99,102,241,0.5)',
        position: 'relative',
        zIndex: 1,
        cursor: 'pointer',
      }}
    >
      <Play fill="white" color="white" size={28} style={{ marginLeft: 4 }} />
    </motion.div>

    <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
      <p style={{ color: 'rgba(255,255,255,0.9)', fontWeight: 600, fontSize: 15, margin: 0 }}>{label}</p>
      <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, margin: '4px 0 0' }}>Demo video coming soon</p>
    </div>
  </div>
);

const TiltedVideo = ({ label, isMobile }) => (
  <div className="relative w-full" style={{ perspective: '900px', perspectiveOrigin: '50% 50%' }}>

    {/* Dot grid — anchored bottom-right, same transform as card */}
    {!isMobile && (
      <motion.div
        className="absolute pointer-events-none"
        style={{
          top: '38%',
          left: '28%',
          right: '-55px',
          bottom: '-55px',
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.55) 2px, transparent 2px)',
          backgroundSize: '22px 22px',
          transformOrigin: 'left center',
          zIndex: 0,
        }}
        animate={{ rotateY: -22, rotateX: 4, rotateZ: -1 }}
      />
    )}

    {/* Card with browser chrome + video placeholder */}
    <motion.div
      initial={{ opacity: 0, y: 30, rotateY: isMobile ? 0 : -22, rotateX: isMobile ? 0 : 4, rotateZ: isMobile ? 0 : -1 }}
      animate={{
        opacity: 1,
        y: isMobile ? 0 : [0, -10, 0],
        rotateY: isMobile ? 0 : -22,
        rotateX: isMobile ? 0 : 4,
        rotateZ: isMobile ? 0 : -1,
      }}
      transition={{
        opacity: { duration: 0.6 },
        y: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.8 },
        rotateY: { duration: 0 },
        rotateX: { duration: 0 },
        rotateZ: { duration: 0 },
      }}
      style={{
        transformOrigin: 'left center',
        borderRadius: '12px',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 1,
        boxShadow: '0 60px 120px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.08)',
      }}
    >
      {/* Browser chrome */}
      <div style={{ background: '#0f172a', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '7px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ef4444aa' }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#eab308aa' }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#22c55eaa' }} />
        <span style={{ marginLeft: 8, fontSize: 11, color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace' }}>conxiea.com</span>
      </div>
      <VideoPlaceholder label={label} />
    </motion.div>
  </div>
);

const Solutions = () => {
  const { openBooking } = useBooking();
  const [active, setActive] = useState(tabs[0].id);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const current = tabs.find((t) => t.id === active);

  useEffect(() => {
    const handle = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handle);
    return () => window.removeEventListener('resize', handle);
  }, []);

  return (
    <section className="relative py-24 px-4 bg-slate-950">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3">
            Solve your biggest challenges.{' '}
            <span className="text-gradient">Faster.</span>
          </h2>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-0 border-b border-slate-700 mb-16">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`relative px-5 py-3 text-sm font-semibold transition-colors whitespace-nowrap
                ${active === tab.id ? 'text-white' : 'text-slate-400 hover:text-slate-200'}`}
            >
              {tab.label}
              {active === tab.id && (
                <motion.div
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            {/* Left — text */}
            <div className="space-y-7">
              <h3 className="text-3xl md:text-4xl font-bold text-white leading-snug">
                {current.headline}
              </h3>
              <p className="text-lg text-slate-400 leading-relaxed">
                {current.description}
              </p>
              <ul className="space-y-3">
                {current.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                size="lg"
                onClick={openBooking}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-blue-500/30 transition-all"
              >
                See It In Action
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>

            {/* Right — tilted video placeholder */}
            <TiltedVideo label={current.label} isMobile={isMobile} />
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};

export default Solutions;
