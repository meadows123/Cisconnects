import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Send, CheckCircle, AlertCircle, Mail, Phone } from 'lucide-react';
import Navigation from './Navigation';
import Footer from './Footer';
import SEO from './SEO';
import CalendarPicker from './CalendarPicker';
import emailjs from '@emailjs/browser';

const BookDemo = () => {
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    date: null,
    time: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ];

  const handleDateSelect = (date) => {
    setBookingData(prev => ({ ...prev, date }));
  };

  const handleChange = (e) => {
    setBookingData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    if (!bookingData.date) {
      setSubmitStatus('error');
      setIsSubmitting(false);
      return;
    }

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

      if (!serviceId || !publicKey || !templateId) {
        throw new Error('EmailJS configuration is missing.');
      }

      emailjs.init(publicKey);

      // Format the date properly (it comes as a string from CalendarPicker)
      const formatDate = (dateString) => {
        if (!dateString) return 'Not selected';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      };

      const templateParams = {
        from_name: bookingData.name,
        from_email: bookingData.email,
        company: bookingData.company || 'Not provided',
        phone: bookingData.phone || 'Not provided',
        service_interest: 'Demo Booking',
        message: `Demo Booking Request\n\nDate: ${formatDate(bookingData.date)}\nTime: ${bookingData.time || 'Not selected'}\n\nAdditional Message: ${bookingData.message || 'None'}`,
        to_name: 'Conxiea Team',
        reply_to: bookingData.email,
        company_name: 'Conxiea',
        website: 'https://www.cisconnects.com',
        current_date: new Date().toLocaleDateString(),
        current_time: new Date().toLocaleTimeString()
      };

      await emailjs.send(serviceId, templateId, templateParams);
      
      setSubmitStatus('success');
      setBookingData({
        name: '',
        email: '',
        phone: '',
        company: '',
        date: null,
        time: '',
        message: ''
      });
    } catch (error) {
      console.error('Booking Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <SEO
        title="Book a Demo | Conxiea - Schedule Your AI Network Automation Demo"
        description="Schedule a personalized demo of our AI network automation platform. See how Conxiea can transform your IT operations and reduce costs by up to 60%."
        url="/book-demo"
      />
      <Navigation />
      
      <div className="pt-40 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-gradient">Book Your Demo</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              See how AI network automation can transform your operations. Pick a time that works for you.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Booking Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Schedule Your Demo</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={bookingData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="John Smith"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={bookingData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="john@company.com"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={bookingData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="+44 20 1234 5678"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-slate-300 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={bookingData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Your Company"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Select Date *
                  </label>
                  <CalendarPicker
                    selectedDate={bookingData.date}
                    onDateSelect={handleDateSelect}
                    minDate={new Date()}
                  />
                </div>

                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-slate-300 mb-2">
                    <Clock className="w-4 h-4 inline mr-2" />
                    Select Time *
                  </label>
                  <select
                    id="time"
                    name="time"
                    required
                    value={bookingData.time}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    <option value="">Choose a time</option>
                    {timeSlots.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={bookingData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                    placeholder="Tell us what you'd like to see in the demo..."
                  ></textarea>
                </div>

                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 flex items-center gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <div>
                      <p className="text-green-400 font-medium">Demo booked successfully!</p>
                      <p className="text-green-300 text-sm">We'll send you a confirmation email shortly.</p>
                    </div>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-center gap-3"
                  >
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                    <div>
                      <p className="text-red-400 font-medium">Failed to book demo</p>
                      <p className="text-red-300 text-sm">Please try again or contact us directly.</p>
                    </div>
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting || !bookingData.date}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-slate-600 disabled:to-slate-700 text-white px-8 py-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/70 disabled:shadow-none"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Booking...
                    </>
                  ) : (
                    <>
                      Confirm Booking
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Info Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">What to Expect</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    </div>
                    <div>
                      <p className="text-white font-medium">30-minute personalized demo</p>
                      <p className="text-slate-400 text-sm">See our platform in action</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    </div>
                    <div>
                      <p className="text-white font-medium">Q&A session</p>
                      <p className="text-slate-400 text-sm">Ask anything about our solutions</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    </div>
                    <div>
                      <p className="text-white font-medium">Customized recommendations</p>
                      <p className="text-slate-400 text-sm">Tailored to your needs</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Contact Us</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-blue-400" />
                    <a href="mailto:admin@conxiea.com" className="text-slate-300 hover:text-blue-400 transition-colors">
                      admin@conxiea.com
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-blue-400" />
                    <a href="tel:+447708227512" className="text-slate-300 hover:text-blue-400 transition-colors">
                      +44 7708 227512
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookDemo;

