import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ExternalLink } from 'lucide-react';

const TrustpilotWidget = () => {
  const [trustpilotData, setTrustpilotData] = useState({
    rating: 4.8,
    totalReviews: 36,
    fiveStarPercentage: 94
  });
  const [widgetLoaded, setWidgetLoaded] = useState(false);
  const [widgetError, setWidgetError] = useState(false);

  // Load Trustpilot script and initialize widget
  useEffect(() => {
    const loadTrustpilotScript = () => {
      // Check if script already exists
      if (document.querySelector('script[src*="invitejs.trustpilot.com"]')) {
        setWidgetLoaded(true);
        // Try to register if script already loaded
        if (window.tp) {
          try {
            window.tp('register', 'bHcGTZar7yaOeOFP');
          } catch (error) {
            console.error('Error registering Trustpilot:', error);
          }
        }
        return;
      }

      // Load Trustpilot script
      (function(w, d, s, r, n) {
        w.TrustpilotObject = n;
        w[n] = w[n] || function() {
          (w[n].q = w[n].q || []).push(arguments);
        };
        const a = d.createElement(s);
        a.async = 1;
        a.src = r;
        a.type = 'text/java' + s;
        const f = d.getElementsByTagName(s)[0];
        f.parentNode.insertBefore(a, f);
        
        a.onload = () => {
          setWidgetLoaded(true);
          // Register Trustpilot after script loads
          setTimeout(() => {
            if (window.tp) {
              try {
                window.tp('register', 'bHcGTZar7yaOeOFP');
              } catch (error) {
                console.error('Error registering Trustpilot:', error);
                setWidgetError(true);
              }
            } else {
              setWidgetError(true);
            }
          }, 500);
        };
        
        a.onerror = () => {
          console.error('Failed to load Trustpilot script');
          setWidgetError(true);
        };
      })(window, document, 'script', 'https://invitejs.trustpilot.com/tp.min.js', 'tp');
    };

    loadTrustpilotScript();
  }, []);

  // Fetch real Trustpilot data (you'll need to replace with your actual API endpoint)
  useEffect(() => {
    const fetchTrustpilotData = async () => {
      try {
        // Note: Trustpilot doesn't have a public API for business data
        // You would need to use their Business API or scrape the data
        // For now, we'll use placeholder data that you can update manually
        // or implement a backend service to fetch this data
        
        // Example of how you might fetch this data from your backend:
        // const response = await fetch('/api/trustpilot-stats');
        // const data = await response.json();
        // setTrustpilotData(data);
        
        // For now, using realistic placeholder data
        setTrustpilotData({
          rating: 4.8,
          totalReviews: 36,
          fiveStarPercentage: 94
        });
      } catch (error) {
        console.error('Error fetching Trustpilot data:', error);
      }
    };

    fetchTrustpilotData();
  }, []);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'
        }`}
      />
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mt-20"
    >
      <div className="text-center mb-12">
        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
          <span className="text-gradient">Read More Reviews</span>
        </h3>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          See what our customers are saying on Trustpilot
        </p>
      </div>

      {/* Trustpilot Widget Container */}
      <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-sm border border-white/10 rounded-2xl p-8 max-w-4xl mx-auto">
        {/* Trustpilot Badge/Widget */}
        <div className="flex flex-col items-center justify-center space-y-6">
          {/* Trustpilot Logo and Rating */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="text-white font-semibold text-lg">Trustpilot</span>
            </div>
            <div className="flex items-center space-x-1">
              {renderStars(5)}
              <span className="text-white font-bold text-xl ml-2">{trustpilotData.rating}</span>
            </div>
          </div>

          {/* Trustpilot Widget */}
          <div className="w-full max-w-2xl">
            {!widgetLoaded ? (
              <div className="bg-slate-700/50 rounded-lg p-6 border border-slate-600">
                <div className="text-center text-slate-300">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto mb-4"></div>
                  <p className="text-lg font-semibold mb-2">Loading Trustpilot Reviews...</p>
                  <p className="text-sm">Please wait while we load your reviews</p>
                </div>
              </div>
            ) : widgetError ? (
              <div className="bg-slate-700/50 rounded-lg p-6 border border-slate-600">
                <div className="text-center text-slate-300">
                  <p className="text-lg font-semibold mb-2">Trustpilot Widget Unavailable</p>
                  <p className="text-sm mb-4">The Trustpilot widget could not be loaded. Please click the button below to view reviews directly on Trustpilot.</p>
                </div>
              </div>
            ) : (
              <div className="w-full">
                {/* Trustpilot TrustBox Widget */}
                <div 
                  className="trustpilot-widget" 
                  data-locale="en-GB"
                  data-template-id="56278e9abfbbba0bdcd568bc"
                  data-businessunit-id="6819b9e66b9ea955e5f5474b"
                  data-style-height="400px"
                  data-style-width="100%"
                />
              </div>
            )}
          </div>

          {/* Link to Trustpilot Reviews Page */}
          <a
            href="https://uk.trustpilot.com/review/cisconnects.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 hover:scale-105 transform"
          >
            <span>View All Reviews on Trustpilot</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Additional Trustpilot Stats */}
      <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
        <div className="text-center bg-slate-800/30 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <div className="text-3xl font-bold text-green-400 mb-2">{trustpilotData.rating}/5</div>
          <div className="text-slate-300">Trustpilot Rating</div>
        </div>
        <div className="text-center bg-slate-800/30 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <div className="text-3xl font-bold text-green-400 mb-2">{trustpilotData.totalReviews}</div>
          <div className="text-slate-300">Total Reviews</div>
        </div>
        <div className="text-center bg-slate-800/30 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <div className="text-3xl font-bold text-green-400 mb-2">{trustpilotData.fiveStarPercentage}%</div>
          <div className="text-slate-300">5-Star Reviews</div>
        </div>
      </div>
    </motion.div>
  );
};

export default TrustpilotWidget;
