import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import LatestBlogs from '@/components/LatestBlogs';
import TrustpilotWidget from '@/components/TrustpilotWidget';
import SEO from '@/components/SEO';
import StructuredData from '@/components/StructuredData';
import { 
  BrainCircuit, 
  Globe, 
  MessageSquare, 
  Network,
  Zap,
  ArrowRight,
  Sparkles,
  Cloud,
  Bot,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/toaster';

function App() {
  const services = [
    {
      icon: BrainCircuit,
      title: 'InfraAIOps',
      description: 'What is AIOps? AI-powered network automation for cloud and on-premise infrastructure. AIOps redefined with automated network monitoring, firewall migration automation, and network engineering automation. Transform your network operations with AI-driven IT operations.',
      link: '/infraaiops',
      gradient: 'from-blue-600 to-cyan-600',
      color: 'blue'
    },
    {
      icon: MessageSquare,
      title: 'AI Text Back',
      description: 'Never miss a call again. Automated text-back service that captures leads 24/7 and converts missed calls into appointments.',
      link: '/missedcalltextback',
      gradient: 'from-purple-600 to-pink-600',
      color: 'purple'
    },
    {
      icon: Globe,
      title: 'Website Services',
      description: 'Professional website design with Bronze, Silver, and Gold packages. Get a custom website that drives results for your business.',
      link: '/websites',
      gradient: 'from-amber-500 to-orange-600',
      color: 'amber'
    },
    {
      icon: Network,
      title: 'Network Solutions',
      description: 'Comprehensive network automation, migrations, and infrastructure design services for businesses of all sizes.',
      link: '/services',
      gradient: 'from-green-500 to-teal-600',
      color: 'green'
    }
  ];

  const features = [
    {
      icon: Zap,
      title: 'Fast Implementation',
      description: 'Get up and running quickly with our streamlined processes'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security and 99.9% uptime guarantee'
    },
    {
      icon: Cloud,
      title: 'Scalable Solutions',
      description: 'Grow with confidence - our solutions scale with your business'
    },
    {
      icon: Bot,
      title: 'AI-Powered',
      description: 'Leverage cutting-edge AI to automate and optimize operations'
    }
  ];

  return (
    <>
      <SEO
        title="AI Network Automation Services UK | AIOps Redefined | Cisconnects"
        description="What is AIOps? Network automation services UK with AI network automation, cloud network automation, firewall migration automation, and network engineering automation. Managed network automation service with AI-driven IT operations and automated network monitoring."
        url="/"
      />
      <StructuredData
        type="Organization"
        data={{}}
      />
      <div className="min-h-screen bg-slate-950 overflow-hidden">
        <Navigation />
        
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-20 pt-40">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-slate-950 to-purple-950">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg1OSwgMTMwLCAyNDYsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm"
              >
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-blue-300">Complete Digital Solutions</span>
              </motion.div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="text-gradient glow-effect">AI Network Automation</span>
                <br />
                <span className="text-white">Services UK</span>
              </h1>

              <p className="text-xl md:text-2xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
                How does network automation reduce costs? Our AI network automation services UK provide cloud network automation, firewall migration automation, and network engineering automation. Experience AIOps redefined with managed network automation service, automated network monitoring, and AI-driven IT operations for enterprise cloud and small business UK.
              </p>

              <div className="flex flex-wrap gap-4 justify-center pt-4">
                <Link to="/contact">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-blue-500/50 transition-all hover:shadow-xl hover:shadow-blue-500/70"
                  >
                    Get Started
                    <Zap className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/services">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-2 border-blue-500/50 text-blue-300 hover:bg-blue-500/10 px-8 py-6 text-lg rounded-xl backdrop-blur-sm"
                  >
                    Explore Services
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
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
                <span className="text-gradient">Our Services</span>
              </h2>
              <p className="text-xl text-slate-400 max-w-4xl mx-auto">
                Comprehensive digital solutions designed to elevate your business
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group relative bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20"
                  >
                    <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-gradient transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-slate-300 mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    <Link to={service.link}>
                      <motion.div
                        whileHover={{ x: 5 }}
                        className="inline-flex items-center gap-2 text-blue-400 font-semibold group-hover:text-blue-300 transition-colors"
                      >
                        Learn More
                        <ArrowRight className="w-5 h-5" />
                      </motion.div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="relative py-24 px-4 bg-gradient-to-b from-slate-900 to-slate-950">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Why Choose Us?
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                    <p className="text-slate-300">{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Latest Insights Section */}
        <LatestBlogs />

        {/* Trustpilot Section */}
        <section className="relative py-24 px-4 bg-gradient-to-b from-slate-950 to-slate-900">
          <div className="max-w-7xl mx-auto">
            <TrustpilotWidget />
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-32 px-4 bg-gradient-to-b from-slate-950 to-slate-900 overflow-hidden">
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

          <div className="max-w-5xl mx-auto relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <h2 className="text-5xl md:text-7xl font-bold leading-tight">
                Ready to Get Started?
              </h2>

              <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
                Let's discuss how our digital solutions can transform your business
              </p>

              <div className="flex flex-wrap gap-6 justify-center pt-8">
                <Link to="/contact">
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-8 text-xl rounded-2xl shadow-2xl shadow-blue-500/50 transition-all hover:shadow-blue-500/70 hover:scale-105"
                  >
                    Contact Us
                    <ArrowRight className="ml-3 w-6 h-6" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
        <Toaster />
      </div>
    </>
  );
}

export default App;
