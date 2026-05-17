import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedHeroBackground from './AnimatedHeroBackground';
import { 
  Phone, 
  MessageSquare, 
  Bell, 
  CheckCircle, 
  Star,
  Shield,
  TrendingUp,
  Smartphone,
  ArrowRight,
  Mail,
  PhoneCall,
  Calculator,
  Calendar,
  Clock,
  User
} from 'lucide-react';
import Navigation from './Navigation';
import Footer from './Footer';
import SEO from './SEO';
import emailjs from '@emailjs/browser';
import { useCurrency } from '../hooks/useCurrency';

const MissedCallTextBack = () => {
  const { formatCurrency, getAmount, currencySymbol } = useCurrency();
  const [calculatorData, setCalculatorData] = useState({
    averageClientValue: '',
    missedCallsPerMonth: '',
    averageCloseRate: ''
  });
  const [results, setResults] = useState(null);
  const [appointmentData, setAppointmentData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleCalculatorChange = (e) => {
    const { name, value } = e.target;
    setCalculatorData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateROI = () => {
    const clientValue = parseFloat(calculatorData.averageClientValue) || 0;
    const missedCalls = parseFloat(calculatorData.missedCallsPerMonth) || 0;
    const closeRate = parseFloat(calculatorData.averageCloseRate) || 0;

    // Calculate monthly potential revenue
    // Formula: (Missed Calls per Month) × (Average Client Value) × (Close Rate % / 100)
    const monthlyPotentialRevenue = missedCalls * clientValue * (closeRate / 100);
    
    // Monthly charge - using Black Friday price
    // Base price is £95 GBP, we store the base for display and converted for calculations
    const monthlyChargeBaseGBP = 95;
    const monthlyChargeConverted = getAmount(monthlyChargeBaseGBP);
    
    // Calculate ROI - matching reference site formula
    // ROI = ((Potential Revenue - Cost) / Cost) × 100
    // Use converted amount so calculation is in user's local currency
    const roi = monthlyPotentialRevenue > 0 && monthlyChargeConverted > 0
      ? ((monthlyPotentialRevenue - monthlyChargeConverted) / monthlyChargeConverted) * 100 
      : 0;

    setResults({
      monthlyLeftOnTable: monthlyPotentialRevenue,
      monthlyChargeBaseGBP: monthlyChargeBaseGBP, // Store base for formatCurrency display
      roi: roi
    });
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    calculateROI();
  };

  const handleAppointmentChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAppointmentSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // EmailJS configuration - using environment variables only
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

      if (!serviceId || !publicKey || !templateId) {
        throw new Error('EmailJS configuration is missing.');
      }

      // Initialize EmailJS
      emailjs.init(publicKey);

      // Prepare template parameters
      const templateParams = {
        from_name: appointmentData.name,
        from_email: appointmentData.email,
        phone: appointmentData.phone || 'Not provided',
        preferred_date: appointmentData.preferredDate || 'Not specified',
        preferred_time: appointmentData.preferredTime || 'Not specified',
        message: appointmentData.message || 'No additional message',
        service_interest: 'Missed Call Text-Back Appointment',
        to_name: 'Conxiea Team',
        reply_to: appointmentData.email,
      };

      // Send email
      await emailjs.send(serviceId, templateId, templateParams);
      
      setSubmitStatus('success');
      setAppointmentData({
        name: '',
        email: '',
        phone: '',
        preferredDate: '',
        preferredTime: '',
        message: ''
      });
    } catch (error) {
      console.error('Appointment booking error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <SEO
        title="AI Text Back Service | Never Miss a Call Again | Conxiea"
        description="Turn every missed call into a text message conversation. Never lose business to a missed call again with our automated missed-call text-back service. 24/7 lead capture and appointment booking automation."
        url="/missedcalltextback"
      />
      <div className="min-h-screen bg-[#0f0f3d] relative">
      <AnimatedHeroBackground />
        <Navigation />
        
        <div className="pt-40 pb-20 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="grid md:grid-cols-2 gap-16 items-center mb-32 py-12"
            >
              {/* Left Side - Illustration */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-transparent">
                  <img 
                    src="/phone-contractors.png" 
                    alt="Missed Call Text-Back Service - Phone contractors communication" 
                    className="w-full h-auto object-contain rounded-3xl"
                    loading="eager"
                  />
                </div>
              </motion.div>

              {/* Right Side - Text Content */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="space-y-8"
              >
                {/* Top Banner */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/40 rounded-full px-6 py-2 mb-4"
                >
                  <span className="text-2xl">🏆</span>
                  <p className="text-sm md:text-base font-medium text-blue-300">
                    Loved By Thousands of Businesses Around The World
                  </p>
                </motion.div>
                
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  <span className="text-gradient">Never Lose Business</span>
                  <br />
                  <span className="text-white">To A Missed Call Again!</span>
                </h1>
                
                <p className="text-lg md:text-xl text-slate-300 max-w-xl">
                  We'll turn every missed call into a text message conversation
                </p>
                
                <motion.a
                  href="#get-started"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:shadow-blue-500/50 transition-all"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Statistics Section */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-24 bg-gradient-to-r from-red-600/20 to-orange-600/20 border border-red-500/30 rounded-2xl p-8 md:p-12 text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Did You Know That More Than <span className="text-red-400">50% Of Inbound Calls</span> Go Unanswered Every Day???
              </h2>
              <p className="text-2xl md:text-3xl font-semibold text-slate-200">
                How much business is that costing you?
              </p>
            </motion.section>

            {/* ROI Calculator Section */}
            <section className="mb-24">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12"
              >
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 mb-4">
                    <Calculator className="w-8 h-8 text-blue-400" />
                    <h2 className="text-3xl md:text-4xl font-bold text-white">ROI Calculator</h2>
                  </div>
                  <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                    Get An Estimate Of How Much Your Missed Calls Are Costing You
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                  {/* Calculator Form */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="space-y-6"
                  >
                    <form onSubmit={handleCalculate} className="space-y-6">
                      <div>
                        <label htmlFor="averageClientValue" className="block text-sm font-semibold text-slate-300 mb-2">
                          Average Client Value:
                        </label>
                        <input
                          type="number"
                          id="averageClientValue"
                          name="averageClientValue"
                          value={calculatorData.averageClientValue}
                          onChange={handleCalculatorChange}
                          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          placeholder="Enter average lifetime value"
                          step="0.01"
                          min="0"
                        />
                      </div>

                      <div>
                        <label htmlFor="missedCallsPerMonth" className="block text-sm font-semibold text-slate-300 mb-2">
                          Missed Calls per Month:
                        </label>
                        <input
                          type="number"
                          id="missedCallsPerMonth"
                          name="missedCallsPerMonth"
                          value={calculatorData.missedCallsPerMonth}
                          onChange={handleCalculatorChange}
                          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          placeholder="Enter number of missed calls"
                          step="1"
                          min="0"
                        />
                      </div>

                      <div>
                        <label htmlFor="averageCloseRate" className="block text-sm font-semibold text-slate-300 mb-2">
                          Average Close Rate (%):
                        </label>
                        <input
                          type="number"
                          id="averageCloseRate"
                          name="averageCloseRate"
                          value={calculatorData.averageCloseRate}
                          onChange={handleCalculatorChange}
                          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          placeholder="Enter close rate percentage"
                          step="0.1"
                          min="0"
                          max="100"
                        />
                      </div>

                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl hover:shadow-blue-500/50 transition-all"
                      >
                        Calculate ROI
                      </motion.button>
                    </form>

                    <div className="mt-6 p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                      <p className="text-sm text-slate-300 mb-2 font-semibold">Instructions:</p>
                      <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
                        <li>Enter the average lifetime value of a customer</li>
                        <li>Enter an estimate of how many calls you miss per month</li>
                        <li>Enter the rate at which you close new sales</li>
                        <li>Hit Calculate and we'll show you how much money we can make you!</li>
                      </ul>
                    </div>
                  </motion.div>

                  {/* Results */}
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="space-y-6"
                  >
                    <div className="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full flex flex-col justify-center">
                      <h3 className="text-2xl font-bold text-white mb-6 text-center">Results:</h3>
                      
                      {results ? (
                        <div className="space-y-6">
                          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                            <p className="text-sm font-semibold text-slate-300 mb-2">Monthly $$$ Left on Table:</p>
                            <p className="text-3xl font-bold text-red-400">
                              {formatCurrency(Math.round(results.monthlyLeftOnTable))}
                            </p>
                          </div>

                          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                            <p className="text-sm font-semibold text-slate-300 mb-2">We Charge (per month):</p>
                            <p className="text-3xl font-bold text-white">
                              {formatCurrency(results.monthlyChargeBaseGBP)}
                            </p>
                          </div>

                          <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-xl p-6 border border-green-400">
                            <p className="text-sm font-semibold text-white mb-2">ROI:</p>
                            <p className="text-4xl font-bold text-white">
                              {Math.round(results.roi)}%
                            </p>
                          </div>

                          <motion.a
                            href="#get-started"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold text-center hover:shadow-xl hover:shadow-blue-500/50 transition-all mt-4"
                          >
                            Get Started Risk-Free For 7 Days!
                          </motion.a>
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <Calculator className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                          <p className="text-slate-400">Enter your values and click Calculate ROI to see your results</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </section>

            {/* How It Works Section */}
            <section className="mb-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">How It Works</span>
                </h2>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="bg-white/90 backdrop-blur-sm border-2 border-purple-200 rounded-2xl p-8 text-center hover:border-purple-400 hover:shadow-xl transition-all shadow-lg"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Phone className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">Missed Call</h3>
                  <p className="text-slate-600">Every time an inbound call to your business goes unanswered</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white/90 backdrop-blur-sm border-2 border-purple-200 rounded-2xl p-8 text-center hover:border-purple-400 hover:shadow-xl transition-all shadow-lg"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <MessageSquare className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">Auto Text-Back</h3>
                  <p className="text-slate-600">We'll send a text message back to the caller within seconds!</p>
                  <div className="mt-4 flex items-center justify-center gap-2 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-sm font-semibold">No missed-calls left behind</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-white/90 backdrop-blur-sm border-2 border-purple-200 rounded-2xl p-8 text-center hover:border-purple-400 hover:shadow-xl transition-all shadow-lg"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Bell className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">Continue Conversation</h3>
                  <p className="text-slate-600">When they reply, we'll push you a notification from our mobile app</p>
                  <div className="mt-4 flex items-center justify-center gap-2 text-purple-600">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-sm font-semibold">Turns missed-calls into SMS conversations</span>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Connecting In A Better Way Section */}
            <section className="mb-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">Connecting In A Better Way</span>
                </h2>
                <p className="text-xl text-slate-700 max-w-3xl mx-auto">
                  Communicate With Your Customers Via Chat
                </p>
                <p className="text-lg text-slate-600 mt-4 max-w-3xl mx-auto">
                  It's no secret most of us prefer chats over phone calls, but most businesses still aren't engaging with prospects and customers via their preferred method of communication.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    icon: MessageSquare,
                    title: 'Unlock The Power Of Chat',
                    description: 'Skyrocket your business by opening the most preferred communication channel',
                    gradient: 'from-blue-500 to-cyan-500'
                  },
                  {
                    icon: Phone,
                    title: 'Never Miss Another Call',
                    description: 'Never lose business because of a missed call again',
                    gradient: 'from-green-500 to-teal-500'
                  },
                  {
                    icon: Star,
                    title: 'Elevate Your Reputation',
                    description: 'Monitor, reply, and grow your reviews from your pocket',
                    gradient: 'from-yellow-500 to-orange-500'
                  },
                  {
                    icon: TrendingUp,
                    title: 'Increase Revenue From Google',
                    description: 'Activating Google Chat is like turning on a "free leads" faucet for your business',
                    gradient: 'from-purple-500 to-pink-500'
                  },
                  {
                    icon: Smartphone,
                    title: 'Manage Your Business From Your Pocket',
                    description: 'Take your business on the go with our mobile app',
                    gradient: 'from-indigo-500 to-blue-500'
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white/90 backdrop-blur-sm border-2 border-purple-200 rounded-2xl p-6 hover:border-purple-400 hover:shadow-xl transition-all hover:-translate-y-2 shadow-lg"
                  >
                    <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-4`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-3">{feature.title}</h3>
                    <p className="text-slate-600">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Pricing Section */}
            <section id="get-started" className="mb-24">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white/90 backdrop-blur-sm border-2 border-purple-300 rounded-3xl p-8 md:p-12 text-center shadow-2xl"
              >
                <div className="mb-8">
                  <div className="inline-block bg-red-100 border-2 border-red-400 rounded-full px-6 py-3 mb-4 animate-pulse">
                    <span className="text-red-700 font-bold text-lg">🔥 BLACK FRIDAY DEAL 🔥</span>
                  </div>
                  
                  <div className="inline-block bg-green-100 border-2 border-green-400 rounded-full px-4 py-2 mb-6">
                    <span className="text-green-700 font-semibold">7 DAY MONEY BACK GUARANTEE</span>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold mb-8 text-slate-800">What's Included</h2>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-8 max-w-3xl mx-auto text-left">
                    {[
                      'Missed-Call Text-Back Automation',
                      '2-Way SMS',
                      'Review Monitoring + Replies',
                      'Google Chat',
                      'Mobile App',
                      'Free Setup',
                      '7 Money-Back Guarantee'
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span className="text-slate-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <div className="mb-2">
                    <p className="text-2xl md:text-3xl text-slate-400 line-through mb-2">
                      Was {formatCurrency(297)} / Month
                    </p>
                    <p className="text-4xl md:text-5xl font-bold text-slate-800 mb-2">
                      Now Just <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">{formatCurrency(95)}</span> / Month!
                    </p>
                    <p className="text-lg md:text-xl text-green-600 font-semibold">
                      Save {formatCurrency(202)} per month - Limited Time Offer!
                    </p>
                  </div>
                </div>

                <motion.a
                  href="#trial"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all mb-8"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </motion.a>
              </motion.div>
            </section>

            {/* 7 Day Trial Section */}
            <section id="trial" className="mb-24">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Try It <span className="text-yellow-300">Risk Free For 7 Days!</span>
                </h2>
                <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                  We know missed calls are costing you a significant amount of business, and we're willing to prove it. Start a free 7 Day Trial today!
                </p>
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-lg"
                >
                  Start Free Trial
                  <ArrowRight className="w-5 h-5" />
                </motion.a>
              </motion.div>
            </section>

            {/* Book Appointment Section */}
            <section id="book-appointment" className="mb-24">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12"
              >
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 mb-4">
                    <Calendar className="w-8 h-8 text-blue-400" />
                    <h2 className="text-3xl md:text-4xl font-bold text-white">Book An Appointment</h2>
                  </div>
                  <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                    Schedule a consultation to learn how we can help you never miss another business opportunity
                  </p>
                </div>

                <div className="max-w-2xl mx-auto">
                  <form onSubmit={handleAppointmentSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="appointment-name" className="block text-sm font-semibold text-slate-300 mb-2">
                          <User className="w-4 h-4 inline mr-2" />
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="appointment-name"
                          name="name"
                          required
                          value={appointmentData.name}
                          onChange={handleAppointmentChange}
                          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          placeholder="John Smith"
                        />
                      </div>

                      <div>
                        <label htmlFor="appointment-email" className="block text-sm font-semibold text-slate-300 mb-2">
                          <Mail className="w-4 h-4 inline mr-2" />
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="appointment-email"
                          name="email"
                          required
                          value={appointmentData.email}
                          onChange={handleAppointmentChange}
                          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          placeholder="john@company.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="appointment-phone" className="block text-sm font-semibold text-slate-300 mb-2">
                        <Phone className="w-4 h-4 inline mr-2" />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="appointment-phone"
                        name="phone"
                        value={appointmentData.phone}
                        onChange={handleAppointmentChange}
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="+44 7708 227512"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="appointment-date" className="block text-sm font-semibold text-slate-300 mb-2">
                          <Calendar className="w-4 h-4 inline mr-2" />
                          Preferred Date
                        </label>
                        <input
                          type="date"
                          id="appointment-date"
                          name="preferredDate"
                          value={appointmentData.preferredDate}
                          onChange={handleAppointmentChange}
                          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>

                      <div>
                        <label htmlFor="appointment-time" className="block text-sm font-semibold text-slate-300 mb-2">
                          <Clock className="w-4 h-4 inline mr-2" />
                          Preferred Time
                        </label>
                        <input
                          type="time"
                          id="appointment-time"
                          name="preferredTime"
                          value={appointmentData.preferredTime}
                          onChange={handleAppointmentChange}
                          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="appointment-message" className="block text-sm font-semibold text-slate-300 mb-2">
                        <MessageSquare className="w-4 h-4 inline mr-2" />
                        Additional Message
                      </label>
                      <textarea
                        id="appointment-message"
                        name="message"
                        rows="4"
                        value={appointmentData.message}
                        onChange={handleAppointmentChange}
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                        placeholder="Tell us about your business needs..."
                      />
                    </div>

                    {submitStatus === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 flex items-center gap-3"
                      >
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <p className="text-green-400 text-sm">Appointment request submitted successfully! We'll contact you soon.</p>
                      </motion.div>
                    )}

                    {submitStatus === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 flex items-center gap-3"
                      >
                        <PhoneCall className="w-5 h-5 text-red-400" />
                        <p className="text-red-400 text-sm">There was an error submitting your request. Please try again or contact us directly.</p>
                      </motion.div>
                    )}

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl hover:shadow-blue-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Submitting...' : 'Book Appointment'}
                    </motion.button>
                  </form>
                </div>
              </motion.div>
            </section>

            {/* Contact Section */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-slate-800">Contact</h2>
              <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                <div className="bg-white/90 backdrop-blur-sm border-2 border-purple-200 rounded-xl p-6 shadow-lg">
                  <Mail className="w-8 h-8 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Email</h3>
                  <p className="text-slate-700">admin@conxiea.com</p>
                </div>
                <div className="bg-white/90 backdrop-blur-sm border-2 border-purple-200 rounded-xl p-6 shadow-lg">
                  <PhoneCall className="w-8 h-8 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Phone</h3>
                  <p className="text-slate-700">+447708227512</p>
                </div>
              </div>
              
              <p className="text-slate-600 mt-8 text-sm">
                Copyright© The Missed-Call Text-Back. All Rights Reserved.
              </p>
            </motion.section>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default MissedCallTextBack;

