import React from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  TrendingUp,
  Zap,
  Target,
  Users,
  BarChart3
} from 'lucide-react';

const EnterpriseValue = () => {
  const benefits = [
    { icon: CheckCircle2, text: "Standardise operational checks" },
    { icon: TrendingUp, text: "Detect anomalies earlier" },
    { icon: Zap, text: "Reduce configuration drift" },
    { icon: Target, text: "Accelerate root cause identification" },
    { icon: Users, text: "Free engineering capacity for strategic initiatives" }
  ];

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            <span className="text-gradient">Move from Reactive to Proactive with AI Network Automation</span>
          </h2>

          <div className="prose prose-invert max-w-none mb-12">
            <p className="text-xl text-slate-300 leading-relaxed mb-6">
              Conxiea applies AI-driven automation and unified infrastructure intelligence to move operations from reactive support to proactive control.
            </p>

            <p className="text-xl text-slate-300 leading-relaxed mb-6">
              Designed for complex, multi-vendor environments, the platform introduces a structured automation layer across your network, cloud, and security stack — reducing manual dependency and improving operational visibility.
            </p>

            <p className="text-lg text-slate-400 leading-relaxed mb-8">
              Instead of adding more tools or more headcount, leading teams are implementing automation frameworks that:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-4 p-4 bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-lg hover:border-blue-500/50 transition-all"
                >
                  <Icon className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                  <p className="text-slate-300 font-medium">{benefit.text}</p>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-xl p-8"
          >
            <div className="flex items-start gap-4">
              <BarChart3 className="w-8 h-8 text-blue-400 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-white mb-2">The Result</h3>
                <p className="text-slate-300">
                  Measurable improvement — not just tooling.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default EnterpriseValue;
