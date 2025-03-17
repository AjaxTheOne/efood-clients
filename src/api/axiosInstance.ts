import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.PROD 
        ? "https://api.efood.pagonoudis.gr" 
        : "http://efood-api.test",
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default axiosInstance;