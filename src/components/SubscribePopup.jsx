import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';

const STORAGE_KEY = 'subscribe_popup_dismissed';

const SubscribePopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null); // null | 'submitting' | 'success' | 'error'

  useEffect(() => {
    // Don't show if user already dismissed or subscribed
    if (localStorage.getItem(STORAGE_KEY)) return;

    const timer = setTimeout(() => setIsOpen(true), 60000); // 1 minute
    return () => clearTimeout(timer);
  }, []);

  // Prevent background scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const dismiss = () => {
    setIsOpen(false);
    localStorage.setItem(STORAGE_KEY, 'dismissed');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('submitting');

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: email.split('@')[0], email, source: 'subscribe-popup' }),
      });

      if (!res.ok) throw new Error('Failed');
      setStatus('success');
      window.gtag?.('event', 'conversion_event_submit_lead_form', {});
      localStorage.setItem(STORAGE_KEY, 'subscribed');
      setTimeout(() => setIsOpen(false), 2500);
    } catch {
      setStatus('error');
    }
  };

  // Floating particles config
  const particles = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: i * 0.4,
    size: 4 + (i % 3) * 3,
  }));

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9998] flex items-end sm:items-center justify-center p-4 sm:p-6"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={dismiss}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ type: 'spring', damping: 22, stiffness: 280 }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl"
            style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)' }}
          >
            {/* Animated border glow */}
            <div className="absolute inset-0 rounded-3xl" style={{
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6)',
              backgroundSize: '300% 300%',
              padding: '1.5px',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              animation: 'borderSpin 4s linear infinite',
            }} />

            {/* Floating particles */}
            {particles.map((p) => (
              <motion.div
                key={p.id}
                className="absolute rounded-full bg-blue-400/30 pointer-events-none"
                style={{ width: p.size, height: p.size, left: `${p.x}%`, top: '-10px' }}
                animate={{ y: ['0%', '110vh'], opacity: [0, 0.8, 0] }}
                transition={{ duration: 4 + p.id, delay: p.delay, repeat: Infinity, ease: 'linear' }}
              />
            ))}

            {/* Close button */}
            <button
              onClick={dismiss}
              className="absolute top-4 right-4 z-10 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative z-10 p-8 pt-10">
              {/* Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
                className="flex items-center justify-center w-16 h-16 rounded-2xl mx-auto mb-6 shadow-2xl"
                style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}
              >
                <Sparkles className="w-8 h-8 text-white" />
              </motion.div>

              {/* Headline */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="text-center mb-2"
              >
                <h2 className="text-2xl font-bold text-white leading-tight">
                  Stay Ahead of the Curve
                </h2>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-slate-400 text-sm text-center mb-6 leading-relaxed"
              >
                Get AI automation tips, case studies, and exclusive insights delivered straight to your inbox. No spam, ever.
              </motion.p>

              {/* Perks */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="flex flex-col gap-2 mb-6"
              >
                {['Free AI automation playbook', 'Weekly industry insights', 'Exclusive early access offers'].map((perk) => (
                  <div key={perk} className="flex items-center gap-2 text-sm text-slate-300">
                    <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}>
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                    {perk}
                  </div>
                ))}
              </motion.div>

              {/* Form */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {status === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-4"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3"
                      style={{ background: 'linear-gradient(135deg, #10b981, #3b82f6)' }}
                    >
                      <CheckCircle className="w-7 h-7 text-white" />
                    </motion.div>
                    <p className="text-white font-semibold text-lg">You're in!</p>
                    <p className="text-slate-400 text-sm mt-1">Check your inbox for a welcome email.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>

                    {status === 'error' && (
                      <p className="text-red-400 text-xs text-center">Something went wrong. Please try again.</p>
                    )}

                    <motion.button
                      type="submit"
                      disabled={status === 'submitting'}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-white text-sm transition-all disabled:opacity-60 shadow-lg"
                      style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}
                    >
                      {status === 'submitting' ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          Get Free Access
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </motion.button>

                    <button
                      type="button"
                      onClick={dismiss}
                      className="text-xs text-slate-500 hover:text-slate-400 transition-colors text-center mt-1"
                    >
                      No thanks, I'll miss out
                    </button>
                  </form>
                )}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SubscribePopup;
