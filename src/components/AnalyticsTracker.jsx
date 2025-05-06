// src/components/AnalyticsTracker.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) {
      console.warn("Google Analytics Measurement ID is not defined in environment variables (VITE_GA_MEASUREMENT_ID).");
      return;
    }

    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search + location.hash,
        page_location: window.location.href,
        page_title: document.title,
        send_to: GA_MEASUREMENT_ID
      });
    }
  }, [location.pathname, location.search, location.hash]);

  return null;
};

export default AnalyticsTracker;