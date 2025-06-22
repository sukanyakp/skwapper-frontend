import axios from "axios";
import basicAxiosInstance from './basic-axios-instance'
import { toast } from "sonner";

// create an axios instance 

const axiosInstance = axios.create({
    baseURL : 'http://localhost:3000',
    withCredentials : true  
})


const refreshToken = async ()=>{
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
}


axiosInstance.interceptors.request.use(
    (config) : any =>{
        const accessToken = localStorage.getItem("token");
        console.log('here we are at the axiosInstance interceptors req');
        

        if(accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`
        }

        return config
    },
    (err) => {
        return Promise.reject(err)
    }
)

axiosInstance.interceptors.response.use(
    (res) => {
        return res
    },
    async (err) => {
        const originalRequest = err.config ;

        if(
            err.response && 
            err.response.status === 403&& 
            !originalRequest._retry
        ){
                originalRequest._retry = true

                try {

                    const accessToken = await refreshToken();

                    originalRequest.headers.Authorization = `Bearer ${accessToken}`;

                    return axiosInstance(originalRequest);
                    
                } catch (error : any) {
                    console.log(error);
                     toast( "Token expired. Please login again!" );
                localStorage.removeItem("token");
                //  localStorage.removeItem("accessToken");
        window.location.href = "/login";
                // localStorage.removeItem("user");
                // localStorage.removeItem("isAuth")
                return;
                    
                }
        }

         return Promise.reject(err); // For other errors, reject the promise
    }
)

export default axiosInstance;