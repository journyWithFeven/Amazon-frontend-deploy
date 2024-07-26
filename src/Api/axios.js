import axios from "axios";
const axiosInstance = axios.create({
  // local instance of firebase function
  // baseURL: "http://127.0.0.1:5001/clone-33de3/us-central1/api",

  // deployed version of amazon server on render.com
  baseURL: "https://amazon-clone-api-deploy-c9ct.onrender.com/",
});
export { axiosInstance };
