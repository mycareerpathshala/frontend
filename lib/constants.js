/**
 * Application-wide constants
 */

// API pagination defaults
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

// API endpoints
export const STRAPI_ENDPOINTS = {
  UNIVERSITIES: '/mbbs-universities',
  PROGRAMS: '/mbbs-programs',
  COUNTRIES: '/countries',
  USERS_ME: '/users/me',
};

// Error messages
export const ERROR_MESSAGES = {
  AUTH_FAILED: 'Authentication failed. Please check your credentials.',
  INVALID_ID: 'Invalid ID provided',
  NOT_FOUND: 'Resource not found',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  GENERIC_ERROR: 'An unexpected error occurred. Please try again.',
};
