import axios from "axios";

const api = axios.create({
  baseURL: "https://sistema-tickets-soporte.onrender.com/api",
});

export default api;
