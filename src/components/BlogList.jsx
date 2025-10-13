import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { getAllBlogPosts } from '../data/blogPosts';
import Navigation from './Navigation';

export default function BlogList() {
  const blogPosts = getAllBlogPosts();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <Navigation />
      
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 border border-white/10 text-blue-300 hover:bg-slate-800 hover:border-blue-500/30 transition-all group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Home</span>
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-gradient">Blog & Insights</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Expert perspectives on network automation, AI, and the future of IT infrastructure
            </p>
          </motion.div>

          {/* Blog Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="group block bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 overflow-hidden border border-white/10 hover:border-blue-500/50 transform hover:-translate-y-2"
                >
                  {/* Category Badge */}
                  <div className="p-6 pb-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-semibold rounded-full border border-blue-500/30">
                        {post.category.split(',')[0].trim()}
                      </span>
                      <span className="text-sm text-slate-400">{post.readTime}</span>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-bold text-white mb-3 group-hover:text-gradient transition-colors line-clamp-3">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-slate-400 text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {post.author.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{post.author}</p>
                          <p className="text-xs text-slate-400">{post.date}</p>
                        </div>
                      </div>

                      {post.comments > 0 && (
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                          </svg>
                          {post.comments}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-20 text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white shadow-2xl"
          >
            <h2 className="text-3xl font-bold mb-4">
              Want to Stay Updated?
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Get the latest insights on network automation and AI delivered to your inbox
            </p>
            <Link
              to="/contact"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
            >
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

