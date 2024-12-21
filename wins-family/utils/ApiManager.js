import axios from "axios";

// const link = "http://127.0.0.1:3000";
const link = "https://wins-family.onrender.com";
const ApiManager = axios.create({
  baseURL: `${link}`,
  responseType: "json",
  withCredentials: true,
});

export default ApiManager;
