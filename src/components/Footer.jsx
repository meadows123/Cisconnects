import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, 
  Info, 
  Settings, 
  BookOpen, 
  Mail, 
  Phone, 
  MapPin,
  MessageSquare
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/about', label: 'About', icon: Info },
    { to: '/services', label: 'Services', icon: Settings },
    { to: '/blog', label: 'Blog', icon: BookOpen },
    { to: '/contact', label: 'Contact', icon: Mail },
  ];

  const serviceLinks = [
    { to: '/services', label: 'All Services' },
    { to: '/missedcalltextback', label: 'AI Text Back' },
  ];

  return (
    <footer className="bg-slate-900 border-t border-white/10 safe-area-bottom">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <Link to="/" className="inline-block -mt-8 md:-mt-10">
              <img 
                src="/Blue Logo.png" 
                alt="Cisconnects" 
                className="h-32 sm:h-40 md:h-48 lg:h-56 w-auto object-contain mb-0"
              />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed -mt-1">
              Cutting-edge AI automation for network infrastructure.
            </p>
          </motion.div>

          {/* Navigation Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-white font-semibold text-lg mb-4">Navigation</h3>
            <ul className="space-y-3">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors text-sm group"
                    >
                      <Icon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-white font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors text-sm group"
                  >
                    <MessageSquare className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-white font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:support@cisconnects.com"
                  className="flex items-center gap-3 text-slate-400 hover:text-blue-400 transition-colors text-sm group"
                >
                  <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                    <Mail className="w-5 h-5 text-blue-400" />
                  </div>
                  <span>support@cisconnects.com</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+447708227512"
                  className="flex items-center gap-3 text-slate-400 hover:text-blue-400 transition-colors text-sm group"
                >
                  <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                    <Phone className="w-5 h-5 text-blue-400" />
                  </div>
                  <span>+44 7708 227512</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-slate-400 text-sm">
                  <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center mt-0.5">
                    <MapPin className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p>25 Lyndey Road</p>
                    <p>Bristol, BS16 9HG</p>
                  </div>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-slate-400 text-sm text-center md:text-left">
            © {currentYear} Cisconnects. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-slate-400">
            <Link to="/privacy-policy" className="hover:text-blue-400 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="hover:text-blue-400 transition-colors">
              Terms of Service
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;

