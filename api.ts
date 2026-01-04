import axios from "axios";

export const backendApi = axios.create({
    baseURL: "http://localhost:5001/api",
    headers: {
        "Content-Type": "application/json"
    },
    timeout: 100000
});


backendApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);
