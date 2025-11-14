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

  // Load Trustpilot script and initialize widget
  useEffect(() => {
    const loadTrustpilotScript = () => {
      // Check if script already exists
      if (document.querySelector('script[src*="trustpilot.com"]')) {
        setWidgetLoaded(true);
        return;
      }

      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js';
      script.async = true;
      script.onload = () => {
        setWidgetLoaded(true);
        // Force widget refresh after script loads
        setTimeout(() => {
          if (window.Trustpilot && window.Trustpilot.loadFromElement) {
            const widget = document.querySelector('.trustpilot-widget');
            if (widget) {
              window.Trustpilot.loadFromElement(widget);
            }
          }
        }, 100);
      };
      script.onerror = () => {
        console.error('Failed to load Trustpilot script');
      };
      document.head.appendChild(script);
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
            ) : (
              <div 
                className="trustpilot-widget" 
                data-locale="en-GB" 
                data-template-id="56278e9abfbbba0bdcd568bc" 
                data-businessunit-id="6819b9e66b9ea955e5f5474b" 
                data-style-height="52px" 
                data-style-width="100%" 
                data-token="818b9a64-4849-4387-bc47-ce993fee005b"
              />
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
