import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// ------------------------------------------------------------------
// INSTRUCTIONS (TALİMATLAR):
// 1. Google Analytics (https://analytics.google.com) - Creates stats for visitors.
//    Get your Measurement ID (starts with G-) and paste it below.
// 
// 2. Microsoft Clarity (https://clarity.microsoft.com) - Records what users click and scroll (Heatmaps).
//    Get your Project ID (a short string) and paste it below.
// ------------------------------------------------------------------

const GA_ID = 'G-G1CJWH1KVC';
const CLARITY_ID = 'vcnb2ln7pk';

const AnalyticsTracker = () => {
    const location = useLocation();

    useEffect(() => {
        // --- GOOGLE ANALYTICS INITIALIZATION ---
        if (GA_ID && GA_ID !== 'G-XXXXXXXXXX') {
            // Check if script already exists to prevent duplicates
            if (!document.querySelector(`script[src*="googletagmanager.com/gtag/js"]`)) {
                const script = document.createElement('script');
                script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
                script.async = true;
                document.head.appendChild(script);

                window.dataLayer = window.dataLayer || [];
                function gtag() { window.dataLayer.push(arguments); }
                gtag('js', new Date());
                gtag('config', GA_ID);
                window.gtag = gtag;
                console.log('Google Analytics Initialized');
            }
        }

        // --- MICROSOFT CLARITY INITIALIZATION (Heatmaps & Session Recording) ---
        if (CLARITY_ID) {
            if (!window.clarity) {
                (function (c, l, a, r, i, t, y) {
                    c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
                    t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
                    y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
                    console.log('Microsoft Clarity Initialized');
                })(window, document, "clarity", "script", CLARITY_ID);
            }
        }
    }, []);

    useEffect(() => {
        // --- PAGE VIEW TRACKING ---
        // Triggered every time the user navigates to a new page
        if (window.gtag && GA_ID !== 'G-XXXXXXXXXX') {
            window.gtag('config', GA_ID, {
                page_path: location.pathname + location.search
            });
        }
    }, [location]);

    return null; // This component handles logic only, no UI
};

export default AnalyticsTracker;
