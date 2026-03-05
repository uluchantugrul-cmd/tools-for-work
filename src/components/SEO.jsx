import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SEO = ({ title, description, keywords }) => {
    const location = useLocation();

    useEffect(() => {
        // Update Title
        const baseTitle = "Tools for Work";
        const fullTitle = title ? `${title} | ${baseTitle}` : baseTitle;
        document.title = fullTitle;

        // Update Description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', description || "Free, local-first productivity suite. Create Gantt charts, calculate salaries, generate secure passwords, track Pomodoros, and use offline dev tools. 100% private.");
        }

        // Update Keywords
        const metaKeywords = document.querySelector('meta[name="keywords"]');
        if (metaKeywords) {
            metaKeywords.setAttribute('content', keywords || "free gantt chart, salary calculator, password generator, income visualizer, pomodoro tracker, meeting notes, team availability, json prettify, offline dev tools");
        }

        // Update Canonical
        const canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) {
            canonical.setAttribute('href', `https://toolsforwork.me${location.pathname}`);
        }

        // Update OG Title
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) {
            ogTitle.setAttribute('content', fullTitle);
        }

    }, [title, description, keywords, location.pathname]);

    return null;
};

export default SEO;
