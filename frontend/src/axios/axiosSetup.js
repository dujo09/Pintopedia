import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000/public/api/";

export const setupAxiosInterceptors = (getToken, logout) => {
  axios.interceptors.request.use(
    (config) => {
      const token = getToken();

      console.log("Sending request with token: ", token);
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response?.status === 401) {
        console.log("Unauthorized! Logging out...");
        logout();
      }
      return Promise.reject(error);
    },
  );
};
