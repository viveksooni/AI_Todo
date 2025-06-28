import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  timeout: 10000, // optional
  headers: {
    "Content-Type": "application/json",
  },
});
export default api;
