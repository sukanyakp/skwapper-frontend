import { toast } from "sonner";
import axios from "axios";
import basicAxiosInstance from "./basic-axios-instance";

// Create an axios instance
const axiosInstance = axios.create({
    baseURL : 'http://localhost:3000',
    withCredentials : true  
})


const refreshToken = async () => {
    try {
        const res = await basicAxiosInstance.get(
            '/auth/refresh-token',
            {withCredentials : true}
        )

        const data = res?.data.data
        localStorage.setItem("token",data.accessToken)

        return data.accessToken
        
    } catch (error : any) {
        throw error
    }
};

// Requsest Interceptors
axiosInstance.interceptors.request.use(
    (config): any => {
        const accessToken = localStorage.getItem("token");

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`; // set accessToken to authorization header
        }

        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

// Response Interceptors
axiosInstance.interceptors.response.use(
    (resp) => {
        return resp;
    },
    async (err) => {
        const originalRequest = err.config;

        if (
            err.response &&
            err.response.status === 403 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            try {
                const accessToken = await refreshToken();

                originalRequest.headers.Authorization = `Bearer ${accessToken}`; 

                return axiosInstance(originalRequest);
            } catch (err: any) {
                console.log(err);
                
                toast( "Token expired. Please login again!" );
                localStorage.removeItem("token");
                localStorage.removeItem("user");

              const res =  localStorage.getItem("Admin")
              if(res){
                  window.location.href = "/admin/login";
                    return;
              }else{
                  window.location.href = "/login";
                    return;
              }
              
            }
        }

        return Promise.reject(err); // For other errors, reject the promise
    }
);

export default axiosInstance;