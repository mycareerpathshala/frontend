import axios from 'axios';

const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

// Create axios instance with default config
const strapiClient = axios.create({
  baseURL: `${STRAPI_API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
strapiClient.interceptors.request.use(
  (config) => {
    // Try to get token from localStorage (client-side) or env (server-side)
    const token = typeof window !== 'undefined' 
      ? localStorage.getItem('strapiToken') || STRAPI_API_TOKEN
      : STRAPI_API_TOKEN;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401 errors and token refresh
strapiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh token or get a new one
        const refreshedToken = await refreshStrapiToken();
        
        if (refreshedToken) {
          // Update token in localStorage
          if (typeof window !== 'undefined') {
            localStorage.setItem('strapiToken', refreshedToken);
          }
          
          // Update the failed request with new token
          originalRequest.headers.Authorization = `Bearer ${refreshedToken}`;
          
          // Retry the original request
          return strapiClient(originalRequest);
        }
      } catch (refreshError) {
        // If refresh fails, clear token and redirect to login
        if (typeof window !== 'undefined') {
          localStorage.removeItem('strapiToken');
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

/**
 * Refresh or validate Strapi token
 * This is a placeholder - implement based on your Strapi auth strategy
 */
async function refreshStrapiToken() {
  try {
    // Option 1: If using JWT tokens with refresh token
    const refreshToken = typeof window !== 'undefined' 
      ? localStorage.getItem('strapiRefreshToken')
      : null;
    
    if (refreshToken) {
      // Note: Verify that your Strapi instance has the refresh-token endpoint enabled
      // This is typically available with the strapi-plugin-users-permissions
      try {
        const response = await axios.post(`${STRAPI_API_URL}/api/auth/refresh-token`, {
          refreshToken,
        });
        return response.data.jwt;
      } catch (refreshError) {
        console.warn('Refresh token endpoint not available or failed:', refreshError.message);
        // Fall through to option 2
      }
    }
    
    // Option 2: Use the API token from environment as fallback
    return STRAPI_API_TOKEN;
  } catch (error) {
    console.error('Token refresh failed:', error);
    return null;
  }
}

/**
 * Verify token permissions by making a test request
 */
export async function verifyStrapiTokenPermissions() {
  try {
    const response = await strapiClient.get('/users/me');
    return {
      valid: true,
      user: response.data,
    };
  } catch (error) {
    return {
      valid: false,
      error: error.response?.status === 401 
        ? 'Invalid or expired token' 
        : 'Token verification failed',
    };
  }
}

/**
 * Set Strapi token (useful after login)
 */
export function setStrapiToken(token, refreshToken = null) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('strapiToken', token);
    if (refreshToken) {
      localStorage.setItem('strapiRefreshToken', refreshToken);
    }
  }
}

/**
 * Clear Strapi token (useful for logout)
 */
export function clearStrapiToken() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('strapiToken');
    localStorage.removeItem('strapiRefreshToken');
  }
}

export default strapiClient;
