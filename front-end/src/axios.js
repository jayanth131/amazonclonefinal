import axios from "axios";

const instance = axios.create({
  baseURL: 'https://my-backend-gsj2.onrender.com', // 👈 Updated to your standalone server
});

instance.interceptors.request.use((request) => {
  console.log("📦 Axios Request:", request.url, request.params || request.data);
  return request;
});

export default instance;
