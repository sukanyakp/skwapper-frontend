import axios from "axios";

const basicAxiosInstance = axios.create({
    baseURL : 'http://localhost:3000',
    withCredentials : true  
})

export default basicAxiosInstance