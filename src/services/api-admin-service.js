import axios from 'axios';

const apiAdminService = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default {
    testConnectToBackend() {
      return apiAdminService.post('/test');
    }
}