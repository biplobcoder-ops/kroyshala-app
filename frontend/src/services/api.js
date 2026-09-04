import axios from "axios";

// লোকাল ডেভেলপমেন্ট আর প্রোডাকশন URL আলাদা করার জন্য
const getBaseURL = () => {
  // Vercel-এ ডেপ্লয় করলে এনভায়রনমেন্ট ভেরিয়েবল থেকে URL নিয়ে নাও
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  // লোকাল ডেভেলপমেন্টের জন্য (যখন .env-এ কিছু নেই)
  return "http://localhost:5000/api";
};

const api = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

// Request: token attach
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response: silent refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // ✅ Auth-related requests: refresh করবে না, redirectও করবে না
    const isAuthRequest =
      originalRequest.url?.includes("/auth/login") ||
      originalRequest.url?.includes("/auth/refresh-token") ||
      originalRequest.url?.includes("/user/register") ||
      originalRequest.url?.includes("/user/verify-email") ||
      originalRequest.url?.includes("/user/forgot-password") ||
      originalRequest.url?.includes("/user/reset-password") ||
      originalRequest.url?.includes("/user/me");

    if (isAuthRequest) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (token) originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await axios.post(
          `${getBaseURL()}/auth/refresh-token`,
          {},
          { withCredentials: true }
        );

        const newAccessToken =
          response.data?.payload?.accessToken || response.data?.accessToken;

        if (newAccessToken) {
          localStorage.setItem("accessToken", newAccessToken);
        }

        processQueue(null, newAccessToken);
        if (newAccessToken) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        localStorage.removeItem("accessToken");

        // ❌ এখানে redirect বন্ধ করো — শুধু reject করো
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;