
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
import ScrollToTop from '@/components/ScrollToTop';
import '@/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/blog" element={<BlogList />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/services" element={<Services />} />
      <Route path="/about" element={<About />} />
      <Route path="/missedcalltextback" element={<MissedCallTextBack />} />
    </Routes>
  </BrowserRouter>
);
  