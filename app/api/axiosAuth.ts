import axios from "axios";


export const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/";

const axiosAuth = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export default axiosAuth;
