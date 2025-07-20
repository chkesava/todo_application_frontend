import axios from "axios";
import Cookies from "js-cookie";
const API = axios.create({ baseURL: "https://todo-application-backend-fe81.onrender.com/api" });
API.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
export default API;
