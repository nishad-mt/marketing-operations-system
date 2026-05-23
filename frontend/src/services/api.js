import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api', // Assuming DRF runs on 8000
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        
        // Prevent infinite loop if refresh token fails
        if (error.response?.status === 401 && !originalRequest._retry && originalRequest.url !== '/auth/google/') {
            originalRequest._retry = true;
            
            try {
                const refreshToken = localStorage.getItem('refresh');
                if (refreshToken) {
                    const response = await axios.post('http://localhost:8000/api/auth/refresh/', {
                        refresh: refreshToken
                    });
                    const { access } = response.data;
                    localStorage.setItem('access', access);
                    api.defaults.headers.common['Authorization'] = `Bearer ${access}`;
                    return api(originalRequest);
                }
            } catch (refreshError) {
                // If refresh fails, log out
                localStorage.removeItem('access');
                localStorage.removeItem('refresh');
                localStorage.removeItem('user');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default api;
