import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ArrowRight, Play, Server, MessageSquare, ShieldCheck, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBooking } from '@/context/BookingContext';
import DonutChartInteractive from './DonutChartInteractive';

const VIDEO_SRC = '/Animated Video - Homepage.mp4';

const tabs = [
  {
    id: 'approval',
    label: 'Infrastructure Approval',
    icon: Server,
    headline: 'Approve Changes in Seconds, Not Hours.',
    description:
      'AI reviews every change request with automatic risk scoring and a generated rollback plan — so your team moves fast without breaking things. Full audit trail, zero manual effort.',
    features: [
      'Risk scoring on every change',
      'Auto-generated rollback plan',
      'Audit trail built-in',
      'Works with your existing ITSM',
    ],
    video: VIDEO_SRC,
  },
  {
    id: 'chat',
    label: 'Chat Window',
    icon: MessageSquare,
    headline: 'Ask Your Network Anything.',
    description:
      'Natural language queries, real-time answers. No CLI, no digging through dashboards — just type what you need and get the data instantly. Escalate to a ticket with one click.',
    features: [
      'Natural language interface',
      'Live network context',
      'Auto-escalate to ticket',
      'No training required',
    ],
    video: VIDEO_SRC,
  },
  {
    id: 'troubleshooting',
    label: 'Troubleshooting Pack',
    icon: ShieldCheck,
    headline: 'Issues Resolved Before You Notice Them.',
    description:
      'AI monitors your infrastructure 24/7, detects anomalies, traces root causes, and runs remediation playbooks automatically. Your team stops firefighting and starts leading.',
    features: [
      'Anomaly detection',
      'Root cause analysis',
      'Auto-remediation playbooks',
      'Alert fatigue eliminated',
    ],
    video: VIDEO_SRC,
  },
  {
    id: 'config',
    label: 'Configuration Templates',
    icon: Settings,
    headline: 'Standardised Configs. Deployed in Minutes.',
    description:
      'Pre-built and custom configuration templates for Cisco, Juniper, Fortinet and more — applied consistently across every device, every time. Compliance validated before deployment.',
    features: [
      'Multi-vendor support',
      'Version control built-in',
      'Compliance validation',
      'One-click bulk deploy',
    ],
    video: VIDEO_SRC,
  },
];

const VideoPlayer = ({ src }) => {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <div
      onClick={togglePlay}
      style={{
        aspectRatio: '16/10',
        position: 'relative',
        background: '#0f172a',
        cursor: 'pointer',
        overflow: 'hidden',
      }}
    >
      <video
        ref={videoRef}
        src={src}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        playsInline
        onEnded={() => setPlaying(false)}
      />
      {!playing && (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(0,0,0,0.35)',
        }}>
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: 72, height: 72, borderRadius: '50%',
              background: 'linear-gradient(135deg, #3b82f6, #7c3aed)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 40px rgba(99,102,241,0.5)',
            }}
          >
            <Play fill="white" color="white" size={28} style={{ marginLeft: 4 }} />
          </motion.div>
        </div>
      )}
    </div>
  );
};

const TiltedVideo = ({ src, isMobile }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: isMobile ? 0 : [0, -10, 0] }}
    transition={{
      opacity: { duration: 0.6 },
      y: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.8 },
    }}
    className="relative w-full rounded-2xl overflow-hidden"
    style={{
      border: '1px solid rgba(99, 102, 241, 0.4)',
      boxShadow: '0 0 40px rgba(99, 102, 241, 0.25), 0 30px 80px rgba(0,0,0,0.6)',
    }}
  >
    <VideoPlayer src={src} />
  </motion.div>
);

const Solutions = () => {
  const { openBooking } = useBooking();
  const [activeIdx, setActiveIdx] = useState(0);
  const active = tabs[activeIdx].id;
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

        {/* Circular donut chart navigation */}
        <div className="flex justify-center mb-16">
          <DonutChartInteractive
            size={340}
            segmentLabels={tabs.map(tab => tab.label)}
            onSegmentClick={setActiveIdx}
          />
        </div>

        {/* Tab content */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left — text animates on tab change */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="space-y-7"
            >
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
            </motion.div>
          </AnimatePresence>

          {/* Right — video stays mounted so playback continues across tab switches */}
          <TiltedVideo src={current.video} isMobile={isMobile} />
        </div>

      </div>
    </section>
  );
};

export default Solutions;
