import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  HeartHandshake,
  Cloud,
  Network,
  TrendingUp,
  Mail,
  CheckCircle,
  DollarSign,
  ShieldCheck,
  Zap,
  Users,
  ArrowRight,
} from 'lucide-react';
import Navigation from './Navigation';
import Footer from './Footer';
import SEO from './SEO';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const CSPPartners = () => {
  const infraOpsFeatures = [
    { icon: Network, text: 'AI-powered network automation across cloud and on-premise infrastructure' },
    { icon: Zap, text: 'Automated incident detection, diagnosis, and self-healing remediation' },
    { icon: ShieldCheck, text: 'Continuous compliance monitoring and security policy enforcement' },
    { icon: TrendingUp, text: 'Real-time performance analytics and capacity planning insights' },
    { icon: Cloud, text: 'Native integration with Azure, AWS, and Google Cloud environments' },
    { icon: Users, text: 'Multi-tenant architecture designed for MSPs and resellers' },
  ];

  const partnerBenefits = [
    'Access to Conxiea partner sales and technical enablement resources',
    'Co-selling support on Azure Marketplace deals',
    'Dedicated partner account management',
    'Access to demo environments and sandbox tenants',
    'Priority technical support for customer deployments',
    'Inclusion in Conxiea partner directory and co-marketing opportunities',
  ];

  return (
    <>
      <SEO
        title="CSP Partner Programme | Sell InfraOps on Azure Marketplace | Conxiea"
        description="Partner with Conxiea to resell InfraOps — our AI network automation platform — through the Azure Marketplace. Earn 30% margin on every deal. Contact admin@conxiea.com to get started."
        url="/csp-partners"
      />
      <div className="min-h-screen bg-[#0f0f3d] overflow-hidden">
        <Navigation />

        {/* Hero */}
        <section className="pt-40 pb-20 px-4 relative">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl" />
          </div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div {...fadeUp}>
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-8">
                <HeartHandshake className="w-10 h-10 text-white" />
              </div>
              <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-2 mb-6">
                <Cloud className="w-4 h-4 text-blue-400" />
                <span className="text-blue-300 text-sm font-medium">Azure Marketplace</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Become a{' '}
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Conxiea CSP Partner
                </span>
              </h1>
              <p className="text-slate-300 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
                Partner with Conxiea to resell <strong className="text-white">InfraOps</strong> — our AI network
                automation platform — directly through the Azure Marketplace. Help your customers transform their
                network operations while earning a compelling 30% reseller margin on every deal.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
                <a
                  href="mailto:admin@conxiea.com"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold px-8 py-4 rounded-xl hover:opacity-90 transition-opacity"
                >
                  <Mail className="w-5 h-5" />
                  Enquire Now
                </a>
                <Link
                  to="/infraaiops"
                  className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-colors"
                >
                  Learn About InfraOps
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* What is InfraOps */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-14"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What is InfraOps?</h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                InfraOps is Conxiea's AI-native network automation platform, purpose-built to eliminate manual
                network operations and drive down infrastructure costs at scale.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {infraOpsFeatures.map(({ icon: Icon, text }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="bg-slate-800/40 border border-white/10 rounded-2xl p-6 flex gap-4 items-start"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-500/15 rounded-xl flex items-center justify-center">
                    <Icon className="w-5 h-5 text-blue-400" />
                  </div>
                  <p className="text-slate-300 leading-relaxed">{text}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-10 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-8 text-center"
            >
              <p className="text-slate-300 text-lg leading-relaxed max-w-3xl mx-auto">
                Deployed through the <strong className="text-white">Azure Marketplace</strong>, InfraOps integrates
                seamlessly into your customers' existing cloud environments — giving them enterprise-grade
                AIOps without the complexity of a standalone deployment.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Commission / Margin Structure */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-14"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-6">
                <DollarSign className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Commission & Margin Structure</h2>
              <p className="text-slate-400 text-lg max-w-xl mx-auto">
                A straightforward, competitive margin with no hidden tiers or minimum commitments to get started.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-white/10 rounded-3xl p-10 text-center shadow-xl shadow-black/20"
            >
              <div className="inline-flex items-baseline gap-2 mb-4">
                <span className="text-7xl font-extrabold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  30%
                </span>
                <span className="text-2xl text-slate-400 font-medium">margin</span>
              </div>
              <p className="text-white text-xl font-semibold mb-2">Flat Reseller Margin</p>
              <p className="text-slate-400 mb-8 max-w-lg mx-auto">
                Conxiea CSP partners earn 30% margin on all InfraOps subscriptions sold through the Azure
                Marketplace — on every deal, every renewal, every upsell.
              </p>
              <div className="grid sm:grid-cols-3 gap-4 text-left">
                {[
                  { label: 'New subscriptions', detail: '30% on first-year ARR' },
                  { label: 'Renewals', detail: '30% on all renewal ARR' },
                  { label: 'Upsells & expansion', detail: '30% on incremental ARR' },
                ].map(({ label, detail }, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <p className="text-white font-semibold mb-1">{label}</p>
                    <p className="text-slate-400 text-sm">{detail}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Partner Benefits */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What You Get as a Partner</h2>
              <p className="text-slate-400 text-lg max-w-xl mx-auto">
                Beyond the margin, Conxiea partners get the enablement and support needed to close deals with confidence.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-4">
              {partnerBenefits.map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="flex items-start gap-3 bg-slate-800/30 border border-white/8 rounded-xl p-4"
                >
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <p className="text-slate-300">{benefit}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-3xl p-10 text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Partner with Conxiea?</h2>
              <p className="text-slate-300 text-lg mb-2 max-w-xl mx-auto">
                For all partner and CSP enquiries, reach out directly to our partnerships team. We'll get back to you within one business day.
              </p>
              <p className="text-slate-400 mb-8">
                Please include your company name, Microsoft Partner ID (if applicable), and a brief note on your customer base.
              </p>
              <a
                href="mailto:admin@conxiea.com"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold px-10 py-4 rounded-xl hover:opacity-90 transition-opacity text-lg"
              >
                <Mail className="w-5 h-5" />
                admin@conxiea.com
              </a>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default CSPPartners;
