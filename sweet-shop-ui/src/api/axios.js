import axios from "axios";

const api = axios.create({
    //this will connect our backend URL.
  baseURL: "http://localhost:5000/api", 
  
});

export default api;
