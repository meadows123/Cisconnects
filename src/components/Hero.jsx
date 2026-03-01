
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Cloud } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {

  const floatingIcons = [
    { Icon: Sparkles, delay: 0, x: -100, y: -50 },
    { Icon: Zap, delay: 0.2, x: 100, y: -80 },
    { Icon: Cloud, delay: 0.4, x: -80, y: 80 },
    { Icon: Sparkles, delay: 0.6, x: 120, y: 60 },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-20 pt-40">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-slate-950 to-purple-950">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg1OSwgMTMwLCAyNDYsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
      </div>

      {/* Floating Icons */}
      {floatingIcons.map(({ Icon, delay, x, y }, index) => (
        <motion.div
          key={index}
          className="absolute text-blue-400/20"
          initial={{ opacity: 0, x: 0, y: 0 }}
          animate={{ 
            opacity: [0.2, 0.5, 0.2],
            x: [0, x, 0],
            y: [0, y, 0],
          }}
          transition={{
            duration: 8,
            delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Icon size={80} />
        </motion.div>
      ))}

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm"
            >
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-300">Leading or reacting? The choice is yours.</span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="text-gradient glow-effect">You're Not Just Managing Systems.</span>
              <br />
              <span className="text-white">You're Managing Risk.</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 leading-relaxed">
              Operational complexity doesn't just strain your engineers. It increases exposure at the leadership level.
            </p>

            <div className="flex flex-wrap gap-12 justify-center lg:justify-start pt-6">
              <Link to="/contact">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-blue-500/50 transition-all hover:shadow-xl hover:shadow-blue-500/70"
                >
                  Get Started
                  <Zap className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-blue-500/50 text-blue-300 hover:bg-blue-500/10 px-8 py-6 text-lg rounded-xl backdrop-blur-sm"
                >
                  Learn More
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="pt-8 flex flex-col lg:flex-row gap-12"
            >
              <div>
                <p className="text-2xl md:text-3xl font-bold text-gradient">30–50%</p>
                <p className="text-slate-400 mt-2">Less repetitive operational effort</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-gradient">Up to 60%</p>
                <p className="text-slate-400 mt-2">Lower manual overhead</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - CTA Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-blue-900/30 via-slate-900/40 to-purple-900/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-2">
                    <span className="text-gradient">Ready to Cut Costs?</span>
                  </h2>
                  <p className="text-2xl font-semibold text-white">Let's Talk.</p>
                </div>

                <p className="text-lg text-slate-300 leading-relaxed">
                  Join 500+ companies saving millions with AI automation. Start today.
                </p>

                {/* ROI Benefits */}
                <div className="space-y-4 pt-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                    <p className="text-slate-300">Reduce manual overhead by up to 60%</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                    <p className="text-slate-300">Free your team for strategic work</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                    <p className="text-slate-300">Deploy in weeks, see ROI in 90 days</p>
                  </div>
                </div>

                <Link to="/contact">
                  <Button 
                    size="lg" 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-6 text-lg rounded-xl shadow-lg shadow-blue-500/50 transition-all hover:shadow-xl hover:shadow-blue-500/70 mt-6"
                  >
                    Schedule Your Assessment
                    <Zap className="ml-2 w-5 h-5" />
                  </Button>
                </Link>

                {/* Trust Stats */}
                <div className="pt-8 border-t border-white/10 space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-xl font-bold text-gradient">10,000+</p>
                      <p className="text-sm text-slate-400 mt-1">Devices Automated</p>
                    </div>
                    <div>
                      <p className="text-xl font-bold text-gradient">99.9%</p>
                      <p className="text-sm text-slate-400 mt-1">Uptime Guarantee</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-blue-300">24/7 Expert Support</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
  