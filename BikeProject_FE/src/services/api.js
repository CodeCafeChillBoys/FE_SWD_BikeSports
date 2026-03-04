import axios from 'axios';

const API_BASE_URL =
    import.meta.env.VITE_API_URL || 'https://localhost:7247/api';

console.log("🌐 API Base URL:", API_BASE_URL);

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

// =============================
// REQUEST INTERCEPTOR
// =============================
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken') || localStorage.getItem('access_token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// =============================
// RESPONSE INTERCEPTOR
// =============================
apiClient.interceptors.response.use(
    (response) => response.data,
    (error) => {
        console.error("API ERROR:", error.response?.data || error.message);

        // Handle 401 Unauthorized - token expired or invalid
        if (error.response?.status === 401) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("access_token");
            localStorage.removeItem("email");
            localStorage.removeItem("role");
            localStorage.removeItem("roleId");

            // Redirect to login if not already there
            if (globalThis.location.pathname !== "/login") {
                globalThis.location.href = "/login";
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;