import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Cloud, Wrench } from 'lucide-react';

const points = [
  {
    icon: BrainCircuit,
    title: 'AIOps Platform',
    description: 'Correlates alerts, finds root cause, fixes it. No manual triage.',
  },
  {
    icon: Cloud,
    title: 'AI Network Automation',
    description: 'Self-healing infrastructure that acts, not just alerts.',
  },
  {
    icon: Wrench,
    title: 'Network Automation Services',
    description: 'UK-wide firewall, cloud, and config management, handled.',
  },
];

const HomeIntro = () => {
  return (
    <section className="relative py-16 md:py-24 px-4 bg-slate-950">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            What Is an <span className="text-gradient">AIOps Platform</span>?
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            AI that watches your network, catches the real problem, and fixes it before your team sees the ticket.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {points.map((point, index) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-slate-900/50 border border-slate-800 rounded-xl p-6"
            >
              <point.icon className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="text-white font-semibold text-lg mb-2">{point.title}</h3>
              <p className="text-slate-400">{point.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeIntro;
