import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Network Operations Manager",
    company: "TechCorp Global",
    rating: 5,
    text: "Cisconnects transformed our network automation strategy. The AI-powered solutions reduced our deployment time by 80% and virtually eliminated configuration errors. Exceptional service!",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
  },
  {
    id: 2,
    name: "James Anderson",
    role: "IT Director",
    company: "FinanceHub Ltd",
    rating: 5,
    text: "The level of expertise and support from Cisconnects is unmatched. They helped us migrate our entire firewall infrastructure with zero downtime. Our security posture has never been stronger.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"
  },
  {
    id: 3,
    name: "Emily Chen",
    role: "Cloud Architect",
    company: "DataStream Solutions",
    rating: 5,
    text: "Working with Cisconnects on our multi-cloud network automation was a game-changer. Their PyATS and AI integration saved us countless hours and provided insights we never had before.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop"
  },
  {
    id: 4,
    name: "Michael Roberts",
    role: "VP of Infrastructure",
    company: "RetailConnect",
    rating: 5,
    text: "The ROI we achieved with Cisconnects exceeded all expectations. Network incidents dropped by 75%, and our team can now focus on strategic initiatives instead of manual configurations.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop"
  },
  {
    id: 5,
    name: "Rachel Thompson",
    role: "Security Operations Lead",
    company: "SecureNet Industries",
    rating: 5,
    text: "Cisconnects doesn't just automate - they revolutionize. Their expertise in network security and automation gave us confidence to scale rapidly while maintaining compliance across all regions.",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop"
  },
  {
    id: 6,
    name: "David Kumar",
    role: "Infrastructure Manager",
    company: "HealthTech Solutions",
    rating: 5,
    text: "The support and training we received from Cisconnects made all the difference. Their MCP and LangChain implementation streamlined our operations across 50+ locations seamlessly.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop"
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play functionality
  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(() => {
        nextTestimonial();
      }, 5000); // Change slide every 5 seconds

      return () => clearInterval(timer);
    }
  }, [currentIndex, isPaused]);

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

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

  const averageRating = (testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length).toFixed(1);

  return (
    <section className="relative py-24 px-4 bg-gradient-to-b from-slate-950 to-slate-900 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg1OSwgMTMwLCAyNDYsIDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* Trustpilot-style Header */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex items-center gap-1">
              {renderStars(5)}
            </div>
            <span className="text-2xl font-bold text-white">{averageRating}</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Trusted by Industry Leaders</span>
          </h2>
          
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            See why hundreds of companies trust Cisconnects for their network automation needs
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 mt-8 flex-wrap">
            <div className="text-center">
              <p className="text-3xl font-bold text-gradient">500+</p>
              <p className="text-sm text-slate-400">Happy Clients</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-gradient">{averageRating}/5</p>
              <p className="text-sm text-slate-400">Average Rating</p>
            </div>
            <div className="flex items-center gap-1 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-lg">
              <span className="text-green-400 font-semibold">Excellent</span>
            </div>
          </div>
        </motion.div>

        {/* Testimonials Slider */}
        <div 
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="w-full"
              >
                <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl max-w-4xl mx-auto">
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 mb-6">
                    {renderStars(testimonials[currentIndex].rating)}
                  </div>

                  {/* Testimonial Text */}
                  <blockquote className="text-xl md:text-2xl text-slate-200 leading-relaxed mb-8 italic">
                    "{testimonials[currentIndex].text}"
                  </blockquote>

                  {/* Author Info */}
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      className="w-16 h-16 rounded-full object-cover ring-2 ring-blue-500/50"
                    />
                    <div>
                      <p className="text-lg font-semibold text-white">
                        {testimonials[currentIndex].name}
                      </p>
                      <p className="text-slate-400">
                        {testimonials[currentIndex].role}
                      </p>
                      <p className="text-sm text-blue-400">
                        {testimonials[currentIndex].company}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-slate-800/80 hover:bg-slate-700 border border-white/10 rounded-full flex items-center justify-center text-white transition-all hover:scale-110 backdrop-blur-sm shadow-xl"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-slate-800/80 hover:bg-slate-700 border border-white/10 rounded-full flex items-center justify-center text-white transition-all hover:scale-110 backdrop-blur-sm shadow-xl"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'w-8 bg-blue-500'
                  : 'w-2 bg-slate-600 hover:bg-slate-500'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Pause Indicator */}
        {isPaused && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-4 text-sm text-slate-500"
          >
            Auto-play paused
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;

