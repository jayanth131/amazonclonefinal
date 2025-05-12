// axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: 'http://127.0.0.1:5001/clone-5af24/us-central1/api/', // ✅ Make sure this is YOUR Firebase project ID
});

// Optional: Debug request logging
instance.interceptors.request.use((request) => {
  console.log("📦 Axios Request:", request.url, request.params || request.data);
  return request;
});

export default instance;
