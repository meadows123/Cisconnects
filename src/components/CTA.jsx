
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CTA = () => {

  return (
    <section className="relative py-32 px-4 bg-gradient-to-b from-slate-900 to-slate-950 overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/10 backdrop-blur-sm"
          >
            <Sparkles className="w-5 h-5 text-blue-400" />
            <span className="text-blue-300 font-semibold">Ready to Transform?</span>
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-bold leading-tight">
            Ready to Cut Costs?
            <br />
            <span className="text-gradient glow-effect">Let's Talk.</span>
          </h2>

          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Join 500+ companies saving millions with AI automation. Start today.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-6 justify-center pt-8"
          >
            <Link to="/contact">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-8 text-xl rounded-2xl shadow-2xl shadow-blue-500/50 transition-all hover:shadow-blue-500/70 hover:scale-105"
              >
                Get Started Free
                <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-white/20 text-white hover:bg-white/10 px-12 py-8 text-xl rounded-2xl backdrop-blur-sm hover:scale-105 transition-all"
              >
                Schedule Demo
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="pt-12 flex flex-wrap justify-center gap-12 text-center"
          >
            <div>
              <p className="text-4xl font-bold text-gradient">10,000+</p>
              <p className="text-slate-400 mt-2">Devices Automated</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-gradient">99.9%</p>
              <p className="text-slate-400 mt-2">Uptime Guarantee</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-gradient">24/7</p>
              <p className="text-slate-400 mt-2">Expert Support</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
  