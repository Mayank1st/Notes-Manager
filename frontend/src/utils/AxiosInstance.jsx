import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/user",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
