import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API,
  timeout: 10000, // optional
  headers: {
    "Content-Type": "application/json",
  },
});
export default api;
