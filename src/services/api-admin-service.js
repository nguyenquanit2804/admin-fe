import api from '@/services/api-base';

import axios from "axios";


// Tạo instance của Axios
const apiCreate = axios.create({


  baseURL: "http://localhost:10000", // Đổi thành API của bạn
  headers: {
    "Content-Type": "application/json",
  },
});

apiCreate.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

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

// Thêm interceptor để xử lý phản hồi
api.interceptors.response.use(
  (response) => {
    return response.data;
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
  // API dang nhap
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
  // API lay module
   async getModule() {
    try {
      const result = await api.post("/admin/role/module");

      return result;
    } catch (error) {
      console.error("Lỗi khi lấy module:", error);
      throw error;
    }
  },
  // API lay function
  async getFunction() {
    try {
      const result = await api.post("/admin/role/function");
      return result;
    } catch (error) {
      console.error("Lỗi khi lấy function:", error);
      throw error;
    }
  },
  // API ADD 
  async addPartnerAPI(dataAddPartner) {
    try {
      const result = await apiCreate.post("/admin/partner/add" , dataAddPartner);

      if(result.data.status === 400) {
        return result; 
      }
      return result;
    } catch (error) {
      console.error("Lỗi khi lấy function:", error);
      throw error;
    }
  },
  // API Info partner
  async infoPartnerAPI(searchInfoPartner) {
    try {
      const result = await api.post("/admin/partner/info" , searchInfoPartner);
      return result;
    } catch (error) {
      console.error("Lỗi khi lấy thông tin:", error);
      throw error;
    }
  },

  async infoPartnerDetailAPI(infoPartnerDetail) {
    try {
      const result = await api.post("/admin/partner/detail" , infoPartnerDetail);
      return result;
    } catch (error) {
      console.error("Lỗi khi lấy thông tin:", error);
      throw error;
    }
  },

  async updatePartnerAPI(updatePartner) {
    try {
      const result = await api.post("/admin/partner/edit" , updatePartner);
      return result;
    } catch (error) {
      console.error("Lỗi khi lấy thông tin:", error);
      throw error;
    }
  },

}