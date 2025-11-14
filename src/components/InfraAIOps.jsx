import React from 'react';
import { Helmet } from 'react-helmet';
import Navigation from './Navigation';
import Footer from './Footer';
import Hero from './Hero';
import Features from './Features';
import Solutions from './Solutions';
import Testimonials from './Testimonials';
import LatestBlogs from './LatestBlogs';
import CTA from './CTA';
import { Toaster } from './ui/toaster';

const InfraAIOps = () => {
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
};

export default InfraAIOps;

