import axios from "axios";

const API = axios.create({
  baseURL: "https://job-tracker-api-zslb.onrender.com/api",
});

export default API;
