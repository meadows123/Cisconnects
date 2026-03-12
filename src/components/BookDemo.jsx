import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone } from 'lucide-react';
import Navigation from './Navigation';
import Footer from './Footer';
import SEO from './SEO';

const BookDemo = () => {
  // Load GHL booking widget script
  useEffect(() => {
    const scriptId = 'ghl-form-embed';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://api.leadconnectorhq.com/js/form_embed.js';
      script.type = 'text/javascript';
      document.body.appendChild(script);
    }
  }, []);

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
            {/* GHL Booking Widget */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
            >
              <iframe
                src="https://api.leadconnectorhq.com/widget/booking/hTCZBgEPd1IaJvptd6JY"
                style={{ width: '100%', border: 'none', overflow: 'hidden', minHeight: '700px' }}
                scrolling="no"
                id="hTCZBgEPd1IaJvptd6JY_1773347360886"
                title="Book Your Demo"
              />
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

