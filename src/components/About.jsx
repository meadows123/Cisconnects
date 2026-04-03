import React from 'react';
import { motion } from 'framer-motion';
import { 
  Brain,
  Award,
  Heart,
  Network,
  Users,
  Leaf,
  UserCheck,
  Sparkles,
  TrendingUp,
  Clock,
  DollarSign,
  ArrowRight,
  Mail,
  MapPin,
  Phone
} from 'lucide-react';
import Navigation from './Navigation';
import Footer from './Footer';
import SEO from './SEO';
import { useBooking } from '@/context/BookingContext';

const About = () => {
  const { openBooking } = useBooking();
  const highlights = [
    { icon: Brain, label: 'Crafted AI Automation', gradient: 'from-blue-500 to-cyan-500' },
    { icon: Award, label: 'Proven Expertise', gradient: 'from-purple-500 to-pink-500' },
    { icon: Heart, label: 'Customer Satisfaction', gradient: 'from-red-500 to-orange-500' },
    { icon: Network, label: 'Network Support', gradient: 'from-green-500 to-teal-500' }
  ];

  const stats = [
    { value: '30%', label: 'Reduction in Operational Costs', icon: DollarSign },
    { value: '40%', label: 'Boost in Productivity', icon: TrendingUp },
    { value: '1-2hrs', label: 'Saved per Employee Daily', icon: Clock },
    { value: '23%', label: 'Businesses Using AI Fully', icon: Sparkles }
  ];

  const values = [
    {
      icon: Users,
      title: 'Community',
      description: 'We believe in building strong connections with the people and places we serve. At InfraOpsAI, we aim to create positive, lasting impacts that benefit both our clients and their local communities.',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: UserCheck,
      title: 'Helping People',
      description: 'Our mission is to make AI Automation accessible and affordable for all. We\'re dedicated to helping businesses of all sizes, save money, and contribute to an easier future.',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Heart,
      title: 'Togetherness',
      description: 'We\'re firm believers in the power of working together. Whether it\'s within our team, with our clients, or alongside local partners, we know that collaboration is key to creating lasting change.',
      gradient: 'from-red-500 to-orange-500'
    },
    {
      icon: Leaf,
      title: 'Sustainability',
      description: 'We are deeply committed to protecting the planet for future generations. That is why 1% of profits is donated to World Land Trust Ltd, which concentrates on environmental and rain-forest conservation projects.',
      gradient: 'from-green-500 to-teal-500'
    }
  ];

  const team = [
    {
      name: 'Zak Meadows',
      role: 'CEO',
      avatar: 'Z',
      photo: '/Zak-Photo.jpeg',
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      name: 'Jane Kirley',
      role: 'Finance Manager',
      avatar: 'J',
      gradient: 'from-pink-500 to-red-500'
    },
    {
      name: 'George Jordan',
      role: 'Partner',
      avatar: 'G',
      gradient: 'from-green-500 to-teal-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <SEO
        title="About Us | Conxiea - AI Network Automation Experts"
        description="Learn about Conxiea - over 20 years of experience in AI network automation, infrastructure solutions, and digital transformation. Expert team delivering cutting-edge technology solutions for businesses worldwide."
        url="/about"
      />
      <Navigation />
      
      <div className="pt-40 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-gradient">About Us</span>
            </h1>
            <p className="text-2xl text-slate-300 max-w-3xl mx-auto">
              Harnessing the power of AI automation to revolutionize business operations
            </p>
          </motion.div>

          {/* Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <item.icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </div>
                <p className="text-sm md:text-base text-slate-300 font-medium">{item.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Our Story */}
          <section className="mb-32">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="text-gradient">Our Story</span>
                </h2>
                <div className="space-y-4 text-slate-300 leading-relaxed text-lg text-justify">
                  <p className="text-justify">
                    InfraOpsAI was born out of a passion for innovation and problem-solving. After developing powerful <strong className="text-white">AI automation tools</strong> and seeing firsthand how they transformed complex network and business <strong className="text-white">operations</strong>, we realized there was a massive gap in the market—many businesses were still struggling with manual, time-consuming processes.
                  </p>
                  <p className="text-justify">
                    The incredible efficiency and accuracy AI automation can offer inspired us to bring these solutions to other companies. Our goal is simple: to help businesses <strong className="text-white">unlock</strong> their full <strong className="text-white">potential</strong> by leveraging the power of AI-driven automation to streamline operations, reduce costs, and stay ahead of the competition.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 shadow-2xl shadow-blue-500/30">
                  <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <h3 className="text-3xl font-bold text-white">Our Mission</h3>
                    </div>
                    <p className="text-slate-200 leading-relaxed text-xl font-medium mt-6">
                      To empower businesses worldwide with cutting-edge AI automation solutions that drive efficiency, innovation, and sustainable growth
                    </p>
                  </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>
              </motion.div>
            </div>
          </section>

          {/* AI Automation Benefits */}
          <section className="mb-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-gradient">AI Automation: The Key to Efficiency and Growth</span>
              </h2>
              <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
                In today's fast-paced business world, manual processes are becoming a bottleneck for growth. Studies show that implementing AI automation can transform operations dramatically.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:border-blue-500/50 transition-all hover:-translate-y-2"
                >
                  <stat.icon className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                  <p className="text-4xl font-bold text-gradient mb-2">{stat.value}</p>
                  <p className="text-slate-400">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl p-8 text-center"
            >
              <p className="text-lg text-slate-200 leading-relaxed">
                Despite its clear benefits, only <strong className="text-white">23% of businesses</strong> are fully leveraging AI automation, missing out on game-changing insights and efficiencies. As the demand for faster, smarter operations grows, adopting AI tools is no longer a luxury but a <strong className="text-white">necessity for staying competitive</strong>.
              </p>
            </motion.div>
          </section>

          {/* Core Values */}
          <section className="mb-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-gradient">Our Core Values</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-slate-800/30 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-blue-500/50 transition-all group"
                >
                  <div className="flex items-start gap-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${value.gradient} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      <value.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-gradient transition-colors">
                        {value.title}
                      </h3>
                      <p className="text-slate-300 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Our Team */}
          <section className="mb-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-gradient">Our Team</span>
              </h2>
              <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
                At InfraOpsAI, we operate with <strong className="text-white">precision</strong>, professionalism, and a deep understanding of modern IT infrastructure.
                <br /><br />
                From small setups to complex network projects, our structured approach ensures every detail is planned, tested, and <strong className="text-white">delivered</strong> to the highest standard.
                <br />
                With over a decade of experience, we <strong className="text-white">pride</strong> ourselves on doing things right, the first time.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center group"
                >
                  <div className="relative mb-6 inline-block">
                    <div className={`w-32 h-32 bg-gradient-to-br ${member.gradient} rounded-full flex items-center justify-center mx-auto shadow-2xl group-hover:scale-110 transition-transform overflow-hidden`}>
                      {member.photo
                        ? <img src={member.photo} alt={member.name} className="w-full h-full object-cover object-center rounded-full" style={{ imageRendering: 'crisp-edges' }} />
                        : <span className="text-5xl font-bold text-white">{member.avatar}</span>
                      }
                    </div>
                    <div className={`absolute inset-0 bg-gradient-to-br ${member.gradient} rounded-full blur-2xl opacity-30 group-hover:opacity-40 transition-opacity pointer-events-none`}></div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                  <p className="text-blue-400 font-medium">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Book a Consultation CTA */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center text-white shadow-2xl relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Book an AI Consultation
                </h2>
                <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                  Let's discuss how AI automation can transform your business operations
                </p>
                <button
                  onClick={openBooking}
                  className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-lg hover:scale-105"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.section>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-3 gap-8"
          >
            <div className="bg-slate-800/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center hover:border-blue-500/50 transition-all">
              <MapPin className="w-10 h-10 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-4">Office</h3>
              <p className="text-slate-300">25 Lyndey Road<br />Bristol, BS16 9HG</p>
            </div>
            <div className="bg-slate-800/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center hover:border-blue-500/50 transition-all">
              <Mail className="w-10 h-10 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-4">Contact</h3>
              <a href="mailto:admin@conxiea.com" className="text-blue-400 hover:text-blue-300 transition-colors">
                admin@conxiea.com
              </a>
            </div>
            <div className="bg-slate-800/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center hover:border-blue-500/50 transition-all">
              <Clock className="w-10 h-10 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-4">Open Hours</h3>
              <p className="text-slate-300">Monday-Saturday<br />8am - 6pm<br />Sunday 11am - 4pm</p>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
