import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Calendar, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: 'demo',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // EmailJS configuration - using environment variables only
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

      // Check if all required environment variables are present
      if (!serviceId || !publicKey || !templateId) {
        throw new Error('EmailJS configuration is missing. Please check your environment variables.');
      }

      // Initialize EmailJS
      emailjs.init(publicKey);

      // Prepare template parameters
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        company: formData.company || 'Not provided',
        phone: formData.phone || 'Not provided',
        service_interest: formData.service,
        message: formData.message,
        to_name: 'InfraOpsAI Team',
        reply_to: formData.email,
        // Additional branded content
        company_name: 'InfraOpsAI',
        website: 'https://cisconnects.com',
        current_date: new Date().toLocaleDateString(),
        current_time: new Date().toLocaleTimeString()
      };

      // Send email
      const result = await emailjs.send(serviceId, templateId, templateParams);
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        service: 'demo',
        message: ''
      });
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <Navigation />
      
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-gradient">Get in Touch</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Schedule a demo or consultation with our network automation experts. 
              We're here to help transform your infrastructure.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Send us a message</h2>
              
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
                    value={formData.name}
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
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="john@company.com"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-slate-300 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Your Company"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="+44 20 1234 5678"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-slate-300 mb-2">
                    I'm interested in *
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    <option value="demo">Schedule a Demo</option>
                    <option value="consultation">Free Consultation</option>
                    <option value="network-automation">Network Automation</option>
                    <option value="firewall-migration">Firewall Migration</option>
                    <option value="ai-integration">AI Integration</option>
                    <option value="other">Other Services</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                    placeholder="Tell us about your project or requirements..."
                  ></textarea>
                </div>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 flex items-center gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <div>
                      <p className="text-green-400 font-medium">Message sent successfully!</p>
                      <p className="text-green-300 text-sm">We'll get back to you within 24 hours.</p>
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
                      <p className="text-red-400 font-medium">Failed to send message</p>
                      <p className="text-red-300 text-sm">Please try again or contact us directly.</p>
                    </div>
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-slate-600 disabled:to-slate-700 text-white px-8 py-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/70 disabled:shadow-none"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-8"
            >
              {/* Contact Cards */}
              <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-400 mb-1">Email</p>
                      <a href="mailto:info@cisconnects.com" className="text-white hover:text-blue-400 transition-colors">
                        info@cisconnects.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-400 mb-1">Phone</p>
                      <a href="tel:+442012345678" className="text-white hover:text-blue-400 transition-colors">
                        +44 20 1234 5678
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-400 mb-1">Location</p>
                      <p className="text-white">
                        London, United Kingdom
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-6 h-6 text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-400 mb-1">Business Hours</p>
                      <p className="text-white">
                        Mon - Fri: 9:00 AM - 6:00 PM GMT
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Why Choose Us */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Why Choose Cisconnects?</h3>
                
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    </div>
                    <div>
                      <p className="text-white font-medium">Expert Team</p>
                      <p className="text-slate-400 text-sm">Certified network engineers with 15+ years experience</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    </div>
                    <div>
                      <p className="text-white font-medium">24/7 Support</p>
                      <p className="text-slate-400 text-sm">Round-the-clock monitoring and assistance</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    </div>
                    <div>
                      <p className="text-white font-medium">Proven Results</p>
                      <p className="text-slate-400 text-sm">500+ successful implementations worldwide</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-yellow-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    </div>
                    <div>
                      <p className="text-white font-medium">Fast Response</p>
                      <p className="text-slate-400 text-sm">Get a reply within 24 hours guaranteed</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Quick Links */}
              <div className="flex gap-4">
                <Link
                  to="/"
                  className="flex-1 bg-slate-800/50 hover:bg-slate-800 border border-white/10 rounded-lg px-6 py-4 text-center text-white font-medium transition-colors"
                >
                  Back to Home
                </Link>
                <Link
                  to="/blog"
                  className="flex-1 bg-slate-800/50 hover:bg-slate-800 border border-white/10 rounded-lg px-6 py-4 text-center text-white font-medium transition-colors"
                >
                  Read Our Blog
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

