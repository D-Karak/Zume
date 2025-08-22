import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor for debugging
// api.interceptors.request.use(
//   (config) => {
//     console.log('API Request:', {
//       method: config.method,
//       url: config.url,
//       data: config.data,
//       headers: config.headers
//     });
//     return config;
//   },
//   (error) => {
//     console.error('API Request Error:', error);
//     return Promise.reject(error);
//   }
// );

// // Add a response interceptor for debugging
// api.interceptors.response.use(
//   (response) => {
//     console.log('API Response:', {
//       status: response.status,
//       data: response.data
//     });
//     return response;
//   },
//   (error) => {
//     console.error('API Response Error:', {
//       status: error.response?.status,
//       data: error.response?.data,
//       message: error.message
//     });
//     return Promise.reject(error);
//   }
// );

export default api;
