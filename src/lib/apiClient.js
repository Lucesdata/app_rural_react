import { TOKEN_KEY, USER_KEY } from '../constants/roles.js';

const BASE_URL = import.meta.env?.VITE_API_URL || 'http://localhost:4000';

/**
 * Helper function to get auth token from localStorage
 */
const getAuthToken = () => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error('Error accessing localStorage:', error);
    return null;
  }
};

/**
 * Generic API request handler
 */
const apiRequest = async (endpoint, options = {}) => {
  const { method = 'GET', body, headers = {}, ...rest } = options;
  
  // Set up headers
  const requestHeaders = new Headers({
    'Content-Type': 'application/json',
    ...headers
  });

  // Add auth token if available
  const token = getAuthToken();
  if (token) {
    requestHeaders.set('Authorization', `Bearer ${token}`);
  }

  // Prepare request config
  const config = {
    method,
    headers: requestHeaders,
    ...rest
  };

  // Add body if present
  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    
    // Handle 401 Unauthorized
    if (response.status === 401) {
      // Clear auth data and redirect to login
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      window.dispatchEvent(new Event('unauthorized'));
      throw new Error('Sesión expirada. Por favor, inicia sesión nuevamente.');
    }

    // Parse response
    const data = await response.json().catch(() => ({}));
    
    if (!response.ok) {
      throw new Error(data.message || data.error || 'Error en la petición');
    }

    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Auth API
export const authApi = {
  register: async (userData) => {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: userData
    });
  },

  login: async (credentials) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: credentials
    });
  },
  
  logout: async () => {
    try {
      await apiRequest('/auth/logout', { method: 'POST' });
    } finally {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
  },
  
  getProfile: async () => {
    return apiRequest('/me');
  }
};

// Plantas API
export const plantasApi = {
  getPlants: async () => {
    return apiRequest('/plantas');
  },

  getPlant: async (id) => {
    return apiRequest(`/plantas/${id}`);
  },

  getLatestReadings: async (id, limit = 5) => {
    const params = new URLSearchParams({ limit: String(limit) });
    return apiRequest(`/plantas/${id}/lecturas?${params.toString()}`);
  },

  createPlant: async (plantData) => {
    return apiRequest('/plantas', {
      method: 'POST',
      body: plantData
    });
  },

  deletePlant: async (id) => {
    return apiRequest(`/plantas/${id}`, {
      method: 'DELETE'
    });
  }
};
