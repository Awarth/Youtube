import axios from "axios";
import { refreshTokenSuccess, logout } from "../redux/slices/authSlice";
import { store } from "../redux/store";
import { base_url } from "../constants";

// Create axios instance
const api = axios.create({
  baseURL: base_url,
  withCredentials: true, // Allows sending cookies
});

// Request interceptor to attach access token to headers
api.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const accessToken = state.auth.accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is a 401 (Unauthorized) and the request hasn't been retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Attempt to refresh the token
        const res = await axios.post(
          "/users/refresh-token",
          {},
          { withCredentials: true }
        );

        // Dispatch the new access token to Redux store
        store.dispatch(
          refreshTokenSuccess({ accessToken: res.data.accessToken })
        );

        // Update the Authorization header for the original request
        originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;

        // Retry the original request with the new token
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed", refreshError);

        // If refreshing token fails, log the user out and redirect to login
        store.dispatch(logout());

        // Redirect to login page after logout
        window.location.href = "/profile/login";
      }
    }

    // If the error is not a 401 or it was already retried, just reject the error
    return Promise.reject(error);
  }
);

export default api;
