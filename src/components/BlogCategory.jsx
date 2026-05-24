import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import AnimatedHeroBackground from './AnimatedHeroBackground';
import Navigation from './Navigation';
import Footer from './Footer';
import SEO from './SEO';
import {
  getPostsByCategory,
  getCategoryDisplayName,
  getAllCategories,
  getCategorySlug,
} from '../data/blogLoader';

// Per-category copy — gives Google unique, meaningful content on each hub page
const CATEGORY_META = {
  'network-automation': {
    headline: 'Network Automation',
    tagline: 'From evaluation to implementation — everything enterprises need to automate their networks.',
    description:
      'Complete guides to enterprise network automation: ROI analysis, tool comparisons, implementation roadmaps, and AI-driven operations. Expert insights from Conxiea.',
    seoTitle: 'Network Automation Guides & Resources | Conxiea',
    intro:
      'Network automation means different things to different teams — and the gap between a working proof of concept and a production-grade implementation is where most projects stall. These articles cover the full journey: understanding what network automation actually delivers, choosing the right tools, calculating ROI, and navigating the hard parts of rollout inside an enterprise.',
  },
  'network-management': {
    headline: 'AI Network Management',
    tagline: 'How AI is transforming configuration, fault detection, performance, and monitoring.',
    description:
      'Practical guides on AI-driven network management — configuration management, fault detection, performance monitoring, and modern AIOps. From Conxiea network automation experts.',
    seoTitle: 'AI Network Management & Monitoring Guides | Conxiea',
    intro:
      'Traditional network management was reactive — alerts fired after something broke. AI changes the model: continuous configuration drift detection, predictive fault analysis, and performance optimisation that runs without a team watching dashboards 24/7. These articles explore what that shift looks like in practice, and what it takes to make it work for your infrastructure.',
  },
  'wifi-solutions': {
    headline: 'Business WiFi Solutions',
    tagline: 'Enterprise WiFi is not plug-and-play. Here\'s how to get it right.',
    description:
      'Expert guides on business WiFi — installation planning, office connectivity, coverage optimisation, and troubleshooting slow speeds. From the Conxiea team.',
    seoTitle: 'Business WiFi Installation & Optimisation Guides | Conxiea',
    intro:
      'Business WiFi fails in predictable ways: coverage gaps, interference, poor AP placement, or hardware that was never enterprise-grade to begin with. Whether you\'re planning a new installation, optimising an existing setup, or troubleshooting performance issues, these guides cut through the noise and focus on what actually fixes the problem.',
  },
  'ai-development': {
    headline: 'AI & Technology',
    tagline: 'Broader perspectives on AI, its economic impact, and where technology is heading.',
    description:
      'Big-picture analysis of AI\'s impact on business, technology, and the economy. From the Conxiea team.',
    seoTitle: 'AI Technology Insights & Analysis | Conxiea',
    intro:
      'Beyond network automation, AI is reshaping how businesses operate, how capital flows, and what the next decade of technology infrastructure looks like. These articles take a wider view — exploring the forces driving AI adoption and what forward-thinking organisations need to understand.',
  },
};

export default function BlogCategory() {
  const { categorySlug } = useParams();
  const posts = getPostsByCategory(categorySlug);

  // 404 if no posts found for this slug
  if (!posts || posts.length === 0) {
    return <Navigate to="/blog" replace />;
  }

  const meta = CATEGORY_META[categorySlug] || {
    headline: getCategoryDisplayName(categorySlug),
    tagline: `All articles in ${getCategoryDisplayName(categorySlug)}`,
    description: `Browse all ${getCategoryDisplayName(categorySlug)} articles from Conxiea.`,
    seoTitle: `${getCategoryDisplayName(categorySlug)} | Conxiea Blog`,
    intro: '',
  };

  const allCategories = getAllCategories();

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `https://conxiea.com/blog/category/${categorySlug}`,
        name: meta.seoTitle,
        description: meta.description,
        url: `https://conxiea.com/blog/category/${categorySlug}`,
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://conxiea.com/' },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://conxiea.com/blog' },
            { '@type': 'ListItem', position: 3, name: meta.headline, item: `https://conxiea.com/blog/category/${categorySlug}` },
          ],
        },
        hasPart: posts.map((post) => ({
          '@type': 'Article',
          name: post.title,
          url: `https://conxiea.com/blog/${post.slug}`,
          description: post.excerpt,
          datePublished: post.isoDate || post.date,
          author: { '@type': 'Organization', name: 'Conxiea' },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#0f0f3d] relative">
      <AnimatedHeroBackground />
      <SEO
        title={meta.seoTitle}
        description={meta.description}
        url={`/blog/category/${categorySlug}`}
        type="website"
        structuredData={structuredData}
      />
      <Navigation />

      <div className="pt-40 pb-20 px-4">
        <div className="max-w-7xl mx-auto">

          {/* Breadcrumb nav */}
          <motion.nav
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex items-center gap-2 text-sm text-slate-400"
            aria-label="Breadcrumb"
          >
            <Link to="/" className="hover:text-blue-300 transition-colors">Home</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-blue-300 transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-white font-medium">{meta.headline}</span>
          </motion.nav>

          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mb-10"
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 border border-white/10 text-blue-300 hover:bg-slate-800 hover:border-blue-500/30 transition-all group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">All Articles</span>
            </Link>
          </motion.div>

          {/* Hub header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-1.5 bg-blue-500/20 text-blue-300 text-sm font-semibold rounded-full border border-blue-500/30 mb-4">
              {posts.length} {posts.length === 1 ? 'Article' : 'Articles'}
            </span>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="text-gradient">{meta.headline}</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mb-6">{meta.tagline}</p>
            {meta.intro && (
              <p className="text-slate-400 max-w-3xl leading-relaxed">{meta.intro}</p>
            )}
          </motion.div>

          {/* Other category links */}
          {allCategories.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex flex-wrap gap-2 mb-12"
            >
              {allCategories
                .filter((cat) => cat.slug !== categorySlug)
                .map((cat) => (
                  <Link
                    key={cat.slug}
                    to={`/blog/category/${cat.slug}`}
                    className="px-4 py-1.5 rounded-full text-sm font-medium bg-slate-800/60 border border-white/10 text-slate-300 hover:border-blue-500/40 hover:text-blue-300 transition-all"
                  >
                    {cat.name}
                    <span className="ml-1.5 text-slate-500">({cat.count})</span>
                  </Link>
                ))}
            </motion.div>
          )}

          {/* Post grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {posts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.07 }}
                className="flex"
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="group flex flex-col w-full bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 overflow-hidden border border-white/10 hover:border-blue-500/50 transform hover:-translate-y-2"
                >
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-semibold rounded-full border border-blue-500/30">
                        {meta.headline}
                      </span>
                      {post.readTime && (
                        <span className="text-xs text-slate-500">{post.readTime}</span>
                      )}
                    </div>

                    <h2 className="text-lg font-bold text-white mb-3 leading-snug group-hover:text-blue-300 transition-colors flex-1">
                      {post.title}
                    </h2>

                    {post.excerpt && (
                      <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <span className="text-xs text-slate-500">{post.date}</span>
                      <span className="text-blue-400 text-sm font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        Read →
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center shadow-2xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Put This Into Practice?
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Talk to a Conxiea specialist about your network infrastructure
          </p>
          <Link
            to="/contact"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
          >
            Schedule a Consultation
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
