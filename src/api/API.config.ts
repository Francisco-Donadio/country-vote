import axios, { AxiosError } from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const API = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError<{ message: string; statusCode: number }>) => {
    let errorMessage = "An unexpected error occurred";

    if (error.response) {
      errorMessage = error.response.data?.message || error.message;
    } else if (error.request) {
      errorMessage = "Unable to connect to the server. Please try again later.";
    } else {
      errorMessage = error.message;
    }

    console.error("API Error:", errorMessage);

    return Promise.reject(new Error(errorMessage));
  }
);
