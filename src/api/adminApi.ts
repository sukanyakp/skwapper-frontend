import axios from "axios";

const api = axios.create({
    baseURL : 'http://localhost:3000/admin',
    withCredentials : true
})


//Request interceptor 
api.interceptors.request.use(
    (config)=>{
        console.log(`[${config.method?.toUpperCase()}] ${config.url}` , config.data);
        return config  
    }
)

//Response interceptor
api.interceptors.response.use(
    (response) =>{
        console.log(`[${response.config.method?.toUpperCase()}] ${response.config.url}`,response.data);
        return response
    }
)

//Request interceptor
export const registerAdmin = async( name :string , email : string , password : string )=>{
    try {

        console.log('hello registerAdmin ');
        
        const res = await api.post('/register' ,{name,email,password}) // admin : role
        console.log('body ',res);

        return ({status : res.status ,data : res.data})
        
        
    } catch (error) {
        console.log(error); 
    }

}

export const loginAdmin = async(email : string , password : string)=>{
    try {
        return api.post('/login',{email,password})

    } catch (error) {
        console.log(error);  
    }
}