import type { ValidationResult } from '../types/qr';

/**
 * Validates a web URL string.
 * Uses the browser's native URL constructor for robust parsing.
 * Rejects empty inputs, non-HTTP/HTTPS protocols, and malformed hosts.
 */
export function validateUrl(rawUrl: string): ValidationResult {
  const trimmed = rawUrl.trim();

  if (!trimmed) {
    return {
      valid: false,
      message: 'Please enter a URL first.',
    };
  }

  // Attempt to parse with native URL constructor
  let parsedUrl: URL;
  try {
    parsedUrl = new URL(trimmed);
  } catch {
    return {
      valid: false,
      message: 'Please enter a valid HTTP or HTTPS URL (e.g., https://example.com).',
    };
  }

  // Protocol validation: must be http: or https:
  if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
    return {
      valid: false,
      message: 'Please enter a valid HTTP or HTTPS URL. Other protocols are not supported.',
    };
  }

  // Hostname validation
  const hostname = parsedUrl.hostname;
  if (!hostname || hostname.length === 0) {
    return {
      valid: false,
      message: 'Please enter a valid URL with a valid domain name.',
    };
  }

  // Ensure hostname has at least a domain and TLD, or is a valid local host
  const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1' || hostname.startsWith('192.168.');
  const hasDot = hostname.includes('.');
  if (!isLocalhost && (!hasDot || hostname.endsWith('.'))) {
    return {
      valid: false,
      message: 'Please enter a valid domain (e.g., example.com).',
    };
  }

  return {
    valid: true,
    normalizedUrl: parsedUrl.href,
  };
}
