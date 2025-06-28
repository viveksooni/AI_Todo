import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.DEV
    ? "/api" // In development, use Vite proxy
    : "/api", //
  timeout: 10000, // optional
  headers: {
    "Content-Type": "application/json",
  },
});
export default api;
