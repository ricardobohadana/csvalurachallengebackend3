import axios from "axios";

const apiBaseUrl = "https://backend.up.railway.app/api/v1";

const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
});

export { axiosInstance };
