import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// req interceptor (token auth)
api.interceptors.request.use(
    (config) => {
        // nanti ambil token dari localStorage atau state management
        // const token = localStorage.getItem('token');
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor (handle global errors)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            console.error('API Error: ', error.response.data);
        }
        return Promise.reject(error);
    }
);

export default api;