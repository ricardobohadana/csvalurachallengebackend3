import axios from "axios";

const apiBaseUrl = "http://localhost:3333/api/v1";

const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
});

export { axiosInstance };
