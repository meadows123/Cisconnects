
import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, Server, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBooking } from '@/context/BookingContext';

const Solutions = () => {
  const { openBooking } = useBooking();
  const solutions = [
    {
      icon: Cloud,
      title: 'Cloud Network Automation',
      description: 'Automate AWS, Azure, Google Cloud. One platform. Zero headaches.',
      features: ['Multi-cloud support', 'Auto-scaling', 'Cost optimization', 'Real-time monitoring'],
      gradient: 'from-blue-600 to-cyan-600',
      image: 'Modern cloud infrastructure with servers and network connections in a futuristic data center',
    },
    {
      icon: Server,
      title: 'On-Premise Automation',
      description: 'Own your stack. Control your destiny. AI-powered operations.',
      features: ['Unified policy management', 'Automated compliance reporting', 'AI-assisted troubleshooting', 'Hybrid orchestration'],
      gradient: 'from-purple-600 to-pink-600',
      image: 'On-premise server room with modern networking equipment and glowing lights',
    },
  ];

  return (
    <section className="relative py-32 px-4 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-gradient">Cloud or On-Premise?</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            We've got you covered. Both ways.
          </p>
        </motion.div>

        <div className="space-y-32">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
            >
              <div className={`space-y-8 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r ${solution.gradient} bg-opacity-10 border border-white/10`}>
                  <solution.icon className="w-6 h-6 text-white" />
                  <span className="font-semibold text-white">{solution.title}</span>
                </div>

                <h3 className="text-4xl font-bold text-white leading-tight">
                  {solution.description}
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  {solution.features.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center gap-2"
                    >
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${solution.gradient}`} />
                      <span className="text-base md:text-lg text-slate-300">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                <Button
                    size="lg"
                    onClick={openBooking}
                    className={`bg-gradient-to-r ${solution.gradient} hover:opacity-90 text-white px-8 py-6 text-lg rounded-xl shadow-lg transition-all`}
                  >
                    Learn More
                    <Layers className="ml-2 w-5 h-5" />
                  </Button>
              </div>

              <motion.div
                className={`relative ${index % 2 === 1 ? 'lg:order-1' : ''}`}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${solution.gradient} opacity-20 blur-3xl rounded-3xl`} />
                <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                  {index === 0 ? (
                    <img 
                      className="w-full h-auto" 
                      alt="Cloud AI Network Automation"
                      src="/CloudAI.png" />
                  ) : (
                    <img 
                      className="block w-full h-auto"
                      style={{ paddingBottom: '36px', background: 'linear-gradient(180deg, rgba(5,20,40,0.95) 0%, rgba(7,32,68,0.95) 100%)' }}
                      alt="On-Premise AI Solutions"
                      src="/On-Prem-AI.png" />
                  )}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;
  