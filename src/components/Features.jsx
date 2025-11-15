import React from 'react';
import { motion } from 'framer-motion';
import { GitBranch, BrainCircuit, Copy, Layers, Cpu, MessageSquare, Rocket, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Features = () => {
  const { toast } = useToast();

  const handleDemoClick = () => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  const stats = [
    { value: '75:1', label: 'Reduction in Ticket Volume' },
    { value: '85%', label: 'Faster Mean Time to Detect' },
    { value: '5.25x', label: 'Return on Investment' },
    { value: '95%', label: 'Alert Noise Reduction' },
  ];

  const capabilities = [
    {
      icon: GitBranch,
      title: 'Patented Correlation Engine',
      description: 'Instantly isolates root cause across domains without rules, thresholds, or guesswork.',
    },
    {
      icon: BrainCircuit,
      title: 'Network Language Model',
      description: 'Ask plain-language questions and get RCA-ready answers, trained on real operational telemetry.',
    },
    {
      icon: Copy,
      title: 'Built-in Digital Twin',
      description: 'Get real time, topology-aware models of your environment for impact analysis, simulation, and planning.',
    },
    {
      icon: Layers,
      title: 'Truly Full Stack (L1-L7)',
      description: 'See infrastructure, network, and application layers in one unified platform – not numerous disjointed tools.',
    },
    {
      icon: Cpu,
      title: 'AI-Native Architecture',
      description: 'Purpose-built ML engine detects anomalies, enriches alerts, and automates correlation – no tuning required.',
    },
    {
      icon: MessageSquare,
      title: 'Copilot in Your Workflow',
      description: 'Investigate and resolve incidents directly from Slack, Teams, CLI, or dashboards with actionable, explainable insights.',
    },
    {
      icon: Rocket,
      title: 'Fast to Deploy',
      description: 'Integrates with 300+ data sources out of the box – minimal lift, live in weeks.',
    },
  ];

  return (
    <section className="relative py-32 px-4 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-gradient">How Does AI-Powered Network Operations Work?</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-4xl mx-auto">
            Our AIOps platform delivers automated network monitoring, self-healing systems, and predictive analytics. Experience hyperautomation with AI-driven IT operations that transform network infrastructure automation. From AI-powered correlation to full stack visibility, here's what you get with AI network automation that legacy tools can't deliver.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20 text-center"
        >
          {stats.map((stat, index) => (
            <div key={index} className="bg-slate-900/30 p-6 rounded-xl border border-slate-800">
              <p className="text-5xl font-bold text-gradient glow-effect mb-2">{stat.value}</p>
              <p className="text-slate-400">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        <div className="text-center mb-20">
          <Button
            onClick={handleDemoClick}
            size="lg"
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