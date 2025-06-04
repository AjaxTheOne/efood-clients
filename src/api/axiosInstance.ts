import axios from "axios";
import { Address } from "../types/addresses";

const axiosInstance = axios.create({
    baseURL: import.meta.env.PROD 
        ? "https://api.efood.pagonoudis.gr" 
        : "http://efood-api.test",
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    const address = localStorage.getItem("address");
    const locale = localStorage.getItem("i18nextLng");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    if (address) {
        const addressJson = JSON.parse(address) as Address;
        config.headers["X-Location"] = `${addressJson.latitude},${addressJson.longitude}`;
    }

    config.headers["Accept-Language"] = locale ?? "en";

    return config;
});

export default axiosInstance;