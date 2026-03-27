import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
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
    image: '/slanting.png',
    alt: 'Infrastructure approval workflow dashboard',
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
    image: '/slanting.png',
    alt: 'AI chat window for network queries',
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
    image: '/slanting.png',
    alt: 'AI troubleshooting dashboard',
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
    image: '/slanting.png',
    alt: 'Configuration templates dashboard',
  },
];

const Solutions = () => {
  const { openBooking } = useBooking();
  const [active, setActive] = useState(tabs[0].id);
  const current = tabs.find((t) => t.id === active);

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
        <div className="flex flex-wrap justify-center gap-0 border-b border-slate-700 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`relative px-6 py-3 text-sm font-semibold transition-colors whitespace-nowrap
                ${active === tab.id
                  ? 'text-white'
                  : 'text-slate-400 hover:text-slate-200'
                }`}
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
            transition={{ duration: 0.35 }}
            className="grid lg:grid-cols-2 gap-12 items-center"
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

            {/* Right — image / video slot */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-20 blur-3xl rounded-3xl pointer-events-none" />
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                {/* Browser chrome */}
                <div style={{ background: '#0f172a', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '7px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ef4444aa' }} />
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#eab308aa' }} />
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#22c55eaa' }} />
                  <span style={{ marginLeft: 8, fontSize: 11, color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace' }}>conxiea.com</span>
                </div>
                <img
                  src={current.image}
                  alt={current.alt}
                  className="w-full h-auto block"
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};

export default Solutions;
