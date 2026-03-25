import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from '@/components/ScrollToTop';
import PixelTracker from '@/components/PixelTracker';
import { BookingProvider } from '@/context/BookingContext';
import BookingModal from '@/components/BookingModal';
import SubscribePopup from '@/components/SubscribePopup';
import '@/index.css';

// Every route is lazily loaded — nothing beyond the router bootstraps upfront
const App = lazy(() => import('@/App'));

// Route-level code splitting: each page only loads when navigated to
const BlogList = lazy(() => import('@/components/BlogList'));
const BlogPost = lazy(() => import('@/components/BlogPost'));
const Contact = lazy(() => import('@/components/Contact'));
const Services = lazy(() => import('@/components/Services'));
const About = lazy(() => import('@/components/About'));
const MissedCallTextBack = lazy(() => import('@/components/MissedCallTextBack'));
const InfraAIOps = lazy(() => import('@/components/InfraAIOps'));
const WebsiteServices = lazy(() => import('@/components/WebsiteServices'));
const PrivacyPolicy = lazy(() => import('@/components/PrivacyPolicy'));
const TermsOfService = lazy(() => import('@/components/TermsOfService'));
const BookDemo = lazy(() => import('@/components/BookDemo'));
const ConsultationFunnel = lazy(() => import('@/components/ConsultationFunnel'));
const ConsultationSuccess = lazy(() => import('@/components/ConsultationSuccess'));
const ConsultationCalendar = lazy(() => import('@/components/ConsultationCalendar'));
const RequestCallFunnel = lazy(() => import('@/components/RequestCallFunnel'));
const RequestCallFunnelV2 = lazy(() => import('@/components/RequestCallFunnelV2'));
const RequestCallSuccess = lazy(() => import('@/components/RequestCallSuccess'));
const LeadMagnet = lazy(() => import('@/components/LeadMagnet'));
const LeadMagnetSuccess = lazy(() => import('@/components/LeadMagnetSuccess'));
const CafeWifi = lazy(() => import('@/components/CafeWifi'));
const OfficeWifi = lazy(() => import('@/components/OfficeWifi'));
const NetworkTroubleshooting = lazy(() => import('@/components/NetworkTroubleshooting'));
const WifiOptimisation = lazy(() => import('@/components/WifiOptimisation'));
const ElectricianWebsiteServices = lazy(() => import('@/components/ElectricianWebsiteServices'));

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <BookingProvider>
      <ScrollToTop />
      <PixelTracker />
      <BookingModal />
      <SubscribePopup />
      <Suspense fallback={<div className="min-h-screen bg-slate-950" />}>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/about" element={<About />} />
      <Route path="/websites" element={<WebsiteServices />} />
      <Route path="/infraaiops" element={<InfraAIOps />} />
      <Route path="/missedcalltextback" element={<MissedCallTextBack />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/book-demo" element={<BookDemo />} />
      <Route path="/book-consultation" element={<ConsultationFunnel />} />
      <Route path="/consultation-success" element={<ConsultationSuccess />} />
      <Route path="/admin/consultations" element={<ConsultationCalendar />} />
      <Route path="/24-7-emergency-operator" element={<RequestCallFunnel />} />
      <Route path="/24-7-emergency-operator-v2" element={<RequestCallFunnelV2 />} />
      <Route path="/request-call-success" element={<RequestCallSuccess />} />
      <Route path="/lead-magnet" element={<LeadMagnet />} />
      <Route path="/lead-magnet-success" element={<LeadMagnetSuccess />} />
      <Route path="/reliable-cafe-connectivity" element={<CafeWifi />} />
      <Route path="/office-connectivity" element={<OfficeWifi />} />
      <Route path="/network-troubleshooting" element={<NetworkTroubleshooting />} />
      <Route path="/wifi-optimisation" element={<WifiOptimisation />} />
      <Route path="/website-for-electricians" element={<ElectricianWebsiteServices />} />
      <Route path="/blog" element={<BlogList />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
    </Routes>
    </Suspense>
    </BookingProvider>
  </BrowserRouter>
);
  