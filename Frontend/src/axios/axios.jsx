
import axios  from "axios";

const api = axios.create({
  baseURL: "http://20.219.207.5/api", 
  withCredentials: true, 
  headers: {
     "Content-Type": "application/json",
   },
});

export default api;
