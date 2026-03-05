import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach } from 'vitest';
import SEO from './SEO';

const Wrapper = ({ children }) => (
    <BrowserRouter>{children}</BrowserRouter>
);

describe('SEO Component', () => {
    beforeEach(() => {
        document.title = "";
        const meta = document.createElement('meta');
        meta.name = "description";
        document.head.appendChild(meta);
    });

    it('should update document title', () => {
        render(<SEO title="Test Title" />, { wrapper: Wrapper });
        expect(document.title).toBe("Test Title | Tools for Work");
    });

    it('should update meta description', () => {
        render(<SEO description="Test Description" />, { wrapper: Wrapper });
        const meta = document.querySelector('meta[name="description"]');
        expect(meta.getAttribute('content')).toBe("Test Description");
    });
});
