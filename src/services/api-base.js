import axios from "axios";

// Tạo instance của Axios
const api = axios.create({
  baseURL: "http://localhost:10000", // Đổi thành API của bạn
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor để xử lý response
api.interceptors.response.use(
  (response) => {
    // Kiểm tra nếu status === 200 thì trả về data trực tiếp
    if (response.data.status === 200) {
      return response.data;
    }
    if (response.data.status === 400) {
      return response;
    }
    // Nếu status khác 200, trả về response gốc để dễ debug
    return Promise.reject(response);
  },
  (error) => {
    // Xử lý lỗi từ server hoặc mạng
    return Promise.reject(error.response || error);
  }
);

export default api;
