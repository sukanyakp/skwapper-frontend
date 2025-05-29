import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true
});

export const signup  = async(formData : Object)=>{
  try {
    const res = await api.post('/signup',  formData );
    console.log('signup successful', res.data); 
    return ({status : res.status , data : res.data})
} catch (error) {
    console.error(error); 
}

}


export const verifyOtp = async (email:string ,otp:string) =>{
  try {
    const res = await api.post(`/verify-otp`,{ email , otp })
    console.log(res.status , res.data ,'verifying otp in the backend');
    return ({status : res.status , data : res.data})
  } catch (error) {
    console.log(error);
  }
}


export const login = async(formData : object) =>{
  try {

    const res = await api.post(`/login`,formData)
   console.log(' heere we are in api login ');
   const  {accessToken , refreshToken , user}  = res.data
   console.log(accessToken , 'accessToken');
   
   localStorage.setItem(accessToken,'accessToken')
   
    return ({status : res.status, data : res.data})
    
  } catch (error) {
    console.log(error);
    
  }
}

export default api;
