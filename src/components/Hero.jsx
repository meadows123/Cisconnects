
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-20">
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
              <span className="text-sm text-blue-300">AI-Powered Network Automation</span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="text-gradient glow-effect">Transform</span>
              <br />
              Your Network
              <br />
              Infrastructure
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 leading-relaxed">
              Automate your cloud and on-premise infrastructure with cutting-edge AI technology. 
              Seamless integration for all your network devices.
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4">
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
                  Schedule Demo
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="pt-8 flex flex-wrap justify-center lg:justify-start gap-8"
            >
              <div>
                <p className="text-3xl md:text-4xl font-bold text-gradient">10,000+</p>
                <p className="text-slate-400 mt-2">Devices Automated</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-gradient">99.9%</p>
                <p className="text-slate-400 mt-2">Uptime Guarantee</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-gradient">24/7</p>
                <p className="text-slate-400 mt-2">Expert Support</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Laptop Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              {/* Glow effect behind laptop */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 blur-3xl rounded-full"></div>
              
              {/* Laptop Image */}
              <motion.img
                src="/Laptop-mockup.png"
                alt="AI Automation Platform Dashboard"
                className="relative z-10 w-full h-auto drop-shadow-2xl"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
              />

              {/* Floating elements around laptop */}
              <motion.div
                className="absolute -top-6 -right-6 bg-gradient-to-br from-blue-500 to-cyan-500 p-4 rounded-2xl shadow-2xl"
                animate={{ 
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Zap className="w-8 h-8 text-white" />
              </motion.div>

              <motion.div
                className="absolute -bottom-6 -left-6 bg-gradient-to-br from-purple-500 to-pink-500 p-4 rounded-2xl shadow-2xl"
                animate={{ 
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 3,
                  delay: 0.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Cloud className="w-8 h-8 text-white" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
  