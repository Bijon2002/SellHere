import axios from 'axios';

// ============================================
// AXIOS CONFIGURATION FOR API CALLS
// ============================================

// Create axios instance with base URL
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1',
  timeout: 15000, // 15 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  }
});

// ============================================
// REQUEST INTERCEPTOR - ADD TOKEN TO REQUESTS
// ============================================
API.interceptors.request.use(
  (config) => {
    // Get access token from localStorage
    const accessToken = localStorage.getItem('accessToken');
    
    // If token exists, add to headers
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    
    // Optional: Log request for debugging
    console.log(`📤 ${config.method.toUpperCase()} ${config.url}`);
    
    return config;
  },
  (error) => {
    console.error('❌ Request setup error:', error);
    return Promise.reject(error);
  }
);

// ============================================
// RESPONSE INTERCEPTOR - HANDLE TOKEN REFRESH
// ============================================
API.interceptors.response.use(
  (response) => {
    // Optional: Log successful response
    console.log(`✅ ${response.status} ${response.config.url}`);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // If error is 401 (Unauthorized) and we haven't retried yet
    if (error.response?.status === 401 && 
        !originalRequest._retry &&
        !originalRequest.url.includes('/auth/login') &&
        !originalRequest.url.includes('/auth/register') &&
        !originalRequest.url.includes('/auth/refresh-token')) {
      
      console.log('🔄 Access token expired, attempting refresh...');
      originalRequest._retry = true;
      
      try {
        // Get refresh token
        const refreshToken = localStorage.getItem('refreshToken');
        
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }
        
        // Call refresh endpoint (using plain axios to avoid interceptors loop)
        console.log('🔄 Calling refresh-token endpoint...');
        const { data } = await axios.post(
          `${process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1'}/auth/refresh-token`,
          { refreshToken }
        );
        
        if (data.success && data.accessToken) {
          console.log('✅ New access token received!');
          
          // Save new access token
          localStorage.setItem('accessToken', data.accessToken);
          
          // Update the failed request with new token
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
          
          console.log('🔄 Retrying original request...');
          // Retry the original request
          return API(originalRequest);
          
        } else {
          throw new Error('Refresh token response was not successful');
        }
        
      } catch (refreshError) {
        console.error('❌ Token refresh failed:', refreshError);
        
        // Clear all auth data
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userInfo');
        
        // Redirect to login page if not already there
        if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
          console.log('🔒 Redirecting to login page...');
          window.location.href = '/login';
        }
        
        return Promise.reject(refreshError);
      }
    }
    
    // Handle other common errors
    if (error.response) {
      switch (error.response.status) {
        case 400:
          console.error('❌ Bad Request:', error.response.data?.message);
          break;
        case 403:
          console.error('🚫 Access Forbidden');
          break;
        case 404:
          console.error('🔍 Endpoint not found:', originalRequest.url);
          break;
        case 500:
          console.error('💥 Server Error');
          break;
        default:
          console.error(`❌ Error ${error.response.status}:`, error.response.data?.message);
      }
    } else if (error.request) {
      console.error('🌐 Network Error - No response received');
    } else {
      console.error('⚠️ Request Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default API;