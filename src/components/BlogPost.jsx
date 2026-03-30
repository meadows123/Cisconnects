import { useParams, Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { getBlogPostBySlug } from '../data/blogLoader';
import Navigation from './Navigation';
import Footer from './Footer';
import SEO from './SEO';
import emailjs from '@emailjs/browser';

export default function BlogPost() {
  const { slug } = useParams();
  const post = getBlogPostBySlug(slug);

  const [commentForm, setCommentForm] = useState({ name: '', email: '', website: '', comment: '' });
  const [commentStatus, setCommentStatus] = useState(null); // 'success' | 'error' | null
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCommentChange = (e) => {
    setCommentForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setCommentStatus(null);

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

      if (!serviceId || !publicKey || !templateId) {
        throw new Error('EmailJS configuration missing');
      }

      emailjs.init(publicKey);

      await emailjs.send(serviceId, templateId, {
        from_name: commentForm.name,
        from_email: commentForm.email,
        reply_to: commentForm.email,
        message: `Blog comment on "${post.title}"\n\nWebsite: ${commentForm.website || 'N/A'}\n\n${commentForm.comment}`,
        to_name: 'Conxiea',
        company_name: 'Conxiea',
        website: 'https://www.conxiea.com',
        current_date: new Date().toLocaleDateString(),
        current_time: new Date().toLocaleTimeString(),
      });

      setCommentStatus('success');
      setCommentForm({ name: '', email: '', website: '', comment: '' });
    } catch (err) {
      console.error('Comment submit error:', err);
      setCommentStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!post) {
    return <Navigate to="/blog" replace />;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <SEO
        title={`${post.title} | Conxiea Blog`}
        description={post.excerpt || `Read about ${post.title} on the Conxiea blog. Expert insights on network automation, AI, and IT infrastructure.`}
        url={`/blog/${post.slug}`}
        type="article"
        keywords={post.keywords}
        author={post.author}
        publishedTime={post.isoDate}
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: post.title,
          description: post.excerpt,
          author: {
            '@type': 'Person',
            name: post.author,
          },
          publisher: {
            '@type': 'Organization',
            name: 'Conxiea',
            url: 'https://www.conxiea.com',
          },
          datePublished: post.isoDate || post.date,
          url: `https://www.conxiea.com/blog/${post.slug}`,
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://www.conxiea.com/blog/${post.slug}`,
          },
        }}
      />
      <Navigation />
      
      {/* Back to Blog Link */}
      <div className="max-w-4xl mx-auto px-4 pt-40 pb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 border border-white/10 text-blue-300 hover:bg-slate-800 hover:border-blue-500/30 transition-all group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Blog</span>
          </Link>
        </motion.div>
      </div>

      <article className="max-w-4xl mx-auto px-4 pb-12">
        {/* Article Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 bg-slate-800/30 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
        >
          {/* Category Badge */}
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-block px-4 py-1.5 bg-blue-500/20 text-blue-300 text-sm font-semibold rounded-full border border-blue-500/30">
              {post.category.split(',')[0].trim()}
            </span>
            <span className="text-slate-400 text-sm">{post.readTime}</span>
            {post.comments > 0 && (
              <span className="text-slate-400 text-sm flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
                {post.comments} {post.comments === 1 ? 'Comment' : 'Comments'}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Author and Date */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg ring-2 ring-blue-500/30">
              {post.author.charAt(0)}
            </div>
            <div>
              <p className="text-lg font-medium text-white">{post.author}</p>
              <p className="text-slate-400">{post.date}</p>
            </div>
          </div>
        </motion.header>

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="prose prose-lg prose-invert max-w-none bg-slate-800/30 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
        >
          <div
            className="article-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </motion.div>

        {/* External Resources Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 pt-8 border-t border-white/10"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Additional Resources</h2>
          <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <p className="text-slate-300 mb-4">
              For more information on network automation and security, check out these authoritative resources:
            </p>
            <ul className="space-y-3">
              <li>
                <a 
                  href="https://www.cisco.com/c/en/us/solutions/enterprise-networks/network-automation.html" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors group"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Cisco Network Automation Solutions</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://www.paloaltonetworks.com/cyberpedia/what-is-a-firewall" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors group"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Palo Alto Networks - Firewall Technology</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://www.gartner.com/en/information-technology/glossary/next-generation-firewall-ngfw" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors group"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Gartner - Next-Generation Firewall Definition</span>
                </a>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Comments Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 pt-8 border-t border-white/10"
        >
          <h2 className="text-3xl font-bold text-white mb-8">Leave a Comment</h2>
          
          {/* Comment Form */}
          <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl shadow-md p-8 border border-white/10">
            <form onSubmit={handleCommentSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={commentForm.name}
                    onChange={handleCommentChange}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={commentForm.email}
                    onChange={handleCommentChange}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="website" className="block text-sm font-medium text-slate-300 mb-2">
                  Website (Optional)
                </label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={commentForm.website}
                  onChange={handleCommentChange}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="https://yourwebsite.com"
                />
              </div>

              <div>
                <label htmlFor="comment" className="block text-sm font-medium text-slate-300 mb-2">
                  Comment *
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  required
                  rows="6"
                  value={commentForm.comment}
                  onChange={handleCommentChange}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                  placeholder="Share your thoughts..."
                ></textarea>
              </div>

              {commentStatus === 'success' && (
                <p className="text-green-400 text-sm font-medium">Thanks for your comment! We'll review it shortly.</p>
              )}
              {commentStatus === 'error' && (
                <p className="text-red-400 text-sm font-medium">Something went wrong. Please try again.</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-60 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30"
              >
                {isSubmitting ? 'Sending...' : 'Post Comment'}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              </button>
            </form>
          </div>

          {/* Existing Comments Display (if any) */}
          {post.comments > 0 && (
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-white mb-6">
                {post.comments} {post.comments === 1 ? 'Comment' : 'Comments'}
              </h3>
              <div className="space-y-6">
                <div className="bg-slate-800/30 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                      R
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-semibold text-white">Reader</span>
                        <span className="text-sm text-slate-500">•</span>
                        <span className="text-sm text-slate-400">Recently</span>
                      </div>
                      <p className="text-slate-300">
                        Great article! Very informative and well-written. Looking forward to implementing these strategies.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Share & Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 pt-8 border-t border-white/10"
        >
          <div className="flex items-center justify-between">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-blue-300 hover:text-blue-400 font-medium transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              View All Articles
            </Link>
            
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-lg shadow-blue-500/30"
            >
              Get in Touch
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </motion.div>
      </article>

      {/* Related CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="max-w-4xl mx-auto px-4 pb-16"
      >
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center shadow-2xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Need Expert Help with Network Automation?
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Let's discuss how we can help transform your network infrastructure
          </p>
          <Link
            to="/contact"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
          >
            Schedule a Consultation
          </Link>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
}

