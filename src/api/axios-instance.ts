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
        const role = localStorage.getItem("role");

  let accessToken : string | null = null;
  if (role === "admin") {
    accessToken = localStorage.getItem("admin_token");
  } else if (role === "student") {
    accessToken = localStorage.getItem("student_token");
  } else if (role === "tutor") {
    accessToken = localStorage.getItem("tutor_token");
  }

        

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
            err.response.status === 403 && 
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
                     const role = localStorage.getItem("role");
  if (role === "admin") {
     localStorage.removeItem("admin_token");
      window.location.href = "/admin/login";
      return
  } else if (role === "student") {
    localStorage.removeItem("student_token");
     window.location.href = "/login";
     return
  } else if (role === "tutor") {
    localStorage.removeItem("tutor_token");
     window.location.href = "/login";
     return
  }


                    
                }
        }

         return Promise.reject(err); // For other errors, reject the promise
    }
)

export default axiosInstance;