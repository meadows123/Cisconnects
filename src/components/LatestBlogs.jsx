import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { getAllBlogPosts } from '../data/blogLoader';

const LatestBlogs = () => {
  const blogPosts = getAllBlogPosts().slice(0, 3); // Get the 3 latest posts

  return (
    <section className="relative py-24 px-4 bg-gradient-to-b from-slate-900 to-slate-950">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg1OSwgMTMwLCAyNDYsIDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-10"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Latest Insights</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Stay ahead with our latest thoughts on network automation, AI, and infrastructure innovation
          </p>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <Link
                to={`/blog/${post.slug}`}
                className="block h-full bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20"
              >
                {/* Article Header */}
                <div className="p-6 pb-4">
                  {/* Category Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-semibold rounded-full border border-blue-500/30">
                      {post.category.split(',')[0].trim()}
                    </span>
                    <div className="flex items-center gap-1 text-slate-400 text-xs">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gradient transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-slate-400 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                {/* Article Footer */}
                <div className="px-6 pb-6">
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {post.author.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{post.author}</p>
                        <div className="flex items-center gap-1 text-xs text-slate-400">
                          <Calendar className="w-3 h-3" />
                          {post.date}
                        </div>
                      </div>
                    </div>

                    {post.comments > 0 && (
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                        </svg>
                        {post.comments}
                      </span>
                    )}
                  </div>
                </div>

                {/* Hover Effect Arrow */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-5 h-5 text-blue-400" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA to View All Blogs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/50 transition-all hover:scale-105"
          >
            View All Articles
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default LatestBlogs;
