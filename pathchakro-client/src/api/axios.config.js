import axios from 'axios';

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,

});


axiosSecure.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers.authorization = `Bearer ${token}`;
    return config;
}, function (error) {
    return Promise.reject(error);
});

export default axiosSecure;