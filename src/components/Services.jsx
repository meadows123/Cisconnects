import React from 'react';
import { motion } from 'framer-motion';
import { 
  BrainCircuit, 
  Network, 
  Cloud, 
  Users, 
  Monitor, 
  Shield, 
  Globe, 
  Bot,
  ArrowRight,
  CheckCircle,
  Clock,
  Award
} from 'lucide-react';
import Navigation from './Navigation';
import Footer from './Footer';

const Services = () => {
  const services = [
    {
      icon: BrainCircuit,
      title: 'AI-Driven Network Automation',
      description: 'Implemented AI-powered solutions to automate complex networking tasks, reducing manual effort and improving accuracy.',
      features: ['Automated network configurations', 'AI-powered troubleshooting', 'Predictive analytics', 'Reduced manual errors']
    },
    {
      icon: Network,
      title: 'Network Migrations',
      description: 'Seamless migrations for over 20+ sites, ensuring minimal downtime and improved performance for clients across industries.',
      features: ['Zero-downtime migrations', 'Multi-vendor support', 'Performance optimization', 'Risk mitigation']
    },
    {
      icon: Users,
      title: 'IT Support',
      description: 'Comprehensive IT support services to keep your infrastructure running smoothly and efficiently.',
      features: ['24/7 technical support', 'Proactive monitoring', 'Issue resolution', 'Performance optimization']
    },
    {
      icon: Cloud,
      title: 'Active Directory Cloud Migrations',
      description: 'Migrated over 500,000 AD objects to Azure AD, using advanced scripting and automation tools for efficiency.',
      features: ['Large-scale migrations', 'Automated scripts', 'Azure AD integration', 'Identity management']
    },
    {
      icon: Globe,
      title: 'Web Design Services',
      description: 'Created responsive, user-friendly websites, including the Polar Solar platform, driving traffic and engagement.',
      features: ['Responsive design', 'SEO optimization', 'User experience', 'Performance optimization']
    },
    {
      icon: Bot,
      title: 'AI Chatbots for Businesses',
      description: 'Developed AI chatbots for 24/7 customer engagement, boosting efficiency and improving sales conversion rates.',
      features: ['24/7 availability', 'Natural language processing', 'Sales automation', 'Customer engagement']
    },
    {
      icon: Monitor,
      title: 'Advanced Troubleshooting',
      description: 'We diagnose and resolve critical issues as soon as we possibly can.',
      features: ['Rapid issue identification', 'Root cause analysis', 'Emergency response', 'System optimization']
    },
    {
      icon: Cloud,
      title: 'Cloud Automation',
      description: 'Automated deployment of virtual machines, storage accounts, and network setups, reducing errors and speeding up delivery.',
      features: ['Infrastructure automation', 'CI/CD pipelines', 'Resource optimization', 'Cost reduction']
    },
    {
      icon: Shield,
      title: 'Wireless Network Surveys',
      description: 'Conducted detailed surveys to improve coverage and reliability, leveraging existing infrastructure like CAT5 and CAT7 cabling.',
      features: ['Site surveys', 'Coverage analysis', 'Performance testing', 'Infrastructure optimization']
    }
  ];

  const mainSolutions = [
    {
      title: 'AI-Driven Network Automation',
      description: 'Revolutionary AI solutions that automate complex network tasks and optimize performance.',
      icon: BrainCircuit
    },
    {
      title: 'Migrations',
      description: 'Seamless, zero-downtime migrations across multiple platforms and environments.',
      icon: Network
    },
    {
      title: 'Architecture Network Designs',
      description: 'Custom network architectures designed for scalability, security, and performance.',
      icon: Shield
    },
    {
      title: 'AI ChatBots',
      description: 'Intelligent chatbots that enhance customer engagement and automate business processes.',
      icon: Bot
    }
  ];

  const whyChooseUs = [
    {
      icon: BrainCircuit,
      title: 'AI Innovation at the Core',
      description: 'We harness cutting-edge AI to automate network tasks, streamline operations, and improve business efficiency.',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Users,
      title: 'Tailored Solutions',
      description: 'Every business is unique — our services are customized to fit your specific needs, ensuring seamless integration and optimal results.',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Award,
      title: 'Proven Expertise',
      description: 'With over 20 years of experience and successful projects across industries, we deliver solutions you can trust.',
      gradient: 'from-green-500 to-teal-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <Navigation />
      
      <div className="pt-40 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-gradient">Leading in AI Network Automation</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              More than 20 years of experience in network automation & AI
            </p>
          </motion.div>

          {/* Our Expertise Section */}
          <section className="mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-gradient">Our Expertise</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-gradient transition-colors">
                      {service.title}
                    </h3>
                  </div>

                  <p className="text-slate-300 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-slate-400">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Our Main Solutions */}
          <section className="mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-gradient">Our Main Solutions</span>
              </h2>
              <p className="text-xl text-slate-300 max-w-4xl mx-auto">
                At InfraOpsAI, our primary solution focuses on leveraging the power of <strong>AI automation</strong> to revolutionize how businesses manage their networks and operations.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {mainSolutions.map((solution, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                      <solution.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      {solution.title}
                    </h3>
                  </div>
                  <p className="text-slate-300 text-lg leading-relaxed">
                    {solution.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-gradient">Why Choose InfraOpsAI?</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {whyChooseUs.map((reason, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className={`w-20 h-20 bg-gradient-to-br ${reason.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/30`}>
                    <reason.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {reason.title}
                  </h3>
                  <p className="text-slate-300 leading-relaxed">
                    {reason.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white shadow-2xl"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Let Us Transform Your Business
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Make an appointment with one of our experts
            </p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-lg"
            >
              Contact Us
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16 grid md:grid-cols-3 gap-8 text-center"
          >
            <div className="bg-slate-800/30 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Office</h3>
              <p className="text-slate-300">25 Lyndey Road<br />Bristol, BS16 9HG</p>
            </div>
            <div className="bg-slate-800/30 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Contact</h3>
              <p className="text-slate-300">support@cisconnects.com</p>
            </div>
            <div className="bg-slate-800/30 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Open Hours</h3>
              <p className="text-slate-300">Monday-Saturday 8am - 6pm<br />Sunday 11am - 4pm</p>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Services;
