/**
 * Centralized Redirect Sanitization Utility
 * Ensures all authentication redirects remain inside internal relative paths.
 */
export function sanitizeRedirectPath(path?: string | null, fallback = '/dashboard'): string {
  if (!path || typeof path !== 'string') {
    return fallback;
  }

  const trimmed = path.trim();

  // Allow relative paths starting with '/' but disallow '//' (protocol-relative open redirects) and '\\'
  if (trimmed.startsWith('/') && !trimmed.startsWith('//') && !trimmed.includes('\\')) {
    // Avoid redirect loops back to login/signup/register
    if (
      trimmed.startsWith('/login') ||
      trimmed.startsWith('/signup') ||
      trimmed.startsWith('/register')
    ) {
      return fallback;
    }
    return trimmed;
  }

  return fallback;
}

