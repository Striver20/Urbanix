// API Configuration
console.log("🔍 Environment Check:", {
  REACT_APP_BACKEND_URL: process.env.REACT_APP_BACKEND_URL,
  REACT_APP_API_URL: process.env.REACT_APP_API_URL,
  NODE_ENV: process.env.NODE_ENV
});

export const API_BASE_URL =
  process.env.REACT_APP_BACKEND_URL ||
  process.env.REACT_APP_API_URL ||
  "https://urbanix-production.up.railway.app";

console.log("🚀 Using API_BASE_URL:", API_BASE_URL);

// API endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/v1/auth/login`,
    REGISTER: `${API_BASE_URL}/api/v1/auth/register`,
    PROFILE: `${API_BASE_URL}/api/v1/auth/profile`,
    USERS: `${API_BASE_URL}/api/v1/auth/users`,
    SEND_OTP: `${API_BASE_URL}/api/v1/auth/send-otp`,
    VERIFY_OTP: `${API_BASE_URL}/api/v1/auth/verify-otp`,
  },

  // Product endpoints
  PRODUCTS: {
    BASE: `${API_BASE_URL}/api/v1/product`,
    PHOTO: (id) => `${API_BASE_URL}/api/v1/product/product-photo/${id}`,
    FILTER: `${API_BASE_URL}/api/v1/product/filter-product`,
    SEARCH: (keyword) =>
      `${API_BASE_URL}/api/v1/product/search-product/${keyword}`,
    SIMILAR: (pid, cid) =>
      `${API_BASE_URL}/api/v1/product/related-products/${pid}/${cid}`,
  },

  // Category endpoints
  CATEGORIES: {
    BASE: `${API_BASE_URL}/api/v1/category`,
    BY_SLUG: (slug) =>
      `${API_BASE_URL}/api/v1/category/single-category/${slug}`,
    PRODUCTS: (slug) =>
      `${API_BASE_URL}/api/v1/product/product-category/${slug}`,
  },

  // Order endpoints
  ORDERS: {
    CREATE: `${API_BASE_URL}/api/v1/order/create`,
    USER_ORDERS: `${API_BASE_URL}/api/v1/order/user-orders`,
    ALL_ORDERS: `${API_BASE_URL}/api/v1/order/all-orders`,
    UPDATE_STATUS: (id) => `${API_BASE_URL}/api/v1/order/update-status/${id}`,
  },
};

export default API_BASE_URL;
