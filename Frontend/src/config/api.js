export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (window.location.hostname === "localhost"
    ? "http://localhost:4001"
    : "https://challengex-i5x0.onrender.com");
