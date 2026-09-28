import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://69b94ea5e69653ffe6a742f7.mockapi.io/contacts",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
