import axios from 'axios';
const apiAdminService = axios.create({
  baseURL: 'http://localhost:8080/api/auth',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Thêm interceptor để xử lý phản hồi
apiAdminService.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token hết hạn hoặc không hợp lệ
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiry');
      if (window.location.pathname !== '/auth/login') {
        window.location.href = '/auth/login'; // Chỉ chuyển hướng nếu không ở trang login
      }
    }
    return Promise.reject(error);
  }
);

export default {
    testConnectToBackend() {
      return apiAdminService.post('/test');
    },
    login(credentials) {
      return apiAdminService.post('/login', credentials);
    },
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiry');
      if (window.location.pathname !== '/auth/login') {
        window.location.href = '/auth/login'; // Chỉ chuyển hướng nếu không ở trang login
      }
    },
    
}