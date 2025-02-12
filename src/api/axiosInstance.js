import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.error('Ошибка сервера:', error.response.status, error.response.data);
      if (error.response.status === 466) {
        console.warn('Число запросов превышено');
      }
    } else if (error.request) {
      console.error('Сервер не отвечает:', error.request);
    } else {
      console.error('Ошибка запроса:', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;