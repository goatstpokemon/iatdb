import axios from "axios";
const apiClient = axios.create({
    baseURL: "http://localhost:8000/api",
    withCredentials: true,
    withXSRFToken: true,
});
apiClient.interceptors.response.use((config) => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
})
apiClient.interceptors.request.use((response) => {
    return response;
},
    (error) => {
        const { response } = error;
        if (response.status === 401) {
            localStorage.removeItem("ACCESS_TOKEN");

        }
        throw error;
    })
export default apiClient;
