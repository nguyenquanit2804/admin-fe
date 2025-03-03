import api from '@/services/api-base'; 

// Thêm interceptor để xử lý phản hồi
        api.interceptors.response.use(
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
      return api.post('/test');
    },
    async login(credentials) {
      try {
        const result = await api.post("/api/auth/login", credentials);
        // Xử lý kết quả nếu cần
        return result;
      } catch (error) {
        // Xử lý lỗi nếu cần
        console.error("Lỗi khi đăng nhập:", error);
        throw error;
      }
    },
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiry');
      if (window.location.pathname !== '/auth/login') {
        window.location.href = '/auth/login'; // Chỉ chuyển hướng nếu không ở trang login
      }
    },
    
}