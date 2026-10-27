import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('university_ai_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token if expired
      // localStorage.removeItem('university_ai_token');
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
  forgotPassword: (data) => api.post('/auth/forgot-password', data),
  resetPassword: (data) => api.post('/auth/reset-password', data),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data),
  uploadAvatar: (formData) => api.post('/auth/avatar', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
};

export const chatAPI = {
  getSessions: () => api.get('/chat/sessions'),
  createSession: (data) => api.post('/chat/sessions', data),
  getSession: (id) => api.get(`/chat/sessions/${id}`),
  sendMessage: (sessionId, data) => api.post(`/chat/sessions/${sessionId}/messages`, data),
  renameSession: (sessionId, data) => api.put(`/chat/sessions/${sessionId}/title`, data),
  deleteSession: (sessionId) => api.delete(`/chat/sessions/${sessionId}`),
  clearSession: (sessionId) => api.post(`/chat/sessions/${sessionId}/clear`),
  sendFeedback: (sessionId, messageId, data) => 
    api.post(`/chat/sessions/${sessionId}/messages/${messageId}/feedback`, data),
};

export const universityAPI = {
  getInfo: () => api.get('/university/info'),
  getTopics: () => api.get('/university/topics'),
  getTopic: (key) => api.get(`/university/topics/${key}`),
  search: (query) => api.get(`/university/search?q=${encodeURIComponent(query)}`),
  getFaqs: () => api.get('/university/faqs'),
};

export const analyticsAPI = {
  getDashboard: () => api.get('/analytics/dashboard'),
};

export default api;
