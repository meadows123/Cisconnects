import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Mail, Home, Menu, X, Settings, Info, ChevronDown, MessageSquare, BrainCircuit, Globe } from 'lucide-react';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/about', label: 'About', icon: Info },
    { to: '/services', label: 'Services', icon: Settings },
    { to: '/blog', label: 'Blog', icon: BookOpen },
    { to: '/contact', label: 'Contact', icon: Mail, highlight: true },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 px-4 py-4 transition-all duration-300 safe-area-top ${
          scrolled
            ? 'bg-slate-950/95 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-white/10'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="relative group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <img 
                src="/Blue Logo.png" 
                alt="Cisconnects" 
                className="h-24 sm:h-32 md:h-44 lg:h-48 w-auto object-contain"
              />
            </motion.div>
            <motion.div
              className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
              initial={{ width: 0 }}
              whileHover={{ width: '100%' }}
              transition={{ duration: 0.3 }}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.to || 
                (link.to === '/services' && (
                  location.pathname === '/missedcalltextback' || 
                  location.pathname === '/infraaiops' || 
                  location.pathname === '/websites'
                ));
              
              // Services dropdown
              if (link.to === '/services') {
                return (
                  <div
                    key={link.to}
                    className="relative"
                    onMouseEnter={() => setServicesDropdownOpen(true)}
                    onMouseLeave={() => setServicesDropdownOpen(false)}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`relative flex items-center gap-2 px-4 py-2 rounded-lg transition-all cursor-pointer ${
                        isActive
                          ? 'bg-blue-500/20 border border-blue-500/40 text-blue-300'
                          : 'bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm text-blue-300 hover:bg-blue-500/20'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="font-medium">{link.label}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
                    </motion.div>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {servicesDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-48 bg-slate-800/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl overflow-hidden z-50"
                        >
                          <Link to="/services">
                            <motion.div
                              whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.2)' }}
                              className={`px-4 py-3 flex items-center gap-3 transition-colors ${
                                location.pathname === '/services' ? 'bg-blue-500/20 text-blue-300' : 'text-slate-300 hover:text-white'
                              }`}
                            >
                              <Settings className="w-4 h-4" />
                              <span className="font-medium">All Services</span>
                            </motion.div>
                          </Link>
                          <Link to="/infraaiops">
                            <motion.div
                              whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.2)' }}
                              className={`px-4 py-3 flex items-center gap-3 transition-colors border-t border-white/10 ${
                                location.pathname === '/infraaiops' ? 'bg-blue-500/20 text-blue-300' : 'text-slate-300 hover:text-white'
                              }`}
                            >
                              <BrainCircuit className="w-4 h-4" />
                              <span className="font-medium">InfraAIOps</span>
                            </motion.div>
                          </Link>
                          <Link to="/missedcalltextback">
                            <motion.div
                              whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.2)' }}
                              className={`px-4 py-3 flex items-center gap-3 transition-colors border-t border-white/10 ${
                                location.pathname === '/missedcalltextback' ? 'bg-blue-500/20 text-blue-300' : 'text-slate-300 hover:text-white'
                              }`}
                            >
                              <MessageSquare className="w-4 h-4" />
                              <span className="font-medium">AI Text Back</span>
                            </motion.div>
                          </Link>
                          <Link to="/websites">
                            <motion.div
                              whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.2)' }}
                              className={`px-4 py-3 flex items-center gap-3 transition-colors border-t border-white/10 ${
                                location.pathname === '/websites' ? 'bg-blue-500/20 text-blue-300' : 'text-slate-300 hover:text-white'
                              }`}
                            >
                              <Globe className="w-4 h-4" />
                              <span className="font-medium">Website Services</span>
                            </motion.div>
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }
              
              return (
                <Link key={link.to} to={link.to}>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                      link.highlight
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-500/30'
                        : isActive
                        ? 'bg-blue-500/20 border border-blue-500/40 text-blue-300'
                        : 'bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm text-blue-300 hover:bg-blue-500/20'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{link.label}</span>
                    
                    {/* Active indicator */}
                    {isActive && !link.highlight && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-300 hover:bg-blue-500/20 transition-all"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* Animated border at bottom */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ 
            scaleX: scrolled ? 1 : 0,
            opacity: scrolled ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-slate-900/95 backdrop-blur-xl border-l border-white/10 shadow-2xl z-50 md:hidden safe-area-right"
            >
              <div className="p-6 space-y-6">
                {/* Close button */}
                <div className="flex justify-end">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-300"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>

                {/* Mobile Nav Links */}
                <div className="space-y-3">
                  {navLinks.map((link, index) => {
                    const Icon = link.icon;
                    const isActive = location.pathname === link.to || 
                      (link.to === '/services' && (
                        location.pathname === '/missedcalltextback' || 
                        location.pathname === '/infraaiops' || 
                        location.pathname === '/websites'
                      ));

                    // Services dropdown for mobile
                    if (link.to === '/services') {
                      return (
                        <motion.div
                          key={link.to}
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <button
                            onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                            className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-all ${
                              isActive
                                ? 'bg-blue-500/20 border border-blue-500/40 text-blue-300'
                                : 'bg-blue-500/10 border border-blue-500/20 text-blue-300 hover:bg-blue-500/20'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <Icon className="w-5 h-5" />
                              <span className="font-medium">{link.label}</span>
                            </div>
                            <ChevronDown className={`w-4 h-4 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                          </button>
                          
                          <AnimatePresence>
                            {mobileServicesOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="pl-4 pt-2 space-y-2">
                                  <Link
                                    to="/services"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
                                      location.pathname === '/services'
                                        ? 'bg-blue-500/20 text-blue-300'
                                        : 'bg-blue-500/5 text-slate-300 hover:bg-blue-500/10'
                                    }`}
                                  >
                                    <Settings className="w-4 h-4" />
                                    <span className="text-sm font-medium">All Services</span>
                                  </Link>
                                  <Link
                                    to="/infraaiops"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
                                      location.pathname === '/infraaiops'
                                        ? 'bg-blue-500/20 text-blue-300'
                                        : 'bg-blue-500/5 text-slate-300 hover:bg-blue-500/10'
                                    }`}
                                  >
                                    <BrainCircuit className="w-4 h-4" />
                                    <span className="text-sm font-medium">InfraAIOps</span>
                                  </Link>
                                  <Link
                                    to="/missedcalltextback"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
                                      location.pathname === '/missedcalltextback'
                                        ? 'bg-blue-500/20 text-blue-300'
                                        : 'bg-blue-500/5 text-slate-300 hover:bg-blue-500/10'
                                    }`}
                                  >
                                    <MessageSquare className="w-4 h-4" />
                                    <span className="text-sm font-medium">AI Text Back</span>
                                  </Link>
                                  <Link
                                    to="/websites"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
                                      location.pathname === '/websites'
                                        ? 'bg-blue-500/20 text-blue-300'
                                        : 'bg-blue-500/5 text-slate-300 hover:bg-blue-500/10'
                                    }`}
                                  >
                                    <Globe className="w-4 h-4" />
                                    <span className="text-sm font-medium">Website Services</span>
                                  </Link>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    }

                    return (
                      <motion.div
                        key={link.to}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          to={link.to}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                            link.highlight
                              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                              : isActive
                              ? 'bg-blue-500/20 border border-blue-500/40 text-blue-300'
                              : 'bg-blue-500/10 border border-blue-500/20 text-blue-300 hover:bg-blue-500/20'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="font-medium">{link.label}</span>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Mobile Menu Footer */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="pt-6 border-t border-white/10"
                >
                  <p className="text-sm text-slate-400 text-center">
                    © 2025 Cisconnects
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

