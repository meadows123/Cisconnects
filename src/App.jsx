
import React from 'react';
import { Helmet } from 'react-helmet';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Solutions from '@/components/Solutions';
import Testimonials from '@/components/Testimonials';
import LatestBlogs from '@/components/LatestBlogs';
import CTA from '@/components/CTA';
import { Toaster } from '@/components/ui/toaster';

function App() {
  return (
    <>
      <Helmet>
        <title>AI Network Automation | Cloud & On-Premise Infrastructure Solutions</title>
        <meta name="description" content="Transform your network infrastructure with cutting-edge AI automation. Seamless cloud and on-premise solutions for all infrastructure devices." />
      </Helmet>
      <div className="min-h-screen bg-slate-950 overflow-hidden">
        <Navigation />
        <Hero />
        <Features />
        <Solutions />
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
  