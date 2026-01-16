import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import LatestBlogs from '@/components/LatestBlogs';
import TrustpilotWidget from '@/components/TrustpilotWidget';
import SEO from '@/components/SEO';
import StructuredData from '@/components/StructuredData';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Solutions from '@/components/Solutions';
import FAQ from '@/components/FAQ';
import Testimonials from '@/components/Testimonials';
import CTA from '@/components/CTA';
import { 
  BrainCircuit, 
  Globe, 
  MessageSquare, 
  Network,
  Zap,
  ArrowRight,
  Sparkles,
  Cloud,
  Bot,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/toaster';

function App() {
  const faqs = [
    {
      question: "How much can I save?",
      answer: "Up to 60% cost reduction. 75% fewer tickets. 5.25x ROI. Real numbers from real customers."
    },
    {
      question: "How long does it take to deploy?",
      answer: "Weeks, not months. We integrate with 300+ data sources out of the box. Minimal setup. Maximum impact."
    },
    {
      question: "Does it work for cloud and on-premise?",
      answer: "Yes. Both. AWS, Azure, Google Cloud, or your own servers. One platform. All covered."
    }
  ];

  return (
    <>
      <SEO
        title="AI Network Automation | AIOps Redefined | Network Automation Services UK | Conxiea"
        description="What is AIOps? How does network automation reduce costs? Expert AI network automation, cloud network automation, firewall migration automation, and network engineering automation services UK. Managed network automation service with AI-driven IT operations."
        url="/"
      />
      <StructuredData
        type="Organization"
        data={{}}
      />
      <StructuredData
        type="Service"
        data={{
          serviceType: "AI Network Automation Service",
          name: "AI InfraOps - AI Network Automation Platform",
          description: "AI-powered network automation platform for cloud and on-premise infrastructure. Provides automated network monitoring, firewall migration automation, and network engineering automation.",
          areaServed: {
            '@type': 'Country',
            name: 'United Kingdom'
          }
        }}
      />
      <StructuredData
        type="FAQPage"
        data={{ faqs }}
      />
      <div className="min-h-screen bg-slate-950 overflow-hidden">
        <Navigation />
        <Hero />
        <Features />
        <Solutions />
        <FAQ faqs={faqs} />
        <Testimonials />
        <LatestBlogs />
        <CTA />
        <Footer />
        <Toaster />
      </div>
    </>
  );
}

export default App;
