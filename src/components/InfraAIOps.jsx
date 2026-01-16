import React from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import Hero from './Hero';
import Features from './Features';
import Solutions from './Solutions';
import Testimonials from './Testimonials';
import LatestBlogs from './LatestBlogs';
import CTA from './CTA';
import FAQ from './FAQ';
import SEO from './SEO';
import StructuredData from './StructuredData';
import { Toaster } from './ui/toaster';

const InfraAIOps = () => {
  const faqs = [
    {
      question: "What is AIOps and how can it save time?",
      answer: "AIOps (Artificial Intelligence for IT Operations) uses AI and machine learning to automate IT operations tasks. Our AIOps platform can reduce manual network management time by up to 80%, automate incident response, and provide predictive analytics to prevent issues before they occur. AIOps redefined means self-healing systems that automatically detect and resolve network problems without human intervention."
    },
    {
      question: "How does network automation reduce costs?",
      answer: "Network automation reduces costs by eliminating manual configuration errors, reducing downtime through proactive monitoring, and optimizing resource utilization. Our AI-powered network operations can reduce operational costs by 40-60% while improving network reliability and performance. Automated network monitoring and self-healing capabilities mean fewer support tickets and faster resolution times."
    },
    {
      question: "How to automate firewall migration with AI?",
      answer: "Firewall migration automation uses AI to analyze existing firewall rules, identify dependencies, and automatically generate migration plans. Our firewall migration automation service reduces migration time from weeks to days, eliminates configuration errors, and ensures zero-downtime transitions. The AI analyzes rule relationships, suggests optimizations, and automates the entire migration process."
    },
    {
      question: "What is network automation for small business UK?",
      answer: "Network automation for small business UK provides affordable, scalable automation solutions tailored for smaller enterprises. Our managed network automation service offers cloud network automation, automated network monitoring, and AI-driven IT operations without requiring extensive IT resources. Small businesses can benefit from enterprise-grade network automation services UK at a fraction of the cost."
    },
    {
      question: "How does AI network operations work for enterprise cloud?",
      answer: "AI network operations for enterprise cloud uses machine learning to monitor, analyze, and optimize cloud network infrastructure. Our platform provides automated network monitoring, predictive analytics, and self-healing capabilities across multi-cloud environments. It automates network engineering automation tasks, reduces manual configuration, and provides real-time visibility into network performance and security."
    },
    {
      question: "What is network infrastructure automation?",
      answer: "Network infrastructure automation uses AI and automation tools to manage, configure, and optimize network devices automatically. Our network infrastructure automation solutions cover cloud network automation, on-premise automation, firewall migration automation, and network engineering automation. This includes automated provisioning, configuration management, compliance reporting, and proactive monitoring."
    },
    {
      question: "What is a network automation consultancy?",
      answer: "A network automation consultancy provides expert guidance on implementing AI-powered network operations. Our network automation consultancy services help organizations assess their current infrastructure, design automation strategies, implement AIOps solutions, and provide ongoing support. We specialize in AI network automation, cloud network automation, and network engineering automation for UK businesses."
    },
    {
      question: "How does automated network monitoring work?",
      answer: "Automated network monitoring uses AI to continuously analyze network performance, detect anomalies, and predict potential issues. Our automated network monitoring provides real-time visibility, automated alerting, and self-healing capabilities. The AI learns normal network patterns and automatically flags deviations, reducing false positives and enabling faster incident response."
    }
  ];

  return (
    <>
      <SEO
        title="AI Network Automation | AIOps Redefined | Network Automation Services UK"
        description="What is AIOps? How does network automation reduce costs? Expert AI network automation, cloud network automation, firewall migration automation, and network engineering automation services UK. Managed network automation service with AI-driven IT operations."
        url="/infraaiops"
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
};

export default InfraAIOps;

