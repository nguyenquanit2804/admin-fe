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
// thêm token vào API
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log("========== TOKEN: " + token);
    // const tokenExpiry = localStorage.getItem('tokenExpiry');
    
    // if (token && tokenExpiry && Date.now() < tokenExpiry) {
      // Thêm token vào header nếu token còn hợp lệ
      config.headers['Authorization'] = `Bearer ${token}`;
    // } else {
      // Nếu token hết hạn, xóa token và tokenExpiry, chuyển hướng về trang đăng nhập
      // localStorage.removeItem('token');
      // localStorage.removeItem('tokenExpiry');
      // if (window.location.pathname !== '/auth/login') {
        // window.location.href = '/auth/login';
      // }
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default {
  testConnectToBackend() {
    return api.post('/test');
  },
  async login(credentials) {
    try {
      const result = await api.post("/admin/login", credentials);
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
   async getModule() {
    try {
      const result = await api.post("/admin/role/module");
      console.log('============ LAy cai module ra', result)
      return result;
    } catch (error) {
      console.error("Lỗi khi lấy module:", error);
      throw error;
    }
  },
  async getFunction() {
    try {
      const result = await api.post("/admin/role/function");
      return result;
    } catch (error) {
      console.error("Lỗi khi lấy function:", error);
      throw error;
    }
  },


}