import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, 
  CheckCircle, 
  ArrowRight, 
  Calendar, 
  Clock,
  Sparkles,
  Zap,
  Crown,
  Award,
  Star,
  AlertCircle
} from 'lucide-react';
import Navigation from './Navigation';
import Footer from './Footer';
import SEO from './SEO';
import emailjs from '@emailjs/browser';
import CalendarPicker from './CalendarPicker';
import { useCurrency } from '../hooks/useCurrency';

const WebsiteServices = () => {
  const { formatCurrency, currencySymbol } = useCurrency();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null

  // Base prices in GBP
  const basePlans = [
    {
      tier: 'Basic',
      basePrice: 45,
      pricePeriod: '/month',
      description: 'Perfect for small businesses getting started online',
      icon: Award,
      gradient: 'from-amber-500 to-orange-600',
      features: [
        'Up to 4 pages',
        'Responsive design',
        'Basic SEO optimization',
        'Contact form',
        'Social media integration',
        'Domain registration (one-time)',
        'Hosting included',
        'Ongoing support',
        'Mobile-friendly'
      ],
      popular: false
    },
    {
      tier: 'Professional',
      basePrice: 87,
      pricePeriod: '/month',
      description: 'Ideal for businesses needing database and payment functionality',
      icon: Star,
      gradient: 'from-slate-400 to-slate-600',
      features: [
        'Database integration',
        'Payment system integration',
        'Advanced SEO optimization',
        'Custom design elements',
        'Blog functionality',
        'Analytics integration',
        'Domain registration (one-time)',
        'Hosting included',
        'Ongoing support',
        'Performance optimization'
      ],
      popular: true
    },
    {
      tier: 'Enterprise',
      basePrice: 250,
      pricePeriod: '/month',
      description: 'Complete solution for established businesses with complex needs',
      icon: Crown,
      gradient: 'from-yellow-400 to-amber-500',
      features: [
        '10+ pages',
        'Booking system integration',
        'Premium custom design',
        'Advanced SEO & marketing',
        'Full e-commerce setup',
        'AI chatbot integration',
        'Domain registration (one-time)',
        'Hosting included',
        'Priority support',
        'Custom integrations',
        'Performance monitoring',
        'Regular updates'
      ],
      popular: false
    }
  ];

  // Convert plans to include formatted prices
  const plans = useMemo(() => {
    return basePlans.map(plan => ({
      ...plan,
      price: formatCurrency(plan.basePrice)
    }));
  }, [formatCurrency]);

  const availableTimes = [
    '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00'
  ];

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setShowCalendar(true);
  };

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // EmailJS configuration - using environment variables only
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

      if (!serviceId || !publicKey || !templateId) {
        throw new Error('EmailJS configuration is missing. Please set up VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_PUBLIC_KEY, and VITE_EMAILJS_TEMPLATE_ID in your .env file.');
      }

      // Initialize EmailJS
      emailjs.init(publicKey);

      // Format the selected date for display
      const formattedDate = selectedDate 
        ? new Date(selectedDate).toLocaleDateString('en-GB', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })
        : 'Not specified';

      // Prepare template parameters
      const templateParams = {
        from_name: bookingData.name,
        from_email: bookingData.email,
        phone: bookingData.phone || 'Not provided',
        selected_plan: `${selectedPlan.tier} Package (${selectedPlan.price}${selectedPlan.pricePeriod})`,
        preferred_date: formattedDate,
        preferred_time: selectedTime,
        message: bookingData.message || 'No additional message',
        service_interest: 'Website Design Services - Consultation Booking',
        to_name: 'Conxiea Team',
        reply_to: bookingData.email,
        to_email: 'admin@conxiea.com',
      };

      await emailjs.send(serviceId, templateId, templateParams);
      
      setSubmitStatus('success');
      
      // Reset form
      setBookingData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      setSelectedDate('');
      setSelectedTime('');
    } catch (error) {
      console.error('Booking submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  return (
    <>
      <SEO
        title="Website Design Services | Professional Web Development Packages | Conxiea"
        description={`Professional website design services with flexible monthly plans. All plans include domain registration, hosting, and support. Responsive design, SEO optimization, and e-commerce solutions.`}
        url="/websites"
      />
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
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
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-block mb-6"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-10 h-10 text-white" />
                </div>
              </motion.div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="text-gradient">Professional Website</span>
                <br />
                <span className="text-white">Design Services</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
                Get a custom website that drives results. Choose the perfect monthly plan for your business needs. All packages include domain registration, hosting, and ongoing support.
              </p>
            </motion.div>

            {/* Pricing Plans */}
            <section className="mb-24">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                  Choose Your Package
                </h2>
                <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                  Three monthly plans designed to meet your business needs. Get your professional website delivered and keep it running smoothly.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {plans.map((plan, index) => {
                  const Icon = plan.icon;
                  return (
                    <motion.div
                      key={plan.tier}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className={`relative bg-slate-800/50 backdrop-blur-sm border-2 rounded-3xl p-8 hover:border-blue-500/50 transition-all ${
                        plan.popular 
                          ? 'border-blue-500/50 scale-105 shadow-2xl shadow-blue-500/20' 
                          : 'border-white/10'
                      }`}
                    >
                      {plan.popular && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                          Most Popular
                        </div>
                      )}
                      
                      <div className="text-center mb-6">
                        <div className={`w-16 h-16 bg-gradient-to-br ${plan.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-2">{plan.tier}</h3>
                        <p className="text-slate-400 mb-4">{plan.description}</p>
                        <div className="mb-6">
                          <span className="text-5xl font-bold text-white">{plan.price}</span>
                          <span className="text-xl text-slate-300 ml-2">{plan.pricePeriod}</span>
                        </div>
                        <p className="text-sm text-slate-400 mb-4">Domain registration & hosting included</p>
                      </div>

                      <ul className="space-y-3 mb-8">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                            <span className="text-slate-300">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <motion.button
                        onClick={() => handlePlanSelect(plan)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`w-full py-4 rounded-xl font-semibold transition-all ${
                          plan.popular
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-xl hover:shadow-blue-500/50'
                            : 'bg-slate-700/50 text-white hover:bg-slate-700 border border-white/10'
                        }`}
                      >
                        Select {plan.tier}
                      </motion.button>
                    </motion.div>
                  );
                })}
              </div>
            </section>

            {/* Booking Section */}
            {selectedPlan && showCalendar && (
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-24"
              >
                <div className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12 max-w-4xl mx-auto">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                      Book Your Consultation
                    </h2>
                    <p className="text-lg text-slate-300">
                      You've selected the <span className="text-gradient font-semibold">{selectedPlan.tier}</span> package ({selectedPlan.price}{selectedPlan.pricePeriod})
                    </p>
                    <p className="text-slate-400 mt-2">
                      Choose a date and time that works for you
                    </p>
                  </div>

                  <form onSubmit={handleBookingSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="booking-name" className="block text-sm font-semibold text-slate-300 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="booking-name"
                          name="name"
                          required
                          value={bookingData.name}
                          onChange={handleBookingChange}
                          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          placeholder="John Smith"
                        />
                      </div>

                      <div>
                        <label htmlFor="booking-email" className="block text-sm font-semibold text-slate-300 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="booking-email"
                          name="email"
                          required
                          value={bookingData.email}
                          onChange={handleBookingChange}
                          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          placeholder="john@company.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="booking-phone" className="block text-sm font-semibold text-slate-300 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="booking-phone"
                        name="phone"
                        value={bookingData.phone}
                        onChange={handleBookingChange}
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="+44 7708 227512"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="booking-date" className="block text-sm font-semibold text-slate-300 mb-2">
                          <Calendar className="w-4 h-4 inline mr-2" />
                          Select Date *
                        </label>
                        <CalendarPicker
                          selectedDate={selectedDate}
                          onDateSelect={handleDateSelect}
                        />
                        {!selectedDate && (
                          <p className="text-xs text-slate-500 mt-1">Please select a date</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="booking-time" className="block text-sm font-semibold text-slate-300 mb-2">
                          <Clock className="w-4 h-4 inline mr-2" />
                          Select Time *
                        </label>
                        <select
                          id="booking-time"
                          required
                          value={selectedTime}
                          onChange={(e) => setSelectedTime(e.target.value)}
                          disabled={!selectedDate}
                          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <option value="">Choose a time</option>
                          {availableTimes.map((time) => (
                            <option key={time} value={time}>
                              {time}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="booking-message" className="block text-sm font-semibold text-slate-300 mb-2">
                        Additional Notes
                      </label>
                      <textarea
                        id="booking-message"
                        name="message"
                        rows="4"
                        value={bookingData.message}
                        onChange={handleBookingChange}
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                        placeholder="Tell us about your project requirements..."
                      />
                    </div>

                    {submitStatus === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 flex items-center gap-3"
                      >
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <p className="text-green-400 text-sm">Booking request submitted successfully! We'll contact you soon to confirm your consultation.</p>
                      </motion.div>
                    )}

                    {submitStatus === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 flex items-center gap-3"
                      >
                        <AlertCircle className="w-5 h-5 text-red-400" />
                        <div className="flex-1">
                          <p className="text-red-400 text-sm font-semibold mb-1">There was an error submitting your booking.</p>
                          <p className="text-red-300 text-xs">Please try again or contact us directly at <a href="mailto:admin@conxiea.com" className="underline">admin@conxiea.com</a></p>
                        </div>
                      </motion.div>
                    )}

                    <input
                      type="hidden"
                      value={selectedDate}
                      required
                    />
                    <motion.button
                      type="submit"
                      disabled={!selectedDate || !selectedTime || isSubmitting}
                      whileHover={{ scale: selectedDate && selectedTime && !isSubmitting ? 1.05 : 1 }}
                      whileTap={{ scale: selectedDate && selectedTime && !isSubmitting ? 0.95 : 1 }}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl hover:shadow-blue-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Submitting...' : 'Confirm Booking'}
                      {!isSubmitting && <ArrowRight className="w-5 h-5 inline ml-2" />}
                    </motion.button>
                  </form>
                </div>
              </motion.section>
            )}

            {/* Features Section */}
            <section className="mb-24">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                  Why Choose Our Website Services?
                </h2>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: Sparkles,
                    title: 'Modern Design',
                    description: 'Beautiful, responsive designs that work on all devices'
                  },
                  {
                    icon: Zap,
                    title: 'Fast Performance',
                    description: 'Optimized for speed and excellent user experience'
                  },
                  {
                    icon: Globe,
                    title: 'SEO Optimized',
                    description: 'Built with search engine optimization in mind'
                  }
                ].map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:border-blue-500/50 transition-all"
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
            </section>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default WebsiteServices;

