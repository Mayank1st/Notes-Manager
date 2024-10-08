import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://notes-manager-ov5t.onrender.com/api/user",
  headers: {
    "Content-Type": "application/json",
  },
});
