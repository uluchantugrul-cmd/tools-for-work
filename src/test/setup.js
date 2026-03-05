import '@testing-library/jest-dom';
import { beforeAll, afterAll, beforeEach } from 'vitest';

// Fix for jsdom window.scrollTo
window.scrollTo = () => { };
