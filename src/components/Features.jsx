import React from 'react';
import { motion } from 'framer-motion';
import { GitBranch, BrainCircuit, Copy, Layers, Cpu, MessageSquare, Rocket, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBooking } from '@/context/BookingContext';

const Features = () => {
  const { openBooking } = useBooking();
  const stats = [
    { value: '75:1', label: 'Reduction in Ticket Volume' },
    { value: '85%', label: 'Faster Mean Time to Detect' },
    { value: '5.25x', label: 'Return on Investment' },
    { value: '95%', label: 'Alert Noise Reduction' },
  ];

  const capabilities = [
    {
      icon: GitBranch,
      title: 'Instant Root Cause',
      description: 'Find problems instantly. No guesswork.',
    },
    {
      icon: BrainCircuit,
      title: 'AI That Understands',
      description: 'Ask questions. Get answers. In plain English.',
    },
    {
      icon: Copy,
      title: 'Digital Twin Built-In',
      description: 'See everything. Predict problems. Plan better.',
    },
    {
      icon: Layers,
      title: 'Full Stack Visibility',
      description: 'One platform. All layers. Zero confusion.',
    },
    {
      icon: Cpu,
      title: 'Self-Healing Systems',
      description: 'AI detects. AI fixes. You sleep.',
    },
    {
      icon: MessageSquare,
      title: 'Works Where You Work',
      description: 'Slack. Teams. CLI. Your choice.',
    },
    {
      icon: Rocket,
      title: 'Deploy in Weeks',
      description: '300+ integrations. Zero hassle.',
    },
  ];

  return (
    <section className="relative py-16 md:py-32 px-4 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-gradient">Why Choose InfraOps?</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-4xl mx-auto">
            Real results. Real fast. See the numbers that matter.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10 md:mb-20 text-center"
        >
          {stats.map((stat, index) => (
            <div key={index} className="bg-slate-900/30 p-6 rounded-xl border border-slate-800">
              <p className="text-5xl font-bold text-gradient glow-effect mb-2">{stat.value}</p>
              <p className="text-slate-400">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        <div className="text-center mb-10 md:mb-20">
          <Button
              size="lg"
              onClick={openBooking}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-blue-500/50 transition-all hover:shadow-xl hover:shadow-blue-500/70"
            >
              See a Live Demo
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] text-left">
            <div className="p-6 border-b md:border-b-0 md:border-r border-slate-800">
              <h3 className="text-xl font-bold text-white">Capability</h3>
            </div>
            <div className="p-6 border-b md:border-b-0 border-slate-800 hidden md:block">
              <h3 className="text-xl font-bold text-white">What it Delivers</h3>
            </div>
          </div>

          {capabilities.map((capability, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="grid grid-cols-1 md:grid-cols-[1fr_2fr] text-left border-t border-slate-800 hover:bg-slate-800/50 transition-colors duration-300"
            >
              <div className="p-6 flex items-center gap-4">
                <capability.icon className="w-8 h-8 text-blue-400 flex-shrink-0" />
                <h4 className="font-semibold text-white">{capability.title}</h4>
              </div>
              <div className="p-6 flex items-center">
                <p className="text-slate-400">{capability.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;