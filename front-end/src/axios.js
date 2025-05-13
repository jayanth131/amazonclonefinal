import axios from "axios";

const instance = axios.create({
  baseURL: 'https://amazonclone-final-rnyu.onrender.com/api/orders'
});

instance.interceptors.request.use((request) => {
  console.log("📦 Axios Request:", request.url, request.params || request.data);
  return request;
});

export default instance;
