export function sanitizeText(input: string, maxLength = 200): string {
    return input
        .replace(/[<>]/g, "")
        // eslint-disable-next-line no-control-regex
        .replace(/[\u0000-\u001F\u007F]/g, "")
        .trim()
        .slice(0, maxLength);
}

export function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}