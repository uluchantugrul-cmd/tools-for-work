import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter, useSearchParams } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import SalaryCalculator from './SalaryCalculator';

// Wrapper for react-router logic
const Wrapper = ({ children }) => (
    <BrowserRouter>{children}</BrowserRouter>
);

describe('SalaryCalculator', () => {
    it('should update calculations when amount changes', async () => {
        render(<SalaryCalculator />, { wrapper: Wrapper });

        const input = screen.getByLabelText(/Amount/i);
        fireEvent.change(input, { target: { value: '120000' } });

        // Check if annual breakdown updated
        const annualDisplay = screen.getByText('$120,000.00');
        expect(annualDisplay).toBeInTheDocument();
    });

    it('should sync state to URL parameters', async () => {
        render(<SalaryCalculator />, { wrapper: Wrapper });

        const input = screen.getByLabelText(/Amount/i);
        fireEvent.change(input, { target: { value: '80000' } });

        // useEffect that updates search params is async
        await new Promise(resolve => setTimeout(resolve, 0));
        expect(window.location.search).toContain('amt=80000');
    });
});
