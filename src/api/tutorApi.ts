import axios from "axios";

const api = axios.create({
    baseURL : 'http://localhost:3000/tutor',
    withCredentials : true
})

api.interceptors.request.use(
  (config) =>{
    console.log(`[${config.method?.toUpperCase()}]  ${config.url}` , config.data);
    return config
  }
)


api.interceptors.response.use(
  (response) =>{
    console.log(`${response.config.method?.toUpperCase()} ${response.config.url}`,response.data);
    return response
  }
)

export const registerTutor = async (formData: FormData) =>{
    console.log('hello regitsteTutor');

    try {

        const res = await api.post("/apply" ,formData , {
          headers : {
            'Content-Type' : 'multipart/form-data'
          }
        })
        return({status : res.status , data : res.data})
        
    } catch (error) {
        console.log(error);
        
    }
    
}

export const checkTutorStatus = async() => {
  const res =  await api.get("/status");
  return ({status : res.status , data : res.data})
};