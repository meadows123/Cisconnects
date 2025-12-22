
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from '@/App';
import BlogList from '@/components/BlogList';
import BlogPost from '@/components/BlogPost';
import Contact from '@/components/Contact';
import Services from '@/components/Services';
import About from '@/components/About';
import MissedCallTextBack from '@/components/MissedCallTextBack';
import InfraAIOps from '@/components/InfraAIOps';
import WebsiteServices from '@/components/WebsiteServices';
import PrivacyPolicy from '@/components/PrivacyPolicy';
import TermsOfService from '@/components/TermsOfService';
import BookDemo from '@/components/BookDemo';
import ScrollToTop from '@/components/ScrollToTop';
import '@/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/about" element={<About />} />
      <Route path="/websites" element={<WebsiteServices />} />
      <Route path="/infraaiops" element={<InfraAIOps />} />
      <Route path="/missedcalltextback" element={<MissedCallTextBack />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/book-demo" element={<BookDemo />} />
      <Route path="/blog" element={<BlogList />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
    </Routes>
  </BrowserRouter>
);
  