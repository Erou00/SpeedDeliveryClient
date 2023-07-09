import axios from "axios";
//baseURL: 'http://192.168.100.2:8080/api',
const ApiManager = axios.create({
    baseURL: 'http://192.168.1.37:8080/api',
    responseType: 'json',
    withCredentials:false,
    // cancelToken:false  
  });   
  
  export default ApiManager;    