import { startOfDay } from 'date-fns';

/**
 * Robustly parses a value into a Date object.
 * Handles Excel serial numbers, JS dates, and common string formats.
 */
export const robustParseDate = (val) => {
    if (!val) return null;
    if (val instanceof Date) return isNaN(val.getTime()) ? null : val;

    // Excel numeric date (days since 1900-01-01)
    if (typeof val === 'number') {
        const date = new Date((val - 25569) * 86400 * 1000);
        return isNaN(date.getTime()) ? null : date;
    }

    if (typeof val !== 'string') return null;

    // Try standard ISO/JS parsing
    const date = new Date(val);
    if (!isNaN(date.getTime())) return date;

    // Handle DD/MM/YYYY or DD-MM-YYYY
    const dmy = val.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/);
    if (dmy) {
        const d = parseInt(dmy[1], 10);
        const m = parseInt(dmy[2], 10) - 1;
        const y = parseInt(dmy[3], 10);
        const parsed = new Date(y, m, d);
        if (!isNaN(parsed.getTime())) return parsed;
    }

    return null;
};

/**
 * Encodes string to Base64 supporting Unicode (Turkish, Emojis, etc.)
 */
export const safeBtoa = (str) => {
    try {
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => {
            return String.fromCharCode(parseInt(p1, 16));
        }));
    } catch (e) {
        return "Encoding Error";
    }
};

/**
 * Decodes string from Base64 supporting Unicode
 */
export const safeAtob = (str) => {
    try {
        return decodeURIComponent(Array.prototype.map.call(atob(str), (c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    } catch (e) {
        return "Decoding Error (Invalid Base64)";
    }
};

/**
 * Checks if two date intervals [s1, e1] and [s2, e2] overlap.
 */
export const checkOverlap = (s1, e1, s2, e2) => {
    const start1 = startOfDay(s1).getTime();
    const end1 = startOfDay(e1).getTime();
    const start2 = startOfDay(s2).getTime();
    const end2 = startOfDay(e2).getTime();

    return start1 <= end2 && start2 <= end1;
};
